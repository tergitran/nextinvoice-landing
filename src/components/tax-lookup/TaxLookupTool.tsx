'use client';

import React, { useState, useRef, useMemo } from 'react';
import {
  Search,
  RotateCcw,
  Download,
  AlertCircle,
  Clipboard,
  Trash2,
  StopCircle,
  Copy,
  Check,
} from 'lucide-react';
import { API_URL } from '@/lib/constants';
import { TaxLookupItem, TaxLookupProgress, TaxStatusCategory, TaxLookupStreamEvent } from './tax-lookup-types';
import { TaxStatusBadge, getTaxStatusCategory } from './tax-status-badge';
import { exportTaxLookupToExcel } from './export-excel';
import { LimitModal } from './limit-modal';

export function TaxLookupTool() {
  const [inputText, setInputText] = useState('');
  const [items, setItems] = useState<TaxLookupItem[]>([]);
  const [progress, setProgress] = useState<TaxLookupProgress>({
    total: 0,
    processed: 0,
    successCount: 0,
    failCount: 0,
    isProcessing: false,
    isCompleted: false,
  });
  const [activeTab, setActiveTab] = useState<TaxStatusCategory>('ALL');
  const [searchFilter, setSearchFilter] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [waitingMessage, setWaitingMessage] = useState<string | null>(null);
  const [limitModalOpen, setLimitModalOpen] = useState(false);
  const [totalDetected, setTotalDetected] = useState(0);
  const [copiedTaxCode, setCopiedTaxCode] = useState<string | null>(null);

  const abortControllerRef = useRef<AbortController | null>(null);

  // Phân tích danh sách mã số thuế từ input text
  const parsedTaxCodes = useMemo(() => {
    if (!inputText.trim()) return [];
    const tokens = inputText
      .split(/[\n,\s;]+/)
      .map((t) => t.trim().replace(/[^\d-]/g, ''))
      .filter((t) => t.length >= 10);
    return Array.from(new Set(tokens));
  }, [inputText]);

  const handlePasteClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setInputText((prev) => (prev ? `${prev}\n${text}` : text));
      }
    } catch {
      // Ignore if clipboard permission not granted
    }
  };

  const handleClear = () => {
    setInputText('');
    setItems([]);
    setProgress({
      total: 0,
      processed: 0,
      successCount: 0,
      failCount: 0,
      isProcessing: false,
      isCompleted: false,
    });
    setErrorMessage(null);
    setWaitingMessage(null);
  };

  const handleStop = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setProgress((prev) => ({ ...prev, isProcessing: false }));
    setWaitingMessage(null);
  };

  const handleStartLookup = async () => {
    if (parsedTaxCodes.length === 0) {
      setErrorMessage('Vui lòng nhập ít nhất 1 mã số thuế hợp lệ (10 hoặc 13-14 ký tự).');
      return;
    }

    setErrorMessage(null);
    setWaitingMessage(null);

    // Xử lý giới hạn 50 MST
    const originalCount = parsedTaxCodes.length;
    let targetCodes = parsedTaxCodes;
    if (originalCount > 50) {
      setTotalDetected(originalCount);
      setLimitModalOpen(true);
      targetCodes = parsedTaxCodes.slice(0, 50);
    }

    setItems([]);
    setProgress({
      total: targetCodes.length,
      processed: 0,
      successCount: 0,
      failCount: 0,
      isProcessing: true,
      isCompleted: false,
    });

    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    try {
      const res = await fetch(`${API_URL}/tools/tax-status/public-stream`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'text/event-stream',
        },
        body: JSON.stringify({ taxCodes: targetCodes }),
        signal: abortController.signal,
      });

      if (!res.ok) {
        if (res.status === 429) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.message || 'Bạn đã gửi yêu cầu quá nhanh. Vui lòng đợi 1 phút để tiếp tục.');
        }
        if (res.status === 400) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.message || 'Danh sách mã số thuế không hợp lệ.');
        }
        throw new Error(`Máy chủ phản hồi mã lỗi ${res.status}`);
      }

      if (!res.body) {
        throw new Error('Không thể đọc luồng phản hồi từ máy chủ.');
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed.startsWith('data:')) continue;
          const dataStr = trimmed.slice(5).trim();
          if (!dataStr) continue;

          try {
            const event: TaxLookupStreamEvent = JSON.parse(dataStr);

            if (event.type === 'waiting') {
              setWaitingMessage(event.message || 'Đang giãn cách tần suất truy vấn Cổng Thuế...');
            }

            if (event.type === 'progress') {
              setWaitingMessage(null);
              if (event.item) {
                const newItem = event.item;
                setItems((prev) => {
                  const existsIdx = prev.findIndex((p) => p.taxCode === newItem.taxCode);
                  if (existsIdx >= 0) {
                    const next = [...prev];
                    next[existsIdx] = newItem;
                    return next;
                  }
                  return [...prev, newItem];
                });
              }

              setProgress((prev) => ({
                ...prev,
                processed: event.processed ?? prev.processed,
                total: event.total ?? prev.total,
                successCount: event.successCount ?? prev.successCount,
                failCount: event.failCount ?? prev.failCount,
              }));
            }

            if (event.type === 'complete') {
              setProgress((prev) => ({
                ...prev,
                isProcessing: false,
                isCompleted: true,
                processed: event.processed ?? prev.processed,
                total: event.total ?? prev.total,
                successCount: event.successCount ?? prev.successCount,
                failCount: event.failCount ?? prev.failCount,
              }));
            }
          } catch {
            // Ignore parse errors on heartbeat
          }
        }
      }
    } catch (err: unknown) {
      if ((err as Error)?.name === 'AbortError') {
        // User aborted intentionally
        return;
      }
      setErrorMessage((err as Error)?.message || 'Lỗi kết nối máy chủ');
    } finally {
      abortControllerRef.current = null;
      setProgress((prev) => ({ ...prev, isProcessing: false }));
    }
  };

  const handleCopy = (taxCode: string) => {
    navigator.clipboard.writeText(taxCode);
    setCopiedTaxCode(taxCode);
    setTimeout(() => setCopiedTaxCode(null), 2000);
  };

  // Lọc danh sách kết quả theo Category & từ khóa
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // Lọc theo Tab
      if (activeTab !== 'ALL') {
        const cat = getTaxStatusCategory(item.status, item.isSuccess);
        if (cat !== activeTab) return false;
      }
      // Lọc theo Search query
      if (searchFilter.trim()) {
        const q = searchFilter.toLowerCase().trim();
        const matchCode = item.taxCode.toLowerCase().includes(q);
        const matchName = (item.name || '').toLowerCase().includes(q);
        const matchDept = (item.taxDepartment || '').toLowerCase().includes(q);
        return matchCode || matchName || matchDept;
      }
      return true;
    });
  }, [items, activeTab, searchFilter]);

  // Đếm số lượng theo danh mục
  const counts = useMemo(() => {
    let active = 0;
    let warning = 0;
    let risk = 0;
    let error = 0;

    for (const it of items) {
      const cat = getTaxStatusCategory(it.status, it.isSuccess);
      if (cat === 'ACTIVE') active++;
      else if (cat === 'WARNING') warning++;
      else if (cat === 'RISK') risk++;
      else error++;
    }

    return { all: items.length, active, warning, risk, error };
  }, [items]);

  const percentComplete = progress.total > 0
    ? Math.round((progress.processed / progress.total) * 100)
    : 0;

  return (
    <div className="w-full space-y-8">
      <LimitModal
        open={limitModalOpen}
        onClose={() => setLimitModalOpen(false)}
        totalPasted={totalDetected}
      />

      {/* Input Section Card */}
      <div className="relative rounded-3xl border border-slate-800 bg-slate-900/80 p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <label htmlFor="tax-codes-input" className="block text-base font-bold text-white">
              Danh sách mã số thuế cần tra cứu
            </label>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Dán danh sách mã số thuế (phân cách bằng dấu phẩy, khoảng trắng hoặc mỗi mã 1 dòng). Hỗ trợ tối đa 50 MST/lượt tra cứu.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePasteClipboard}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 transition"
            >
              <Clipboard className="h-3.5 w-3.5" />
              <span>Dán clipboard</span>
            </button>
            {inputText && (
              <button
                type="button"
                onClick={handleClear}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-rose-400 hover:bg-rose-500/10 transition"
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span>Xóa</span>
              </button>
            )}
          </div>
        </div>

        {/* Textarea */}
        <div className="relative">
          <textarea
            id="tax-codes-input"
            rows={5}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={progress.isProcessing}
            placeholder={`0102345678\n0301234567\n0409876543\n0102345678-001`}
            className="w-full rounded-2xl border border-slate-800 bg-slate-950/80 p-4 text-sm font-mono text-slate-100 placeholder:text-slate-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-hidden transition"
          />
        </div>

        {/* Counter and Submit Button */}
        <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-400">
            <span>Đã nhận diện:</span>
            <span className="font-bold text-white px-2 py-0.5 rounded-md bg-slate-800">
              {parsedTaxCodes.length} MST
            </span>
            {parsedTaxCodes.length > 50 && (
              <span className="text-amber-400 font-medium">
                (Sẽ lấy 50 MST đầu tiên cho lượt tra cứu này)
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            {progress.isProcessing ? (
              <button
                type="button"
                onClick={handleStop}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold bg-rose-600 hover:bg-rose-500 text-white shadow-lg transition active:scale-98"
              >
                <StopCircle className="h-4 w-4" />
                <span>Dừng tra cứu</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleStartLookup}
                disabled={parsedTaxCodes.length === 0}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white shadow-lg shadow-blue-600/30 transition active:scale-98"
              >
                <Search className="h-4 w-4" />
                <span>Tra cứu ngay</span>
              </button>
            )}
          </div>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="mt-4 flex items-start gap-3 rounded-xl border border-rose-500/30 bg-rose-500/10 p-4 text-sm text-rose-300">
            <AlertCircle className="h-5 w-5 shrink-0 text-rose-400 mt-0.5" />
            <p className="leading-relaxed">{errorMessage}</p>
          </div>
        )}

        {/* Waiting Message */}
        {waitingMessage && (
          <div className="mt-4 flex items-center gap-3 rounded-xl border border-amber-500/30 bg-amber-500/10 p-3 text-xs sm:text-sm text-amber-300">
            <RotateCcw className="h-4 w-4 animate-spin text-amber-400 shrink-0" />
            <span>{waitingMessage}</span>
          </div>
        )}

        {/* Progress Bar */}
        {(progress.isProcessing || progress.isCompleted) && (
          <div className="mt-6 pt-6 border-t border-slate-800/80">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-300 mb-2">
              <span className="flex items-center gap-2">
                {progress.isProcessing && (
                  <span className="inline-block h-2 w-2 rounded-full bg-blue-400 animate-ping" />
                )}
                <span>
                  {progress.isProcessing
                    ? `Đang tra cứu: ${progress.processed}/${progress.total} MST`
                    : `Đã hoàn tất tra cứu ${progress.total} MST`}
                </span>
              </span>
              <span>{percentComplete}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 transition-all duration-300"
                style={{ width: `${percentComplete}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Results Section */}
      {items.length > 0 && (
        <div className="space-y-4">
          {/* Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 text-center">
              <div className="text-xs text-slate-400">Tổng đã tra cứu</div>
              <div className="text-xl sm:text-2xl font-bold text-white mt-1">{counts.all}</div>
            </div>
            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4 text-center">
              <div className="text-xs text-emerald-400">Đang hoạt động</div>
              <div className="text-xl sm:text-2xl font-bold text-emerald-400 mt-1">{counts.active}</div>
            </div>
            <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4 text-center">
              <div className="text-xs text-amber-400">Cần lưu ý / Tạm nghỉ</div>
              <div className="text-xl sm:text-2xl font-bold text-amber-400 mt-1">{counts.warning}</div>
            </div>
            <div className="rounded-2xl border border-rose-500/20 bg-rose-500/5 p-4 text-center">
              <div className="text-xs text-rose-400">Rủi ro / Đóng MST</div>
              <div className="text-xl sm:text-2xl font-bold text-rose-400 mt-1">{counts.risk}</div>
            </div>
            <div className="col-span-2 sm:col-span-1 rounded-2xl border border-slate-800 bg-slate-900/60 p-4 text-center">
              <div className="text-xs text-slate-400">Lỗi tra cứu</div>
              <div className="text-xl sm:text-2xl font-bold text-slate-300 mt-1">{counts.error}</div>
            </div>
          </div>

          {/* Table Toolbar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl border border-slate-800 bg-slate-900/60">
            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              <button
                type="button"
                onClick={() => setActiveTab('ALL')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                  activeTab === 'ALL'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                Tất cả ({counts.all})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('ACTIVE')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                  activeTab === 'ACTIVE'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-800 text-emerald-400 hover:bg-slate-700'
                }`}
              >
                Đang hoạt động ({counts.active})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('WARNING')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                  activeTab === 'WARNING'
                    ? 'bg-amber-600 text-white'
                    : 'bg-slate-800 text-amber-400 hover:bg-slate-700'
                }`}
              >
                Cần lưu ý ({counts.warning})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('RISK')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                  activeTab === 'RISK'
                    ? 'bg-rose-600 text-white'
                    : 'bg-slate-800 text-rose-400 hover:bg-slate-700'
                }`}
              >
                Rủi ro ({counts.risk})
              </button>
            </div>

            {/* Search Box and Export Button */}
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Lọc tên, MST..."
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  className="rounded-xl border border-slate-800 bg-slate-950 py-1.5 pl-8 pr-3 text-xs text-slate-100 placeholder:text-slate-500 focus:border-blue-500 focus:outline-hidden w-40 sm:w-48"
                />
              </div>

              <button
                type="button"
                onClick={() => exportTaxLookupToExcel(filteredItems)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm transition active:scale-98"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Xuất Excel</span>
              </button>
            </div>
          </div>

          {/* Results Table */}
          <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="border-b border-slate-800 bg-slate-950/70 text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                  <tr>
                    <th scope="col" className="py-3 px-3 w-12 text-center">STT</th>
                    <th scope="col" className="py-3 px-3 w-36">Mã số thuế</th>
                    <th scope="col" className="py-3 px-3 min-w-[200px]">Tên người nộp thuế</th>
                    <th scope="col" className="py-3 px-3 min-w-[180px]">Trạng thái</th>
                    <th scope="col" className="py-3 px-3 min-w-[160px]">Cơ quan thuế</th>
                    <th scope="col" className="py-3 px-3 min-w-[220px]">Địa chỉ trụ sở</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {filteredItems.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-slate-500">
                        Không tìm thấy mã số thuế nào phù hợp với bộ lọc.
                      </td>
                    </tr>
                  ) : (
                    filteredItems.map((item, idx) => (
                      <tr key={item.taxCode || idx} className="hover:bg-slate-800/40 transition-colors">
                        <td className="py-3 px-3 text-center text-slate-500 font-mono">
                          {idx + 1}
                        </td>
                        <td className="py-3 px-3 font-mono font-semibold text-white whitespace-nowrap">
                          <div className="flex items-center gap-1.5">
                            <span>{item.taxCode}</span>
                            <button
                              type="button"
                              onClick={() => handleCopy(item.taxCode)}
                              title="Sao chép MST"
                              className="text-slate-500 hover:text-white transition"
                            >
                              {copiedTaxCode === item.taxCode ? (
                                <Check className="h-3 w-3 text-emerald-400" />
                              ) : (
                                <Copy className="h-3 w-3" />
                              )}
                            </button>
                          </div>
                        </td>
                        <td className="py-3 px-3 font-medium text-slate-100">
                          {item.name || (item.isSuccess ? '—' : <span className="text-rose-400 italic">{item.error || 'Lỗi tra cứu'}</span>)}
                        </td>
                        <td className="py-3 px-3">
                          <TaxStatusBadge status={item.status} isSuccess={item.isSuccess} />
                        </td>
                        <td className="py-3 px-3 text-slate-300">
                          {item.taxDepartment || '—'}
                        </td>
                        <td className="py-3 px-3 text-slate-400 leading-relaxed">
                          {item.address || '—'}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

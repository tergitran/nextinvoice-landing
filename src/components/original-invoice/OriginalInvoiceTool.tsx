'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Upload,
  FileCheck2,
  Sparkles,
  Loader2,
  Clock,
  Printer,
  RotateCcw,
} from 'lucide-react';
import { API_URL } from '@/lib/constants';
import { parseInvoiceXml } from '@/components/xml-viewer/xml-parser';
import { XmlInvoiceTemplate } from '@/components/xml-viewer/XmlInvoiceTemplate';
import type { ParsedXmlInvoice } from '@/components/xml-viewer/xml-types';
import { SAMPLE_ORIGINAL_INVOICE_XML } from './sample-xml';
import {
  getRateLimitStatus,
  recordLookupAttempt,
  MAX_LOOKUPS_PER_HOUR,
  type RateLimitStatus,
} from './rate-limit-tracker';
import { RateLimitModal } from './RateLimitModal';
import { FallbackNotice } from './FallbackNotice';
import { OriginalPdfViewer } from './OriginalPdfViewer';

export function OriginalInvoiceTool() {
  const [invoice, setInvoice] = useState<ParsedXmlInvoice | null>(null);
  const [pdfBase64, setPdfBase64] = useState<string | null>(null);
  const [originalFilename, setOriginalFilename] = useState<string>('');
  const [providerName, setProviderName] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingStage, setLoadingStage] = useState<string>('');
  const [showingTct, setShowingTct] = useState(false);
  const [isFallback, setIsFallback] = useState(false);
  const [rateLimit, setRateLimit] = useState<RateLimitStatus>({
    count: 0,
    remaining: MAX_LOOKUPS_PER_HOUR,
    isBlocked: false,
    resetInSeconds: 0,
  });
  const [limitModalOpen, setLimitModalOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setRateLimit(getRateLimitStatus());
  }, []);

  const handleProcessXml = async (content: string, fileName: string) => {
    // 1. Kiểm tra rate limit trước khi gọi API
    const currentStatus = getRateLimitStatus();
    setRateLimit(currentStatus);
    if (currentStatus.isBlocked) {
      setLimitModalOpen(true);
      return;
    }

    setLoading(true);
    setLoadingStage('Đang phân tích cấu trúc file XML hóa đơn...');
    setPdfBase64(null);
    setIsFallback(false);
    setShowingTct(false);

    try {
      // 2. Parse XML cục bộ
      const parsed = parseInvoiceXml(content, fileName);
      setInvoice(parsed);

      // Ghi nhận 1 lượt tra cứu
      const updatedStatus = recordLookupAttempt();
      setRateLimit(updatedStatus);

      setLoadingStage('Đang nhận diện nhà cung cấp & kết nối cổng tra cứu...');

      // 3. Gửi metadata lên Backend tải PDF gốc
      const res = await fetch(`${API_URL}/public/invoices/extract-original-pdf`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sellerTaxCode: parsed.nbmst,
          sellerName: parsed.nbten,
          templateCode: parsed.khmshdon,
          invoiceSymbol: parsed.khhdon,
          invoiceNumber: parsed.shdon,
          issueDate: parsed.tdlap,
          providerMst: parsed.msttcgp,
          lookupCode: parsed.lookupCode,
          portalLink: parsed.portalLink,
          dlhdonId: parsed.dlhdonId,
          mscqt: parsed.mscqt || parsed.mccqt,
          xmlContent: content,
        }),
      });

      if (res.status === 429) {
        const errorData = await res.json().catch(() => ({}));
        setRateLimit({
          ...getRateLimitStatus(),
          isBlocked: true,
          resetInSeconds: errorData.retryAfterSeconds || 3600,
        });
        setLimitModalOpen(true);
        setIsFallback(true);
        setShowingTct(true);
        return;
      }

      const data = await res.json();

      if (data.success && data.pdfBase64) {
        setPdfBase64(data.pdfBase64);
        setOriginalFilename(data.filename || `${parsed.nbmst}_${parsed.shdon}.pdf`);
        setProviderName(data.provider?.name || null);
        setIsFallback(false);
        setShowingTct(false);
      } else {
        // Fallback: không tìm thấy PDF gốc hoặc NCC chưa hỗ trợ
        setProviderName(data.provider?.name || null);
        setIsFallback(true);
        setShowingTct(true);
      }
    } catch {
      setIsFallback(true);
      setShowingTct(true);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.name.toLowerCase().endsWith('.xml')) {
      alert('Vui lòng chọn file có định dạng đuôi .xml');
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      void handleProcessXml(content, file.name);
    };
    reader.readAsText(file);
  };

  const handleReset = () => {
    setInvoice(null);
    setPdfBase64(null);
    setIsFallback(false);
    setShowingTct(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
    setRateLimit(getRateLimitStatus());
  };

  return (
    <div className="w-full space-y-6">
      <input
        ref={fileInputRef}
        type="file"
        accept=".xml,text/xml"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Quota Badge Indicator */}
      <div className="no-print print:hidden flex items-center justify-between text-xs text-slate-400">
        <div className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/80 px-3.5 py-1.5 backdrop-blur-md">
          <Clock className="h-3.5 w-3.5 text-purple-400" />
          <span>
            Hạn mức: Còn <strong className="text-purple-300 font-bold">{rateLimit.remaining}/{MAX_LOOKUPS_PER_HOUR}</strong> lượt tra cứu trong 1 giờ này
          </span>
        </div>
        {rateLimit.isBlocked && (
          <button
            type="button"
            onClick={() => setLimitModalOpen(true)}
            className="text-xs font-semibold text-purple-400 hover:text-purple-300 underline cursor-pointer"
          >
            Xem chi tiết giới hạn
          </button>
        )}
      </div>

      {/* Loading Overlay */}
      {loading && (
        <div className="rounded-3xl border border-purple-500/30 bg-slate-900/90 p-12 text-center shadow-2xl backdrop-blur-xl animate-in fade-in-0 duration-200">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="relative">
              <div className="size-16 rounded-full border-4 border-purple-500/20 border-t-purple-500 animate-spin" />
              <Loader2 className="size-6 text-purple-400 absolute inset-0 m-auto animate-pulse" />
            </div>
            <h4 className="text-lg font-bold text-white">Đang tải hóa đơn gốc từ Nhà cung cấp</h4>
            <p className="text-sm text-purple-300/80 max-w-md">{loadingStage}</p>
          </div>
        </div>
      )}

      {/* Upload Dropzone (Khi chưa chọn file) */}
      {!loading && !invoice && (
        <div className="no-print print:hidden relative rounded-3xl border border-slate-800 bg-slate-900/80 p-8 sm:p-12 shadow-2xl backdrop-blur-xl text-center">
          <div
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragging(false);
              const file = e.dataTransfer.files?.[0];
              if (file && file.name.toLowerCase().endsWith('.xml')) {
                const reader = new FileReader();
                reader.onload = (ev) => void handleProcessXml(ev.target?.result as string, file.name);
                reader.readAsText(file);
              }
            }}
            onClick={() => fileInputRef.current?.click()}
            className={`group cursor-pointer rounded-2xl border-2 border-dashed p-8 sm:p-14 transition-all duration-200 flex flex-col items-center justify-center ${
              isDragging
                ? 'border-purple-500 bg-purple-500/10'
                : 'border-slate-700/80 hover:border-purple-500/60 hover:bg-slate-800/40'
            }`}
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-500/10 text-purple-400 border border-purple-500/20 group-hover:scale-110 transition-transform">
              <Upload className="h-8 w-8" />
            </div>

            <h3 className="mt-6 text-xl font-bold text-white">
              Kéo & thả file <span className="text-purple-400 font-mono">.XML</span> vào đây để xem PDF gốc
            </h3>
            <p className="mt-2 text-sm text-slate-400 max-w-lg">
              Tự động nhận diện nhà cung cấp (Viettel, VNPT, MISA, BKAV, EasyInvoice, WinInvoice...) và trích xuất file PDF gốc có chữ ký số điện tử.
            </p>
          </div>

          {/* Sample XML button */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <span className="text-xs text-slate-500">Chưa có file XML sẵn?</span>
            <button
              type="button"
              onClick={() => void handleProcessXml(SAMPLE_ORIGINAL_INVOICE_XML, '0300631013_K25TSU_3906.xml')}
              className="inline-flex items-center gap-2 rounded-xl border border-purple-500/30 bg-purple-500/10 px-4 py-2 text-xs font-bold text-purple-300 hover:bg-purple-500/20 hover:border-purple-500/50 transition cursor-pointer"
            >
              <Sparkles className="h-4 w-4 text-purple-400" />
              <span>Thử ngay với file mẫu (Viettel S-Invoice)</span>
            </button>
          </div>
        </div>
      )}

      {/* Case 1: Có PDF gốc */}
      {!loading && pdfBase64 && (
        <OriginalPdfViewer
          pdfBase64={pdfBase64}
          filename={originalFilename}
          providerName={providerName}
          onReset={handleReset}
          onViewTctVersion={() => setShowingTct((prev) => !prev)}
          showingTct={showingTct}
        />
      )}

      {/* Case 2: Fallback (Chưa hỗ trợ hoặc lỗi kết nối) */}
      {!loading && isFallback && <FallbackNotice providerName={providerName} />}

      {/* Render bản thể hiện TCT nếu fallback hoặc người dùng chuyển tab xem */}
      {!loading && invoice && (isFallback || showingTct) && (
        <div className="space-y-4">
          <div className="no-print print:hidden flex items-center justify-between rounded-xl bg-slate-900 border border-slate-800 p-3 text-xs text-slate-300">
            <span className="flex items-center gap-2">
              <FileCheck2 className="h-4 w-4 text-emerald-400" />
              <span>Bản thể hiện mẫu hóa đơn điện tử chuẩn Bộ Tài chính (TCT)</span>
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center gap-1.5 rounded-lg bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:bg-slate-700 transition cursor-pointer"
              >
                <Printer className="h-3.5 w-3.5" />
                <span>In / Tải PDF TCT</span>
              </button>
              {isFallback && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-400 hover:text-white transition cursor-pointer"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>Chọn file khác</span>
                </button>
              )}
            </div>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/60 p-4 sm:p-6 shadow-2xl">
            <XmlInvoiceTemplate invoice={invoice} />
          </div>
        </div>
      )}

      {/* Modal giới hạn 10 hóa đơn / 1 giờ */}
      <RateLimitModal
        open={limitModalOpen}
        onClose={() => setLimitModalOpen(false)}
        resetInSeconds={rateLimit.resetInSeconds}
      />
    </div>
  );
}

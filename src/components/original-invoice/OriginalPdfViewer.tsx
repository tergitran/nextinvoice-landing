'use client';

import React, { useMemo } from 'react';
import {
  Download,
  ExternalLink,
  RotateCcw,
  CheckCircle2,
  FileText,
  FileCheck,
} from 'lucide-react';

interface OriginalPdfViewerProps {
  pdfBase64: string;
  filename: string;
  providerName?: string | null;
  onReset: () => void;
  onViewTctVersion: () => void;
  showingTct: boolean;
}

export function OriginalPdfViewer({
  pdfBase64,
  filename,
  providerName,
  onReset,
  onViewTctVersion,
  showingTct,
}: OriginalPdfViewerProps) {
  // Tạo blob URL an toàn từ Base64 để nhúng vào iframe và tải về
  const pdfBlobUrl = useMemo(() => {
    if (!pdfBase64) return '';
    try {
      const byteCharacters = atob(pdfBase64);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'application/pdf' });
      return URL.createObjectURL(blob);
    } catch {
      return `data:application/pdf;base64,${pdfBase64}`;
    }
  }, [pdfBase64]);

  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = pdfBlobUrl;
    a.download = filename || 'hoa_don_goc.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleOpenNewTab = () => {
    if (pdfBlobUrl) {
      window.open(pdfBlobUrl, '_blank');
    }
  };

  return (
    <div className="w-full space-y-4">
      {/* Action Toolbar */}
      <div className="no-print print:hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-3 rounded-2xl border border-slate-800 bg-slate-900/90 p-4 shadow-xl backdrop-blur-md">
        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex items-center gap-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 text-xs font-semibold text-emerald-400">
            <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
            <span>
              Đã trích xuất PDF gốc có chữ ký số từ{' '}
              <strong className="text-white">{providerName || 'Nhà cung cấp'}</strong>
            </span>
          </div>
          <span className="text-xs text-slate-400 hidden sm:inline">
            File: <span className="font-mono text-slate-300">{filename}</span>
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <button
            type="button"
            onClick={onViewTctVersion}
            className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold transition cursor-pointer border ${
              showingTct
                ? 'bg-purple-600 text-white border-purple-500'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white hover:bg-slate-700'
            }`}
          >
            {showingTct ? <FileCheck className="h-3.5 w-3.5" /> : <FileText className="h-3.5 w-3.5" />}
            <span>{showingTct ? 'Xem lại PDF Gốc NCC' : 'Xem Bản thể hiện TCT'}</span>
          </button>

          <button
            type="button"
            onClick={handleDownload}
            className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-3.5 py-2 text-xs font-bold text-white shadow-md shadow-blue-600/30 hover:bg-blue-500 transition cursor-pointer"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Tải PDF gốc</span>
          </button>

          <button
            type="button"
            onClick={handleOpenNewTab}
            className="inline-flex items-center gap-1.5 rounded-xl bg-slate-800 border border-slate-700 px-3 py-2 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-700 transition cursor-pointer"
            title="Mở toàn màn hình trong tab mới"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Tab mới</span>
          </button>

          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1.5 rounded-xl bg-slate-800 border border-slate-700 px-3 py-2 text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-700 transition cursor-pointer"
            title="Tra cứu file khác"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>File khác</span>
          </button>
        </div>
      </div>

      {/* Embedded PDF Viewer Iframe */}
      {!showingTct && (
        <div className="relative w-full rounded-2xl border border-slate-800 bg-slate-900/60 shadow-2xl overflow-hidden">
          <div className="w-full h-[780px] bg-slate-950 flex flex-col">
            <iframe
              src={`${pdfBlobUrl}#view=FitH&toolbar=1`}
              title={`Hóa đơn gốc ${filename}`}
              className="w-full h-full border-none"
            />
          </div>
        </div>
      )}
    </div>
  );
}

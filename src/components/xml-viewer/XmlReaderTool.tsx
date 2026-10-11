'use client';

import React, { useState, useRef } from 'react';
import {
  FileText,
  Upload,
  Printer,
  Download,
  RotateCcw,
  ShieldCheck,
  AlertCircle,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import { ParsedXmlInvoice } from './xml-types';
import { parseInvoiceXml } from './xml-parser';
import { XmlInvoiceTemplate } from './XmlInvoiceTemplate';
import { SAMPLE_INVOICE_XML } from './sample-xml';

export function XmlReaderTool() {
  const [invoice, setInvoice] = useState<ParsedXmlInvoice | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const processXmlText = (content: string, name: string) => {
    try {
      setErrorMessage(null);
      const parsed = parseInvoiceXml(content, name);
      setInvoice(parsed);
    } catch (err: unknown) {
      setInvoice(null);
      setErrorMessage(
        (err as Error)?.message || 'Không thể đọc nội dung file XML. Vui lòng kiểm tra lại cấu trúc file.',
      );
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.toLowerCase().endsWith('.xml')) {
      setErrorMessage('Vui lòng chọn file có định dạng đuôi .xml');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      processXmlText(content, file.name);
    };
    reader.onerror = () => {
      setErrorMessage('Không thể đọc file từ thiết bị của bạn.');
    };
    reader.readAsText(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    if (!file.name.toLowerCase().endsWith('.xml')) {
      setErrorMessage('Vui lòng kéo thả file có định dạng đuôi .xml');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      processXmlText(content, file.name);
    };
    reader.readAsText(file);
  };

  const handleUseSample = () => {
    processXmlText(SAMPLE_INVOICE_XML, 'hoa_don_mau_thong_tu_78.xml');
  };

  const handlePrint = () => {
    window.print();
  };

  const handleOpenPrintTab = () => {
    if (!invoice) return;
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Trình duyệt đang chặn cửa sổ bật lên. Vui lòng cho phép popup để mở tab in hóa đơn.');
      return;
    }

    const printElement = document.getElementById('invoice-print-content');
    const invoiceHtml = printElement ? printElement.outerHTML : '';

    const html = `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="utf-8" />
  <title>In Hóa đơn ${invoice.shdon} (${invoice.khhdon || '—'})</title>
  <style>
    @page { size: A4 portrait; margin: 0; }
    * { box-sizing: border-box; }
    body { margin: 0; padding: 20px 0; background: #525659; font-family: "Times New Roman", Times, serif; }
    .toolbar { position: sticky; top: 0; background: #0f172a; color: white; padding: 12px 24px; display: flex; justify-content: space-between; align-items: center; z-index: 999; box-shadow: 0 4px 12px rgba(0,0,0,0.3); font-family: sans-serif; font-size: 13px; }
    .toolbar button { background: #2563eb; color: white; border: none; padding: 8px 18px; border-radius: 8px; font-weight: bold; cursor: pointer; }
    .toolbar button:hover { background: #1d4ed8; }
    .print-box { display: flex; justify-content: center; }
    @media print {
      .toolbar { display: none !important; }
      body { background: white !important; padding: 0 !important; }
      .print-box { display: block !important; }
    }
  </style>
</head>
<body>
  <div class="toolbar">
    <div>Hóa đơn ${invoice.shdon} - ${invoice.nbten}</div>
    <button onclick="window.print()">In Hóa Đơn (Ctrl + P)</button>
  </div>
  <div class="print-box">
    ${invoiceHtml}
  </div>
</body>
</html>`;

    printWindow.document.open();
    printWindow.document.write(html);
    printWindow.document.close();
  };

  const handleDownloadXml = () => {
    if (!invoice) return;
    const blob = new Blob([invoice.rawXmlContent], { type: 'application/xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = invoice.rawFileName || `invoice_${invoice.shdon}.xml`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    setInvoice(null);
    setErrorMessage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="w-full space-y-8">
      {/* Hidden native print styling */}
      <style jsx global>{`
        @media print {
          nav, header, footer, .no-print, .cta-banner {
            display: none !important;
          }
          body {
            background-color: #ffffff !important;
            color: #000000 !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          main {
            padding: 0 !important;
            margin: 0 !important;
            max-width: 100% !important;
          }
          #invoice-print-content {
            box-shadow: none !important;
            margin: 0 auto !important;
            padding: 0 !important;
            width: 100% !important;
            max-width: 210mm !important;
          }
        }
      `}</style>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".xml,text/xml"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Upload Dropzone (Khi chưa chọn file) */}
      {!invoice && (
        <div className="relative rounded-3xl border border-slate-800 bg-slate-900/80 p-8 sm:p-12 shadow-2xl backdrop-blur-xl text-center">
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`group cursor-pointer rounded-2xl border-2 border-dashed p-8 sm:p-14 transition-all duration-200 flex flex-col items-center justify-center ${
              isDragging
                ? 'border-blue-500 bg-blue-500/10'
                : 'border-slate-700/80 hover:border-blue-500/60 hover:bg-slate-800/40'
            }`}
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/20 group-hover:scale-110 transition-transform">
              <Upload className="h-8 w-8" />
            </div>

            <h3 className="mt-6 text-xl font-bold text-white">
              Kéo & thả file <span className="text-blue-400 font-mono">.XML</span> vào đây hoặc bấm để chọn file
            </h3>
            <p className="mt-2 text-sm text-slate-400 max-w-md">
              Hỗ trợ mọi định dạng file XML hóa đơn điện tử theo Thông tư 78 và Nghị định 123 từ tất cả các nhà cung cấp tại Việt Nam.
            </p>

            {/* Privacy Security Pledge */}
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold text-emerald-400">
              <ShieldCheck className="h-4 w-4 shrink-0" />
              <span>Bảo mật 100%: Dữ liệu chỉ đọc trực tiếp trên trình duyệt, KHÔNG upload lên máy chủ</span>
            </div>
          </div>

          {/* Sample XML button */}
          <div className="mt-6 flex items-center justify-center gap-3">
            <span className="text-xs text-slate-500">Chưa có file XML sẵn?</span>
            <button
              type="button"
              onClick={handleUseSample}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-blue-400 border border-slate-700 transition active:scale-98"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Xem thử với Hóa đơn XML mẫu</span>
            </button>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="mt-6 flex items-start gap-3 rounded-xl border border-rose-500/30 bg-rose-500/10 p-4 text-sm text-rose-300 text-left">
              <AlertCircle className="h-5 w-5 shrink-0 text-rose-400 mt-0.5" />
              <p className="leading-relaxed">{errorMessage}</p>
            </div>
          )}
        </div>
      )}

      {/* When XML is parsed and ready to view */}
      {invoice && (
        <div className="space-y-6">
          {/* Action Toolbar */}
          <div className="no-print rounded-2xl border border-slate-800 bg-slate-900/90 p-4 shadow-xl backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <FileText className="h-5 w-5" />
              </div>
              <div className="truncate">
                <div className="text-sm font-bold text-white truncate max-w-xs sm:max-w-md">
                  {invoice.rawFileName}
                </div>
                <div className="text-xs text-slate-400">
                  Số: {invoice.shdon} | Ký hiệu: {invoice.khhdon} | Mẫu: {invoice.khmshdon}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-end">
              <button
                type="button"
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30 transition active:scale-98"
              >
                <Printer className="h-4 w-4" />
                <span>In / Lưu PDF</span>
              </button>

              <button
                type="button"
                onClick={handleOpenPrintTab}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 transition"
              >
                <ExternalLink className="h-4 w-4" />
                <span>Mở tab riêng</span>
              </button>

              <button
                type="button"
                onClick={handleDownloadXml}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 transition"
              >
                <Download className="h-4 w-4" />
                <span>Tải XML</span>
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-slate-800 hover:bg-slate-700 text-rose-400 transition"
              >
                <RotateCcw className="h-4 w-4" />
                <span>Chọn file khác</span>
              </button>
            </div>
          </div>

          {/* Invoice Document Paper Layout */}
          <div className="flex justify-center overflow-x-auto py-2">
            <XmlInvoiceTemplate invoice={invoice} />
          </div>
        </div>
      )}
    </div>
  );
}

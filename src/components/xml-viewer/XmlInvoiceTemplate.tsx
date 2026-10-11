'use client';

import React from 'react';
import { ParsedXmlInvoice } from './xml-types';
import { formatVndCurrency } from '@/lib/utils';
import { ShieldCheck } from 'lucide-react';

interface XmlInvoiceTemplateProps {
  invoice: ParsedXmlInvoice;
}

export function XmlInvoiceTemplate({ invoice }: XmlInvoiceTemplateProps) {
  // Parse date
  let day = '...';
  let month = '...';
  let year = '......';
  if (invoice.tdlap) {
    const d = new Date(invoice.tdlap);
    if (!isNaN(d.getTime())) {
      day = String(d.getDate()).padStart(2, '0');
      month = String(d.getMonth() + 1).padStart(2, '0');
      year = String(d.getFullYear());
    }
  }

  return (
    <div
      id="invoice-print-content"
      className="invoice-print-wrapper bg-white text-black leading-[1.35] text-[13pt] font-serif antialiased mx-auto shadow-2xl rounded-sm p-4 sm:p-6"
      style={{
        width: '100%',
        maxWidth: '210mm',
        minHeight: '297mm',
        fontFamily: '"Times New Roman", Times, serif',
        boxSizing: 'border-box',
        color: '#000000',
      }}
    >
      {/* Outer Decorative Double Border */}
      <div
        className="relative border-[3px] border-double border-[#915715]/70 p-5 sm:p-8 bg-white min-h-[280mm] flex flex-col justify-between"
        style={{
          boxDecorationBreak: 'clone',
          WebkitBoxDecorationBreak: 'clone',
        }}
      >
        <div>
          {/* Header row: CQT code and Invoice Info */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4">
            {/* Top Left: MCCQT (Mã CQT cấp nếu có) */}
            <div className="text-xs sm:text-sm font-sans space-y-1">
              {invoice.mccqt ? (
                <div className="inline-block rounded border border-slate-300 bg-slate-50 px-2.5 py-1 text-slate-800">
                  <span className="font-semibold text-slate-600">Mã CQT: </span>
                  <span className="font-mono font-bold text-slate-900">{invoice.mccqt}</span>
                </div>
              ) : (
                <div className="inline-block rounded border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] text-slate-500">
                  Hóa đơn không có mã của CQT
                </div>
              )}
            </div>

            {/* Top Right: Mẫu số, Ký hiệu, Số */}
            <div className="text-right text-xs sm:text-sm leading-tight font-sans font-medium text-slate-800">
              <div>
                <span>Mẫu số: </span>
                <strong className="font-bold text-black">{invoice.khmshdon}</strong>
              </div>
              <div>
                <span>Ký hiệu: </span>
                <strong className="font-bold text-black">{invoice.khhdon}</strong>
              </div>
              <div>
                <span>Số: </span>
                <strong className="font-bold text-red-700 text-sm sm:text-base font-mono">
                  {invoice.shdon}
                </strong>
              </div>
            </div>
          </div>

          {/* Heading Title */}
          <div className="text-center my-3">
            <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-wide text-black">
              {invoice.thdon || 'HÓA ĐƠN GIÁ TRỊ GIA TĂNG'}
            </h2>
            <div className="italic text-xs sm:text-sm mt-1 text-slate-700">
              Ngày {day} tháng {month} năm {year}
            </div>

            {/* Original Invoice Info (nếu là hóa đơn thay thế / điều chỉnh) */}
            {invoice.origInvoiceInfo && (
              <div className="mt-2 text-xs sm:text-sm bg-amber-50 border border-amber-300/60 p-2 rounded text-amber-900">
                <span className="font-semibold">{invoice.origInvoiceInfo.actionLabel}: </span>
                {invoice.origInvoiceInfo.khmshdon && <span>mẫu số {invoice.origInvoiceInfo.khmshdon}, </span>}
                {invoice.origInvoiceInfo.khhdon && <span>ký hiệu {invoice.origInvoiceInfo.khhdon}, </span>}
                {invoice.origInvoiceInfo.shdon && <span>số {invoice.origInvoiceInfo.shdon} </span>}
                {invoice.origInvoiceInfo.ngayLap && <span>ngày {invoice.origInvoiceInfo.ngayLap}</span>}
              </div>
            )}
          </div>

          <div className="border-t border-slate-300 my-4" />

          {/* Seller Section */}
          <div className="text-xs sm:text-sm space-y-1 mb-4">
            <div className="flex flex-col sm:flex-row">
              <span className="font-bold w-36 shrink-0">Đơn vị bán hàng:</span>
              <span className="font-bold uppercase text-black">{invoice.nbten || '—'}</span>
            </div>
            <div className="flex flex-col sm:flex-row">
              <span className="font-bold w-36 shrink-0">Mã số thuế:</span>
              <span className="font-mono font-bold text-blue-900 tracking-wider">
                {invoice.nbmst}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row">
              <span className="font-bold w-36 shrink-0">Địa chỉ:</span>
              <span>{invoice.nbdchi || '—'}</span>
            </div>
            <div className="flex flex-wrap gap-x-8 gap-y-1">
              {invoice.nbsdthoai && (
                <div>
                  <span className="font-bold">Điện thoại: </span>
                  <span>{invoice.nbsdthoai}</span>
                </div>
              )}
              {invoice.nbstkhoan && (
                <div>
                  <span className="font-bold">Số tài khoản: </span>
                  <span>
                    {invoice.nbstkhoan} {invoice.nbtnhang ? `— ${invoice.nbtnhang}` : ''}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="border-t border-slate-300 my-4" />

          {/* Buyer Section */}
          <div className="text-xs sm:text-sm space-y-1 mb-5">
            {invoice.nmtnmua && (
              <div className="flex flex-col sm:flex-row">
                <span className="font-bold w-36 shrink-0">Người mua hàng:</span>
                <span>{invoice.nmtnmua}</span>
              </div>
            )}
            <div className="flex flex-col sm:flex-row">
              <span className="font-bold w-36 shrink-0">Tên đơn vị:</span>
              <span className="font-semibold text-black">{invoice.nmten || '—'}</span>
            </div>
            <div className="flex flex-col sm:flex-row">
              <span className="font-bold w-36 shrink-0">Mã số thuế:</span>
              <span className="font-mono font-bold text-slate-900 tracking-wider">
                {invoice.nmmst || '—'}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row">
              <span className="font-bold w-36 shrink-0">Địa chỉ:</span>
              <span>{invoice.nmdchi || '—'}</span>
            </div>
            <div className="flex flex-wrap gap-x-8 gap-y-1">
              <div>
                <span className="font-bold">Hình thức TT: </span>
                <span>{invoice.thtttoan || 'Chuyển khoản'}</span>
              </div>
              {invoice.nmstkhoan && (
                <div>
                  <span className="font-bold">Số tài khoản: </span>
                  <span>
                    {invoice.nmstkhoan} {invoice.nmtnhang ? `— ${invoice.nmtnhang}` : ''}
                  </span>
                </div>
              )}
              {invoice.dvtte && invoice.dvtte !== 'VND' && (
                <div>
                  <span className="font-bold">Đồng tiền: </span>
                  <span>
                    {invoice.dvtte} {invoice.tgia ? `(Tỷ giá: ${invoice.tgia})` : ''}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Table of Goods / Services */}
          <div className="overflow-x-auto mb-4">
            <table className="w-full border-collapse border border-slate-400 text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-100 font-bold text-center">
                  <th className="border border-slate-400 p-1.5 w-10">STT</th>
                  <th className="border border-slate-400 p-1.5 min-w-[180px]">
                    Tên hàng hóa, dịch vụ
                  </th>
                  <th className="border border-slate-400 p-1.5 w-16">ĐVT</th>
                  <th className="border border-slate-400 p-1.5 w-16">Số lượng</th>
                  <th className="border border-slate-400 p-1.5 w-24">Đơn giá</th>
                  <th className="border border-slate-400 p-1.5 w-28">Thành tiền</th>
                </tr>
                <tr className="bg-slate-50 text-[11px] text-center text-slate-500 italic">
                  <td className="border border-slate-400 py-0.5">(1)</td>
                  <td className="border border-slate-400 py-0.5">(2)</td>
                  <td className="border border-slate-400 py-0.5">(3)</td>
                  <td className="border border-slate-400 py-0.5">(4)</td>
                  <td className="border border-slate-400 py-0.5">(5)</td>
                  <td className="border border-slate-400 py-0.5">(6 = 4 x 5)</td>
                </tr>
              </thead>
              <tbody>
                {invoice.items.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="border border-slate-400 p-4 text-center text-slate-500 italic">
                      Không có chi tiết hàng hóa
                    </td>
                  </tr>
                ) : (
                  invoice.items.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50">
                      <td className="border border-slate-400 p-1.5 text-center font-mono text-xs">
                        {item.stt || idx + 1}
                      </td>
                      <td className="border border-slate-400 p-1.5 leading-snug">
                        {item.ten}
                      </td>
                      <td className="border border-slate-400 p-1.5 text-center">
                        {item.dvt || ''}
                      </td>
                      <td className="border border-slate-400 p-1.5 text-right font-mono text-xs">
                        {item.slung !== undefined ? item.slung : ''}
                      </td>
                      <td className="border border-slate-400 p-1.5 text-right font-mono text-xs">
                        {item.dgia !== undefined ? formatVndCurrency(item.dgia) : ''}
                      </td>
                      <td className="border border-slate-400 p-1.5 text-right font-mono font-semibold text-xs">
                        {item.thtien !== undefined ? formatVndCurrency(item.thtien) : ''}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Totals & Tax Summary Breakdown */}
          <div className="border border-slate-400 bg-slate-50/60 p-3 text-xs sm:text-sm space-y-1.5 mb-6">
            <div className="flex justify-between">
              <span className="font-semibold">Cộng tiền hàng (chưa thuế):</span>
              <span className="font-mono font-bold">{formatVndCurrency(invoice.tgtcthue)}</span>
            </div>

            {/* Chi tiết phân bổ thuế suất */}
            {invoice.taxBreakdowns && invoice.taxBreakdowns.length > 0 ? (
              <div className="py-1 border-y border-slate-200 my-1 space-y-1">
                {invoice.taxBreakdowns.map((tb, idx) => (
                  <div key={idx} className="flex justify-between text-slate-700">
                    <span>
                      Thuế suất GTGT: <strong>{tb.tsuat}</strong> (Tiền hàng: {formatVndCurrency(tb.thtien)})
                    </span>
                    <span className="font-mono">{formatVndCurrency(tb.tthue)}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex justify-between">
                <span>Tiền thuế GTGT:</span>
                <span className="font-mono font-semibold">{formatVndCurrency(invoice.tgtthue)}</span>
              </div>
            )}

            <div className="flex justify-between text-base sm:text-lg font-bold border-t border-slate-300 pt-1 text-black">
              <span>Tổng cộng tiền thanh toán:</span>
              <span className="font-mono text-blue-900">{formatVndCurrency(invoice.tgtttbso)}</span>
            </div>

            {invoice.tgtttbchu && (
              <div className="pt-1 italic text-slate-700 text-xs sm:text-sm">
                <span>Số tiền viết bằng chữ: </span>
                <strong className="font-semibold text-black">{invoice.tgtttbchu}</strong>
              </div>
            )}
          </div>
        </div>

        {/* Signatures Row */}
        <div className="grid grid-cols-2 gap-8 text-center text-xs sm:text-sm pt-4 border-t border-slate-300 mt-auto">
          {/* Buyer */}
          <div>
            <div className="font-bold uppercase">Người mua hàng</div>
            <div className="italic text-slate-500 text-xs">(Ký, ghi rõ họ tên)</div>
            <div className="h-20" />
            {invoice.nmtnmua && <div className="font-semibold">{invoice.nmtnmua}</div>}
          </div>

          {/* Seller Digital Signature Stamp */}
          <div className="flex flex-col items-center">
            <div className="font-bold uppercase">Người bán hàng</div>
            <div className="italic text-slate-500 text-xs">(Ký, đóng dấu điện tử)</div>

            <div className="my-2 border-2 border-dashed border-emerald-600 rounded-lg bg-emerald-50/50 p-2 text-left text-[11px] leading-tight max-w-[260px]">
              <div className="flex items-center gap-1.5 font-bold text-emerald-800 mb-1">
                <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-600" />
                <span>CHỮ KÝ SỐ HỢP LỆ</span>
              </div>
              <div className="text-slate-800 font-semibold line-clamp-2">
                Ký bởi: {invoice.signerName || invoice.nbten}
              </div>
              {invoice.signingTime && (
                <div className="text-slate-600 text-[10px] mt-0.5">
                  Ngày ký: {invoice.signingTime}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

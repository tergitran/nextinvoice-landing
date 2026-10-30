'use client';

import * as React from 'react';
import { TctQrCode } from './tct-qr-code';
import { formatVndCurrency } from '@/lib/utils';
import { generateTctQrCode } from '@/lib/invoice-qr';
import { getOriginalInvoiceInfo, extractTaxBreakdown, resolveItemTaxRate } from '@/lib/invoice-utils';
import { getItemNatureLabel, getItemSpecialGoodsInfo } from '@/lib/special-goods-utils';
import type { ParsedXmlInvoice } from './xml-types';

type RawFieldMap = Record<string, string | number | boolean | null | undefined>;

export interface XmlInvoiceTemplateProps {
  invoice: ParsedXmlInvoice;
  className?: string;
}

export function XmlInvoiceTemplate({ invoice, className = '' }: XmlInvoiceTemplateProps) {
  const rawObj = (invoice.rawJson || {}) as Record<string, unknown>;
  const raw = rawObj as RawFieldMap;
  const root = (rawObj.data && typeof rawObj.data === 'object' ? rawObj.data : rawObj) as Record<string, unknown>;
  const rootHdhnhan = root.hdhnhan as Record<string, unknown> | undefined;
  const hdon = (rootHdhnhan?.hdon || root.hdon || root) as Record<string, unknown>;
  const dlHDon = (hdon.dlhdon || hdon) as Record<string, unknown>;
  const ndhdon = dlHDon.ndhdon as Record<string, unknown> | undefined;
  const ttChung = (dlHDon.ttchung || {}) as RawFieldMap;
  const nBan = (ndhdon?.nban || {}) as RawFieldMap;
  const nMua = (ndhdon?.nmua || {}) as RawFieldMap;
  const tToan = (ndhdon?.ttoan || {}) as RawFieldMap;

  const dateObj = invoice.tdlap ? new Date(invoice.tdlap) : new Date();
  const day = String(dateObj.getDate()).padStart(2, '0');
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const year = dateObj.getFullYear();

  // QR Code payload (chuẩn TCT Version 9 Level L)
  const qrData = generateTctQrCode(invoice);

  // Seller Information Resolution
  const sellerName = String(raw.nbten || nBan.ten || invoice.nbten || '—');
  const sellerMst = String(raw.nbmst || nBan.mst || invoice.nbmst || '');
  const sellerAddress = String(raw.nbdchi || invoice.nbdchi || invoice.nbdiachi || nBan.dchi || '');
  const sellerPhone = String(raw.nbsdthoai || nBan.sdthoai || raw.SDThoai || '');
  const sellerAccount = String(raw.nbstkhoan || nBan.stknhang || raw.STKNHang || '');
  const sellerBankName = String(raw.nbtnhang || nBan.tnhang || raw.TNHang || '');
  const sellerBank = sellerAccount
    ? sellerBankName
      ? `${sellerAccount}   ${sellerBankName}`
      : sellerAccount
    : sellerBankName;

  // Buyer Information Resolution
  const buyerName = String(raw.nmten || nMua.ten || invoice.nmten || '—');
  const buyerContactName = String(raw.nmtnmua || raw.HVTNMHang || nMua.hvtnmua || '');
  const buyerMst = String(raw.nmmst || invoice.nmdmst || nMua.mst || '');
  const buyerDvcqhn = String(raw.nmmdvqhnsach || nMua.dvcqhnsnn || raw.DVCQHNSNN || '');
  const buyerCccd = String(raw.nmcmnd || nMua.cccd || raw.CCCDan || '');
  const buyerPassport = String(raw.nmshchieu || nMua.shchieu || raw.SHChieu || '');
  const buyerAddress = String(raw.nmdchi || invoice.nmdchi || invoice.nmdiachi || nMua.dchi || '');
  const buyerPaymentMethod = String(raw.thtttoan || ttChung.httoan || raw.HTTToan || 'Chuyển khoản');
  const buyerAccount = String(raw.nmstkhoan || nMua.stknhang || raw.STKNHang || '');
  const buyerBankName = String(raw.nmtnhang || nMua.tnhang || '');
  const buyerBank = buyerAccount
    ? buyerBankName
      ? `${buyerAccount}   ${buyerBankName}`
      : buyerAccount
    : buyerBankName;

  // MCCQT: Mã của Cơ quan thuế cấp cho hóa đơn có mã (tuyệt đối không fallback sang mã cơ quan thuế cqt)
  const mccqt = String(invoice.mscqt || invoice.mccqt || raw.mhdon || raw.MCCQT || raw.mccqt || '').trim();

  // Signing Info from nbcks JSON string or raw
  let signerName = sellerName;
  let formattedSigningDate = '';
  if (raw.nbcks && typeof raw.nbcks === 'string') {
    try {
      const parsedCks = JSON.parse(raw.nbcks);
      if (parsedCks.Subject) signerName = parsedCks.Subject;
      if (parsedCks.SigningTime) {
        const d = new Date(parsedCks.SigningTime);
        if (!isNaN(d.getTime())) {
          const sYear = d.getFullYear();
          const sMonth = String(d.getMonth() + 1).padStart(2, '0');
          const sDay = String(d.getDate()).padStart(2, '0');
          const sHours = String(d.getHours()).padStart(2, '0');
          const sMin = String(d.getMinutes()).padStart(2, '0');
          const sSec = String(d.getSeconds()).padStart(2, '0');
          formattedSigningDate = `${sYear}-${sMonth}-${sDay} ${sHours}:${sMin}:${sSec}`;
        } else {
          formattedSigningDate = String(parsedCks.SigningTime);
        }
      }
    } catch {
      // Ignore parse error
    }
  }

  if (!formattedSigningDate) {
    const signingTime = String(raw.signingTime || raw.SigningTime || invoice.signingTime || invoice.tdlap || '');
    if (signingTime) {
      try {
        const d = new Date(signingTime);
        if (!isNaN(d.getTime())) {
          const sYear = d.getFullYear();
          const sMonth = String(d.getMonth() + 1).padStart(2, '0');
          const sDay = String(d.getDate()).padStart(2, '0');
          const sHours = String(d.getHours()).padStart(2, '0');
          const sMin = String(d.getMinutes()).padStart(2, '0');
          const sSec = String(d.getSeconds()).padStart(2, '0');
          formattedSigningDate = `${sYear}-${sMonth}-${sDay} ${sHours}:${sMin}:${sSec}`;
        } else {
          formattedSigningDate = String(signingTime);
        }
      } catch {
        formattedSigningDate = String(signingTime);
      }
    }
  }

  // Bảng phân bổ thuế suất theo từng dòng (hỗ trợ hóa đơn có 1 hoặc nhiều thuế suất)
  const taxBreakdown = extractTaxBreakdown(invoice);
  const amountInWords = String(
    tToan.tgtttbchu ||
    tToan.TgTTTBChu ||
    raw.tgtttbchu ||
    raw.TgTTTBChu ||
    invoice.tgtttnote ||
    invoice.tgtttbchu ||
    '—'
  );

  const origInfo = getOriginalInvoiceInfo(invoice);

  return (
    <div
      id="invoice-print-content"
      className={`invoice-print-container bg-white text-black leading-[1.3] font-serif antialiased text-[13pt] shadow-2xl rounded-sm print:shadow-none print:m-0 print:p-0 print:w-full ${className}`}
      style={{
        width: '210mm',
        maxWidth: '100%',
        minHeight: 'auto',
        margin: '0 auto',
        padding: '4px 6px',
        boxSizing: 'border-box',
        backgroundColor: '#ffffff',
        fontFamily: '"Times New Roman", Times, serif',
        fontSize: '13pt',
      }}
    >
      {/* Main Page Container matching TCT 3px double */}
      <div
        className="invoice-frame-box relative p-3 bg-white"
        style={{
          border: '3px double rgba(145, 87, 21, 0.69)',
          backgroundImage: 'url(/invoice-assets/viewinvoice-bg.jpg)',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
          backgroundSize: '180%',
          boxDecorationBreak: 'clone',
          WebkitBoxDecorationBreak: 'clone',
        }}
      >
        {/* Header Content */}
        <div className="flex justify-between items-start mb-1">
          {/* Top Left: QR Code */}
          <div style={{ width: '80px', minHeight: '80px' }} className="flex items-start">
            <TctQrCode value={qrData} size={80} />
          </div>

          {/* Top Right: Code Info */}
          <div className="text-right text-[14px] leading-tight font-bold">
            <div>
              <span className="">Mẫu số: </span>
              <span>{invoice.khmshdon || ttChung.khmshdon || '1'}</span>
            </div>
            <div>
              <span className="">Ký hiệu: </span>
              <span>{invoice.khhdon || ttChung.khhdon || '—'}</span>
            </div>
            <div>
              <span className="">Số: </span>
              <span className="">{invoice.shdon}</span>
            </div>
          </div>
        </div>

        {/* Title Heading */}
        <div className="text-center my-1">
          <h2
            className="text-[20pt] font-bold uppercase tracking-wide leading-tight"
            style={{ fontSize: '20pt' }}
          >
            {ttChung.thdon || invoice.thdon || 'HOÁ ĐƠN GIÁ TRỊ GIA TĂNG'}
          </h2>

          {/* Original Invoice Info (Thay thế / Điều chỉnh) */}
          {origInfo && (
            <div className="text-[13pt] leading-normal font-normal my-1 max-w-[90%] mx-auto text-black">
              <span>{origInfo.actionLabel} </span>
              {origInfo.khmshdon && (
                <>
                  ký hiệu mẫu số hóa đơn <strong className="font-bold">{origInfo.khmshdon}</strong>,{' '}
                </>
              )}
              {origInfo.khhdon && (
                <>
                  ký hiệu hóa đơn <strong className="font-bold">{origInfo.khhdon}</strong>,{' '}
                </>
              )}
              {origInfo.shdon && (
                <>
                  số hóa đơn <strong className="font-bold">{origInfo.shdon}</strong>
                </>
              )}
              {origInfo.ngayLap && (
                <>
                  , ngày lập <strong className="font-bold">{origInfo.ngayLap}</strong>
                </>
              )}
            </div>
          )}

          <div className="text-[13pt] mt-1.5">
            Ngày {day} tháng {month} năm {year}
          </div>
          {mccqt && (
            <div className="text-[13pt] mt-0.5">
              MCCQT: <span className="">{mccqt}</span>
            </div>
          )}
        </div>

        {/* Solid Brown Divider */}
        <div className="w-full border-b border-[#915715]/70 my-1" />

        {/* Content Info (Seller) */}
        <div className="text-[13pt] leading-snug space-y-0.5 my-1">
          <div className="flex items-baseline">
            <span className="w-36 shrink-0">Tên người bán:</span>
            <span className="uppercase flex-1 border-b border-dashed border-[#d0d0d0] pb-0.5">
              {sellerName}
            </span>
          </div>
          <div className="flex items-baseline">
            <span className="w-36 shrink-0">Mã số thuế:</span>
            <span className="flex-1 border-b border-dashed border-[#d0d0d0] pb-0.5">
              {sellerMst}
            </span>
          </div>
          <div className="flex items-baseline">
            <span className="w-36 shrink-0">Mã cửa hàng:</span>
            <span className="flex-1 border-b border-dashed border-[#d0d0d0] pb-0.5 min-h-[18px]">
              {nBan.mchdon || ''}
            </span>
          </div>
          <div className="flex items-baseline">
            <span className="w-36 shrink-0">Tên cửa hàng:</span>
            <span className="flex-1 border-b border-dashed border-[#d0d0d0] pb-0.5 min-h-[18px]">
              {nBan.tchdon || ''}
            </span>
          </div>
          <div className="flex items-baseline">
            <span className="w-36 shrink-0">Địa chỉ:</span>
            <span className="flex-1 border-b border-dashed border-[#d0d0d0] pb-0.5">
              {sellerAddress}
            </span>
          </div>
          <div className="flex items-baseline">
            <span className="w-36 shrink-0">Điện thoại:</span>
            <span className="flex-1 border-b border-dashed border-[#d0d0d0] pb-0.5 min-h-[18px]">
              {sellerPhone}
            </span>
          </div>
          <div className="flex items-baseline">
            <span className="w-36 shrink-0">Số tài khoản:</span>
            <span className="flex-1 border-b border-dashed border-[#d0d0d0] pb-0.5 min-h-[18px]">
              {sellerBank}
            </span>
          </div>
        </div>

        {/* Solid Brown Divider */}
        <div className="w-full border-b border-[#915715]/70 my-1" />

        {/* Content Info (Buyer) */}
        <div className="text-[13pt] leading-snug space-y-0.5 my-1">
          <div className="flex items-baseline">
            <span className="w-44 shrink-0">Tên người mua:</span>
            <span className="uppercase flex-1 border-b border-dashed border-[#d0d0d0] pb-0.5">
              {buyerName}
            </span>
          </div>
          <div className="flex items-baseline">
            <span className="w-44 shrink-0">Họ tên người mua:</span>
            <span className="flex-1 border-b border-dashed border-[#d0d0d0] pb-0.5 min-h-[18px]">
              {buyerContactName}
            </span>
          </div>
          <div className="flex items-baseline">
            <span className="w-44 shrink-0">Mã số thuế:</span>
            <span className="flex-1 border-b border-dashed border-[#d0d0d0] pb-0.5">
              {buyerMst}
            </span>
          </div>
          <div className="flex items-baseline">
            <span className="w-44 shrink-0">Mã ĐVCQHVNSNN:</span>
            <span className="flex-1 border-b border-dashed border-[#d0d0d0] pb-0.5 min-h-[18px]">
              {buyerDvcqhn}
            </span>
          </div>
          <div className="flex items-baseline">
            <span className="w-44 shrink-0">CCCD người mua:</span>
            <span className="flex-1 border-b border-dashed border-[#d0d0d0] pb-0.5 min-h-[18px]">
              {buyerCccd}
            </span>
          </div>
          <div className="flex items-baseline">
            <span className="w-44 shrink-0">Số hộ chiếu:</span>
            <span className="flex-1 border-b border-dashed border-[#d0d0d0] pb-0.5 min-h-[18px]">
              {buyerPassport}
            </span>
          </div>
          <div className="flex items-baseline">
            <span className="w-44 shrink-0">Địa chỉ:</span>
            <span className="flex-1 border-b border-dashed border-[#d0d0d0] pb-0.5">
              {buyerAddress}
            </span>
          </div>
          <div className="flex items-baseline">
            <span className="w-44 shrink-0">Hình thức thanh toán:</span>
            <span className="flex-1 border-b border-dashed border-[#d0d0d0] pb-0.5">
              {buyerPaymentMethod}
            </span>
          </div>
          <div className="flex items-baseline">
            <span className="w-44 shrink-0">Số tài khoản:</span>
            <span className="flex-1 border-b border-dashed border-[#d0d0d0] pb-0.5 min-h-[18px]">
              {buyerBank}
            </span>
          </div>
          <div className="flex items-baseline">
            <span className="w-44 shrink-0">Đơn vị tiền tệ:</span>
            <span className="flex-1 border-b border-dashed border-[#d0d0d0] pb-0.5">
              {ttChung.dvtte || invoice.dvtte || 'VND'}
            </span>
          </div>
          <div className="flex items-baseline">
            <div className="flex items-baseline w-1/2 pr-2">
              <span className="w-28 shrink-0">Số bảng kê:</span>
              <span className="flex-1 border-b border-dashed border-[#d0d0d0] pb-0.5 min-h-[18px]">
                {ttChung.sbke || ''}
              </span>
            </div>
            <div className="flex items-baseline w-1/2 pl-2">
              <span className="w-32 shrink-0">Ngày bảng kê:</span>
              <span className="flex-1 border-b border-dashed border-[#d0d0d0] pb-0.5 min-h-[18px]">
                {ttChung.nbke || ''}
              </span>
            </div>
          </div>
        </div>

        {/* Items Table (10 Columns exact match to TCT invoice.html) */}
        <table
          className="w-full border-collapse border border-black text-[14px] my-1.5"
          style={{ fontSize: '14px' }}
        >
          <thead style={{ display: 'table-header-group' }}>
            <tr className="text-center font-bold" style={{ breakInside: 'avoid', pageBreakInside: 'avoid' }}>
              <th className="border border-black p-1 w-8">STT</th>
              <th className="border border-black p-1 w-16">Tính chất</th>
              <th className="border border-black p-1 w-20">Loại hàng hoá đặc trưng</th>
              <th className="border border-black p-1">Tên hàng hóa, dịch vụ</th>
              <th className="border border-black p-1 w-12">ĐVT</th>
              <th className="border border-black p-1 w-14">Số lượng</th>
              <th className="border border-black p-1 w-20">Đơn giá</th>
              <th className="border border-black p-1 w-12">Chiết khấu</th>
              <th className="border border-black p-1 w-14">Thuế suất</th>
              <th className="border border-black p-1 w-24">Thành tiền chưa có thuế GTGT</th>
            </tr>
          </thead>
          <tbody>
            {invoice.items && invoice.items.length > 0 ? (
              invoice.items.map((item, idx) => (
                <tr key={item.id || idx} style={{ breakInside: 'avoid', pageBreakInside: 'avoid' }}>
                  <td className="border border-black p-1 text-center">{item.stt ?? idx + 1}</td>
                  <td className="border border-black p-1 text-left">
                    {getItemNatureLabel(item)}
                  </td>
                  <td className="border border-black p-1 text-left">
                    {(() => {
                      const spec = getItemSpecialGoodsInfo(item);
                      if (!spec) return null;
                      return (
                        <div className="flex flex-col gap-0.5 leading-tight text-[12px]">
                          {spec.typeName && <span>{spec.typeName}</span>}
                          {spec.fields.map((f, i) => (
                            <span key={i}>
                              {f.label}: {f.value}
                            </span>
                          ))}
                        </div>
                      );
                    })()}
                  </td>
                  <td className="border border-black p-1 text-left font-normal">{item.ten}</td>
                  <td className="border border-black p-1 text-left">{item.dvt || '—'}</td>
                  <td className="border border-black p-1 text-center">
                    {item.slung != null ? formatVndCurrency(item.slung) : '—'}
                  </td>
                  <td className="border border-black p-1 text-center">
                    {item.dgia != null ? formatVndCurrency(item.dgia) : '—'}
                  </td>
                  <td className="border border-black p-1 text-center">0</td>
                  <td className="border border-black p-1 text-center">
                    {resolveItemTaxRate(item, taxBreakdown, invoice.rawJson)}
                  </td>
                  <td className="border border-black p-1 text-center">
                    {item.thtien != null ? formatVndCurrency(item.thtien) : '—'}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={10} className="border border-black p-3 text-center text-gray-500 italic">
                  Không có dữ liệu chi tiết hàng hóa
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Table Horizontal Summary Wrapper */}
        <div
          className="flex gap-2.5 text-[14px] items-start print-avoid-break pt-4 pb-1"
          style={{
            fontSize: '14px',
            breakInside: 'avoid',
            pageBreakInside: 'avoid',
            paddingTop: '16px',
            paddingBottom: '4px',
          }}
        >
          {/* Left Table: Tax Breakdown */}
          <div className="w-[42%]">
            <table
              className="w-full border-collapse border border-black text-center text-[14px]"
              style={{ fontSize: '14px' }}
            >
              <thead>
                <tr className="font-bold whitespace-nowrap">
                  <th className="border border-black p-1 w-[24%] whitespace-nowrap">Thuế suất</th>
                  <th className="border border-black p-1 w-[41%] whitespace-nowrap">Tổng tiền chưa thuế</th>
                  <th className="border border-black p-1 w-[35%] whitespace-nowrap">Tổng tiền thuế</th>
                </tr>
              </thead>
              <tbody>
                {taxBreakdown.map((row, idx) => (
                  <tr key={idx} style={{ breakInside: 'avoid', pageBreakInside: 'avoid' }}>
                    <td className="border border-black p-1">{row.tsuat}</td>
                    <td className="border border-black p-1 text-center">
                      {formatVndCurrency(row.thtien)}
                    </td>
                    <td className="border border-black p-1 text-center">
                      {formatVndCurrency(row.tthue)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Right Table: Totals */}
          <div className="w-[58%]">
            <table
              className="w-full border-collapse border border-black text-[14px]"
              style={{ fontSize: '14px' }}
            >
              <tbody>
                <tr>
                  <td className="border border-black p-1 text-center">
                    Tổng tiền chưa thuế<br />(Tổng cộng thành tiền chưa có thuế)
                  </td>
                  <td className="border border-black p-1 text-center font-medium w-28">
                    {formatVndCurrency(invoice.tgtcthue)}
                  </td>
                </tr>
                <tr>
                  <td className="border border-black p-1 text-center">
                    Tổng tiền thuế (Tổng cộng tiền thuế)
                  </td>
                  <td className="border border-black p-1 text-center font-medium w-28">
                    {formatVndCurrency(invoice.tgtthue)}
                  </td>
                </tr>
                <tr>
                  <td className="border border-black p-1 text-center">Tổng tiền phí</td>
                  <td className="border border-black p-1 text-center w-28"></td>
                </tr>
                <tr>
                  <td className="border border-black p-1 text-center">Tổng tiền chiết khấu thương mại</td>
                  <td className="border border-black p-1 text-center w-28">0</td>
                </tr>
                <tr>
                  <td className="border border-black p-1 text-center">
                    Tổng tiền thanh toán bằng số
                  </td>
                  <td className="border border-black p-1 text-center w-28">
                    {formatVndCurrency(invoice.tgtttbso)}
                  </td>
                </tr>
                <tr>
                  <td className="border border-black p-1 text-center font-medium">
                    Tổng tiền thanh toán bằng chữ
                  </td>
                  <td className="border border-black p-1 text-center w-28">
                    {amountInWords}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Solid Brown Divider */}
        <div className="w-full border-b border-[#915715]/70 my-1.5" />

        {/* Footer Signatures */}
        <div
          className="mt-1 text-[13pt] print-avoid-break"
          style={{ breakInside: 'avoid', pageBreakInside: 'avoid' }}
        >
          <div className="flex justify-between items-start px-6">
            {/* Buyer */}
            <div className="text-center w-52">
              <h3 className="font-bold text-[13pt] uppercase">NGƯỜI MUA HÀNG</h3>
              <p className="text-[13pt] italic">(Chữ ký số (nếu có))</p>
              <div className="h-10" />
            </div>

            {/* Seller */}
            <div className="text-center w-72 flex flex-col items-center">
              <h3 className="font-bold text-[13pt] uppercase">NGƯỜI BÁN HÀNG</h3>
              <p className="text-[13pt] italic">(Chữ ký điện tử, chữ ký số)</p>

              {/* Exact Green Signature Box matching TCT */}
              <div
                className="mt-1.5 text-left p-2 rounded text-[11px] leading-tight w-full"
                style={{
                  border: '2px solid #23b709',
                  backgroundColor: '#f0fff0',
                  backgroundImage: 'url(/invoice-assets/sign-check.jpg)',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 8px bottom 8px',
                  backgroundSize: '55px 50px',
                }}
              >
                <div style={{ color: '#23b709', fontWeight: 'bold', fontSize: '12px' }}>
                  Signature Valid
                </div>
                <div style={{ color: '#23b709' }} className="mt-0.5">
                  <span>Ký bởi </span>
                  <span className="font-bold">{signerName}</span>
                </div>
                <div style={{ color: '#23b709' }} className="mt-0.5">
                  <span>Ký ngày: </span>
                  <span>{formattedSigningDate || '—'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Note */}
          <div
            className="text-center text-[14px] italic text-gray-600 mt-2"
            style={{ fontSize: '14px' }}
          >
            (Cần kiểm tra, đối chiếu khi lập, nhận hóa đơn)
          </div>
        </div>
      </div>
    </div>
  );
}

export const InvoicePrintTemplate = XmlInvoiceTemplate;

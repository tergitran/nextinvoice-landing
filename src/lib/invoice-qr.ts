/**
 * Định dạng số theo chuẩn Java Double.toString() của cổng thuế TCT:
 * Khi số >= 10^7 (10.000.000) hoặc < 10^-3, Java tự động chuyển sang ký hiệu khoa học (e.g. 36780000 -> 3.678E7)
 */
function formatJavaDouble(num: number): string {
  if (!num || isNaN(num)) return '0.0';
  if (num >= 1e7 || (num > 0 && num < 1e-3)) {
    return num
      .toExponential()
      .replace('e+', 'E')
      .replace('e-', 'E-')
      .replace(/\.0*E/, 'E');
  }
  const str = String(num);
  return str.includes('.') ? str : `${str}.0`;
}

/**
 * Helper sinh chuỗi QR Code chuẩn 100% Tổng cục Thuế (TCT EMVCo format)
 */
export function generateTctQrCode(invoice: {
  nbmst?: string;
  khmshdon?: string;
  khhdon?: string;
  shdon?: string;
  tdlap?: string;
  tgtttbso?: number;
  rawJson?: Record<string, any>;
  syncMetadata?: Record<string, any>;
}): string {
  const raw = invoice.rawJson || {};
  const meta = invoice.syncMetadata || {};
  const existingQr =
    meta.DLQRCode ||
    meta.dlqrcode ||
    raw.DLQRCode ||
    raw.dlqrcode ||
    raw.data?.DLQRCode ||
    raw.data?.dlqrcode ||
    raw.qrcode;

  if (existingQr && typeof existingQr === 'string' && existingQr.length > 20) {
    return existingQr;
  }

  const nbmst = invoice.nbmst || '';
  const khmshdon = invoice.khmshdon || '1';
  const khhdon = invoice.khhdon || '';
  const shdon = invoice.shdon || '';

  const dateObj = invoice.tdlap ? new Date(invoice.tdlap) : new Date();
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const day = String(dateObj.getDate()).padStart(2, '0');
  const nlap = `${year}${month}${day}`;

  const amountNumber = Number(invoice.tgtttbso || 0);
  const amt = formatJavaDouble(amountNumber);

  const pad = (n: number) => String(n).padStart(2, '0');

  const tag00 = '0000';
  const tag01 = '01' + pad(nbmst.length) + nbmst;
  const tag02 = '02' + pad(khmshdon.length) + khmshdon;
  const tag03 = '03' + pad(khhdon.length) + khhdon;
  const tag04 = '04' + pad(shdon.length) + shdon;
  const tag05 = '05' + pad(nlap.length) + nlap;
  const tag06 = '06' + pad(amt.length) + amt;

  const sub = tag00 + tag01 + tag02 + tag03 + tag04 + tag05 + tag06;
  const header = '0002010102120200040026005200530054005800590060006200';
  const tag99 = '99' + pad(sub.length) + sub;

  return header + tag99;
}

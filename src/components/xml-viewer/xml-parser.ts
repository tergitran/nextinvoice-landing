import { ParsedXmlInvoice, ParsedXmlItem, ParsedTaxBreakdown } from './xml-types';

/**
 * Tìm kiếm thẻ con trong một Element bất kể viết hoa hay viết thường
 */
function findElement(parent: Element, ...tagNames: string[]): Element | null {
  for (const name of tagNames) {
    // 1. Thử tìm chính xác hoặc hoa/thường
    const directMatch = parent.getElementsByTagName(name)[0];
    if (directMatch) return directMatch;

    const lowerName = name.toLowerCase();
    for (let i = 0; i < parent.children.length; i++) {
      const child = parent.children[i];
      if (child.localName.toLowerCase() === lowerName) {
        return child;
      }
    }
  }

  // 2. Thử tìm sâu hơn với query selector
  for (const name of tagNames) {
    try {
      const match = parent.querySelector(name);
      if (match) return match;
    } catch {
      // Ignore selector errors
    }
  }

  return null;
}

/**
 * Lấy nội dung text của một thẻ con
 */
function getTagText(parent: Element | null, ...tagNames: string[]): string {
  if (!parent) return '';
  const el = findElement(parent, ...tagNames);
  if (!el || !el.textContent) return '';
  return el.textContent.trim();
}

/**
 * Lấy giá trị số an toàn
 */
function getTagNumber(parent: Element | null, ...tagNames: string[]): number | undefined {
  const text = getTagText(parent, ...tagNames);
  if (!text) return undefined;
  const num = parseFloat(text.replace(/,/g, ''));
  return isNaN(num) ? undefined : num;
}

/**
 * Phân tích cú pháp chuỗi XML hóa đơn điện tử 100% Client-Side
 */
export function parseInvoiceXml(xmlString: string, fileName = 'invoice.xml'): ParsedXmlInvoice {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlString, 'application/xml');

  // Kiểm tra lỗi parse XML của trình duyệt
  const parserError = xmlDoc.getElementsByTagName('parsererror')[0];
  if (parserError) {
    throw new Error('Cấu trúc file không phải định dạng XML hợp lệ hoặc bị lỗi cú pháp.');
  }

  const root = xmlDoc.documentElement;

  // Tìm node thông tin chung: TTChung
  const ttChung = findElement(root, 'TTChung', 'ttchung', 'InvoiceInfo', 'generalInvoiceInfo');

  // Tên loại hóa đơn
  const thdon = getTagText(ttChung, 'THDon', 'thdon', 'InvoiceName') || 'HÓA ĐƠN GIÁ TRỊ GIA TĂNG';
  const khmshdon = getTagText(ttChung, 'KHMSHDon', 'khmshdon', 'InvoiceType', 'Form') || '1';
  const khhdon = getTagText(ttChung, 'KHHDon', 'khhdon', 'InvoiceSeries', 'Serial') || '—';
  const shdon = getTagText(ttChung, 'SHDon', 'shdon', 'InvoiceNumber', 'InvoiceNo') || '—';
  const tdlap = getTagText(ttChung, 'NLap', 'nlap', 'InvoiceDate', 'IssuedDate', 'tdlap') || new Date().toISOString().slice(0, 10);
  const dvtte = getTagText(ttChung, 'DVTTe', 'dvtte', 'CurrencyUnit', 'CurrencyCode') || 'VND';
  const tgia = getTagNumber(ttChung, 'TGia', 'tgia', 'ExchangeRate');
  const mccqt = getTagText(root, 'MCCQT', 'mccqt', 'TaxAuthorityCode', 'cqt');

  // Tìm node Người bán: NBan
  const nBan = findElement(root, 'NBan', 'nban', 'Seller', 'sellerInfo');
  const nbmst = getTagText(nBan, 'MST', 'mst', 'TaxCode', 'nbmst') || '';
  const nbten = getTagText(nBan, 'Ten', 'ten', 'SellerLegalName', 'Name', 'nbten') || '—';
  const nbdchi = getTagText(nBan, 'DChi', 'dchi', 'Address', 'nbdchi') || '';
  const nbsdthoai = getTagText(nBan, 'SDThoai', 'sdthoai', 'Phone', 'Telephone');
  const nbstkhoan = getTagText(nBan, 'STKNHang', 'stknhang', 'AccountNumber', 'BankNumber');
  const nbtnhang = getTagText(nBan, 'TNHang', 'tnhang', 'BankName');

  // Tìm node Người mua: NMua
  const nMua = findElement(root, 'NMua', 'nmua', 'Buyer', 'buyerInfo');
  const nmmst = getTagText(nMua, 'MST', 'mst', 'TaxCode', 'nmmst') || '';
  const nmten = getTagText(nMua, 'Ten', 'ten', 'BuyerLegalName', 'Name', 'nmten') || '—';
  const nmtnmua = getTagText(nMua, 'HVTNMHang', 'hvtnmua', 'BuyerDisplayName', 'ContactName');
  const nmdchi = getTagText(nMua, 'DChi', 'dchi', 'Address', 'nmdchi') || '';
  const nmsdthoai = getTagText(nMua, 'SDThoai', 'sdthoai', 'Phone');
  const nmstkhoan = getTagText(nMua, 'STKNHang', 'stknhang', 'AccountNumber');
  const nmtnhang = getTagText(nMua, 'TNHang', 'tnhang', 'BankName');
  const thtttoan = getTagText(ttChung, 'HTTToan', 'httoan', 'PaymentMethod', 'thtttoan') || 'Chuyển khoản';

  // Tìm danh sách hàng hóa dịch vụ: DSHHDVu -> HHDVu
  const items: ParsedXmlItem[] = [];
  const dshhdvu = findElement(root, 'DSHHDVu', 'dshhdvu', 'ItemList', 'InvoiceDetails');
  const itemNodes = dshhdvu
    ? dshhdvu.getElementsByTagName('HHDVu')
    : root.getElementsByTagName('HHDVu');

  if (itemNodes && itemNodes.length > 0) {
    for (let i = 0; i < itemNodes.length; i++) {
      const el = itemNodes[i];
      const stt = getTagText(el, 'STT', 'stt') || String(i + 1);
      const ten = getTagText(el, 'THHDVu', 'thhdvu', 'ItemName', 'ten') || '';
      const dvt = getTagText(el, 'DVTinh', 'dvtinh', 'UnitName', 'dvt') || '';
      const slung = getTagNumber(el, 'SLuong', 'slung', 'Quantity');
      const dgia = getTagNumber(el, 'DGia', 'dgia', 'UnitPrice');
      const thtien = getTagNumber(el, 'ThTien', 'thtien', 'Total', 'Amount');
      const tsuat = getTagText(el, 'TSuat', 'tsuat', 'TaxRate') || '';
      const tthue = getTagNumber(el, 'TThue', 'tthue', 'TaxAmount');
      const tchat = getTagText(el, 'TChat', 'tchat');

      if (ten || thtien !== undefined) {
        items.push({
          stt,
          ten,
          dvt,
          slung,
          dgia,
          thtien,
          tsuat,
          tthue,
          tchat,
        });
      }
    }
  }

  // Tìm node Tổng thanh toán: TToan
  const tToan = findElement(root, 'TToan', 'ttoan', 'Payment', 'InvoiceTotal');
  const tgtcthue = getTagNumber(tToan, 'TgTCThue', 'tgtcthue', 'TotalBeforeTax');
  const tgtthue = getTagNumber(tToan, 'TgTThue', 'tgtthue', 'TotalTaxAmount');
  const tgtttbso = getTagNumber(tToan, 'TgTTTBSo', 'tgtttbso', 'TotalAmountWithTax');
  const tgtttbchu = getTagText(tToan, 'TgTTTBChu', 'tgtttbchu', 'TotalAmountInWords');

  // Bảng kê thuế suất THTTLTSuat
  const taxBreakdowns: ParsedTaxBreakdown[] = [];
  const thttltsuat = findElement(tToan || root, 'THTTLTSuat', 'thttltsuat', 'TaxSummary');
  if (thttltsuat) {
    const ltsuatNodes = thttltsuat.getElementsByTagName('LTSuat');
    for (let i = 0; i < ltsuatNodes.length; i++) {
      const el = ltsuatNodes[i];
      const rate = getTagText(el, 'TSuat', 'tsuat');
      const thtien = getTagNumber(el, 'ThTien', 'thtien') || 0;
      const tthue = getTagNumber(el, 'TThue', 'tthue') || 0;
      if (rate) {
        taxBreakdowns.push({ tsuat: rate, thtien, tthue });
      }
    }
  }

  // Thông tin Chữ ký số
  const dscks = findElement(root, 'DSCKS', 'dscks', 'Signatures');
  let signerName = nbten;
  let signingTime = '';

  const signatureNode = findElement(dscks || root, 'Signature', 'signature', 'NBan');
  if (signatureNode) {
    signingTime = getTagText(signatureNode, 'SigningTime', 'signingTime') || '';
    const subject = getTagText(signatureNode, 'X509SubjectName', 'Subject');
    if (subject) {
      const cnMatch = subject.match(/CN=([^,]+)/i);
      if (cnMatch && cnMatch[1]) {
        signerName = cnMatch[1].trim();
      }
    }
  }

  // Thông tin HĐ gốc nếu là HĐ thay thế hoặc điều chỉnh
  const tDChung = findElement(root, 'TTChung', 'ttchung');
  const tthaiGoc = getTagText(tDChung, 'TCHDon', 'tchdon', 'TChat', 'tchat');
  let origInvoiceInfo = undefined;
  if (tthaiGoc === '2' || tthaiGoc === '3') {
    const actionLabel = tthaiGoc === '2' ? 'Thay thế cho hóa đơn' : 'Điều chỉnh cho hóa đơn';
    origInvoiceInfo = {
      actionLabel,
      khmshdon: getTagText(tDChung, 'KHMSHDGoc', 'khmshdgoc'),
      khhdon: getTagText(tDChung, 'KHHDGoc', 'khhdgoc'),
      shdon: getTagText(tDChung, 'SHDGoc', 'shdgoc'),
      ngayLap: getTagText(tDChung, 'NLapGoc', 'nlapgoc'),
    };
  }

  return {
    thdon,
    khmshdon,
    khhdon,
    shdon,
    tdlap,
    dvtte,
    tgia,
    mccqt,
    nbmst,
    nbten,
    nbdchi,
    nbsdthoai,
    nbstkhoan,
    nbtnhang,
    nmmst,
    nmten,
    nmtnmua,
    nmdchi,
    nmsdthoai,
    nmstkhoan,
    nmtnhang,
    thtttoan,
    items,
    tgtcthue,
    tgtthue,
    tgtttbso,
    tgtttbchu,
    taxBreakdowns,
    origInvoiceInfo,
    signerName,
    signingTime,
    rawFileName: fileName,
    rawXmlContent: xmlString,
  };
}

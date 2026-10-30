import { ParsedXmlInvoice, ParsedXmlItem, ParsedTaxBreakdown } from './xml-types';

/**
 * Tìm kiếm thẻ con trong một Element bất kể viết hoa hay viết thường
 */
function findElement(parent: Element, ...tagNames: string[]): Element | null {
  for (const name of tagNames) {
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
  const sbke = getTagText(ttChung, 'SBKe', 'sbke');
  const nbke = getTagText(ttChung, 'NBKe', 'nbke');
  const mccqt = getTagText(root, 'MCCQT', 'mccqt', 'TaxAuthorityCode', 'cqt');

  // Tìm node Người bán: NBan
  const nBan = findElement(root, 'NBan', 'nban', 'Seller', 'sellerInfo');
  const nbmst = getTagText(nBan, 'MST', 'mst', 'TaxCode', 'nbmst') || '';
  const nbten = getTagText(nBan, 'Ten', 'ten', 'SellerLegalName', 'Name', 'nbten') || '—';
  const nbdchi = getTagText(nBan, 'DChi', 'dchi', 'Address', 'nbdchi') || '';
  const nbsdthoai = getTagText(nBan, 'SDThoai', 'sdthoai', 'Phone', 'Telephone');
  const nbstkhoan = getTagText(nBan, 'STKNHang', 'stknhang', 'AccountNumber', 'BankNumber');
  const nbtnhang = getTagText(nBan, 'TNHang', 'tnhang', 'BankName');
  const mchdon = getTagText(nBan, 'MCHDon', 'mchdon');
  const tchdon = getTagText(nBan, 'TCHDon', 'tchdon');

  // Tìm node Người mua: NMua
  const nMua = findElement(root, 'NMua', 'nmua', 'Buyer', 'buyerInfo');
  const nmmst = getTagText(nMua, 'MST', 'mst', 'TaxCode', 'nmmst') || '';
  const nmten = getTagText(nMua, 'Ten', 'ten', 'BuyerLegalName', 'Name', 'nmten') || '—';
  const nmtnmua = getTagText(nMua, 'HVTNMHang', 'hvtnmua', 'BuyerDisplayName', 'ContactName');
  const nmdchi = getTagText(nMua, 'DChi', 'dchi', 'Address', 'nmdchi') || '';
  const nmsdthoai = getTagText(nMua, 'SDThoai', 'sdthoai', 'Phone');
  const nmstkhoan = getTagText(nMua, 'STKNHang', 'stknhang', 'AccountNumber');
  const nmtnhang = getTagText(nMua, 'TNHang', 'tnhang', 'BankName');
  const dvcqhnsnn = getTagText(nMua, 'DVCQHNSNN', 'dvcqhnsnn', 'MDVQHNSach');
  const cccd = getTagText(nMua, 'CCCDan', 'cccd', 'CMND');
  const shchieu = getTagText(nMua, 'SHChieu', 'shchieu');
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

      // Bóc tách hàng hóa đặc trưng (Phụ lục XV - Thông tư 78)
      const lhhdtrung = getTagText(el, 'LHHDTrung', 'lhhdtrung');
      let tthhdtrung = undefined;
      const tthhdtrungNode = findElement(el, 'TTHHDTrung', 'tthhdtrung');
      if (tthhdtrungNode) {
        const ttinNodes = tthhdtrungNode.getElementsByTagName('TTin');
        const list: Array<{ ttruong: string; dlieu: string }> = [];
        for (let j = 0; j < ttinNodes.length; j++) {
          const tNode = ttinNodes[j];
          list.push({
            ttruong: getTagText(tNode, 'TTruong', 'ttruong'),
            dlieu: getTagText(tNode, 'DLieu', 'dlieu'),
          });
        }
        if (list.length > 0) {
          tthhdtrung = list;
        }
      }

      if (ten || thtien !== undefined) {
        items.push({
          id: `item-${i + 1}`,
          stt: isNaN(Number(stt)) ? stt : Number(stt),
          ten,
          dvt,
          slung,
          dgia,
          thtien,
          tsuat,
          tthue,
          tchat,
          lhhdtrung,
          tthhdtrung,
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
  const khmshdgoc = getTagText(tDChung, 'KHMSHDGoc', 'khmshdgoc');
  const khhdgoc = getTagText(tDChung, 'KHHDGoc', 'khhdgoc');
  const shdgoc = getTagText(tDChung, 'SHDGoc', 'shdgoc');
  const tdlhdgoc = getTagText(tDChung, 'NLapGoc', 'nlapgoc');

  let origInvoiceInfo = undefined;
  if (tthaiGoc === '2' || tthaiGoc === '3' || khhdgoc || shdgoc) {
    const actionLabel = tthaiGoc === '2' ? 'Thay thế cho hóa đơn' : 'Điều chỉnh cho hóa đơn';
    origInvoiceInfo = {
      actionLabel,
      khmshdon: khmshdgoc,
      khhdon: khhdgoc,
      shdon: shdgoc,
      ngayLap: tdlhdgoc,
    };
  }

  // Tạo đối tượng rawJson chuẩn hóa đồng bộ 100% với backend/frontend portal
  const rawJson: Record<string, any> = {
    dlhdon: {
      ttchung: {
        thdon,
        khmshdon,
        khhdon,
        shdon,
        nlap: tdlap,
        dvtte,
        tgia,
        httoan: thtttoan,
        sbke,
        nbke,
        khmshdgoc,
        khhdgoc,
        shdgoc,
        tdlhdgoc,
      },
      ndhdon: {
        nban: {
          ten: nbten,
          mst: nbmst,
          dchi: nbdchi,
          sdthoai: nbsdthoai,
          stknhang: nbstkhoan,
          tnhang: nbtnhang,
          mchdon,
          tchdon,
        },
        nmua: {
          ten: nmten,
          mst: nmmst,
          dchi: nmdchi,
          sdthoai: nmsdthoai,
          stknhang: nmstkhoan,
          tnhang: nmtnhang,
          hvtnmua: nmtnmua,
          dvcqhnsnn,
          cccd,
          shchieu,
        },
        ttoan: {
          tgtcthue,
          tgtthue,
          tgtttbso,
          tgtttbchu,
          thttltsuat: taxBreakdowns.map((b) => ({
            tsuat: b.tsuat,
            thtien: b.thtien,
            tthue: b.tthue,
          })),
        },
      },
    },
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
    mscqt: mccqt,
    mccqt,
    shdon,
    khmshdon,
    khhdon,
    tdlap,
    tgtcthue,
    tgtthue,
    tgtttbso,
    tgtttbchu,
    signingTime,
    nbcks: signerName ? JSON.stringify({ SigningTime: signingTime, Subject: signerName }) : undefined,
    khmshdgoc,
    khhdgoc,
    shdgoc,
    tdlhdgoc,
    tthai: tthaiGoc,
  };

  return {
    id: `xml-${shdon}`,
    thdon,
    khmshdon,
    khhdon,
    shdon,
    tdlap,
    dvtte,
    tgia,
    mccqt,
    mscqt: mccqt,
    nbmst,
    nbten,
    nbdchi,
    nbdiachi: nbdchi,
    nbsdthoai,
    nbstkhoan,
    nbtnhang,
    nmmst,
    nmdmst: nmmst,
    nmten,
    nmtnmua,
    nmdchi,
    nmdiachi: nmdchi,
    nmsdthoai,
    nmstkhoan,
    nmtnhang,
    thtttoan,
    items,
    tgtcthue,
    tgtthue,
    tgtttbso,
    tgtttbchu,
    tgtttnote: tgtttbchu,
    taxBreakdowns,
    origInvoiceInfo,
    signerName,
    signingTime,
    rawJson,
    rawFileName: fileName,
    rawXmlContent: xmlString,
  };
}

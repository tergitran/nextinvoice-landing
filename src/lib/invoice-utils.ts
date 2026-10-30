export interface OriginalInvoiceInfo {
  type: 'REPLACE' | 'ADJUST' | 'REPLACED' | 'ADJUSTED' | 'RELATED';
  actionLabel: string;
  khmshdon: string;
  khhdon: string;
  shdon: string;
  ngayLap: string;
  fullText: string;
  shortText: string;
}

/**
 * Format ngày sang định dạng DD/MM/YYYY chuẩn Việt Nam (Asia/Ho_Chi_Minh)
 */
export function formatDateVn(dateVal?: string | Date | number | null): string {
  if (!dateVal) return '';
  try {
    const d = new Date(dateVal);
    if (isNaN(d.getTime())) return String(dateVal);
    return new Intl.DateTimeFormat('vi-VN', {
      timeZone: 'Asia/Ho_Chi_Minh',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(d);
  } catch {
    return String(dateVal);
  }
}

/**
 * Trích xuất và định dạng thông tin hóa đơn gốc (hóa đơn điều chỉnh / thay thế)
 */
export function getOriginalInvoiceInfo(invoice: {
  tthai?: string | number | null;
  rawJson?: Record<string, unknown> | null;
  [key: string]: unknown;
}): OriginalInvoiceInfo | null {
  if (!invoice) return null;

  const raw = (invoice.rawJson || {}) as Record<string, unknown>;

  const khmshdgoc = String(raw.khmshdgoc || raw.khmshdclquan || raw.khmshdon_goc || '').trim();
  const khhdgoc = String(raw.khhdgoc || raw.khhdclquan || raw.khhdon_goc || '').trim();
  const shdgoc = raw.shdgoc != null ? String(raw.shdgoc).trim() : (raw.shdclquan != null ? String(raw.shdclquan).trim() : '');
  const tdlhdgoc = (raw.tdlhdgoc || raw.tdlaphdgoc || raw.ngayhdgoc || raw.tdlap_goc || raw.ngay_goc || null) as string | number | Date | null | undefined;
  const ngayLap = formatDateVn(tdlhdgoc);

  // Nếu không có bất kỳ thông tin gốc nào thì coi như không có HĐ gốc
  if (!khmshdgoc && !khhdgoc && !shdgoc) {
    return null;
  }

  const tthaiStr = String(invoice.tthai ?? raw.tthai ?? '');
  const tchat = raw.tchat;

  let type: OriginalInvoiceInfo['type'] = 'RELATED';
  let actionLabel = 'Liên quan đến';

  if (tthaiStr === '2' || tchat === 2) {
    type = 'REPLACE';
    actionLabel = 'Thay thế cho';
  } else if (tthaiStr === '3' || tchat === 3) {
    type = 'ADJUST';
    actionLabel = 'Điều chỉnh cho';
  } else if (tthaiStr === '4') {
    type = 'REPLACED';
    actionLabel = 'Bị thay thế bởi';
  } else if (tthaiStr === '5') {
    type = 'ADJUSTED';
    actionLabel = 'Bị điều chỉnh bởi';
  }

  const parts: string[] = [];
  if (khmshdgoc) parts.push(`ký hiệu mẫu số hóa đơn ${khmshdgoc}`);
  if (khhdgoc) parts.push(`ký hiệu hóa đơn ${khhdgoc}`);
  if (shdgoc) parts.push(`số hóa đơn ${shdgoc}`);
  if (ngayLap) parts.push(`ngày lập ${ngayLap}`);

  const fullText = parts.length > 0 ? `${actionLabel} ${parts.join(', ')}` : '';

  const shortCode = khhdgoc ? `${khhdgoc}${shdgoc ? `-${shdgoc}` : ''}` : (shdgoc ? `Số ${shdgoc}` : '');
  const shortText = type === 'REPLACE' 
    ? `Thay thế: ${shortCode}` 
    : type === 'ADJUST' 
      ? `Điều chỉnh: ${shortCode}` 
      : `${actionLabel}: ${shortCode}`;

  return {
    type,
    actionLabel,
    khmshdon: khmshdgoc,
    khhdon: khhdgoc,
    shdon: shdgoc,
    ngayLap,
    fullText,
    shortText,
  };
}

export interface InvoiceTaxSummaryRow {
  tsuat: string;
  thtien: number;
  tthue: number;
}

export interface TaxBreakdownItemInput {
  id?: string;
  stt?: number;
  ten?: string | null;
  dvt?: string | null;
  slung?: number | null;
  dgia?: number | null;
  thtien?: number | null;
  tsuat?: string | number | null;
  tthue?: number | null;
}

export interface TaxBreakdownInvoiceInput {
  tgtcthue?: number | null;
  tgtthue?: number | null;
  items?: TaxBreakdownItemInput[] | null;
  rawJson?: Record<string, unknown> | null;
}

/**
 * Chuẩn hóa thuế suất thành chuỗi hiển thị chuẩn theo Cổng Hóa đơn điện tử TCT:
 * - 'KHAC:5.26%' -> '5,26%' (bỏ tiền tố KHAC:, đổi dấu chấm sang phẩy)
 * - 'KHAC' -> 'Khác'
 * - '10' -> '10%', '8' -> '8%', '0' -> '0%'
 * - '5.26%' -> '5,26%'
 * - 0.0526 -> '5,26%'
 */
export function formatTaxRate(rate?: string | number | null): string {
  if (rate == null) return '';

  if (typeof rate === 'number') {
    if (rate > 0 && rate < 1) {
      const pct = parseFloat((rate * 100).toFixed(4));
      return `${String(pct).replace('.', ',')}%`;
    }
    return `${String(rate).replace('.', ',')}%`;
  }

  let str = String(rate).trim();
  if (!str) return '';

  // Nếu là chữ 'KHAC' đứng một mình (không kèm tỷ lệ %)
  if (str.toUpperCase() === 'KHAC' || str === 'Khác') {
    return 'Khác';
  }

  // Bỏ tiền tố KHAC: hoặc KHÁC: (VD: "KHAC:5.26%" -> "5.26%")
  str = str.replace(/^(KHAC|KHÁC)\s*:\s*/i, '').trim();

  // Nếu là số thuần túy (VD: "10", "8", "0", "5.26", "5,26")
  if (/^\d+([.,]\d+)?$/.test(str)) {
    return `${str.replace('.', ',')}%`;
  }

  // Nếu chuỗi chứa số kết thúc bằng % (VD: "5.26%", "10%", "5,26%")
  if (/^\d+([.,]\d+)?%$/.test(str)) {
    return str.replace('.', ',');
  }

  return str;
}

/**
 * Xác định chuỗi thuế suất hiển thị cho một dòng hàng:
 * - Nếu dòng hàng có thuế suất rõ ràng (VD: '0%', '10%', '5.26%') -> formatTaxRate
 * - Nếu dòng hàng ghi 'KHAC' hoặc 'Khác':
 *   + Tìm trong bảng tổng hợp thuế suất (thttltsuat / taxBreakdown) xem có thuế suất KHAC kèm tỷ lệ (VD: 'KHAC:5.26%') không
 *   + Nếu có duy nhất 1 mức thuế suất khác có tỷ lệ cụ thể -> gán mức đó (VD: '5,26%')
 *   + Nếu không có tỷ lệ cụ thể -> trả về 'Khác'
 * - Nếu dòng hàng rỗng thuế suất và hóa đơn chỉ có 1 mức thuế suất duy nhất -> trả về mức thuế suất đó
 */
export function resolveItemTaxRate(
  item: { tsuat?: string | number | null; ttkhac?: Record<string, unknown> | unknown[] | null } | null | undefined,
  taxBreakdown: InvoiceTaxSummaryRow[] = [],
  rawJson?: Record<string, unknown> | null
): string {
  if (!item) return '';
  const ttkhac = item.ttkhac && typeof item.ttkhac === 'object' && !Array.isArray(item.ttkhac) ? (item.ttkhac as Record<string, unknown>) : undefined;
  const rawTsuat = item.tsuat ?? ttkhac?.tsuat ?? ttkhac?.ltsuat;
  const str = rawTsuat != null ? String(rawTsuat).trim() : '';

  // 1. Nếu dòng hàng rỗng thuế suất
  if (!str) {
    if (taxBreakdown.length === 1 && taxBreakdown[0]?.tsuat) {
      return taxBreakdown[0].tsuat;
    }
    return '';
  }

  // 2. Nếu dòng hàng là 'KHAC' hoặc 'Khác' (không kèm con số)
  if (str.toUpperCase() === 'KHAC' || str === 'Khác') {
    // Kiểm tra trong ttkhac xem có lưu rawTsuat số thập phân không (VD: 0.0526)
    const numericRate = (ttkhac?.rawTsuat ?? ttkhac?.tsuatNum) as number | undefined;
    if (typeof numericRate === 'number' && numericRate > 0) {
      return formatTaxRate(numericRate);
    }

    // Tìm trong rawJson.thttltsuat xem có mức thuế khác dạng "KHAC:X%" không
    const raw = (rawJson || {}) as Record<string, unknown>;
    const root = (raw.data && typeof raw.data === 'object' ? raw.data : raw) as Record<string, unknown>;
    const rootHdhnhan = root.hdhnhan as Record<string, unknown> | undefined;
    const hdon = (rootHdhnhan?.hdon || root.hdon || root) as Record<string, unknown>;
    const dlHDon = (hdon.dlhdon || hdon) as Record<string, unknown>;
    const ndhdon = dlHDon.ndhdon as Record<string, unknown> | undefined;
    const tToan = (ndhdon?.ttoan || dlHDon.ttoan || root.ttoan || {}) as Record<string, unknown>;
    const rawTaxSummary = (raw.thttltsuat || root.thttltsuat || dlHDon.thttltsuat || tToan.thttltsuat || tToan.THTTLTSuat) as Record<string, unknown> | Array<Record<string, unknown>> | undefined;

    let thttlList: Array<Record<string, unknown>> = [];
    if (Array.isArray(rawTaxSummary)) {
      thttlList = rawTaxSummary;
    } else if (rawTaxSummary?.LTSuat) {
      thttlList = Array.isArray(rawTaxSummary.LTSuat) ? rawTaxSummary.LTSuat : [rawTaxSummary.LTSuat];
    } else if (rawTaxSummary?.ltsuat) {
      thttlList = Array.isArray(rawTaxSummary.ltsuat) ? rawTaxSummary.ltsuat : [rawTaxSummary.ltsuat];
    }

    // Tìm các dòng trong thttltsuat có tiền tố KHAC: kèm tỷ lệ (e.g. "KHAC:5.26%")
    const khacWithRate = thttlList
      .map((entry) => String(entry?.tsuat ?? entry?.TSuat ?? '').trim())
      .filter((t) => /^(KHAC|KHÁC)\s*:\s*\d+/i.test(t));

    if (khacWithRate.length === 1) {
      return formatTaxRate(khacWithRate[0]);
    }

    // Fallback: Tìm trong taxBreakdown xem có mức thuế nào khác chuẩn (không phải 0%, 5%, 8%, 10%, KCT, KKKNT, Khác)
    const customBreakdown = taxBreakdown.filter(
      (b) => b.tsuat && !['0%', '5%', '8%', '10%', 'KCT', 'KKKNT', 'Khác'].includes(b.tsuat)
    );
    if (customBreakdown.length === 1) {
      return customBreakdown[0].tsuat;
    }

    return 'Khác';
  }

  // 3. Chuẩn hóa theo formatTaxRate thông thường
  return formatTaxRate(str);
}

/**
 * Trích xuất bảng kê chi tiết thuế suất theo từng dòng (cho hóa đơn có 1 hoặc nhiều thuế suất)
 * Ưu tiên:
 * 1. rawJson.thttltsuat hoặc THTTLTSuat từ XML (chính xác theo TCT)
 * 2. Gom nhóm theo invoice.items (nếu có chi tiết hàng hóa)
 * 3. Fallback tổng hợp từ tgtcthue / tgtthue ở header
 */
export function extractTaxBreakdown(invoice: TaxBreakdownInvoiceInput): InvoiceTaxSummaryRow[] {
  if (!invoice) return [];

  const raw = (invoice.rawJson || {}) as Record<string, unknown>;
  const root = (raw.data && typeof raw.data === 'object' ? raw.data : raw) as Record<string, unknown>;
  const rootHdhnhan = root.hdhnhan as Record<string, unknown> | undefined;
  const hdon = (rootHdhnhan?.hdon || root.hdon || root) as Record<string, unknown>;
  const dlHDon = (hdon.dlhdon || hdon) as Record<string, unknown>;
  const ndhdon = dlHDon.ndhdon as Record<string, unknown> | undefined;
  const tToan = (ndhdon?.ttoan || dlHDon.ttoan || root.ttoan || {}) as Record<string, unknown>;

  const ttoanTax = (tToan.thttltsuat || tToan.THTTLTSuat) as Record<string, unknown> | undefined;
  const dlHDonNdhdon = dlHDon.ndhdon as Record<string, unknown> | undefined;
  const dlHDonTtoan = dlHDonNdhdon?.ttoan as Record<string, unknown> | undefined;
  const dlHDonTax = (dlHDonTtoan?.thttltsuat || dlHDonTtoan?.THTTLTSuat) as Record<string, unknown> | undefined;

  // 1. Tìm bảng thuế thttltsuat / THTTLTSuat trong rawJson / XML
  const rawTaxSummary =
    raw.thttltsuat ||
    root.thttltsuat ||
    dlHDon.thttltsuat ||
    tToan.thttltsuat ||
    tToan.THTTLTSuat ||
    ttoanTax?.ltsuat ||
    ttoanTax?.LTSuat ||
    dlHDonTtoan?.thttltsuat ||
    dlHDonTax?.LTSuat ||
    dlHDonTax?.ltsuat ||
    raw.thttltsuatList;

  let rawList: Array<Record<string, unknown>> = [];
  if (Array.isArray(rawTaxSummary)) {
    rawList = rawTaxSummary as Array<Record<string, unknown>>;
  } else if (rawTaxSummary && typeof rawTaxSummary === 'object') {
    const taxObj = rawTaxSummary as Record<string, unknown>;
    const ltsuat = taxObj.LTSuat || taxObj.ltsuat;
    if (Array.isArray(ltsuat)) {
      rawList = ltsuat as Array<Record<string, unknown>>;
    } else if (ltsuat && typeof ltsuat === 'object') {
      rawList = [ltsuat as Record<string, unknown>];
    } else {
      rawList = [taxObj];
    }
  }

  if (rawList.length > 0) {
    const rows: InvoiceTaxSummaryRow[] = [];
    for (const item of rawList) {
      if (!item || typeof item !== 'object') continue;
      const rateRaw = (item.tsuat ?? item.TSuat ?? item.rate ?? item.thuesuat) as string | number | null | undefined;
      const tsuat = formatTaxRate(rateRaw) || '—';
      const thtien = Number(item.thtien ?? item.ThTien ?? item.tgtcthue ?? 0);
      const tthue = Number(item.tthue ?? item.TThue ?? item.tgtthue ?? 0);

      rows.push({
        tsuat,
        thtien: isNaN(thtien) ? 0 : thtien,
        tthue: isNaN(tthue) ? 0 : tthue,
      });
    }

    if (rows.length > 0) {
      return rows;
    }
  }

  // 2. Fallback: Gom nhóm theo mặt hàng trong invoice.items
  if (invoice.items && invoice.items.length > 0) {
    const groups = new Map<string, { thtien: number; tthue: number; hasItemTax: boolean }>();

    for (const item of invoice.items) {
      const rateStr = formatTaxRate(item.tsuat);
      const groupKey = rateStr || 'Khác';

      const itemThtien =
        item.thtien != null
          ? Number(item.thtien)
          : item.slung != null && item.dgia != null
            ? Number(item.slung) * Number(item.dgia)
            : 0;

      const itemTthue = item.tthue != null ? Number(item.tthue) : null;

      const existing = groups.get(groupKey) || { thtien: 0, tthue: 0, hasItemTax: true };
      existing.thtien += isNaN(itemThtien) ? 0 : itemThtien;

      if (itemTthue != null && !isNaN(itemTthue)) {
        existing.tthue += itemTthue;
      } else {
        existing.hasItemTax = false;
      }

      groups.set(groupKey, existing);
    }

    const rows: InvoiceTaxSummaryRow[] = [];
    for (const [rateKey, data] of groups.entries()) {
      let tthue = data.tthue;

      if (!data.hasItemTax || tthue === 0) {
        const pctMatch = rateKey.match(/^(\d+(\.\d+)?)%/);
        if (pctMatch) {
          const pct = parseFloat(pctMatch[1]);
          tthue = Math.round((data.thtien * pct) / 100);
        } else if (['0%', 'kct', 'kkknt'].includes(rateKey.toLowerCase())) {
          tthue = 0;
        } else if (groups.size === 1 && invoice.tgtthue != null) {
          tthue = Number(invoice.tgtthue);
        }
      }

      rows.push({
        tsuat: rateKey === 'Khác' ? '—' : rateKey,
        thtien: data.thtien,
        tthue,
      });
    }

    if (rows.length > 0) {
      // Điều chỉnh lệch làm tròn tiền lẻ với header tgtthue
      if (invoice.tgtthue != null) {
        const expectedTax = Math.round(Number(invoice.tgtthue));
        const currentSum = rows.reduce((sum, r) => sum + r.tthue, 0);
        const diff = expectedTax - currentSum;
        if (diff !== 0 && Math.abs(diff) <= rows.length * 5) {
          const highestTaxRow = [...rows].sort((a, b) => b.tthue - a.tthue)[0];
          if (highestTaxRow && highestTaxRow.tthue > 0) {
            highestTaxRow.tthue += diff;
          }
        }
      }

      // Sắp xếp thuế suất giảm dần
      return rows.sort((a, b) => {
        const numA = parseFloat(a.tsuat.replace('%', ''));
        const numB = parseFloat(b.tsuat.replace('%', ''));
        if (!isNaN(numA) && !isNaN(numB)) return numB - numA;
        if (!isNaN(numA)) return -1;
        if (!isNaN(numB)) return 1;
        return a.tsuat.localeCompare(b.tsuat);
      });
    }
  }

  // 3. Fallback: Dòng thuế đơn giản từ Header
  const headerTgtcthue = Number(invoice.tgtcthue || 0);
  const headerTgtthue = Number(invoice.tgtthue || 0);
  let defaultRate = '—';

  if (headerTgtcthue > 0 && headerTgtthue >= 0) {
    const calcRate = Math.round((headerTgtthue / headerTgtcthue) * 100);
    if (calcRate > 0) {
      defaultRate = `${calcRate}%`;
    } else {
      defaultRate = '0%';
    }
  }

  return [
    {
      tsuat: defaultRate,
      thtien: headerTgtcthue,
      tthue: headerTgtthue,
    },
  ];
}


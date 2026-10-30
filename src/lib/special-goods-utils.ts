/**
 * Danh mục Tính chất mặt hàng theo quy định Tổng cục Thuế (Nghị định 123 / Thông tư 78)
 */
export const ITEM_NATURE_MAP: Record<string | number, string> = {
  1: 'Hàng hóa, dịch vụ',
  2: 'Khuyến mại',
  3: 'Chiết khấu thương mại',
  4: 'Ghi chú, diễn giải',
  5: 'Hàng hoá đặc trưng',
};

/**
 * Phụ lục XV - Danh mục loại hàng hóa đặc trưng
 * (Quy định thành phần chứa dữ liệu nghiệp vụ HĐĐT ban hành tại Quyết định của Cục Thuế)
 */
export const SPECIAL_GOODS_TYPE_MAP: Record<string | number, string> = {
  1: 'Hàng hóa là xe ô tô, xe mô tô',
  2: 'Dịch vụ vận chuyển',
  3: 'Dịch vụ vận chuyển trên nền tảng số, TMĐT',
};

/**
 * Phụ lục XV - Danh mục các trường dữ liệu bắt buộc của hàng hóa đặc trưng
 */
export const SPECIAL_GOODS_FIELD_MAP: Record<string, string> = {
  // Loại 1: Hàng hóa là xe ô tô, xe mô tô
  SKhung: 'Số khung',
  skhung: 'Số khung',
  SMay: 'Số máy',
  smay: 'Số máy',

  // Loại 2: Dịch vụ vận chuyển
  BKSPTVChuyen: 'BKS phương tiện vận chuyển',
  bksptvchuyen: 'BKS phương tiện vận chuyển',

  // Loại 3: Dịch vụ vận chuyển trên nền tảng số, TMĐT
  TNGHang: 'Tên người gửi hàng',
  tnghang: 'Tên người gửi hàng',
  DCNGHang: 'Địa chỉ người gửi hàng',
  dcnghang: 'Địa chỉ người gửi hàng',
  MSTNGHang: 'MST người gửi hàng',
  mstnghang: 'MST người gửi hàng',
  MDDNGHang: 'Số định danh người gửi hàng',
  mddnghang: 'Số định danh người gửi hàng',
};

export interface SpecialGoodsField {
  fieldKey: string;
  label: string;
  value: string;
}

export interface SpecialGoodsInfo {
  typeName?: string;
  fields: SpecialGoodsField[];
}

export interface InvoiceItemLike {
  id?: string;
  stt?: number;
  ten?: string | null;
  dvt?: string | null;
  slung?: number | null;
  dgia?: number | null;
  thtien?: number | null;
  tsuat?: string | number | null;
  tthue?: number | null;
  tchat?: string | number | null;
  tChat?: string | number | null;
  nature?: string | number | null;
  tthhdtrung?: unknown;
  lhhdtrung?: unknown;
  ttkhac?: Record<string, unknown> | unknown[] | null;
}

/**
 * Lấy nhãn hiển thị cho cột "Tính chất" (STT 2)
 * VD: "Hàng hoá đặc trưng", "Hàng hóa, dịch vụ", "Khuyến mại", v.v.
 */
export function getItemNatureLabel(item?: InvoiceItemLike | null): string {
  if (!item) return 'Hàng hóa, dịch vụ';

  const ttkhac =
    item.ttkhac && typeof item.ttkhac === 'object' && !Array.isArray(item.ttkhac)
      ? (item.ttkhac as Record<string, unknown>)
      : {};

  // 1. Kiểm tra thuộc tính Tính chất (TChat) trước tiên theo chuẩn TCT (Nghị định 123 / Thông tư 78)
  const tchatVal = item.tchat ?? ttkhac.tchat ?? item.tChat ?? item.nature;
  if (tchatVal != null && tchatVal !== '') {
    const key = String(tchatVal).trim();
    if (ITEM_NATURE_MAP[key]) {
      return ITEM_NATURE_MAP[key];
    }
  }

  // 2. Chỉ khi tchat không có trong dữ liệu (null/undefined) thì mới fallback kiểm tra xem có thông tin đặc trưng hợp lệ không
  const specialInfo = getItemSpecialGoodsInfo(item);
  if (specialInfo && (specialInfo.typeName || specialInfo.fields.length > 0)) {
    return 'Hàng hoá đặc trưng';
  }

  return 'Hàng hóa, dịch vụ';
}

/**
 * Bóc tách và định dạng dữ liệu cho cột "Loại hàng hoá đặc trưng" (STT 3) theo Phụ lục XV
 * Trả về:
 * - typeName: Mô tả loại hàng hóa (VD: "Dịch vụ vận chuyển")
 * - fields: Danh sách các trường thông tin (VD: [{ label: "BKS phương tiện vận chuyển", value: "50H16898" }])
 */
export function getItemSpecialGoodsInfo(item?: InvoiceItemLike | null): SpecialGoodsInfo | null {
  if (!item) return null;

  const ttkhac =
    item.ttkhac && typeof item.ttkhac === 'object' && !Array.isArray(item.ttkhac)
      ? (item.ttkhac as Record<string, unknown>)
      : {};

  // Nếu tchat được xác định và KHÁC 5 (ví dụ 1: Hàng hóa dịch vụ, 4: Ghi chú) thì theo quy định TCT KHÔNG phải hàng hóa đặc trưng
  const tchatVal = item.tchat ?? ttkhac.tchat ?? item.tChat ?? item.nature;
  if (tchatVal != null && tchatVal !== '' && String(tchatVal).trim() !== '5') {
    return null;
  }

  const list = item.tthhdtrung || ttkhac.tthhdtrung || ttkhac.TTHHDTrung;
  if (!list) return null;

  let entries: Record<string, unknown>[] = [];
  if (Array.isArray(list)) {
    entries = list;
  } else if (list && typeof list === 'object') {
    const sub = (list as Record<string, unknown>).TTin || (list as Record<string, unknown>).ttin;
    if (Array.isArray(sub)) {
      entries = sub;
    } else if (sub && typeof sub === 'object') {
      entries = [sub as Record<string, unknown>];
    } else {
      entries = [list as Record<string, unknown>];
    }
  }

  const lhhdtrungVal =
    item.lhhdtrung ??
    ttkhac.lhhdtrung ??
    entries[0]?.lhhdtrung ??
    entries[0]?.LHHDTrung;

  const typeName = lhhdtrungVal != null ? SPECIAL_GOODS_TYPE_MAP[String(lhhdtrungVal).trim()] || '' : '';

  const fields: SpecialGoodsField[] = [];

  for (const entry of entries) {
    if (!entry || typeof entry !== 'object') continue;
    const rawKey = String(entry.ttruong ?? entry.TTruong ?? entry.key ?? entry.name ?? '').trim();
    const rawVal = String(entry.dlieu ?? entry.DLieu ?? entry.value ?? entry.val ?? '').trim();

    if (!rawKey && !rawVal) continue;

    const matchedLabel = SPECIAL_GOODS_FIELD_MAP[rawKey] || SPECIAL_GOODS_FIELD_MAP[rawKey.toLowerCase()];
    // Chỉ chấp nhận các trường thuộc danh mục Phụ lục XV hoặc khi đã có loại hàng hóa đặc trưng hợp lệ (lhhdtrung 1, 2, 3)
    if (!matchedLabel && !SPECIAL_GOODS_TYPE_MAP[String(lhhdtrungVal)]) {
      continue;
    }

    const label = matchedLabel || rawKey;
    fields.push({
      fieldKey: rawKey,
      label,
      value: rawVal,
    });
  }

  if (!typeName && fields.length === 0) {
    return null;
  }

  return {
    typeName: typeName || undefined,
    fields,
  };
}

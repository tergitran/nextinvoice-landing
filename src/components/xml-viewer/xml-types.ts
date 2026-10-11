export interface ParsedXmlItem {
  stt?: number | string;
  ten?: string;
  dvt?: string;
  slung?: number;
  dgia?: number;
  thtien?: number;
  tsuat?: string;
  tthue?: number;
  tchat?: string;
}

export interface ParsedTaxBreakdown {
  tsuat: string;
  thtien: number;
  tthue: number;
}

export interface ParsedXmlInvoice {
  // General info
  thdon: string;        // Tên loại hóa đơn (VD: HÓA ĐƠN GIÁ TRỊ GIA TĂNG)
  khmshdon: string;     // Ký hiệu mẫu số (VD: 1)
  khhdon: string;       // Ký hiệu hóa đơn (VD: C26TKN)
  shdon: string;        // Số hóa đơn (VD: 00000012)
  tdlap: string;        // Ngày lập (VD: 2026-10-11)
  dvtte: string;        // Đơn vị tiền tệ (VND)
  tgia?: number;        // Tỷ giá
  mccqt?: string;       // Mã của Cơ quan thuế cấp

  // Seller info
  nbmst: string;
  nbten: string;
  nbdchi: string;
  nbsdthoai?: string;
  nbstkhoan?: string;
  nbtnhang?: string;

  // Buyer info
  nmmst?: string;
  nmten?: string;
  nmtnmua?: string;     // Người mua hàng / đại diện
  nmdchi?: string;
  nmsdthoai?: string;
  nmstkhoan?: string;
  nmtnhang?: string;
  thtttoan?: string;    // Hình thức thanh toán (CK, TM, TM/CK)

  // Items
  items: ParsedXmlItem[];

  // Totals & Tax
  tgtcthue?: number;    // Tổng tiền chưa thuế
  tgtthue?: number;     // Tổng tiền thuế
  tgtttbso?: number;    // Tổng tiền thanh toán bằng số
  tgtttbchu?: string;   // Tổng tiền thanh toán bằng chữ
  taxBreakdowns: ParsedTaxBreakdown[];

  // Original Invoice info (nếu là hóa đơn thay thế / điều chỉnh)
  tdchat?: string;      // 1: Gốc, 2: Thay thế, 3: Điều chỉnh, 4: Bị thay thế...
  origInvoiceInfo?: {
    actionLabel: string;
    khmshdon?: string;
    khhdon?: string;
    shdon?: string;
    ngayLap?: string;
  };

  // Signatures
  signerName?: string;
  signingTime?: string;

  // Raw file metadata
  rawFileName: string;
  rawXmlContent: string;
}

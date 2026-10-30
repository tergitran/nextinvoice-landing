export interface ParsedXmlItem {
  id?: string;
  stt?: number | string;
  ten?: string;
  dvt?: string;
  slung?: number;
  dgia?: number;
  thtien?: number;
  tsuat?: string;
  tthue?: number;
  tchat?: number | string;
  tthhdtrung?: any;
  lhhdtrung?: any;
  ttkhac?: any;
}

export interface ParsedTaxBreakdown {
  tsuat: string;
  thtien: number;
  tthue: number;
}

export interface ParsedXmlInvoice {
  id?: string;
  shdon: string;
  khmshdon?: string;
  khhdon?: string;
  thdon?: string;
  tdlap?: string;
  dvtte?: string;
  tgia?: number;
  mccqt?: string;
  mscqt?: string;
  cqt?: string;

  // Seller info
  nbmst: string;
  nbten?: string;
  nbdchi?: string;
  nbdiachi?: string;
  nbsdthoai?: string;
  nbstkhoan?: string;
  nbtnhang?: string;

  // Buyer info
  nmmst?: string;
  nmdmst?: string;
  nmten?: string;
  nmtnmua?: string;
  nmdchi?: string;
  nmdiachi?: string;
  nmsdthoai?: string;
  nmstkhoan?: string;
  nmtnhang?: string;
  thtttoan?: string;

  // Items
  items?: ParsedXmlItem[];

  // Totals & Tax
  tgtcthue?: number;
  tgtthue?: number;
  tgtttbso?: number;
  tgtttbchu?: string;
  tgtttnote?: string;
  taxBreakdowns?: ParsedTaxBreakdown[];

  // Original Invoice info
  tdchat?: string;
  tthai?: string;
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

  // Raw Json & Metadata
  rawJson?: Record<string, any>;
  syncMetadata?: Record<string, any>;
  rawFileName?: string;
  rawXmlContent?: string;
}

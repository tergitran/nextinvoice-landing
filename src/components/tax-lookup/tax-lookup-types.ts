export interface TaxLookupItem {
  taxCode: string;
  name: string | null;
  address: string | null;
  status: string | null;
  taxDepartment: string | null;
  representative: string | null;
  phone: string | null;
  sourceUpdatedAt: string | null;
  isSuccess: boolean;
  fromCache: boolean;
  error: string | null;
}

export interface TaxLookupProgress {
  total: number;
  processed: number;
  successCount: number;
  failCount: number;
  isProcessing: boolean;
  isCompleted: boolean;
}

export type TaxStatusCategory =
  | 'ALL'
  | 'ACTIVE'
  | 'WARNING'
  | 'RISK'
  | 'ERROR';

export interface TaxLookupStreamEvent {
  type: 'progress' | 'complete' | 'heartbeat' | 'waiting';
  item?: TaxLookupItem;
  processed?: number;
  total?: number;
  successCount?: number;
  failCount?: number;
  message?: string;
  waitDuration?: number;
}

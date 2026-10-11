import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Định dạng số tiền chuẩn Hóa đơn Điện tử Bộ Tài chính (TCT)
 * - Phân cách hàng nghìn bằng dấu chấm (.)
 * - Phân cách thập phân bằng dấu phẩy (,)
 * - Không gắn ký hiệu tiền tệ
 */
export function formatVndCurrency(amount?: number | string | null): string {
  if (amount === null || amount === undefined || amount === '') return '0';
  const num = typeof amount === 'string' ? parseFloat(amount.replace(/,/g, '')) : amount;
  if (isNaN(num)) return '0';

  const parts = num.toString().split('.');
  const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  if (parts.length > 1) {
    return `${integerPart},${parts[1]}`;
  }
  return integerPart;
}

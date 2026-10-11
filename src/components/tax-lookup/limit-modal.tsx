'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, X, ShieldAlert, Check } from 'lucide-react';
import { REGISTER_URL } from '@/lib/constants';

interface LimitModalProps {
  open: boolean;
  onClose: () => void;
  totalPasted: number;
}

export function LimitModal({ open, onClose, totalPasted }: LimitModalProps) {
  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in-0 duration-200"
    >
      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-blue-500/30 bg-slate-900 p-6 shadow-2xl text-slate-100 sm:p-8 animate-in zoom-in-95 duration-200">
        {/* Glow accent */}
        <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-blue-500/20 blur-3xl pointer-events-none" />

        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 rounded-lg p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 transition"
          aria-label="Đóng thông báo"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <ShieldAlert className="h-6 w-6" />
          </div>

          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-400 border border-blue-500/20 mb-2">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Tiện ích công khai miễn phí</span>
            </div>

            <h3 className="text-xl font-bold text-white">
              Đã nhận diện {totalPasted} mã số thuế
            </h3>
            <p className="mt-2 text-sm text-slate-300 leading-relaxed">
              Công cụ tra cứu vãng lai miễn phí hỗ trợ tối đa <strong className="text-white">50 MST</strong> mỗi lượt. Hệ thống <strong className="text-blue-400">đang tự động tra cứu 50 mã đầu tiên</strong> ngay bây giờ.
            </p>
          </div>
        </div>

        {/* Value Proposition Box */}
        <div className="mt-5 rounded-xl border border-slate-800 bg-slate-950/60 p-4 space-y-2.5 text-xs text-slate-300">
          <div className="font-semibold text-slate-200 text-sm mb-1">
            Đăng ký tài khoản Next Invoice để nhận thêm đặc quyền:
          </div>
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-emerald-400 shrink-0" />
            <span>Tra cứu hàng loạt <strong className="text-white">không giới hạn số lượng</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-emerald-400 shrink-0" />
            <span>Tự động đồng bộ toàn bộ HĐ Mua vào - Bán ra từ Cổng Tổng cục Thuế</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-emerald-400 shrink-0" />
            <span>Cảnh báo rủi ro người bán tự động & xuất bảng kê thuế 1-click</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex flex-col-reverse sm:flex-row items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition text-center"
          >
            Tiếp tục xem 50 kết quả này
          </button>
          <Link
            href={REGISTER_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30 transition active:scale-98"
          >
            <span>Đăng ký miễn phí</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

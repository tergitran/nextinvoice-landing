'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, ShieldAlert, Check } from 'lucide-react';
import { REGISTER_URL } from '@/lib/constants';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface LimitModalProps {
  open: boolean;
  onClose: () => void;
  totalPasted: number;
}

export function LimitModal({ open, onClose, totalPasted }: LimitModalProps) {
  return (
    <Dialog open={open} onOpenChange={(nextOpen) => { if (!nextOpen) onClose(); }}>
      <DialogContent>
        {/* Glow accent */}
        <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-blue-500/20 blur-3xl pointer-events-none" />

        <DialogHeader className="flex-row gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <ShieldAlert className="h-6 w-6" />
          </div>

          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-400 border border-blue-500/20 mb-2">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Tiện ích công khai miễn phí</span>
            </div>

            <DialogTitle>
              Đã nhận diện {totalPasted} mã số thuế
            </DialogTitle>
            <DialogDescription>
              Công cụ tra cứu vãng lai miễn phí hỗ trợ tối đa <strong className="text-white">50 MST</strong> mỗi lượt. Hệ thống <strong className="text-blue-400">đang tự động tra cứu 50 mã đầu tiên</strong> ngay bây giờ.
            </DialogDescription>
          </div>
        </DialogHeader>

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
        <DialogFooter>
          <DialogClose>
            Tiếp tục xem 50 kết quả này
          </DialogClose>
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
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

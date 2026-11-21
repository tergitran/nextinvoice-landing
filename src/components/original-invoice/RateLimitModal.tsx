'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, Clock, Check, LogIn } from 'lucide-react';
import { REGISTER_URL, LOGIN_URL } from '@/lib/constants';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface RateLimitModalProps {
  open: boolean;
  onClose: () => void;
  resetInSeconds: number;
}

export function RateLimitModal({ open, onClose, resetInSeconds: initialSeconds }: RateLimitModalProps) {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);

  useEffect(() => {
    setSecondsLeft(initialSeconds);
  }, [initialSeconds]);

  useEffect(() => {
    if (!open || secondsLeft <= 0) return;
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [open, secondsLeft]);

  const minutes = Math.floor(secondsLeft / 60);
  const remainingSeconds = secondsLeft % 60;
  const timeFormatted = `${minutes > 0 ? `${minutes} phút ` : ''}${remainingSeconds} giây`;

  return (
    <Dialog open={open} onOpenChange={(nextOpen) => { if (!nextOpen) onClose(); }}>
      <DialogContent tone="purple">
        {/* Glow accent */}
        <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-purple-500/20 blur-3xl pointer-events-none" />

        <DialogHeader className="flex-row gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <Clock className="h-6 w-6" />
          </div>

          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-purple-500/10 px-3 py-1 text-xs font-semibold text-purple-400 border border-purple-500/20 mb-2">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Giới hạn 10 hóa đơn / 1 giờ</span>
            </div>

            <DialogTitle>
              Bạn đã vượt quá số lần tra cứu trong 1 giờ này
            </DialogTitle>
            <DialogDescription>
              Công cụ vãng lai miễn phí giới hạn tối đa <strong className="text-white">10 hóa đơn mỗi giờ</strong> trên một thiết bị.
            </DialogDescription>
          </div>
        </DialogHeader>

        {/* Countdown Box */}
        <div className="mt-4 rounded-xl border border-purple-500/20 bg-purple-500/5 p-3.5 flex items-center justify-between text-xs sm:text-sm">
          <span className="text-slate-300 flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-purple-400" />
            Lượt tra cứu kế tiếp sẽ mở lại sau:
          </span>
          <span className="font-bold text-purple-300 font-mono text-sm sm:text-base">
            {secondsLeft > 0 ? timeFormatted : 'Đã có thể thử lại!'}
          </span>
        </div>

        {/* Value Proposition Box */}
        <div className="mt-4 rounded-xl border border-slate-800 bg-slate-950/60 p-4 space-y-2.5 text-xs text-slate-300">
          <div className="font-semibold text-slate-200 text-sm mb-1">
            Đăng ký sử dụng Next Invoice để mở khóa toàn bộ tiện ích:
          </div>
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-emerald-400 shrink-0" />
            <span>Tải hàng loạt <strong className="text-white">PDF gốc có chữ ký số</strong> không giới hạn số lượng</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-emerald-400 shrink-0" />
            <span>Tự động đồng bộ toàn bộ HĐ Mua vào - Bán ra trực tiếp từ Cổng Tổng cục Thuế</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-emerald-400 shrink-0" />
            <span>Tự động giải mã link tra cứu & mã bí mật của hơn 15 nhà cung cấp phổ biến</span>
          </div>
        </div>

        {/* Action Buttons */}
        <DialogFooter>
          <DialogClose>
            Đóng
          </DialogClose>
          <Link
            href={LOGIN_URL}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 transition text-center"
          >
            <LogIn className="h-4 w-4" />
            <span>Đăng nhập</span>
          </Link>
          <Link
            href={REGISTER_URL}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 shadow-lg shadow-purple-500/25 transition text-center"
          >
            <span>Đăng ký sử dụng</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

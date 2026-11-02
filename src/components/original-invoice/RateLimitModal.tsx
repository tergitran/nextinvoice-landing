'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, X, Clock, Check, LogIn } from 'lucide-react';
import { REGISTER_URL, LOGIN_URL } from '@/lib/constants';

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

  if (!open) return null;

  const minutes = Math.floor(secondsLeft / 60);
  const remainingSeconds = secondsLeft % 60;
  const timeFormatted = `${minutes > 0 ? `${minutes} phút ` : ''}${remainingSeconds} giây`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in-0 duration-200"
    >
      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-purple-500/30 bg-slate-900 p-6 shadow-2xl text-slate-100 sm:p-8 animate-in zoom-in-95 duration-200">
        {/* Glow accent */}
        <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-purple-500/20 blur-3xl pointer-events-none" />

        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 rounded-lg p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
          aria-label="Đóng thông báo"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <Clock className="h-6 w-6" />
          </div>

          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-purple-500/10 px-3 py-1 text-xs font-semibold text-purple-400 border border-purple-500/20 mb-2">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Giới hạn 10 hóa đơn / 1 giờ</span>
            </div>

            <h3 className="text-xl font-bold text-white">
              Bạn đã vượt quá số lần tra cứu trong 1 giờ này
            </h3>
            <p className="mt-2 text-sm text-slate-300 leading-relaxed">
              Công cụ vãng lai miễn phí giới hạn tối đa <strong className="text-white">10 hóa đơn mỗi giờ</strong> trên một thiết bị.
            </p>
          </div>
        </div>

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
        <div className="mt-6 flex flex-col-reverse sm:flex-row items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition text-center cursor-pointer"
          >
            Đóng
          </button>
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
        </div>
      </div>
    </div>
  );
}

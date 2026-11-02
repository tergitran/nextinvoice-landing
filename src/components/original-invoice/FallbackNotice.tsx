'use client';

import React from 'react';
import Link from 'next/link';
import { AlertTriangle, Phone, ArrowRight, ShieldCheck } from 'lucide-react';
import { REGISTER_URL } from '@/lib/constants';

interface FallbackNoticeProps {
  providerName?: string | null;
}

export function FallbackNotice({ providerName }: FallbackNoticeProps) {
  return (
    <div className="w-full space-y-4 no-print print:hidden">
      <div className="relative overflow-hidden rounded-2xl border border-amber-500/40 bg-amber-500/10 p-5 sm:p-6 text-slate-100 shadow-xl">
        <div className="flex items-start gap-3.5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
            <AlertTriangle className="h-5 w-5" />
          </div>

          <div className="flex-1 space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/20 px-2.5 py-0.5 text-xs font-semibold text-amber-300 border border-amber-500/30">
                Thông báo từ hệ thống
              </span>
              {providerName && (
                <span className="text-xs text-slate-400">
                  Nhà cung cấp nhận diện: <strong className="text-slate-200">{providerName}</strong>
                </span>
              )}
            </div>

            <p className="text-sm font-medium text-amber-200 leading-relaxed">
              Nhà cung cấp này hệ thống chưa hỗ trợ hoặc đang gặp sự cố trong quá trình truy xuất pdf gốc. Vui lòng thử lại sau hoặc liên hệ{' '}
              <a
                href="tel:0982548515"
                className="font-bold underline text-white hover:text-amber-300 inline-flex items-center gap-1 transition"
              >
                <Phone className="h-3.5 w-3.5 inline" />
                0982548515
              </a>{' '}
              để được kỹ thuật viên hỗ trợ.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-300 border-t border-amber-500/20">
              <div className="flex items-center gap-1.5 text-emerald-400">
                <ShieldCheck className="h-4 w-4 shrink-0" />
                <span>Hệ thống đã tự động chuyển sang <strong>Bản thể hiện chuẩn Tổng cục Thuế</strong> phía dưới.</span>
              </div>

              <Link
                href={REGISTER_URL}
                className="inline-flex items-center gap-1.5 font-semibold text-amber-300 hover:text-white transition"
              >
                <span>Đăng ký để tự động hóa trích xuất</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

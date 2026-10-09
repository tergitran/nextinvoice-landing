"use client";

import Link from "next/link";
import { ArrowRight, PhoneCall, CheckCircle2 } from "lucide-react";
import { ScrollReveal } from "@/components/motion";

export default function CtaBanner() {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="relative overflow-hidden rounded-3xl border border-blue-200 bg-gradient-to-br from-blue-50/90 via-sky-50/70 to-indigo-50/80 p-8 sm:p-14 lg:p-16 text-slate-950 shadow-sm">
            <div className="relative z-10 mx-auto max-w-3xl text-center">
              <span className="inline-flex items-center rounded-full bg-blue-100/80 px-3.5 py-1 text-xs font-bold text-blue-800 mb-6 border border-blue-200">
                Tặng ngay 50 Hóa đơn trải nghiệm khi Đăng ký mới
              </span>

              <h2 className="text-3xl font-extrabold tracking-tight sm:text-5xl leading-tight text-slate-950">
                Bắt đầu tiết kiệm 85% thời gian <br className="hidden sm:inline" />
                xử lý hóa đơn ngay hôm nay
              </h2>

              <p className="mt-6 text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto font-normal">
                Không cần cài đặt phần mềm phức tạp, không rủi ro pháp lý. Trải nghiệm giải pháp tự động hóa quản lý hóa đơn thông minh cho doanh nghiệp.
              </p>

              {/* Buttons with Primary Blue */}
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
                <Link
                  href="http://localhost:3000/register"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-blue-500/25 transition hover:bg-blue-700 active:scale-[0.98]"
                >
                  <span>Dùng thử miễn phí 50 hóa đơn</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="tel:0901234567"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-7 py-4 text-sm font-bold text-slate-700 shadow-2xs transition hover:bg-slate-50"
                >
                  <PhoneCall className="h-4 w-4 text-slate-500" />
                  <span>Hotline: 090 123 4567</span>
                </a>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-600 font-medium">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Kích hoạt tự động trong 30 giây
                </span>
                <span className="hidden sm:inline text-slate-300">•</span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Không cần thẻ tín dụng
                </span>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

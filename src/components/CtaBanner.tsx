"use client";

import Link from "next/link";
import { ArrowRight, PhoneCall } from "lucide-react";
import { ScrollReveal } from "@/components/motion";

export default function CtaBanner() {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="relative overflow-hidden rounded-3xl bg-slate-950 p-8 sm:p-14 lg:p-16 text-white border border-slate-800 shadow-xl">
            <div className="relative z-10 mx-auto max-w-3xl text-center">
              <span className="inline-flex items-center rounded-full bg-slate-800 px-3.5 py-1 text-xs font-semibold text-slate-300 mb-6 border border-slate-700">
                Tặng ngay 50 Hóa đơn trải nghiệm khi Đăng ký mới
              </span>

              <h2 className="text-3xl font-extrabold tracking-tight sm:text-5xl leading-tight text-white">
                Bắt đầu tiết kiệm 85% thời gian <br className="hidden sm:inline" />
                xử lý hóa đơn ngay hôm nay
              </h2>

              <p className="mt-6 text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl mx-auto font-normal">
                Không cần cài đặt phần mềm phức tạp, không rủi ro pháp lý. Trải nghiệm giải pháp tự động hóa quản lý hóa đơn thông minh cho doanh nghiệp.
              </p>

              {/* Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
                <Link
                  href="http://localhost:3000/register"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-bold text-slate-950 transition hover:bg-slate-100 active:scale-[0.99]"
                >
                  <span>Dùng thử miễn phí 50 hóa đơn</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="tel:0901234567"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-slate-800 bg-slate-900 px-6 py-3.5 text-sm font-semibold text-slate-200 transition hover:bg-slate-800"
                >
                  <PhoneCall className="h-4 w-4" />
                  <span>Hotline: 090 123 4567</span>
                </a>
              </div>

              <div className="mt-8 flex items-center justify-center gap-6 text-xs text-slate-400">
                <span>✓ Kích hoạt tự động trong 30 giây</span>
                <span>•</span>
                <span>✓ Không cần thẻ tín dụng</span>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

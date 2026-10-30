"use client";

import Link from "next/link";
import { ArrowRight, PhoneCall, CheckCircle2 } from "lucide-react";
import { ScrollReveal } from "@/components/motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { REGISTER_URL } from "@/lib/constants";

export default function CtaBanner() {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="relative overflow-hidden rounded-3xl border border-blue-200/80 bg-gradient-to-br from-blue-50/90 via-sky-50/60 to-indigo-50/80 p-8 sm:p-14 lg:p-16 text-slate-950 shadow-sm">
            <div className="relative z-10 mx-auto max-w-3xl text-center">
              <div className="mb-6">
                <Badge variant="blue" size="lg" className="shadow-xs">
                  Tặng ngay 1.000 Hóa đơn trải nghiệm khi Đăng ký mới
                </Badge>
              </div>

              <h2 className="text-3xl font-extrabold tracking-tight sm:text-5xl leading-tight text-slate-950">
                Bắt đầu tiết kiệm 85% thời gian <br className="hidden sm:inline" />
                xử lý hóa đơn ngay hôm nay
              </h2>

              <p className="mt-6 text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto font-normal">
                Không cần cài đặt phần mềm phức tạp, không rủi ro pháp lý. Trải nghiệm giải pháp tự động hóa quản lý hóa đơn thông minh cho doanh nghiệp.
              </p>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
                <Button size="lg" variant="pill" asChild className="w-full sm:w-auto shadow-lg shadow-blue-500/25">
                  <Link href={REGISTER_URL} className="group">
                    <span>Dùng thử miễn phí 1.000 hóa đơn</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>

                <Button size="lg" variant="outline" asChild className="w-full sm:w-auto rounded-full bg-white shadow-xs">
                  <a href="tel:0982548515">
                    <PhoneCall className="h-4 w-4 text-slate-500" />
                    <span>Hotline: 0982 548 515</span>
                  </a>
                </Button>
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

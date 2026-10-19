"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, ChevronRight, ShieldCheck, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { REGISTER_URL } from "@/lib/constants";

export default function HeroSection() {
  return (
    <section className="relative isolate min-h-[580px] lg:min-h-[640px] flex items-center pt-16 pb-20 md:pt-20 md:pb-24 border-b border-slate-200/80 overflow-hidden">
      {/* Background Video Layer spanning full hero */}
      <div className="absolute inset-0 -z-20 overflow-hidden pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="h-full w-full object-cover object-[70%_center] lg:object-center"
        >
          <source src="/Video-background-NextInvoice.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Horizontal Gradient Overlay: Solid white on left for crisp text legibility, transparent on right for video */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-white via-white/95 to-white/30 sm:via-white/90 sm:to-white/15 lg:via-white/85 lg:to-transparent pointer-events-none" />

      {/* Subtle Top & Bottom Gradient to blend seamlessly with Header and Stats section */}
      <div className="absolute inset-x-0 top-0 h-24 -z-10 bg-gradient-to-b from-white/60 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-24 -z-10 bg-gradient-to-t from-white via-white/60 to-transparent pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-2xl text-left">
          {/* Category Pill Badge */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2"
          >
            <Badge variant="blue" size="lg" className="shadow-xs py-1.5 bg-white/90 backdrop-blur-xs border-blue-200">
              <span className="font-semibold">Nền tảng</span>
            </Badge>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl leading-[1.18]"
          >
            Quản lý & Tự động đồng bộ{" "}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 bg-clip-text text-transparent">
              Hóa đơn Điện tử
            </span>{" "}
            từ Cổng Thuế
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4 text-base sm:text-lg text-slate-700 leading-relaxed font-normal"
          >
            Tự động hóa toàn diện quy trình đồng bộ hóa đơn Mua vào - Bán ra trực tiếp từ Cổng Thuế theo thời gian thực, tải trọn bộ XML & PDF gốc có chữ ký số và cảnh báo rủi ro người bán tức thì.
          </motion.p>

          {/* CTA Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <Button size="lg" variant="pill" asChild className="shadow-lg shadow-blue-500/25">
              <Link href={REGISTER_URL} className="group">
                <span>Dùng thử miễn phí</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>

            <Button size="lg" variant="outline" asChild className="rounded-full shadow-xs bg-white/90 backdrop-blur-xs">
              <Link href="/#features" className="group">
                <span>Khám phá tính năng</span>
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 text-slate-400" />
              </Link>
            </Button>
          </motion.div>

          {/* Trust Guarantees */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.32 }}
            className="mt-9 pt-7 border-t border-slate-200/80 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs sm:text-sm font-medium text-slate-700"
          >
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>Không cần cài đặt phần mềm</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-blue-600 shrink-0" />
              <span>Mã hóa bảo mật AES-256</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>Chuẩn Thông tư 78 / NĐ 123</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

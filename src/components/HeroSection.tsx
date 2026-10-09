"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { REGISTER_URL } from "@/lib/constants";

export default function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden min-h-[580px] lg:min-h-[660px] flex items-center pt-24 pb-20 md:pt-28 md:pb-24 border-b border-slate-800 bg-slate-950">
      {/* Background Video Layer */}
      <div className="absolute inset-0 -z-20 overflow-hidden pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="h-full w-full object-cover object-[75%_center] lg:object-center opacity-85"
        >
          <source src="/Video-background-NextInvoice.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Sapo-style Horizontal Vignette: Deep dark on left for text, transparent on right for video */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-slate-950 via-slate-950/85 to-slate-950/25 pointer-events-none" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        {/* Left-Aligned Hero Content (Sapo Style) */}
        <div className="max-w-2xl text-left">
          {/* Category Tag (Sapo Style) */}
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-base sm:text-lg font-normal text-slate-200"
          >
            Nền tảng
          </motion.p>

          {/* Crisp, Balanced Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.2]"
          >
            Quản lý & Tự động đồng bộ <br className="hidden sm:inline" />
            Hóa đơn Điện tử từ Cổng Thuế
          </motion.h1>

          {/* Compact, Highly Readable Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="mt-4 max-w-xl text-sm sm:text-base text-slate-300 leading-relaxed font-normal"
          >
            Tiên phong công nghệ AI giải mã Captcha 0.4s, Next Invoice mang đến giải pháp tự động đồng bộ & quản lý trọn bộ hóa đơn gốc XML, PDF có chữ ký số cho doanh nghiệp và kế toán.
          </motion.p>

          {/* Sapo-style Pill Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <Link
              href={REGISTER_URL}
              className="group inline-flex items-center gap-3 rounded-full bg-blue-600 pl-7 pr-2.5 py-2.5 text-sm sm:text-base font-bold text-white shadow-xl shadow-blue-600/30 transition-all hover:bg-blue-500 active:scale-[0.98]"
            >
              <span>Dùng thử miễn phí</span>
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-blue-600 transition-transform group-hover:translate-x-0.5 shadow-xs">
                <ArrowRight className="h-4 w-4" />
              </div>
            </Link>
            <Link
              href="#features"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-xs transition hover:bg-white/20"
            >
              <span>Xem tính năng</span>
            </Link>
          </motion.div>

          {/* Minimalist Trust Guarantees */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-10 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs font-medium text-slate-400"
          >
            <span className="flex items-center gap-1.5 text-slate-300">
              <span className="text-emerald-400 font-bold">✓</span> Không cần cài đặt phần mềm
            </span>
            <span className="hidden sm:inline text-slate-600">•</span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <span className="text-blue-400 font-bold">✓</span> Bảo mật mã hóa AES-256
            </span>
            <span className="hidden sm:inline text-slate-600">•</span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <span className="text-emerald-400 font-bold">✓</span> Chuẩn Thông tư 78 / NĐ 123
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

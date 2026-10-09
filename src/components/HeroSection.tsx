"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden pt-16 pb-16 md:pt-24 md:pb-24 border-b border-slate-200/70">
      {/* Background Video Layer */}
      <div className="absolute inset-0 -z-20 overflow-hidden pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="h-full w-full object-cover object-center opacity-70"
        >
          <source src="/Video-background-NextInvoice.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Soft Light Overlay for Text Contrast */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white/70 via-white/60 to-white/95 pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          {/* Subtle Monochrome Pill Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200/90 bg-white/80 px-3.5 py-1 text-xs font-medium text-slate-700 shadow-2xs backdrop-blur-md mb-6"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse" />
            <span>Đồng bộ hóa đơn Mua vào & Bán ra trực tiếp từ Tổng cục Thuế</span>
          </motion.div>

          {/* Crisp Editorial Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="max-w-4xl text-3xl font-extrabold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl sm:leading-[1.15]"
          >
            Tự động hóa Quản lý Hóa đơn Điện tử <br className="hidden sm:inline" />
            <span className="text-blue-700">Chính xác & Tiết kiệm 85% thời gian</span>
          </motion.h1>

          {/* Clear Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="mt-6 max-w-2xl text-base sm:text-lg text-slate-600 leading-relaxed font-normal"
          >
            Chấm dứt việc tra cứu thủ công từng tờ hóa đơn. Next Invoice tự động kéo dữ liệu từ Cổng Thuế, giải mã Captcha bằng AI trong 0.4s và hỗ trợ tải trọn bộ file gốc XML, PDF có chữ ký số.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="mt-8 flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto"
          >
            <Link
              href="http://localhost:3000/register"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 active:scale-[0.99]"
            >
              <span>Dùng thử miễn phí 50 hóa đơn</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="#features"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300/80 bg-white/90 px-6 py-3.5 text-sm font-semibold text-slate-700 backdrop-blur-xs transition hover:bg-slate-50 hover:border-slate-400"
            >
              <span>Khám phá tính năng</span>
            </Link>
          </motion.div>

          {/* Minimalist Trust Guarantees */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-9 flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs font-medium text-slate-500"
          >
            <span className="flex items-center gap-1.5">
              <span className="text-emerald-600 font-bold">✓</span> Không cần cài đặt phần mềm
            </span>
            <span className="hidden sm:inline text-slate-300">•</span>
            <span className="flex items-center gap-1.5">
              <span className="text-blue-600 font-bold">✓</span> Bảo mật mã hóa AES-256
            </span>
            <span className="hidden sm:inline text-slate-300">•</span>
            <span className="flex items-center gap-1.5">
              <span className="text-emerald-600 font-bold">✓</span> Chuẩn Thông tư 78 / NĐ 123
            </span>
          </motion.div>

          {/* Minimalist Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-14 flex flex-col items-center justify-center"
          >
            <a
              href="#stats"
              className="group flex flex-col items-center gap-2 text-xs font-medium text-slate-400 transition hover:text-slate-600"
              aria-label="Cuộn xuống xem chi tiết"
            >
              <span className="tracking-widest uppercase text-[10px] font-semibold text-slate-400 group-hover:text-slate-600">
                Cuộn để khám phá
              </span>
              <div className="flex h-7 w-4.5 items-start justify-center rounded-full border border-slate-300/80 p-0.5">
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                  className="h-1.5 w-1 rounded-full bg-slate-400"
                />
              </div>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

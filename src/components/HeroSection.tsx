import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  FileSpreadsheet,
} from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden pt-16 pb-20 md:pt-24 md:pb-28">
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
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white/65 via-white/55 to-white/95 pointer-events-none" />

      {/* Decorative Blur Glow */}
      <div className="absolute top-0 left-1/2 -z-10 -translate-x-1/2 blur-3xl opacity-20 pointer-events-none">
        <div className="h-[400px] w-[800px] bg-gradient-to-tr from-blue-600 via-indigo-500 to-sky-400 rounded-full" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Badges & Tagline */}
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/80 px-4 py-1.5 text-xs sm:text-sm font-semibold text-blue-700 shadow-xs mb-6 backdrop-blur-xs">
            <Sparkles className="h-4 w-4 text-blue-600" />
            <span>Đồng bộ hóa đơn Mua vào & Bán ra từ Cổng Tổng cục Thuế</span>
          </div>

          <h1 className="max-w-4xl text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl sm:leading-[1.15]">
            Tự động hóa Quản lý Hóa đơn Điện tử <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 bg-clip-text text-transparent">
              Chính xác & Tiết kiệm 85% thời gian
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-base sm:text-lg text-slate-600 leading-relaxed">
            Chấm dứt việc tra cứu và tải hóa đơn thủ công. Next Invoice hỗ trợ đồng bộ hóa đơn Mua vào & Bán ra, giải Captcha bằng AI, hỗ trợ tải file gốc XML & PDF từ các nhà cung cấp phổ biến và kiểm tra trạng thái người bán tức thì.
          </p>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Link
              href="http://localhost:3000/register"
              className="w-full sm:w-auto group inline-flex items-center justify-center gap-2.5 rounded-xl bg-blue-600 px-8 py-4 text-base font-bold text-white shadow-lg shadow-blue-500/25 transition-all hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-500/35 active:scale-[0.98]"
            >
              <span>Dùng thử miễn phí 50 hóa đơn</span>
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="#features"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-7 py-4 text-base font-bold text-slate-700 shadow-xs transition hover:bg-slate-50 hover:border-slate-400"
            >
              <FileSpreadsheet className="h-5 w-5 text-slate-500" />
              <span>Xem Demo tính năng</span>
            </Link>
          </div>

          {/* Trust Guarantees */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm font-medium text-slate-600">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              <span>Không cần cài đặt phần mềm phức tạp</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-blue-600" />
              <span>Bảo mật chuẩn mã hóa AES-256</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              <span>Chuẩn Thông tư 78 / Nghị định 123</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

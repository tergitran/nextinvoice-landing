import Link from "next/link";
import { ArrowRight, Sparkles, PhoneCall, ShieldCheck } from "lucide-react";

export default function CtaBanner() {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-700 via-indigo-700 to-blue-900 p-8 sm:p-14 lg:p-16 text-white shadow-2xl">
          {/* Subtle Glows */}
          <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-3.5 py-1 text-xs font-bold text-blue-200 mb-6">
              <Sparkles className="h-4 w-4 text-amber-300" />
              <span>Tặng ngay 50 Hóa đơn trải nghiệm khi Đăng ký mới</span>
            </div>

            <h2 className="text-3xl font-extrabold tracking-tight sm:text-5xl leading-tight">
              Bắt đầu tiết kiệm 85% thời gian <br className="hidden sm:inline" />
              kê khai hóa đơn ngay hôm nay
            </h2>

            <p className="mt-6 text-sm sm:text-base text-blue-100 leading-relaxed max-w-2xl mx-auto">
              Không cần cài đặt phức tạp, không rủi ro pháp lý. Trải nghiệm giải pháp tự động hóa quản lý hóa đơn thông minh hàng đầu hiện nay.
            </p>

            {/* Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="http://localhost:3000/register"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-xl bg-white px-8 py-4 text-base font-extrabold text-blue-700 shadow-xl transition-all hover:bg-blue-50 active:scale-[0.98]"
              >
                <span>Dùng thử miễn phí 50 hóa đơn</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              <a
                href="tel:0901234567"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-4 text-base font-bold text-white transition hover:bg-white/20"
              >
                <PhoneCall className="h-5 w-5" />
                <span>Hotline: 090 123 4567</span>
              </a>
            </div>

            <div className="mt-8 flex items-center justify-center gap-6 text-xs text-blue-200">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                <span>Kích hoạt tự động trong 30 giây</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                <span>Không cần thẻ tín dụng</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

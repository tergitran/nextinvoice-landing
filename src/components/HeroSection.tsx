import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  FileCheck2,
  Sparkles,
  ShieldCheck,
  Download,
  AlertTriangle,
  RefreshCw,
  FileSpreadsheet,
} from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-32">
      {/* Background Video Layer */}
      <div className="absolute inset-0 -z-30 overflow-hidden pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover object-center opacity-40"
        >
          <source src="/Video-background-NextInvoice.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Soft Gradient Overlay for Text Readability */}
      <div className="absolute inset-0 -z-20 bg-gradient-to-b from-white/90 via-white/80 to-white pointer-events-none" />

      {/* Decorative Blur Glow */}
      <div className="absolute top-0 left-1/2 -z-10 -translate-x-1/2 blur-3xl opacity-25 pointer-events-none">
        <div className="h-[400px] w-[800px] bg-gradient-to-tr from-blue-600 via-indigo-500 to-sky-400 rounded-full" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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

        {/* Product UI Mockup (Interactive Style) */}
        <div className="mt-14 sm:mt-20 glow-effect">
          <div className="relative mx-auto max-w-5xl rounded-2xl border border-slate-200/90 bg-white p-2.5 sm:p-4 shadow-2xl shadow-slate-300/40">
            {/* Mockup Browser Top Bar */}
            <div className="mb-3 flex items-center justify-between border-b border-slate-100 pb-3 px-2">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-rose-400" />
                <div className="h-3 w-3 rounded-full bg-amber-400" />
                <div className="h-3 w-3 rounded-full bg-emerald-400" />
                <div className="ml-3 hidden sm:flex items-center gap-2 rounded-md bg-slate-100 px-3 py-1 text-xs text-slate-500 font-mono">
                  <span>https://app.nextinvoice.vn/invoices</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
                  Đồng bộ theo kỳ tra cứu
                </span>
              </div>
            </div>

            {/* Dashboard Content Mockup */}
            <div className="rounded-xl bg-slate-50/80 p-3 sm:p-5">
              {/* Stat Cards Row */}
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 mb-4">
                <div className="rounded-xl bg-white p-3.5 border border-slate-200/70 shadow-2xs">
                  <span className="text-xs font-medium text-slate-500">Tổng hóa đơn tháng này</span>
                  <div className="mt-1 flex items-baseline justify-between">
                    <span className="text-xl sm:text-2xl font-extrabold text-slate-900">1.428</span>
                    <span className="text-xs font-semibold text-emerald-600">+18%</span>
                  </div>
                </div>
                <div className="rounded-xl bg-white p-3.5 border border-slate-200/70 shadow-2xs">
                  <span className="text-xs font-medium text-slate-500">Hóa đơn Mua vào</span>
                  <div className="mt-1 flex items-baseline justify-between">
                    <span className="text-xl sm:text-2xl font-extrabold text-blue-600">895</span>
                    <span className="text-xs text-slate-400">Đã kiểm tra</span>
                  </div>
                </div>
                <div className="rounded-xl bg-white p-3.5 border border-slate-200/70 shadow-2xs">
                  <span className="text-xs font-medium text-slate-500">Hỗ trợ tải PDF/XML gốc</span>
                  <div className="mt-1 flex items-baseline justify-between">
                    <span className="text-xl sm:text-2xl font-extrabold text-emerald-600">~80%</span>
                    <span className="text-xs font-semibold text-emerald-600">Các NCC lớn</span>
                  </div>
                </div>
                <div className="rounded-xl bg-white p-3.5 border border-slate-200/70 shadow-2xs">
                  <span className="text-xs font-medium text-slate-500">Cảnh báo rủi ro thuế</span>
                  <div className="mt-1 flex items-baseline justify-between">
                    <span className="text-xl sm:text-2xl font-extrabold text-amber-600">1 NCC</span>
                    <span className="text-xs font-semibold text-amber-600">Chú ý</span>
                  </div>
                </div>
              </div>

              {/* Table Preview */}
              <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="border-b border-slate-100 bg-slate-50/75 text-slate-500 font-semibold">
                    <tr>
                      <th className="py-2.5 px-3">Ký hiệu & Số</th>
                      <th className="py-2.5 px-3">Người bán / Nhà cung cấp</th>
                      <th className="py-2.5 px-3">Tổng tiền (VNĐ)</th>
                      <th className="py-2.5 px-3">Nhà cung cấp HĐĐT</th>
                      <th className="py-2.5 px-3 text-center">Bản gốc</th>
                      <th className="py-2.5 px-3 text-right">Trạng thái TCT</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-2.5 px-3 font-semibold text-slate-900">
                        1C26TTA • <span className="font-mono text-blue-600">0004521</span>
                      </td>
                      <td className="py-2.5 px-3 font-medium">CÔNG TY TNHH VIỄN THÔNG V-CONNECT</td>
                      <td className="py-2.5 px-3 font-mono font-semibold">15.400.000</td>
                      <td className="py-2.5 px-3">
                        <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700 border border-blue-200">
                          VNPT-Invoice
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-center">
                        <span className="inline-flex gap-1 text-[11px] font-bold">
                          <span className="rounded bg-slate-100 px-1.5 py-0.5 text-slate-600">XML</span>
                          <span className="rounded bg-rose-50 px-1.5 py-0.5 text-rose-600">PDF</span>
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-right">
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                          <CheckCircle2 className="h-3 w-3" /> Hợp lệ
                        </span>
                      </td>
                    </tr>

                    <tr className="hover:bg-slate-50/50">
                      <td className="py-2.5 px-3 font-semibold text-slate-900">
                        1C26MYY • <span className="font-mono text-blue-600">0001890</span>
                      </td>
                      <td className="py-2.5 px-3 font-medium">CÔNG TY CỔ PHẦN DỊCH VỤ AN MINH</td>
                      <td className="py-2.5 px-3 font-mono font-semibold">42.850.000</td>
                      <td className="py-2.5 px-3">
                        <span className="inline-flex items-center rounded-md bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700 border border-emerald-200">
                          MISA meInvoice
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-center">
                        <span className="inline-flex gap-1 text-[11px] font-bold">
                          <span className="rounded bg-slate-100 px-1.5 py-0.5 text-slate-600">XML</span>
                          <span className="rounded bg-rose-50 px-1.5 py-0.5 text-rose-600">PDF</span>
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-right">
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                          <CheckCircle2 className="h-3 w-3" /> Hợp lệ
                        </span>
                      </td>
                    </tr>

                    <tr className="hover:bg-slate-50/50 bg-amber-50/30">
                      <td className="py-2.5 px-3 font-semibold text-slate-900">
                        2C26TBB • <span className="font-mono text-blue-600">0000742</span>
                      </td>
                      <td className="py-2.5 px-3 font-medium">CÔNG TY TNHH THƯƠNG MẠI HẢI ĐĂNG</td>
                      <td className="py-2.5 px-3 font-mono font-semibold">6.200.000</td>
                      <td className="py-2.5 px-3">
                        <span className="inline-flex items-center rounded-md bg-purple-50 px-2 py-0.5 text-xs font-medium text-purple-700 border border-purple-200">
                          Viettel S-Invoice
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-center">
                        <span className="inline-flex gap-1 text-[11px] font-bold">
                          <span className="rounded bg-slate-100 px-1.5 py-0.5 text-slate-600">XML</span>
                          <span className="rounded bg-rose-50 px-1.5 py-0.5 text-rose-600">PDF</span>
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-right">
                        <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-800">
                          <AlertTriangle className="h-3 w-3" /> NCC tạm dừng
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Floating Quick Feature Pill */}
            <div className="absolute -bottom-5 -right-3 sm:right-6 hidden sm:flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 shadow-lg">
              <div className="rounded-lg bg-blue-100 p-1.5 text-blue-600">
                <RefreshCw className="h-4 w-4 text-blue-600" />
              </div>
              <div className="text-xs">
                <span className="font-bold text-slate-800">Tự động giải Captcha bằng AI</span>
                <p className="text-slate-500">Đã giải mã Captcha TCT trong 0.4s • Kéo 28 hóa đơn</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

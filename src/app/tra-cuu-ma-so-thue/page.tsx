import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CtaBanner from '@/components/CtaBanner';
import { TaxLookupTool } from '@/components/tax-lookup/TaxLookupTool';
import { ShieldCheck, Zap, Download, Lock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Tra cứu Mã số thuế Doanh nghiệp Hàng loạt Miễn phí | Next Invoice',
  description:
    'Công cụ tra cứu mã số thuế doanh nghiệp hàng loạt miễn phí, kết nối trực tiếp Cổng Hóa đơn điện tử Tổng cục Thuế (TCT). Kiểm tra tình trạng hoạt động, cơ quan thuế quản lý và xuất file Excel tức thì.',
  keywords: [
    'tra cứu mã số thuế',
    'tra cứu mst hàng loạt',
    'kiểm tra mã số thuế doanh nghiệp',
    'tra cứu tình trạng hoạt động mst',
    'tra cứu mst tổng cục thuế',
    'kiểm tra rủi ro hóa đơn',
    'mst tct',
  ],
  alternates: {
    canonical: 'https://nextinvoice.pro.vn/tra-cuu-ma-so-thue',
  },
  openGraph: {
    title: 'Tra cứu Mã số thuế Doanh nghiệp Hàng loạt Chuẩn Tổng cục Thuế | Next Invoice',
    description:
      'Kiểm tra tình trạng hoạt động MST công ty, chi nhánh siêu tốc (~100ms/MST). Hỗ trợ tra cứu đến 50 MST miễn phí và xuất file Excel tiện lợi.',
    url: 'https://nextinvoice.pro.vn/tra-cuu-ma-so-thue',
    siteName: 'Next Invoice',
    locale: 'vi_VN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tra cứu Mã số thuế Doanh nghiệp Hàng loạt | Next Invoice',
    description: 'Tra cứu trạng thái mã số thuế doanh nghiệp hàng loạt trực tiếp từ Cổng TCT.',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Công cụ Tra cứu Mã số thuế Doanh nghiệp Hàng loạt Next Invoice',
  url: 'https://nextinvoice.pro.vn/tra-cuu-ma-so-thue',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'All',
  description:
    'Công cụ tra cứu tình trạng hoạt động mã số thuế doanh nghiệp hàng loạt trực tiếp từ Cổng Tổng cục Thuế, hỗ trợ xuất file Excel miễn phí.',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'VND',
  },
};

export default function TaxLookupPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-slate-100 overflow-x-hidden w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />

      <main className="flex-1 overflow-x-hidden w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        {/* Breadcrumb & Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3.5 py-1 text-xs font-semibold text-blue-400 mb-4">
            <Link href="/" className="hover:text-blue-300 transition">
              Trang chủ
            </Link>
            <span>/</span>
            <span>Công cụ tiện ích</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Tra cứu Mã số thuế Doanh nghiệp <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-emerald-400 bg-clip-text text-transparent">Hàng loạt</span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            Kiểm tra trạng thái hoạt động doanh nghiệp thời gian thực từ Cổng Tổng cục Thuế (TCT). Nhanh chóng, chính xác & miễn phí cho kế toán viên.
          </p>

          {/* Value Badges */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm text-slate-300">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-900 border border-slate-800 px-3 py-1">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>Dữ liệu Cổng TCT trực tiếp</span>
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-900 border border-slate-800 px-3 py-1">
              <Zap className="h-4 w-4 text-amber-400" />
              <span>Tốc độ ~100ms/MST</span>
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-900 border border-slate-800 px-3 py-1">
              <Download className="h-4 w-4 text-blue-400" />
              <span>Xuất Excel kết quả</span>
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-900 border border-slate-800 px-3 py-1">
              <Lock className="h-4 w-4 text-indigo-400" />
              <span>Miễn phí 100% vãng lai</span>
            </span>
          </div>
        </div>

        {/* Main Interactive Tool Component */}
        <TaxLookupTool />

        {/* Information & Guide Section for SEO */}
        <section className="mt-20 pt-16 border-t border-slate-800/80 space-y-12">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Hiểu rõ các Trạng thái Mã số thuế Doanh nghiệp
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              Tổng hợp phân loại tình trạng người nộp thuế theo chuẩn Thông tư 78 và quy định Tổng cục Thuế:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6 space-y-2">
              <div className="text-emerald-400 font-bold text-base flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                <span>Đang hoạt động (Mã 00)</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Người nộp thuế đang hoạt động bình thường, chấp hành đầy đủ nghĩa vụ thuế và được phép xuất/nhận hóa đơn điện tử hợp lệ.
              </p>
            </div>

            <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-6 space-y-2">
              <div className="text-amber-400 font-bold text-base flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                <span>Tạm nghỉ kinh doanh (Mã 05)</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Doanh nghiệp đã đăng ký tạm ngừng kinh doanh có thời hạn với cơ quan quản lý. Trong thời gian này, doanh nghiệp không được phép phát hành hóa đơn mới.
              </p>
            </div>

            <div className="rounded-2xl border border-rose-500/20 bg-rose-500/5 p-6 space-y-2">
              <div className="text-rose-400 font-bold text-base flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                <span>Không hoạt động tại địa chỉ (Mã 06)</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Người nộp thuế bỏ trốn hoặc không hoạt động tại địa chỉ đã đăng ký. Hóa đơn phát sinh từ các đơn vị này tiềm ẩn rủi ro rất cao bị cơ quan thuế truy thu.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-2">
              <div className="text-slate-200 font-bold text-base flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-slate-400" />
                <span>Ngừng hoạt động / Đóng MST (Mã 01, 03)</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Doanh nghiệp đã hoàn tất thủ tục chấm dứt hiệu lực MST hoặc tạm ngừng kinh doanh chưa đóng mã số thuế.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-2">
              <div className="text-slate-200 font-bold text-base flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-slate-400" />
                <span>Đang làm thủ tục giải thể (Mã 04)</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Đơn vị đang trong quy trình thanh lý tài sản và giải thể pháp nhân với Sở Kế hoạch Đầu tư và Cơ quan Thuế.
              </p>
            </div>

            <div className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-6 space-y-2">
              <div className="text-blue-400 font-bold text-base flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-blue-400" />
                <span>Chuyển cơ quan thuế (Mã 02)</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Người nộp thuế đang thực hiện chuyển đổi địa bàn hành chính hoặc cơ quan quản lý thuế trực tiếp.
              </p>
            </div>
          </div>
        </section>

        {/* Call to action section */}
        <div className="mt-20">
          <CtaBanner />
        </div>
      </main>

      <Footer />
    </div>
  );
}

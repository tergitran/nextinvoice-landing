import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CtaBanner from '@/components/CtaBanner';
import { XmlReaderTool } from '@/components/xml-viewer/XmlReaderTool';
import { ShieldCheck, Zap, Printer, Lock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Đọc File XML Hóa đơn Điện tử Chuẩn Tổng Cục Thuế Miễn phí | Next Invoice',
  description:
    'Công cụ đọc file XML hóa đơn điện tử trực tiếp trên trình duyệt, bảo mật 100%, không upload file lên máy chủ. Hiển thị mẫu hóa đơn chuẩn Bộ Tài chính và in PDF tức thì.',
  keywords: [
    'đọc file xml hóa đơn',
    'xem file xml hóa đơn điện tử',
    'doc file xml thong tu 78',
    'chuyển xml sang pdf hóa đơn',
    'mở file xml hóa đơn tct',
    'phần mềm đọc file xml',
    'xml viewer e-invoice',
  ],
  alternates: {
    canonical: 'https://nextinvoice.pro.vn/doc-file-xml',
  },
  openGraph: {
    title: 'Đọc File XML Hóa đơn Điện tử Chuẩn Bộ Tài chính | Next Invoice',
    description:
      'Đọc file XML hóa đơn điện tử 100% Client-side. Bảo mật thông tin tuyệt đối, xem mẫu in chuẩn TCT và tải PDF miễn phí.',
    url: 'https://nextinvoice.pro.vn/doc-file-xml',
    siteName: 'Next Invoice',
    locale: 'vi_VN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Đọc File XML Hóa đơn Điện tử Miễn phí | Next Invoice',
    description: 'Đọc file XML hóa đơn điện tử và in PDF chuẩn Bộ Tài chính.',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Công cụ Đọc File XML Hóa đơn Điện tử Next Invoice',
  url: 'https://nextinvoice.pro.vn/doc-file-xml',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'All',
  description:
    'Công cụ đọc và hiển thị file XML hóa đơn điện tử trực tiếp trên trình duyệt, không upload file lên server, hỗ trợ in PDF chuẩn Thông tư 78.',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'VND',
  },
};

export default function XmlReaderPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-slate-100 overflow-x-hidden w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="no-print">
        <Navbar />
      </div>

      <main className="flex-1 overflow-x-hidden w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        {/* Breadcrumb & Hero Header */}
        <div className="no-print text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-400 mb-4">
            <Link href="/" className="hover:text-emerald-300 transition">
              Trang chủ
            </Link>
            <span>/</span>
            <span>Công cụ tiện ích</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Đọc File XML Hóa đơn Điện tử <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-blue-400 bg-clip-text text-transparent">Chuẩn Bộ Tài chính</span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            Xem nội dung hóa đơn điện tử trực tiếp trên trình duyệt theo mẫu in chuẩn Thông tư 78 &amp; Nghị định 123. Hoàn toàn bảo mật, không upload dữ liệu lên server.
          </p>

          {/* Value Badges */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm text-slate-300">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-900 border border-slate-800 px-3 py-1">
              <Lock className="h-4 w-4 text-emerald-400" />
              <span>Bảo mật 100% Client-side</span>
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-900 border border-slate-800 px-3 py-1">
              <Zap className="h-4 w-4 text-amber-400" />
              <span>Mở tức thì &lt; 1 giây</span>
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-900 border border-slate-800 px-3 py-1">
              <ShieldCheck className="h-4 w-4 text-blue-400" />
              <span>Mẫu chuẩn Thông tư 78</span>
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-900 border border-slate-800 px-3 py-1">
              <Printer className="h-4 w-4 text-indigo-400" />
              <span>In &amp; Lưu file PDF</span>
            </span>
          </div>
        </div>

        {/* Main Interactive Tool Component */}
        <XmlReaderTool />

        {/* Information & Features Section for SEO */}
        <section className="no-print mt-20 pt-16 border-t border-slate-800/80 space-y-12">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Tại sao nên đọc file XML hóa đơn với Next Invoice?
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              Giải pháp đọc file XML an toàn, tiện lợi và tương thích với 100% nhà cung cấp hóa đơn điện tử tại Việt Nam:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6 space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <Lock className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Bảo mật thông tin tuyệt đối</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Tất cả quá trình bóc tách dữ liệu XML diễn ra cục bộ trên trình duyệt (Client-side) của bạn. Không có bất kỳ dữ liệu hóa đơn, thông tin tài chính hay giá trị đơn hàng nào bị tải lên máy chủ.
              </p>
            </div>

            <div className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-6 space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Hiển thị chuẩn mẫu Tổng cục Thuế</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Tái hiện chính xác mẫu phôi hóa đơn của Bộ Tài chính với đầy đủ thông tin: Mã cơ quan thuế cấp (MCCQT), khung hoa văn, chữ ký số điện tử hợp lệ và bảng kê chi tiết từng dòng thuế suất.
              </p>
            </div>

            <div className="rounded-2xl border border-indigo-500/20 bg-indigo-500/5 p-6 space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                <Printer className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-white">In &amp; Lưu PDF tức thì</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Hỗ trợ định dạng in A4 chuẩn trang in quốc tế. Bạn có thể bấm nút In hoặc nhấn phím tắt <code className="text-blue-400 font-mono">Ctrl + P</code> để lưu hóa đơn sang định dạng PDF sắc nét.
              </p>
            </div>
          </div>

          {/* Guide Steps */}
          <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 sm:p-10">
            <h3 className="text-xl font-bold text-white mb-6">
              Hướng dẫn xem file XML hóa đơn điện tử chỉ trong 3 bước:
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-white font-bold text-sm">
                  1
                </div>
                <div>
                  <h4 className="font-semibold text-white text-sm">Chọn hoặc Kéo thả file XML</h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    Kéo file có đuôi <code className="text-blue-400 font-mono">.xml</code> từ máy tính và thả vào khung tải lên hoặc nhấp chuột để chọn tệp tin.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-white font-bold text-sm">
                  2
                </div>
                <div>
                  <h4 className="font-semibold text-white text-sm">Xem chi tiết hóa đơn</h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    Hệ thống tự động phân tích và hiển thị nội dung theo đúng biểu mẫu in chuẩn của Cổng Hóa đơn điện tử Quốc gia.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-white font-bold text-sm">
                  3
                </div>
                <div>
                  <h4 className="font-semibold text-white text-sm">In hoặc Lưu file PDF</h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    Nhấp vào nút <strong className="text-white">In / Lưu PDF</strong> để xuất hóa đơn ra giấy hoặc lưu thành file PDF phục vụ công tác kế toán.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <div className="no-print mt-20">
          <CtaBanner />
        </div>
      </main>

      <div className="no-print">
        <Footer />
      </div>
    </div>
  );
}

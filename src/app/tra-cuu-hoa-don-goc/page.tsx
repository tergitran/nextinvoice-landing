import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CtaBanner from '@/components/CtaBanner';
import { OriginalInvoiceTool } from '@/components/original-invoice/OriginalInvoiceTool';
import { ShieldCheck, Zap, Lock, FileCheck2, HelpCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Tra Cứu & Tải Hóa Đơn PDF Gốc Từ Nhà Cung Cấp Miễn Phí | Next Invoice',
  description:
    'Công cụ tra cứu và xem hóa đơn PDF gốc có chữ ký số điện tử từ VNPT, Viettel, MISA, BKAV, EasyInvoice, WinInvoice... trực tiếp từ file XML. Tự động nhận diện nhà cung cấp và tải file gốc chuẩn xác.',
  keywords: [
    'tra cứu hóa đơn gốc',
    'tải pdf gốc hóa đơn',
    'xem pdf gốc từ xml',
    'chuyển xml sang pdf gốc',
    'tra cứu hóa đơn viettel pdf',
    'tải hóa đơn vnpt gốc',
    'tải hóa đơn misa gốc pdf',
    'hóa đơn điện tử có chữ ký số gốc',
    'trích xuất pdf từ file xml',
  ],
  alternates: {
    canonical: 'https://nextinvoice.pro.vn/tra-cuu-hoa-don-goc',
  },
  openGraph: {
    title: 'Tra Cứu & Tải Hóa Đơn PDF Gốc Từ Nhà Cung Cấp | Next Invoice',
    description:
      'Tải và xem file PDF gốc có chữ ký số điện tử từ hơn 15 nhà cung cấp hóa đơn điện tử lớn nhất Việt Nam. Trích xuất tự động qua file XML.',
    url: 'https://nextinvoice.pro.vn/tra-cuu-hoa-don-goc',
    siteName: 'Next Invoice',
    locale: 'vi_VN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tra Cứu Hóa Đơn PDF Gốc Từ Nhà Cung Cấp | Next Invoice',
    description: 'Trích xuất file PDF gốc có chữ ký số từ VNPT, Viettel, MISA, BKAV từ file XML.',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Công cụ Tra Cứu Hóa Đơn PDF Gốc Next Invoice',
  url: 'https://nextinvoice.pro.vn/tra-cuu-hoa-don-goc',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'All',
  description:
    'Công cụ tra cứu và trích xuất file PDF hóa đơn gốc có chữ ký số trực tiếp từ cổng các nhà cung cấp phát hành thông qua file XML.',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'VND',
  },
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Làm thế nào để lấy được file PDF gốc từ file XML hóa đơn?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Hệ thống Next Invoice tự động bóc tách mã tra cứu (fkey, mã số bí mật, reservation code) và địa chỉ cổng tra cứu của nhà cung cấp từ file XML, sau đó tự động kết nối và trích xuất file PDF gốc có chữ ký số điện tử.',
      },
    },
    {
      '@type': 'Question',
      name: 'Công cụ hỗ trợ tải PDF gốc từ những nhà cung cấp nào?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Hệ thống hỗ trợ hơn 15 nhà cung cấp phổ biến tại Việt Nam bao gồm: Viettel S-Invoice, VNPT Invoice, MISA meInvoice, BKAV eHoadon, EasyInvoice (Softdreams), Thái Sơn (E-Invoice), WinInvoice, Sapo, VETC, v.v.',
      },
    },
    {
      '@type': 'Question',
      name: 'Nếu nhà cung cấp chưa hỗ trợ tải file gốc thì sao?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Nếu nhà cung cấp chưa hỗ trợ trích xuất tự động hoặc cổng tra cứu tạm gián đoạn, hệ thống sẽ tự động hiển thị Bản thể hiện chuẩn mẫu Tổng cục Thuế với đầy đủ số liệu, mã QR và chữ ký số để bạn xem và in ấn.',
      },
    },
  ],
};

export default function OriginalInvoiceLookupPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-slate-100 overflow-x-clip w-full print:min-h-0 print:bg-white print:text-black print:overflow-visible print:block print:p-0 print:m-0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="no-print print:hidden">
        <Navbar />
      </div>

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 w-full print:p-0 print:m-0 print:max-w-none">
        {/* Hero Section */}
        <div className="no-print print:hidden text-center max-w-3xl mx-auto mb-10 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 text-xs font-semibold text-purple-400">
            <Zap className="h-3.5 w-3.5" />
            <span>Tiện ích tra cứu hóa đơn gốc độc quyền</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Tra Cứu &amp; Xem File{' '}
            <span className="bg-linear-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              PDF Hóa Đơn Gốc
            </span>{' '}
            Từ Nhà Cung Cấp
          </h1>

          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Tải và xem file PDF gốc có chữ ký số điện tử của bên bán từ Cổng phát hành (VNPT, Viettel, MISA, BKAV, EasyInvoice...) chỉ bằng 1 thao tác tải file XML.
          </p>
        </div>

        {/* Interactive Tool Area */}
        <OriginalInvoiceTool />

        {/* Value Proposition Highlights */}
        <section className="no-print print:hidden mt-20 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl font-bold text-white">
              Tại sao nên tra cứu PDF gốc tại Next Invoice?
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm">
              Giải pháp toàn diện giúp kế toán và doanh nghiệp quản lý hồ sơ hóa đơn hợp lệ chuẩn pháp lý
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-purple-500/20 bg-purple-500/5 p-6 space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
                <FileCheck2 className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-white">File PDF gốc có chữ ký số</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Trích xuất trực tiếp bản thể hiện gốc từ nhà cung cấp phát hành hóa đơn với đầy đủ phôi riêng, con dấu đỏ và chữ ký số điện tử hợp pháp của người bán.
              </p>
            </div>

            <div className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-6 space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Tự động fallback mẫu TCT</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Nếu cổng nhà cung cấp tạm thời gián đoạn hoặc chưa hỗ trợ, hệ thống tự động hiển thị Bản thể hiện chuẩn Tổng cục Thuế để công việc kế toán không bị gián đoạn.
              </p>
            </div>

            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6 space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <Lock className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Bảo mật dữ liệu tuyệt đối</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Tất cả dữ liệu XML được phân tích bảo mật, không lưu trữ trái phép thông tin hóa đơn hay bí mật kinh doanh của doanh nghiệp bạn.
              </p>
            </div>
          </div>

          {/* FAQ Accordion Section for SEO */}
          <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 sm:p-10 space-y-6">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                <HelpCircle className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-bold text-white">Câu hỏi thường gặp về Tra cứu Hóa đơn Gốc</h3>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-300">
              <div className="rounded-xl border border-slate-800/80 bg-slate-950/40 p-4 space-y-1.5">
                <h4 className="font-bold text-white text-sm">1. File XML lấy từ đâu để tra cứu?</h4>
                <p className="text-slate-400 leading-relaxed">
                  Bạn có thể dùng file XML tải về từ email nhận hóa đơn người bán gửi, hoặc file XML kết xuất từ phần mềm kế toán, Cổng Hóa đơn điện tử của Tổng cục Thuế.
                </p>
              </div>

              <div className="rounded-xl border border-slate-800/80 bg-slate-950/40 p-4 space-y-1.5">
                <h4 className="font-bold text-white text-sm">2. Làm sao để tải hàng loạt file PDF gốc không bị giới hạn 10 HĐ/giờ?</h4>
                <p className="text-slate-400 leading-relaxed">
                  Bạn có thể bấm &quot;Đăng ký sử dụng&quot; tài khoản Next Invoice để hệ thống tự động kết nối và đồng bộ toàn bộ hóa đơn từ Tổng cục Thuế, tự động cào và lưu trữ file PDF gốc hàng loạt dạng file nén ZIP một cú nhấp chuột.
                </p>
              </div>

              <div className="rounded-xl border border-slate-800/80 bg-slate-950/40 p-4 space-y-1.5">
                <h4 className="font-bold text-white text-sm">3. Gặp sự cố không tải được PDF gốc thì liên hệ ai?</h4>
                <p className="text-slate-400 leading-relaxed">
                  Bạn vui lòng gọi trực tiếp Hotline kỹ thuật:{' '}
                  <a href="tel:0982548515" className="font-bold text-white underline hover:text-blue-400">0982 548 515</a>{' '}
                  để được đội ngũ kỹ thuật viên Next Invoice hỗ trợ kiểm tra cổng tra cứu riêng của nhà cung cấp.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <div className="no-print print:hidden mt-20">
          <CtaBanner />
        </div>
      </main>

      <div className="no-print print:hidden">
        <Footer />
      </div>
    </div>
  );
}

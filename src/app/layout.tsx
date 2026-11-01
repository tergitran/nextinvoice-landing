import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nextinvoice.pro.vn"),
  title: {
    default: "Next Invoice — Phần mềm Quản lý & Tự động Đồng bộ Hóa đơn Điện tử",
    template: "%s | Next Invoice",
  },
  description:
    "Giải pháp tự động hóa quản lý hóa đơn điện tử cho doanh nghiệp & đại lý kế toán. Đồng bộ hóa đơn Mua vào - Bán ra từ Tổng cục Thuế, hỗ trợ tải file XML & PDF gốc từ các nhà cung cấp phổ biến.",
  keywords: [
    "hóa đơn điện tử",
    "đồng bộ hóa đơn tổng cục thuế",
    "phần mềm kế toán",
    "tải hóa đơn xml pdf",
    "quản lý hóa đơn mua vào bán ra",
    "kiểm tra rủi ro hóa đơn",
    "nextinvoice",
    "next invoice",
    "nextinvoice.pro.vn",
  ],
  alternates: {
    canonical: "https://nextinvoice.pro.vn",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Next Invoice — Tự động Đồng bộ Hóa đơn Điện tử Chuẩn Tổng cục Thuế",
    description:
      "Tiết kiệm 85% thời gian kế toán. Tự động hóa 100% quy trình thu thập, tra cứu, tải file gốc và kiểm tra hóa đơn điện tử.",
    url: "https://nextinvoice.pro.vn",
    siteName: "Next Invoice",
    locale: "vi_VN",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Next Invoice — Phần mềm Quản lý & Tự động Đồng bộ Hóa đơn Điện tử",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Next Invoice — Phần mềm Quản lý Hóa đơn Điện tử",
    description: "Tự động hóa đồng bộ hóa đơn Mua vào & Bán ra từ Cổng Thuế.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/manifest.webmanifest",
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Next Invoice",
    alternateName: ["NextInvoice", "nextinvoice.pro.vn", "Phần mềm Next Invoice"],
    url: "https://nextinvoice.pro.vn",
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Next Invoice",
    url: "https://nextinvoice.pro.vn",
    logo: "https://nextinvoice.pro.vn/icon-512.png",
    description:
      "Nền tảng phần mềm tự động hóa quản lý hóa đơn điện tử cho doanh nghiệp và kế toán.",
  },
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Next Invoice",
    url: "https://nextinvoice.pro.vn",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description:
      "Phần mềm tự động hóa đồng bộ, lưu trữ và quản lý hóa đơn điện tử mua vào và bán ra trực tiếp từ Tổng cục Thuế theo Thông tư 78/NĐ 123.",
    offers: {
      "@type": "Offer",
      price: "290000",
      priceCurrency: "VND",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: [
      {
        "@type": "SiteNavigationElement",
        position: 1,
        name: "Tra cứu Mã số thuế",
        description:
          "Tra cứu thông tin trạng thái hoạt động của doanh nghiệp từ Tổng cục Thuế.",
        url: "https://nextinvoice.pro.vn/tra-cuu-ma-so-thue",
      },
      {
        "@type": "SiteNavigationElement",
        position: 2,
        name: "Đọc file XML Hóa đơn",
        description:
          "Xem trực quan, giải mã và in hóa đơn điện tử từ file XML chuẩn cơ quan Thuế.",
        url: "https://nextinvoice.pro.vn/doc-file-xml",
      },
      {
        "@type": "SiteNavigationElement",
        position: 3,
        name: "Bảng giá gói cước",
        description:
          "Bảng giá các gói hạn mức hóa đơn điện tử Next Invoice linh hoạt và tiết kiệm.",
        url: "https://nextinvoice.pro.vn/#pricing",
      },
      {
        "@type": "SiteNavigationElement",
        position: 4,
        name: "Đăng ký tài khoản",
        description:
          "Tạo tài khoản Next Invoice nhận ngay 5.000 hóa đơn dùng thử miễn phí.",
        url: "https://app.nextinvoice.pro.vn/register",
      },
    ],
  },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${inter.variable} scroll-smooth antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}

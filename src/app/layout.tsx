import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Next Invoice — Phần mềm Quản lý & Tự động Đồng bộ Hóa đơn Điện tử từ Tổng cục Thuế",
  description:
    "Giải pháp tự động hóa quản lý hóa đơn điện tử cho doanh nghiệp & đại lý kế toán. Đồng bộ hóa đơn Mua vào - Bán ra từ Tổng cục Thuế, hỗ trợ tải file XML & PDF gốc từ các nhà cung cấp phổ biến.",
  keywords: [
    "hóa đơn điện tử",
    "đồng bộ hóa đơn tổng cục thuế",
    "phần mềm kế toán",
    "tải hóa đơn xml pdf",
    "quản lý hóa đơn mua vào bán ra",
    "kiểm tra rủi ro hóa đơn",
  ],
  openGraph: {
    title: "Next Invoice — Tự động Đồng bộ Hóa đơn Điện tử Chuẩn Tổng cục Thuế",
    description:
      "Tiết kiệm 85% thời gian kế toán. Tự động hóa 100% quy trình thu thập, tra cứu, tải file gốc và kiểm tra hóa đơn điện tử.",
    locale: "vi_VN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${jakarta.variable} scroll-smooth antialiased`}>
      <body className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}

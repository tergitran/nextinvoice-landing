"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Menu, X } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { LOGIN_URL, REGISTER_URL } from "@/lib/constants";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md transition-all">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo Standardized */}
        <Link
          href="/"
          className="inline-flex items-center transition-transform hover:opacity-95 active:scale-98"
          aria-label="Trang chủ Next Invoice"
        >
          <Logo size="md" theme="dark" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="#features"
            className="text-sm font-semibold text-slate-300 transition hover:text-white"
          >
            Tính năng
          </Link>
          <Link
            href="#export"
            className="text-sm font-semibold text-slate-300 transition hover:text-white"
          >
            Xuất bảng kê chi tiết
          </Link>
          <Link
            href="#providers"
            className="text-sm font-semibold text-slate-300 transition hover:text-white"
          >
            Nhà cung cấp hỗ trợ
          </Link>
          <Link
            href="#security"
            className="text-sm font-semibold text-slate-300 transition hover:text-white"
          >
            Bảo mật
          </Link>
          <Link
            href="#pricing"
            className="text-sm font-semibold text-slate-300 transition hover:text-white"
          >
            Bảng giá
          </Link>
          <Link
            href="#faq"
            className="text-sm font-semibold text-slate-300 transition hover:text-white"
          >
            Hỏi đáp
          </Link>
        </nav>

        {/* Desktop CTA Buttons */}
        <div className="hidden items-center gap-3 sm:flex">
          <Link
            href={LOGIN_URL}
            className="rounded-full border border-slate-700 bg-slate-900/60 px-5 py-2.5 text-sm font-semibold text-slate-200 backdrop-blur-xs transition-all hover:border-slate-500 hover:bg-slate-800 hover:text-white active:scale-[0.98]"
          >
            Đăng nhập
          </Link>
          <Link
            href={REGISTER_URL}
            className="group inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-sm shadow-blue-500/25 transition-all hover:bg-blue-500 active:scale-[0.98]"
          >
            <span>Dùng thử miễn phí</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="rounded-lg p-2 text-slate-300 hover:text-white hover:bg-slate-900 md:hidden"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="border-b border-slate-800 bg-slate-950 px-4 py-5 shadow-2xl md:hidden">
          <div className="flex flex-col gap-4">
            <Link
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-semibold text-slate-200 hover:text-white"
            >
              Tính năng nổi bật
            </Link>
            <Link
              href="#export"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-semibold text-slate-200 hover:text-white"
            >
              Xuất bảng kê chi tiết
            </Link>
            <Link
              href="#providers"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-semibold text-slate-200 hover:text-white"
            >
              Nhà cung cấp hỗ trợ
            </Link>
            <Link
              href="#security"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-semibold text-slate-200 hover:text-white"
            >
              Chuẩn bảo mật dữ liệu
            </Link>
            <Link
              href="#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-semibold text-slate-200 hover:text-white"
            >
              Bảng giá dịch vụ
            </Link>
            <Link
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-semibold text-slate-200 hover:text-white"
            >
              Câu hỏi thường gặp
            </Link>
            <div className="mt-2 flex flex-col gap-2 pt-3 border-t border-slate-800">
              <Link
                href={LOGIN_URL}
                className="w-full rounded-full border border-slate-700 bg-slate-900/60 py-2.5 text-center text-sm font-semibold text-slate-200 transition hover:border-slate-500 hover:text-white hover:bg-slate-800"
              >
                Đăng nhập
              </Link>
              <Link
                href={REGISTER_URL}
                className="w-full rounded-full bg-blue-600 py-2.5 text-center text-sm font-bold text-white shadow-md shadow-blue-500/20 hover:bg-blue-500"
              >
                Dùng thử miễn phí 50 hóa đơn
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

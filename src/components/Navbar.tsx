"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Menu, X, ShieldCheck } from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/85 backdrop-blur-md transition-all">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-500/20">
            <Image
              src="/logo-icon.svg"
              alt="Next Invoice Icon"
              width={26}
              height={26}
              className="brightness-0 invert"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-extrabold tracking-tight text-slate-900">
              Next<span className="text-blue-600">Invoice</span>
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              Đồng bộ HĐĐT tự động
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="#features"
            className="text-sm font-semibold text-slate-600 transition hover:text-blue-600"
          >
            Tính năng
          </Link>
          <Link
            href="#export"
            className="text-sm font-semibold text-slate-600 transition hover:text-blue-600"
          >
            Xuất bảng kê chi tiết
          </Link>
          <Link
            href="#providers"
            className="text-sm font-semibold text-slate-600 transition hover:text-blue-600"
          >
            Nhà cung cấp hỗ trợ
          </Link>
          <Link
            href="#security"
            className="text-sm font-semibold text-slate-600 transition hover:text-blue-600"
          >
            Bảo mật
          </Link>
          <Link
            href="#pricing"
            className="text-sm font-semibold text-slate-600 transition hover:text-blue-600"
          >
            Bảng giá
          </Link>
          <Link
            href="#faq"
            className="text-sm font-semibold text-slate-600 transition hover:text-blue-600"
          >
            Hỏi đáp
          </Link>
        </nav>

        {/* Desktop CTA Buttons */}
        <div className="hidden items-center gap-3 sm:flex">
          <Link
            href="http://localhost:3000/login"
            className="rounded-lg px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-100"
          >
            Đăng nhập
          </Link>
          <Link
            href="http://localhost:3000/register"
            className="group inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-sm shadow-blue-500/20 transition-all hover:bg-blue-700 hover:shadow-md hover:shadow-blue-500/30 active:scale-[0.98]"
          >
            <span>Dùng thử miễn phí</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 md:hidden"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="border-b border-slate-200 bg-white px-4 py-5 shadow-xl md:hidden">
          <div className="flex flex-col gap-4">
            <Link
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-semibold text-slate-700 hover:text-blue-600"
            >
              Tính năng nổi bật
            </Link>
            <Link
              href="#export"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-semibold text-slate-700 hover:text-blue-600"
            >
              Xuất bảng kê chi tiết
            </Link>
            <Link
              href="#providers"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-semibold text-slate-700 hover:text-blue-600"
            >
              Nhà cung cấp hỗ trợ
            </Link>
            <Link
              href="#security"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-semibold text-slate-700 hover:text-blue-600"
            >
              Chuẩn bảo mật dữ liệu
            </Link>
            <Link
              href="#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-semibold text-slate-700 hover:text-blue-600"
            >
              Bảng giá dịch vụ
            </Link>
            <Link
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-semibold text-slate-700 hover:text-blue-600"
            >
              Câu hỏi thường gặp
            </Link>
            <div className="mt-2 flex flex-col gap-2 pt-3 border-t border-slate-100">
              <Link
                href="http://localhost:3000/login"
                className="w-full rounded-lg border border-slate-200 py-2.5 text-center text-sm font-bold text-slate-700"
              >
                Đăng nhập
              </Link>
              <Link
                href="http://localhost:3000/register"
                className="w-full rounded-lg bg-blue-600 py-2.5 text-center text-sm font-bold text-white shadow-md shadow-blue-500/20"
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

"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown, FileText, Menu, Search, X } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { LOGIN_URL, REGISTER_URL } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);
  const [mobileToolsOpen, setMobileToolsOpen] = useState(true);

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
        <nav className="hidden items-center gap-7 md:flex">
          <Link
            href="/#features"
            className="text-sm font-semibold text-slate-300 transition hover:text-white"
          >
            Tính năng
          </Link>

          {/* Công cụ Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setToolsDropdownOpen(true)}
            onMouseLeave={() => setToolsDropdownOpen(false)}
          >
            <button
              type="button"
              onClick={() => setToolsDropdownOpen((prev) => !prev)}
              className="inline-flex items-center gap-1.5 py-2 text-sm font-semibold text-slate-300 transition hover:text-white focus:outline-hidden cursor-pointer"
              aria-expanded={toolsDropdownOpen}
            >
              <span>Công cụ</span>
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform duration-200 text-slate-400",
                  toolsDropdownOpen && "rotate-180 text-white",
                )}
              />
            </button>

            {toolsDropdownOpen && (
              <div className="absolute top-full left-0 z-50 mt-1 w-80 rounded-2xl border border-slate-800 bg-slate-900/95 p-2 shadow-2xl backdrop-blur-xl animate-in fade-in-0 zoom-in-95 duration-150">
                <Link
                  href="/tra-cuu-ma-so-thue"
                  onClick={() => setToolsDropdownOpen(false)}
                  className="flex items-start gap-3 rounded-xl p-3 transition hover:bg-slate-800/80 group"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <Search className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-100 group-hover:text-blue-400 transition-colors">
                      Tra cứu mã số thuế (TCT)
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5 leading-snug">
                      Kiểm tra trạng thái MST hàng loạt từ Cổng Tổng cục Thuế
                    </div>
                  </div>
                </Link>

                <Link
                  href="/doc-file-xml"
                  onClick={() => setToolsDropdownOpen(false)}
                  className="flex items-start gap-3 rounded-xl p-3 transition hover:bg-slate-800/80 group mt-1"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-100 group-hover:text-emerald-400 transition-colors">
                      Đọc file XML hóa đơn
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5 leading-snug">
                      Xem hóa đơn chuẩn mẫu Bộ Tài chính & in PDF tức thì
                    </div>
                  </div>
                </Link>
              </div>
            )}
          </div>

          <Link
            href="/#security"
            className="text-sm font-semibold text-slate-300 transition hover:text-white"
          >
            Bảo mật
          </Link>
          <Link
            href="/#pricing"
            className="text-sm font-semibold text-slate-300 transition hover:text-white"
          >
            Bảng giá
          </Link>
          <Link
            href="/#faq"
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
          className="rounded-lg p-2 text-slate-300 hover:text-white hover:bg-slate-900 md:hidden cursor-pointer"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="border-b border-slate-800 bg-slate-950 px-4 py-5 shadow-2xl md:hidden">
          <div className="flex flex-col gap-3">
            <Link
              href="/#features"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-semibold text-slate-200 hover:text-white py-1"
            >
              Tính năng nổi bật
            </Link>

            {/* Mobile Công cụ Accordion */}
            <div className="rounded-xl border border-slate-800/80 bg-slate-900/50 p-3 my-1">
              <button
                type="button"
                onClick={() => setMobileToolsOpen((prev) => !prev)}
                className="flex w-full items-center justify-between text-sm font-semibold text-blue-400"
              >
                <span>CÔNG CỤ TIỆN ÍCH</span>
                <ChevronDown className={cn("h-4 w-4 transition-transform", mobileToolsOpen && "rotate-180")} />
              </button>

              {mobileToolsOpen && (
                <div className="mt-2.5 flex flex-col gap-2 pt-2 border-t border-slate-800/60">
                  <Link
                    href="/tra-cuu-ma-so-thue"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2.5 py-1.5 text-sm font-medium text-slate-200 hover:text-white"
                  >
                    <Search className="h-4 w-4 text-blue-400 shrink-0" />
                    <span>Tra cứu mã số thuế (TCT)</span>
                  </Link>
                  <Link
                    href="/doc-file-xml"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2.5 py-1.5 text-sm font-medium text-slate-200 hover:text-white"
                  >
                    <FileText className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>Đọc file XML hóa đơn</span>
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/#security"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-semibold text-slate-200 hover:text-white py-1"
            >
              Chuẩn bảo mật dữ liệu
            </Link>
            <Link
              href="/#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-semibold text-slate-200 hover:text-white py-1"
            >
              Bảng giá dịch vụ
            </Link>
            <Link
              href="/#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-semibold text-slate-200 hover:text-white py-1"
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

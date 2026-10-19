"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown, FileText, Menu, Search, X } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LOGIN_URL, REGISTER_URL } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileToolsOpen, setMobileToolsOpen] = useState(true);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);

  const dropdownTimerRef = useRef<NodeJS.Timeout | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Click outside to close tools dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setToolsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Safe hover with 200ms delay to prevent accidental closing
  const handleMouseEnter = () => {
    if (dropdownTimerRef.current) {
      clearTimeout(dropdownTimerRef.current);
      dropdownTimerRef.current = null;
    }
    setToolsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    if (dropdownTimerRef.current) {
      clearTimeout(dropdownTimerRef.current);
    }
    dropdownTimerRef.current = setTimeout(() => {
      setToolsDropdownOpen(false);
    }, 200);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (dropdownTimerRef.current) {
        clearTimeout(dropdownTimerRef.current);
      }
    };
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-200",
        scrolled
          ? "border-b border-slate-200/90 bg-white/95 shadow-xs backdrop-blur-md"
          : "border-b border-slate-100 bg-white/85 backdrop-blur-md"
      )}
    >
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link
          href="/"
          className="inline-flex items-center transition-transform hover:opacity-95 active:scale-98"
          aria-label="Trang chủ Next Invoice"
        >
          <Logo size="md" theme="default" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          <Link
            href="/#features"
            className="inline-flex h-9 items-center justify-center rounded-full px-3.5 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-950"
          >
            Tính năng
          </Link>

          {/* Công cụ Dropdown with Safe Hover Zone & Rich Cards */}
          <div
            ref={dropdownRef}
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button
              type="button"
              onClick={() => setToolsDropdownOpen((prev) => !prev)}
              className={cn(
                "inline-flex h-9 items-center justify-center gap-1 rounded-full px-3.5 py-2 text-sm font-semibold transition-colors cursor-pointer outline-hidden",
                toolsDropdownOpen
                  ? "bg-slate-100 text-blue-600"
                  : "text-slate-700 hover:bg-slate-100 hover:text-slate-950"
              )}
              aria-expanded={toolsDropdownOpen}
              aria-haspopup="true"
            >
              <span>Công cụ</span>
              <ChevronDown
                className={cn(
                  "h-3.5 w-3.5 transition-transform duration-200 text-slate-400",
                  toolsDropdownOpen && "rotate-180 text-blue-600"
                )}
                aria-hidden="true"
              />
            </button>

            {/* Submenu with invisible bridge to guarantee safe mouse movement */}
            {toolsDropdownOpen && (
              <div
                className="absolute left-1/2 -translate-x-1/2 top-full pt-2 z-50 animate-in fade-in-0 zoom-in-95 duration-150"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {/* Invisible hover bridge element covering the gap */}
                <div className="absolute -top-3 left-0 right-0 h-4 bg-transparent pointer-events-auto" />

                <div className="w-[460px] rounded-2xl border border-slate-200/90 bg-white p-2 shadow-xl shadow-slate-900/10 ring-1 ring-slate-900/5 backdrop-blur-md">
                  <div className="grid gap-1">
                    <Link
                      href="/tra-cuu-ma-so-thue"
                      onClick={() => setToolsDropdownOpen(false)}
                      className="group flex items-start gap-3.5 rounded-xl p-3 transition-colors hover:bg-slate-50"
                    >
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 border border-blue-100 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <Search className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                            Tra cứu mã số thuế (TCT)
                          </span>
                          <Badge variant="blue" size="sm">
                            Tự động
                          </Badge>
                        </div>
                        <p className="mt-1 text-xs text-slate-500 leading-snug">
                          Kiểm tra trạng thái doanh nghiệp hàng loạt từ Cổng Tổng cục Thuế
                        </p>
                      </div>
                    </Link>

                    <Link
                      href="/doc-file-xml"
                      onClick={() => setToolsDropdownOpen(false)}
                      className="group flex items-start gap-3.5 rounded-xl p-3 transition-colors hover:bg-slate-50"
                    >
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                        <FileText className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                            Đọc file XML hóa đơn
                          </span>
                          <Badge variant="emerald" size="sm">
                            Miễn phí
                          </Badge>
                        </div>
                        <p className="mt-1 text-xs text-slate-500 leading-snug">
                          Xem hóa đơn chuẩn mẫu Bộ Tài chính & in PDF tức thì không cần phần mềm
                        </p>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          <Link
            href="/#security"
            className="inline-flex h-9 items-center justify-center rounded-full px-3.5 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-950"
          >
            Bảo mật
          </Link>

          <Link
            href="/#pricing"
            className="inline-flex h-9 items-center justify-center rounded-full px-3.5 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-950"
          >
            Bảng giá
          </Link>

          <Link
            href="/#faq"
            className="inline-flex h-9 items-center justify-center rounded-full px-3.5 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-950"
          >
            Hỏi đáp
          </Link>
        </nav>

        {/* Desktop CTA Buttons */}
        <div className="hidden items-center gap-2.5 sm:flex">
          <Button variant="ghost" size="sm" asChild>
            <Link href={LOGIN_URL}>Đăng nhập</Link>
          </Button>

          <Button variant="pill" size="default" asChild>
            <Link href={REGISTER_URL} className="group">
              <span>Dùng thử miễn phí</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="rounded-lg p-2 text-slate-700 hover:text-slate-950 hover:bg-slate-100 md:hidden cursor-pointer"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="border-b border-slate-200 bg-white px-4 py-5 shadow-xl md:hidden animate-in slide-in-from-top-2 duration-150">
          <div className="flex flex-col gap-2">
            <Link
              href="/#features"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
            >
              Tính năng
            </Link>

            {/* Mobile Tools Collapsible */}
            <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-2.5">
              <button
                type="button"
                onClick={() => setMobileToolsOpen(!mobileToolsOpen)}
                className="flex w-full items-center justify-between px-1 py-1.5 text-xs font-bold uppercase tracking-wider text-slate-500 cursor-pointer"
              >
                <span>Công cụ hữu ích</span>
                <span className="text-[10px] text-blue-600 font-semibold">
                  {mobileToolsOpen ? "Thu gọn" : "Xem thêm"}
                </span>
              </button>

              {mobileToolsOpen && (
                <div className="mt-2 flex flex-col gap-1.5">
                  <Link
                    href="/tra-cuu-ma-so-thue"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2.5 rounded-lg bg-white p-2.5 text-xs font-semibold text-slate-900 shadow-xs border border-slate-200/60 hover:text-blue-600"
                  >
                    <Search className="h-4 w-4 text-blue-600 shrink-0" />
                    <div className="flex-1">
                      <div>Tra cứu mã số thuế (TCT)</div>
                      <div className="text-[11px] font-normal text-slate-500">Kiểm tra thông tin DN Cổng Thuế</div>
                    </div>
                  </Link>

                  <Link
                    href="/doc-file-xml"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2.5 rounded-lg bg-white p-2.5 text-xs font-semibold text-slate-900 shadow-xs border border-slate-200/60 hover:text-emerald-600"
                  >
                    <FileText className="h-4 w-4 text-emerald-600 shrink-0" />
                    <div className="flex-1">
                      <div>Đọc file XML hóa đơn</div>
                      <div className="text-[11px] font-normal text-slate-500">Xem mẫu chuẩn BTC & in PDF</div>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/#security"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
            >
              Bảo mật
            </Link>
            <Link
              href="/#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
            >
              Bảng giá
            </Link>
            <Link
              href="/#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
            >
              Hỏi đáp
            </Link>

            <div className="mt-4 flex flex-col gap-2 pt-3 border-t border-slate-100">
              <Button variant="outline" className="w-full justify-center" asChild>
                <Link href={LOGIN_URL}>Đăng nhập</Link>
              </Button>
              <Button variant="default" className="w-full justify-center gap-2" asChild>
                <Link href={REGISTER_URL}>
                  <span>Dùng thử miễn phí</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

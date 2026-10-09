"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  CheckCircle2,
  FileText,
  HeartHandshake,
  Info,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";

const supportedPdfProviders = [
  { name: "VNPT-Invoice", org: "Tập đoàn Bưu chính Viễn thông VNPT", tag: "Tải PDF/XML trực tiếp", color: "text-blue-700 bg-blue-50 border-blue-200" },
  { name: "Viettel S-Invoice", org: "Tập đoàn Viễn thông Quân đội Viettel", tag: "Tải PDF/XML trực tiếp", color: "text-purple-700 bg-purple-50 border-purple-200" },
  { name: "MISA meInvoice", org: "Công ty Cổ phần MISA", tag: "Tải PDF/XML trực tiếp", color: "text-emerald-700 bg-emerald-50 border-emerald-200" },
  { name: "BKAV eHoadon", org: "Tập đoàn Công nghệ BKAV", tag: "Tải PDF/XML trực tiếp", color: "text-amber-700 bg-amber-50 border-amber-200" },
  { name: "EasyInvoice", org: "Công ty Cổ phần Đầu tư Softdreams", tag: "Tải PDF/XML trực tiếp", color: "text-indigo-700 bg-indigo-50 border-indigo-200" },
  { name: "Thái Sơn E-Invoice", org: "Công ty Phát triển Công nghệ Thái Sơn", tag: "Tải PDF/XML trực tiếp", color: "text-rose-700 bg-rose-50 border-rose-200" },
  { name: "Mắt Bão SafeVAT", org: "Công ty Cổ phần Mắt Bão", tag: "Tải PDF/XML trực tiếp", color: "text-cyan-700 bg-cyan-50 border-cyan-200" },
  { name: "CyberBill", org: "Công ty Cổ phần CyberLotus", tag: "Tải PDF/XML trực tiếp", color: "text-teal-700 bg-teal-50 border-teal-200" },
  { name: "WinInvoice", org: "Công ty TNHH Win Tech Solution", tag: "Tải PDF/XML trực tiếp", color: "text-sky-700 bg-sky-50 border-sky-200" },
  { name: "SmartSign / VinaCA", org: "Công ty Cổ phần chữ ký số VI NA", tag: "Tải PDF/XML trực tiếp", color: "text-violet-700 bg-violet-50 border-violet-200" },
  { name: "Sapo Invoice", org: "Công ty Cổ phần Công nghệ Sapo", tag: "Tải PDF/XML trực tiếp", color: "text-orange-700 bg-orange-50 border-orange-200" },
  { name: "Petrolimex", org: "Tập đoàn Xăng dầu Việt Nam", tag: "Tải PDF/XML trực tiếp", color: "text-blue-800 bg-blue-50 border-blue-200" },
  { name: "Thế Giới Di Động", org: "MWG (TGDD, Điện Máy Xanh)", tag: "Tải PDF/XML trực tiếp", color: "text-yellow-700 bg-yellow-50 border-yellow-200" },
  { name: "Bách Hóa Xanh", org: "Hệ thống Bách Hóa Xanh", tag: "Tải PDF/XML trực tiếp", color: "text-green-700 bg-green-50 border-green-200" },
  { name: "VETC", org: "Công ty TNHH Thu phí tự động VETC", tag: "Tải PDF/XML trực tiếp", color: "text-emerald-800 bg-emerald-50 border-emerald-200" },
  { name: "VnInvoice / VinInvoice", org: "Giải pháp HĐĐT Doanh nghiệp", tag: "Tải PDF/XML trực tiếp", color: "text-slate-700 bg-slate-100 border-slate-200" },
];

export default function ProvidersGrid() {
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  // Responsive items count: Mobile 1, Tablet 2, Desktop 3
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(0, supportedPdfProviders.length - itemsPerPage);

  // Keep currentIndex bounded if itemsPerPage changes
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [itemsPerPage, maxIndex, currentIndex]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  // Auto-play timer (pauses on hover)
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      handleNext();
    }, 4000);
    return () => clearInterval(timer);
  }, [isPaused, handleNext]);

  // Touch Swipe for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
    touchStartX.current = null;
  };

  const totalPages = maxIndex + 1;

  return (
    <section id="providers" className="py-20 lg:py-24 bg-white border-b border-slate-200/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-blue-600">
            Khả Năng Tương Thích Thực Tế
          </span>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Hỗ trợ tải Hóa đơn gốc từ các Nhà Cung Cấp phổ biến
          </h2>
          <p className="mt-4 text-base text-slate-600">
            Hệ thống tự động nhận diện đơn vị phát hành và hỗ trợ tải trực tiếp file PDF bản in và XML ký số từ hầu hết các nhà cung cấp giải pháp hóa đơn điện tử lớn.
          </p>
        </div>

        {/* Honest Transparency Quote Box */}
        <div className="mt-10 mx-auto max-w-4xl rounded-2xl border border-blue-200 bg-gradient-to-r from-blue-50/90 via-sky-50/70 to-indigo-50/80 p-6 sm:p-7 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="rounded-xl bg-blue-600 p-2.5 text-white shrink-0 mt-0.5 shadow-xs">
              <HeartHandshake className="h-6 w-6" />
            </div>
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-100/80 px-2.5 py-0.5 rounded-full">
                  <Info className="h-3.5 w-3.5" /> Minh bạch & Cầu thị
                </span>
                <span className="text-xs font-semibold text-slate-500">
                  Cam kết đồng hành từ Đội ngũ Next Invoice
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                &ldquo;Hiện tại hệ thống đang hỗ trợ tải được tầm 80% hóa đơn gốc từ các tổ chức cung cấp giải pháp hóa đơn điện tử. Do một số nhà cung cấp không có chia sẻ dữ liệu hóa đơn gốc cho Cổng thông tin Hóa đơn điện tử của Tổng cục Thuế. Đội ngũ thành viên NextInvoice luôn lắng nghe ý kiến người dùng để mang đến trải nghiệm tốt nhất người dùng đã tin dùng sản phẩm, dịch vụ của Next Invoice.&rdquo;
              </p>
            </div>
          </div>
        </div>

        {/* Carousel Header Bar with Navigation Controls */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
            <Sparkles className="h-4 w-4 text-blue-600" />
            <span>
              Hiển thị {itemsPerPage} nhà cung cấp / lượt lướt ({supportedPdfProviders.length} đơn vị đã tích hợp)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-semibold text-slate-400 mr-2">
              {currentIndex + 1} / {totalPages}
            </span>
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous slide"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-2xs transition-all hover:bg-slate-50 hover:border-slate-300 hover:text-blue-600 active:scale-95"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next slide"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-2xs transition-all hover:bg-slate-50 hover:border-slate-300 hover:text-blue-600 active:scale-95"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Carousel Viewport */}
        <div
          className="relative mt-6 overflow-hidden rounded-2xl"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Sliding Track */}
          <div
            className="flex transition-transform duration-500 ease-out -mx-2.5"
            style={{
              transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)`,
            }}
          >
            {supportedPdfProviders.map((p, idx) => (
              <div
                key={idx}
                className="shrink-0 px-2.5"
                style={{
                  width: `${100 / itemsPerPage}%`,
                }}
              >
                <div className="flex h-full flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50/70 p-5 transition-all hover:bg-white hover:border-blue-300 hover:shadow-lg">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className={`inline-flex rounded-md border px-2.5 py-0.5 text-[11px] font-bold ${p.color}`}>
                        {p.tag}
                      </span>
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    </div>
                    <h4 className="mt-3.5 text-base font-extrabold text-slate-900 tracking-tight">
                      {p.name}
                    </h4>
                    <p className="mt-1 text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {p.org}
                    </p>
                  </div>

                  <div className="mt-5 pt-3.5 border-t border-slate-200/80 flex items-center justify-between text-xs font-medium">
                    <span className="flex items-center gap-1.5 text-slate-500">
                      <FileText className="h-3.5 w-3.5 text-slate-400" />
                      <span>PDF & XML bản gốc</span>
                    </span>
                    <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-bold text-emerald-700">
                      Đã hỗ trợ
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dot Indicators */}
        <div className="mt-8 flex items-center justify-center gap-1.5">
          {Array.from({ length: totalPages }).map((_, dotIdx) => (
            <button
              key={dotIdx}
              type="button"
              onClick={() => setCurrentIndex(dotIdx)}
              aria-label={`Go to slide ${dotIdx + 1}`}
              className={`h-2 rounded-full transition-all ${
                currentIndex === dotIdx
                  ? "w-7 bg-blue-600"
                  : "w-2 bg-slate-200 hover:bg-slate-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

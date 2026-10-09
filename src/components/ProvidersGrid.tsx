"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  ChevronLeft,
  ChevronRight,
  FileText,
} from "lucide-react";
import { ScrollReveal } from "@/components/motion";

const supportedPdfProviders = [
  { name: "VNPT-Invoice", org: "Tập đoàn Bưu chính Viễn thông VNPT" },
  { name: "Viettel S-Invoice", org: "Tập đoàn Viễn thông Quân đội Viettel" },
  { name: "MISA meInvoice", org: "Công ty Cổ phần MISA" },
  { name: "BKAV eHoadon", org: "Tập đoàn Công nghệ BKAV" },
  { name: "EasyInvoice", org: "Công ty Cổ phần Đầu tư Softdreams" },
  { name: "Thái Sơn E-Invoice", org: "Công ty Phát triển Công nghệ Thái Sơn" },
  { name: "Mắt Bão SafeVAT", org: "Công ty Cổ phần Mắt Bão" },
  { name: "CyberBill", org: "Công ty Cổ phần CyberLotus" },
  { name: "WinInvoice", org: "Công ty TNHH Win Tech Solution" },
  { name: "SmartSign / VinaCA", org: "Công ty Cổ phần chữ ký số VI NA" },
  { name: "Sapo Invoice", org: "Công ty Cổ phần Công nghệ Sapo" },
  { name: "Petrolimex", org: "Tập đoàn Xăng dầu Việt Nam" },
  { name: "Thế Giới Di Động", org: "MWG (TGDD, Điện Máy Xanh)" },
  { name: "Bách Hóa Xanh", org: "Hệ thống Bách Hóa Xanh" },
  { name: "VETC", org: "Công ty TNHH Thu phí tự động VETC" },
  { name: "VnInvoice / VinInvoice", org: "Giải pháp HĐĐT Doanh nghiệp" },
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

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      handleNext();
    }, 4500);
    return () => clearInterval(timer);
  }, [isPaused, handleNext]);

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
    <section id="providers" className="py-20 lg:py-28 bg-white border-b border-slate-200/70">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">
            Tương thích hệ thống
          </span>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
            Hỗ trợ tải Hóa đơn gốc từ các Nhà Cung Cấp phổ biến
          </h2>
          <p className="mt-4 text-base text-slate-600 leading-relaxed font-normal">
            Hệ thống tự động nhận diện đơn vị phát hành và hỗ trợ tải trực tiếp file PDF bản in và XML ký số từ hầu hết các cổng hóa đơn điện tử lớn.
          </p>
        </ScrollReveal>

        {/* Honest Transparency Quote Box */}
        <ScrollReveal delay={0.1} className="mt-10 mx-auto max-w-3xl rounded-xl border-l-2 border-slate-950 bg-slate-50/70 p-5 sm:p-6">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Minh bạch dữ liệu & Đồng hành cùng người dùng
            </span>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal italic">
              &ldquo;Hiện tại hệ thống đang hỗ trợ tải được tầm 80% hóa đơn gốc từ các tổ chức cung cấp giải pháp hóa đơn điện tử. Do một số nhà cung cấp không có chia sẻ dữ liệu hóa đơn gốc cho Cổng thông tin Hóa đơn điện tử của Tổng cục Thuế. Đội ngũ Next Invoice luôn lắng nghe ý kiến người dùng để mang đến trải nghiệm tốt nhất.&rdquo;
            </p>
          </div>
        </ScrollReveal>

        {/* Carousel Header Bar */}
        <ScrollReveal delay={0.15} className="mt-12 flex items-center justify-between border-b border-slate-200 pb-4">
          <span className="text-xs font-semibold text-slate-600">
            {supportedPdfProviders.length} đơn vị giải pháp đã kết nối
          </span>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-medium text-slate-400 mr-2">
              {currentIndex + 1} / {totalPages}
            </span>
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous slide"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50 hover:border-slate-300 active:scale-95"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next slide"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50 hover:border-slate-300 active:scale-95"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </ScrollReveal>

        {/* Carousel Viewport */}
        <div
          className="relative mt-6 overflow-hidden"
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
                <div className="flex h-full flex-col justify-between rounded-xl border border-slate-200/90 bg-white p-5 transition-all hover:border-slate-400 hover:shadow-xs">
                  <div>
                    <span className="inline-flex rounded border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] font-semibold text-slate-700">
                      Bản gốc XML/PDF
                    </span>
                    <h4 className="mt-3 text-base font-bold text-slate-950 tracking-tight">
                      {p.name}
                    </h4>
                    <p className="mt-1 text-xs text-slate-500 line-clamp-2 leading-relaxed font-normal">
                      {p.org}
                    </p>
                  </div>

                  <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1.5 text-slate-500">
                      <FileText className="h-3.5 w-3.5 text-slate-400" />
                      <span>XML & PDF</span>
                    </span>
                    <span className="text-[11px] font-semibold text-slate-900">
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
              className={`h-1.5 rounded-full transition-all ${
                currentIndex === dotIdx
                  ? "w-6 bg-slate-950"
                  : "w-1.5 bg-slate-200 hover:bg-slate-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

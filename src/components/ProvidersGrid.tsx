"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  ChevronLeft,
  ChevronRight,
  FileText,
  CheckCircle2,
} from "lucide-react";
import { ScrollReveal } from "@/components/motion";

const supportedPdfProviders = [
  { name: "VNPT-Invoice", org: "Tập đoàn Bưu chính Viễn thông VNPT", tag: "PDF & XML gốc", color: "bg-blue-50 text-blue-700 border-blue-200" },
  { name: "Viettel S-Invoice", org: "Tập đoàn Viễn thông Quân đội Viettel", tag: "PDF & XML gốc", color: "bg-purple-50 text-purple-700 border-purple-200" },
  { name: "MISA meInvoice", org: "Công ty Cổ phần MISA", tag: "PDF & XML gốc", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  { name: "BKAV eHoadon", org: "Tập đoàn Công nghệ BKAV", tag: "PDF & XML gốc", color: "bg-amber-50 text-amber-700 border-amber-200" },
  { name: "EasyInvoice", org: "Công ty Cổ phần Đầu tư Softdreams", tag: "PDF & XML gốc", color: "bg-indigo-50 text-indigo-700 border-indigo-200" },
  { name: "Thái Sơn E-Invoice", org: "Công ty Phát triển Công nghệ Thái Sơn", tag: "PDF & XML gốc", color: "bg-rose-50 text-rose-700 border-rose-200" },
  { name: "Mắt Bão SafeVAT", org: "Công ty Cổ phần Mắt Bão", tag: "PDF & XML gốc", color: "bg-sky-50 text-sky-700 border-sky-200" },
  { name: "CyberBill", org: "Công ty Cổ phần CyberLotus", tag: "PDF & XML gốc", color: "bg-teal-50 text-teal-700 border-teal-200" },
  { name: "WinInvoice", org: "Công ty TNHH Win Tech Solution", tag: "PDF & XML gốc", color: "bg-blue-50 text-blue-700 border-blue-200" },
  { name: "SmartSign / VinaCA", org: "Công ty Cổ phần chữ ký số VI NA", tag: "PDF & XML gốc", color: "bg-violet-50 text-violet-700 border-violet-200" },
  { name: "Sapo Invoice", org: "Công ty Cổ phần Công nghệ Sapo", tag: "PDF & XML gốc", color: "bg-orange-50 text-orange-700 border-orange-200" },
  { name: "Petrolimex", org: "Tập đoàn Xăng dầu Việt Nam", tag: "PDF & XML gốc", color: "bg-blue-50 text-blue-800 border-blue-200" },
  { name: "Thế Giới Di Động", org: "MWG (TGDD, Điện Máy Xanh)", tag: "PDF & XML gốc", color: "bg-amber-50 text-amber-800 border-amber-200" },
  { name: "Bách Hóa Xanh", org: "Hệ thống Bách Hóa Xanh", tag: "PDF & XML gốc", color: "bg-emerald-50 text-emerald-800 border-emerald-200" },
  { name: "VETC", org: "Công ty TNHH Thu phí tự động VETC", tag: "PDF & XML gốc", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  { name: "VnInvoice / VinInvoice", org: "Giải pháp HĐĐT Doanh nghiệp", tag: "PDF & XML gốc", color: "bg-slate-100 text-slate-700 border-slate-200" },
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
  const safeIndex = Math.min(currentIndex, maxIndex);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => {
      const clamped = Math.min(prev, maxIndex);
      return clamped <= 0 ? maxIndex : clamped - 1;
    });
  }, [maxIndex]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => {
      const clamped = Math.min(prev, maxIndex);
      return clamped >= maxIndex ? 0 : clamped + 1;
    });
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
        <ScrollReveal delay={0.1} className="mt-8 mx-auto max-w-3xl rounded-2xl border border-slate-200/90 bg-slate-50/80 p-6 sm:p-7">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 mb-3.5">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Lưu ý minh bạch về tỷ lệ tải hóa đơn gốc
              </span>
            </div>
            <span className="text-[11px] font-medium text-slate-500">
              Đội ngũ Next Invoice
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
            &ldquo;Hiện tại hệ thống đang hỗ trợ tải được tầm 80% hóa đơn gốc từ các tổ chức cung cấp giải pháp hóa đơn điện tử. Do một số nhà cung cấp không có chia sẻ dữ liệu hóa đơn gốc cho Cổng thông tin Hóa đơn điện tử của Tổng cục Thuế. Đội ngũ Next Invoice luôn lắng nghe ý kiến người dùng để mang đến trải nghiệm tốt nhất.&rdquo;
          </p>
        </ScrollReveal>

        {/* Carousel Header Bar */}
        <ScrollReveal delay={0.15} className="mt-12 flex items-center justify-between border-b border-slate-200 pb-4">
          <span className="text-xs font-semibold text-slate-700">
            Hỗ trợ kết nối đa dạng các cổng hóa đơn điện tử phổ biến
          </span>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-medium text-slate-400 mr-2">
              {safeIndex + 1} / {totalPages}
            </span>
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous slide"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50 hover:border-slate-300 hover:text-blue-600 active:scale-95"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next slide"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50 hover:border-slate-300 hover:text-blue-600 active:scale-95"
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
              transform: `translateX(-${safeIndex * (100 / itemsPerPage)}%)`,
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
                <div className="flex h-full flex-col justify-between rounded-xl border border-slate-200 bg-slate-50/50 p-5 transition-all hover:bg-white hover:border-blue-300 hover:shadow-md">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className={`inline-flex rounded-md border px-2.5 py-0.5 text-[11px] font-bold ${p.color}`}>
                        {p.tag}
                      </span>
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    </div>
                    <h4 className="mt-3 text-base font-bold text-slate-950 tracking-tight">
                      {p.name}
                    </h4>
                    <p className="mt-1 text-xs text-slate-500 line-clamp-2 leading-relaxed font-normal">
                      {p.org}
                    </p>
                  </div>

                  <div className="mt-5 pt-3.5 border-t border-slate-200/80 flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1.5 text-slate-500 font-medium">
                      <FileText className="h-3.5 w-3.5 text-slate-400" />
                      <span>XML & PDF gốc</span>
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
              className={`h-1.5 rounded-full transition-all ${
                currentIndex === dotIdx
                  ? "w-6 bg-blue-600"
                  : "w-1.5 bg-slate-200 hover:bg-slate-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/motion";
import { REGISTER_URL } from "@/lib/constants";

const plans = [
  {
    name: "Gói Khởi Đầu",
    badge: "Doanh nghiệp SMB",
    price: "290.000",
    period: "năm",
    quota: "500 hóa đơn / năm",
    description: "Phù hợp cho các doanh nghiệp quy mô nhỏ, nhu cầu lưu trữ và đối soát cơ bản.",
    popular: false,
    features: [
      "Quản lý 01 Mã số thuế (MST)",
      "Đồng bộ hóa đơn Mua vào & Bán ra từ TCT",
      "Tự động giải Captcha bằng AI",
      "Tải file gốc XML ký số & PDF bản in",
      "Kiểm tra rủi ro trạng thái Người bán",
      "Xuất bảng kê Excel chuẩn kế toán",
      "Lưu trữ đám mây an toàn 10 năm",
    ],
    ctaText: "Bắt đầu sử dụng",
    ctaLink: REGISTER_URL,
  },
  {
    name: "Gói Doanh Nghiệp",
    badge: "Lựa chọn phổ biến nhất",
    price: "790.000",
    period: "năm",
    quota: "2.500 hóa đơn / năm",
    description: "Tối ưu cho doanh nghiệp thương mại, dịch vụ, sản xuất phát sinh hóa đơn đều đặn.",
    popular: true,
    features: [
      "Quản lý lên tới 03 Mã số thuế (MST)",
      "Đồng bộ nhanh không giới hạn lượt tra cứu",
      "Ưu tiên tốc độ giải Captcha AI tức thì",
      "Tải trọn bộ file ZIP hóa đơn gốc",
      "Cảnh báo rủi ro thuế & hóa đơn hủy",
      "Xuất Excel định dạng chuẩn MISA / Fast / Bravo",
      "Hỗ trợ kỹ thuật ưu tiên",
    ],
    ctaText: "Đăng ký Gói Doanh Nghiệp",
    ctaLink: REGISTER_URL,
  },
  {
    name: "Gói Đại Lý Kế Toán",
    badge: "Đại lý & Kế toán dịch vụ",
    price: "1.490.000",
    period: "năm",
    quota: "6.000 hóa đơn / năm",
    description: "Giải pháp toàn diện cho Đại lý Thuế & Kế toán dịch vụ quản lý sổ sách nhiều công ty.",
    popular: false,
    features: [
      "Không giới hạn số lượng Mã số thuế (MST)",
      "Dùng chung hạn mức linh hoạt cho tất cả khách hàng",
      "Quản lý tập trung hàng chục công ty trên 1 tài khoản",
      "Xuất báo cáo thuế hàng loạt theo từng doanh nghiệp",
      "Nạp thêm hạn mức hóa đơn linh hoạt bất kỳ lúc nào",
      "Bảo mật phân quyền nhân viên phụ trách từng công ty",
      "Hỗ trợ thiết lập và hướng dẫn 1-1",
    ],
    ctaText: "Liên hệ tư vấn Đại lý",
    ctaLink: REGISTER_URL,
  },
];

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselDots,
  useCarousel,
} from "@/components/ui/carousel";

function PricingCard({
  plan,
  isMobile = false,
}: {
  plan: (typeof plans)[0];
  isMobile?: boolean;
}) {
  return (
    <div
      className={`relative flex h-full flex-col justify-between rounded-2xl transition-all ${
        isMobile ? "p-4.5" : "p-6 sm:p-8"
      } ${
        plan.popular
          ? "border-2 border-blue-600 bg-white shadow-xl shadow-blue-500/10 ring-4 ring-blue-50"
          : "border border-slate-200 bg-white text-slate-900 hover:border-slate-300 hover:shadow-xs"
      }`}
    >
      <div>
        <div className={`flex items-center justify-between ${isMobile ? "mb-2" : "mb-3"}`}>
          <span
            className={`inline-flex rounded-full font-bold ${
              isMobile ? "px-2.5 py-0.5 text-[10px]" : "px-3 py-1 text-xs"
            } ${
              plan.popular
                ? "bg-blue-600 text-white shadow-xs"
                : "bg-slate-100 text-slate-600"
            }`}
          >
            {plan.badge}
          </span>
        </div>

        <h3 className={`font-bold tracking-tight text-slate-950 ${isMobile ? "text-base" : "text-xl"}`}>
          {plan.name}
        </h3>
        <p className={`text-slate-500 leading-snug line-clamp-2 ${isMobile ? "text-[11px] mt-1 min-h-[30px]" : "text-xs mt-2 min-h-[36px]"}`}>
          {plan.description}
        </p>

        {/* Price Display */}
        <div className={`flex items-baseline gap-1 ${isMobile ? "mt-3" : "mt-6"}`}>
          <span className={`font-extrabold tracking-tight font-mono text-slate-950 ${isMobile ? "text-2xl" : "text-3xl sm:text-4xl"}`}>
            {plan.price}
          </span>
          <span className={`font-semibold text-slate-500 ${isMobile ? "text-[11px]" : "text-xs"}`}>
            đ / {plan.period}
          </span>
        </div>
        <div className={`font-bold text-blue-700 ${isMobile ? "text-[11px] mt-0.5" : "text-xs mt-1"}`}>
          {plan.quota}
        </div>

        <div className={`border-t border-slate-100 ${isMobile ? "mt-3 pt-3 space-y-1.5" : "mt-6 pt-6 space-y-2.5"}`}>
          {plan.features.map((feature, fIdx) => (
            <div key={fIdx} className={`flex items-start ${isMobile ? "gap-1.5 text-[11px]" : "gap-2.5 text-xs sm:text-sm"}`}>
              <Check className={`shrink-0 text-emerald-600 font-bold ${isMobile ? "h-3.5 w-3.5 mt-0.5" : "h-4 w-4 mt-0.5"}`} />
              <span className="text-slate-600 leading-tight">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={isMobile ? "mt-4 pt-2" : "mt-8 pt-4"}>
        <Link
          href={plan.ctaLink}
          className={`w-full inline-flex items-center justify-center rounded-xl font-bold transition-all ${
            isMobile ? "py-2.5 px-3 text-xs gap-1.5" : "py-3.5 px-4 text-xs sm:text-sm gap-2"
          } ${
            plan.popular
              ? "bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-500/25 active:scale-[0.98]"
              : "bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200/60 active:scale-[0.98]"
          }`}
        >
          <span>{plan.ctaText}</span>
          <ArrowRight className={isMobile ? "h-3.5 w-3.5" : "h-4 w-4"} />
        </Link>
      </div>
    </div>
  );
}

function PricingCarouselCard({
  plan,
  index,
}: {
  plan: (typeof plans)[0];
  index: number;
}) {
  const { selectedIndex } = useCarousel();
  const isActive = selectedIndex === index;

  return (
    <div
      className={`h-full transition-all duration-300 ${
        isActive
          ? "scale-100 opacity-100"
          : "scale-[0.94] opacity-65"
      }`}
    >
      <PricingCard plan={plan} isMobile={true} />
    </div>
  );
}

export default function PricingSection() {
  return (
    <section id="pricing" className="py-20 lg:py-28 bg-white border-b border-slate-200/70 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">
            Bảng giá dịch vụ
          </span>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
            Chi phí minh bạch, không phụ phí ẩn
          </h2>
          <p className="mt-4 text-base text-slate-600 leading-relaxed font-normal">
            Tính phí theo số lượng hóa đơn phát sinh thực tế. Đăng ký ngay để nhận ngay <strong className="text-blue-700 font-semibold">50 hóa đơn dùng thử miễn phí</strong>.
          </p>
        </ScrollReveal>

        {/* Mobile View: shadcn Carousel with Center Alignment & Peeking Slides */}
        <div className="mt-10 block md:hidden">
          <Carousel
            opts={{
              align: "center",
              startIndex: 1,
              loop: false,
            }}
            className="w-full relative px-1"
          >
            <CarouselContent className="-ml-3 py-3">
              {plans.map((plan, idx) => (
                <CarouselItem key={idx} className="basis-[70%] pl-3">
                  <PricingCarouselCard plan={plan} index={idx} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0.5 size-8 bg-white/95 shadow-md border-slate-200 text-slate-700" />
            <CarouselNext className="right-0.5 size-8 bg-white/95 shadow-md border-slate-200 text-slate-700" />
            <CarouselDots />
          </Carousel>
        </div>

        {/* Desktop View: 3-column Grid */}
        <StaggerContainer
          className="mt-14 hidden md:grid md:grid-cols-3 gap-8 items-stretch"
          delayChildren={0.1}
          staggerChildren={0.1}
        >
          {plans.map((plan, idx) => (
            <StaggerItem
              key={idx}
              className={`h-full transition-all ${
                plan.popular ? "md:-translate-y-2" : ""
              }`}
            >
              <PricingCard plan={plan} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

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
      "Dùng chung Quota linh hoạt cho tất cả khách hàng",
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

export default function PricingSection() {
  return (
    <section id="pricing" className="py-20 lg:py-28 bg-white border-b border-slate-200/70">
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

        {/* Pricing Cards Grid */}
        <StaggerContainer
          className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch"
          delayChildren={0.1}
          staggerChildren={0.1}
        >
          {plans.map((plan, idx) => (
            <StaggerItem
              key={idx}
              className={`relative flex flex-col justify-between rounded-2xl p-7 sm:p-8 transition-all ${
                plan.popular
                  ? "border-2 border-blue-600 bg-white shadow-xl shadow-blue-500/10 ring-4 ring-blue-50 md:-translate-y-2"
                  : "border border-slate-200 bg-white text-slate-900 hover:border-slate-300 hover:shadow-xs"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${
                      plan.popular
                        ? "bg-blue-600 text-white shadow-xs"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {plan.badge}
                  </span>
                </div>

                <h3 className="text-xl font-bold tracking-tight text-slate-950">
                  {plan.name}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-500 min-h-[36px]">
                  {plan.description}
                </p>

                {/* Price Display */}
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-3xl sm:text-4xl font-extrabold tracking-tight font-mono text-slate-950">
                    {plan.price}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">
                    đ / {plan.period}
                  </span>
                </div>
                <div className="mt-1 text-xs font-bold text-blue-700">
                  {plan.quota}
                </div>

                <div className="mt-6 border-t border-slate-100 pt-6 space-y-2.5">
                  {plan.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm">
                      <Check className="h-4 w-4 shrink-0 mt-0.5 text-emerald-600 font-bold" />
                      <span className="text-slate-600">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4">
                <Link
                  href={plan.ctaLink}
                  className={`w-full inline-flex items-center justify-center gap-2 rounded-xl py-3.5 px-4 text-xs sm:text-sm font-bold transition-all ${
                    plan.popular
                      ? "bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-500/25 active:scale-[0.98]"
                      : "bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200/60 active:scale-[0.98]"
                  }`}
                >
                  <span>{plan.ctaText}</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

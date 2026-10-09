import Link from "next/link";
import { Check, Sparkles, ArrowRight } from "lucide-react";

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
    ctaLink: "http://localhost:3000/register",
  },
  {
    name: "Gói Doanh Nghiệp",
    badge: "Được chọn nhiều nhất",
    price: "790.000",
    period: "năm",
    quota: "2.500 hóa đơn / năm",
    description: "Tối ưu cho doanh nghiệp thương mại, dịch vụ, sản xuất phát sinh hóa đơn đều đặn.",
    popular: true,
    features: [
      "Quản lý lên tới 03 Mã số thuế (MST)",
      "Đồng bộ nhanh không giới hạn lượt tra cứu",
      "Ưu tiên tốc độ giải Captcha AI siêu tốc",
      "Tải trọn bộ file ZIP hóa đơn gốc 1-click",
      "Cảnh báo rủi ro thuế & hóa đơn hủy tức thì",
      "Xuất Excel định dạng chuẩn MISA / Fast / Bravo",
      "Hỗ trợ kỹ thuật 24/7 qua Zalo & Hotline",
    ],
    ctaText: "Đăng ký Gói Doanh Nghiệp",
    ctaLink: "http://localhost:3000/register",
  },
  {
    name: "Gói Đại Lý Kế Toán",
    badge: "Dành cho Kế toán Dịch vụ",
    price: "1.490.000",
    period: "năm",
    quota: "6.000 hóa đơn / năm",
    description: "Giải pháp toàn diện cho Đại lý Thuế & Kế toán dịch vụ nhận làm sổ sách cho nhiều công ty.",
    popular: false,
    features: [
      "KHÔNG GIỚI HẠN số lượng Mã số thuế (MST)",
      "Dùng chung Quota linh hoạt cho tất cả khách hàng",
      "Quản lý tập trung hàng chục công ty trên 1 tài khoản",
      "Xuất báo cáo thuế hàng loạt theo từng doanh nghiệp",
      "Hỗ trợ tính năng nạp thêm Quota linh hoạt bất kỳ lúc nào",
      "Bảo mật phân quyền nhân viên phụ trách từng công ty",
      "Kỹ thuật viên hỗ trợ Onboarding 1-1 riêng",
    ],
    ctaText: "Liên hệ tư vấn Đại lý",
    ctaLink: "http://localhost:3000/register",
  },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="py-20 lg:py-28 bg-white border-b border-slate-200/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-blue-600">
            Bảng Giá Dịch Vụ
          </span>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Chi phí tiết kiệm, hiệu quả tức thì
          </h2>
          <p className="mt-4 text-base text-slate-600">
            Tính phí minh bạch theo số lượng hóa đơn phát sinh thực tế. Đăng ký ngay để nhận ngay <strong className="text-blue-600">50 hóa đơn dùng thử miễn phí</strong>.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`relative flex flex-col justify-between rounded-3xl p-8 transition-all ${
                plan.popular
                  ? "border-2 border-blue-600 bg-white shadow-2xl shadow-blue-500/15 ring-4 ring-blue-600/10 scale-100 md:-translate-y-2"
                  : "border border-slate-200 bg-white hover:border-slate-300 hover:shadow-lg"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-600 px-3.5 py-1 text-xs font-bold text-white shadow-md">
                    <Sparkles className="h-3.5 w-3.5" />
                    {plan.badge}
                  </span>
                </div>
              )}

              <div>
                {!plan.popular && (
                  <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600 mb-3">
                    {plan.badge}
                  </span>
                )}
                <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
                  {plan.name}
                </h3>
                <p className="mt-2 text-xs text-slate-500 leading-relaxed min-h-[36px]">
                  {plan.description}
                </p>

                {/* Price Display */}
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold tracking-tight text-slate-900">
                    {plan.price}
                  </span>
                  <span className="text-sm font-bold text-slate-500">đ / {plan.period}</span>
                </div>
                <div className="mt-1 text-xs font-bold text-blue-600">
                  {plan.quota}
                </div>

                <div className="mt-6 border-t border-slate-100 pt-6 space-y-3">
                  {plan.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2.5">
                      <div className="rounded-full bg-blue-50 p-0.5 text-blue-600 shrink-0 mt-0.5">
                        <Check className="h-3.5 w-3.5 stroke-[3]" />
                      </div>
                      <span className="text-xs sm:text-sm text-slate-600 font-medium">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4">
                <Link
                  href={plan.ctaLink}
                  className={`w-full inline-flex items-center justify-center gap-2 rounded-xl py-3.5 px-4 text-sm font-bold transition-all ${
                    plan.popular
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25 hover:bg-blue-700 active:scale-[0.98]"
                      : "border border-slate-300 bg-slate-50 text-slate-700 hover:bg-slate-100 hover:border-slate-400"
                  }`}
                >
                  <span>{plan.ctaText}</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

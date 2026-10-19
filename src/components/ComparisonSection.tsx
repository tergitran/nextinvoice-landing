"use client";

import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import { ScrollReveal } from "@/components/motion";
import { SectionHeader } from "@/components/ui/section-header";
import { REGISTER_URL } from "@/lib/constants";

const comparisons = [
  {
    feature: "Đăng nhập & Lấy dữ liệu Tổng cục Thuế",
    manual: "Đăng nhập thủ công từng lần, tra cứu đơn lẻ, trang Thuế thường xuyên quá tải hoặc gián đoạn.",
    nextInvoice: "Đồng bộ tự động theo khoảng thời gian tùy chọn (ngày, tháng, quý) nhanh chóng chỉ với 1 cú click.",
  },
  {
    feature: "Tải file bản gốc XML & PDF",
    manual: "Mở từng hóa đơn, copy mã tra cứu sang từng trang web NCC (VNPT, Viettel, MISA...) để tải về.",
    nextInvoice: "Tự động nhận diện nhà cung cấp và hỗ trợ tải trực tiếp PDF/XML gốc ~80% các đơn vị phổ biến. Hỗ trợ tải trọn gói ZIP.",
  },
  {
    feature: "Kiểm tra tính hợp lệ & Rủi ro NCC",
    manual: "Phải tra cứu riêng từng mã số thuế xem người bán có còn hoạt động hay không, rất dễ bỏ sót.",
    nextInvoice: "Tự động rà soát cảnh báo ngay nếu người bán tạm dừng kinh doanh, bỏ trốn hoặc hóa đơn bị hủy.",
  },
  {
    feature: "Thời gian lập bảng kê mỗi kỳ thuế",
    manual: "Mất từ 2 đến 5 ngày cho mỗi công ty để rà soát, bóc tách hàng hóa và nhập liệu vào phần mềm.",
    nextInvoice: "Chỉ mất 30 giây để xuất bảng kê Excel chi tiết từng dòng hàng hóa, nhập thẳng vào MISA/Fast.",
  },
  {
    feature: "Lưu trữ & Tra cứu khi thanh tra thuế",
    manual: "Lưu rải rác trên ổ cứng, nguy cơ mất mát dữ liệu sau 3 - 5 năm hoặc máy tính bị nhiễm virus.",
    nextInvoice: "Lưu trữ đám mây an toàn, mã hóa bảo mật, tìm kiếm lại bất kỳ hóa đơn nào trong 2 giây.",
  },
];

export default function ComparisonSection() {
  return (
    <section className="py-20 lg:py-28 bg-slate-50/50 border-b border-slate-200/70">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <SectionHeader
            badge="Hiệu quả thực tế"
            title="Sự khác biệt khi ứng dụng tự động hóa"
            description="So sánh trực quan giữa phương thức xử lý thủ công truyền thống và Next Invoice."
          />
        </ScrollReveal>

        {/* Comparison Table */}
        <ScrollReveal delay={0.1} className="mt-12 overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div className="grid grid-cols-1 md:grid-cols-12 border-b border-slate-200 bg-slate-50 text-xs sm:text-sm font-semibold text-slate-700">
            <div className="p-4 md:col-span-4">Tiêu chí nghiệp vụ</div>
            <div className="p-4 md:col-span-4 border-t md:border-t-0 md:border-l border-slate-200 text-slate-500">
              Quy trình thủ công
            </div>
            <div className="p-4 md:col-span-4 border-t md:border-t-0 md:border-l border-slate-200 text-slate-950 font-bold bg-slate-100/50">
              Giải pháp Next Invoice
            </div>
          </div>

          <div className="divide-y divide-slate-100 text-xs sm:text-sm">
            {comparisons.map((item, idx) => (
              <div key={idx} className="grid grid-cols-1 md:grid-cols-12 transition-colors hover:bg-slate-50/40">
                <div className="p-4 md:col-span-4 font-semibold text-slate-900 flex items-center">
                  {item.feature}
                </div>
                <div className="p-4 md:col-span-4 border-t md:border-t-0 md:border-l border-slate-100 text-slate-500 flex items-start gap-2.5">
                  <span className="text-slate-400 font-bold shrink-0 mt-0.5">—</span>
                  <span className="leading-relaxed">{item.manual}</span>
                </div>
                <div className="p-4 md:col-span-4 border-t md:border-t-0 md:border-l border-slate-100 text-slate-900 font-medium flex items-start gap-2.5 bg-slate-50/20">
                  <Check className="h-4 w-4 text-slate-950 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{item.nextInvoice}</span>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Mini CTA */}
        <ScrollReveal delay={0.2} className="mt-10 text-center">
          <Link
            href={REGISTER_URL}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-md shadow-blue-500/20 transition hover:bg-blue-700 active:scale-[0.98]"
          >
            <span>Dùng thử miễn phí 50 hóa đơn</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}

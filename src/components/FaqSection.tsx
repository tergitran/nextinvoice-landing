"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { ScrollReveal } from "@/components/motion";
import { SectionHeader } from "@/components/ui/section-header";

const faqs = [
  {
    q: "Next Invoice có tự động giải mã Captcha của Tổng cục Thuế không?",
    a: "Có. Hệ thống tích hợp sẵn Microservice trí tuệ nhân tạo (AI Engine) chuyên giải mã Captcha hình ảnh của Cổng HĐĐT Tổng cục Thuế với độ chính xác cao trong vòng chưa đến 0.5 giây. Bạn không cần phải ngồi gõ captcha bằng tay.",
  },
  {
    q: "Phần mềm có tải được file XML và PDF gốc có chữ ký số không?",
    a: "Có. Hiện tại hệ thống đang hỗ trợ tải được tầm 80% hóa đơn gốc từ các tổ chức cung cấp giải pháp hóa đơn điện tử phổ biến (VNPT, Viettel, MISA, BKAV, EasyInvoice, Thái Sơn, Mắt Bão, CyberBill...). Đối với các đơn vị chưa hỗ trợ tải trực tiếp do không chia sẻ dữ liệu gốc cho Cổng TCT, hệ thống cung cấp đường link và hướng dẫn tra cứu chi tiết để kế toán lấy file nhanh nhất.",
  },
  {
    q: "Tôi làm kế toán dịch vụ quản lý nhiều công ty (MST) thì dùng như thế nào?",
    a: "Next Invoice có gói riêng dành cho Kế toán dịch vụ & Đại lý thuế (Agency). Bạn không bị giới hạn số lượng Mã số thuế khai báo, có thể quản lý tập trung hàng chục công ty trên cùng 1 màn hình và sử dụng chung kho hạn mức hóa đơn một cách linh hoạt.",
  },
  {
    q: "Mật khẩu Cổng Thuế của tôi có được bảo mật an toàn không?",
    a: "Tuyệt đối an toàn. Mật khẩu được mã hóa đa tầng (AES-256 bit). Hệ thống chỉ dùng thông tin đăng nhập trong phiên làm việc với Cổng Thuế để lấy danh sách hóa đơn theo sự ủy quyền của bạn, hoàn toàn không có bất kỳ ai có thể xem được mật khẩu của bạn.",
  },
  {
    q: "Dữ liệu xuất ra có tương thích với phần mềm MISA, Fast, Bravo không?",
    a: "Có. Next Invoice hỗ trợ bóc tách chi tiết từng dòng mặt hàng, số lượng, đơn giá, thuế suất và tiền thuế. Bảng kê xuất ra dưới định dạng Excel (.xlsx) chuẩn cấu trúc mẫu import của các phần mềm kế toán thông dụng nhất hiện nay.",
  },
  {
    q: "Hóa đơn trùng lặp có bị trừ hạn mức trong gói không?",
    a: "Không. Next Invoice áp dụng quy tắc trừ hạn mức minh bạch: Chỉ những hóa đơn mới lần đầu tiên xuất hiện trong hệ thống và tải thành công mới được tính lượt. Khi hệ thống đồng bộ lại các ngày cũ, các hóa đơn đã có sẽ không bị trừ thêm bất kỳ lượt hạn mức nào.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 lg:py-28 bg-slate-50/50 border-b border-slate-200/70">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <SectionHeader
            badge="Hỏi đáp thường gặp"
            title="Câu hỏi thường gặp của Kế toán"
            description="Mọi thông tin cần biết về cơ chế hoạt động, tính pháp lý và bảo mật của Next Invoice."
          />
        </ScrollReveal>

        {/* FAQ Accordion List */}
        <ScrollReveal delay={0.1} className="mt-12 space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="overflow-hidden rounded-xl border border-slate-200 bg-white transition-all hover:border-slate-300"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="flex w-full items-center justify-between p-5 text-left text-sm sm:text-base font-semibold text-slate-900 focus:outline-none"
                >
                  <span className="pr-4">{faq.q}</span>
                  <ChevronDown
                    className={`h-4 w-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-slate-900" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="border-t border-slate-100 p-5 pt-3.5 text-xs sm:text-sm text-slate-600 leading-relaxed bg-slate-50/30 font-normal">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </ScrollReveal>
      </div>
    </section>
  );
}

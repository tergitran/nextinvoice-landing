"use client";

import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/motion";

const securityFeatures = [
  {
    num: "01",
    title: "Mã hóa cấp Ngân hàng AES-256",
    description: "Mọi dữ liệu truyền tải đều được bảo vệ bởi chứng chỉ SSL 256-bit và mã hóa cấp cơ sở dữ liệu độc lập.",
  },
  {
    num: "02",
    title: "Không lưu mật khẩu dạng Plain Text",
    description: "Mật khẩu Cổng Thuế của bạn được mã hóa an toàn, không nhân sự nào kể cả đội ngũ kỹ thuật có thể đọc được.",
  },
  {
    num: "03",
    title: "Sao lưu tự động định kỳ",
    description: "Dữ liệu hóa đơn, file XML và PDF được sao lưu định kỳ trên hạ tầng Cloud Storage với độ sẵn sàng cao.",
  },
  {
    num: "04",
    title: "Phân quyền chi tiết (RBAC)",
    description: "Chủ doanh nghiệp dễ dàng phân quyền kế toán viên theo từng mã số thuế, tránh rò rỉ số liệu kinh doanh nội bộ.",
  },
  {
    num: "05",
    title: "Cô lập môi trường dữ liệu",
    description: "Dữ liệu kế toán của từng công ty được phân tách logic rõ ràng, đảm bảo tính toàn vẹn và độc lập tuyệt đối.",
  },
  {
    num: "06",
    title: "Tuân thủ Nghị định 123 & TT 78",
    description: "Lưu trữ đầy đủ hóa đơn gốc, thông điệp phản hồi của TCT và chữ ký số nguyên vẹn phục vụ công tác thanh kiểm tra.",
  },
];

export default function SecuritySection() {
  return (
    <section id="security" className="py-20 lg:py-28 bg-slate-50/60 text-slate-900 border-b border-slate-200/70">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">
            An toàn thông tin
          </span>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl text-slate-950">
            Bảo mật tối đa dữ liệu Tài chính - Kế toán
          </h2>
          <p className="mt-4 text-base text-slate-600 leading-relaxed font-normal">
            Chúng tôi hiểu rằng dữ liệu hóa đơn là tài sản bí mật cốt lõi của doanh nghiệp. Next Invoice áp dụng các tiêu chuẩn an toàn thông tin nghiêm ngặt nhất.
          </p>
        </ScrollReveal>

        {/* Security Feature Grid */}
        <StaggerContainer
          className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          delayChildren={0.1}
          staggerChildren={0.08}
        >
          {securityFeatures.map((sec, idx) => (
            <StaggerItem
              key={idx}
              className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 shadow-2xs transition-all hover:border-blue-300 hover:shadow-md"
            >
              <div className="inline-flex items-center justify-center rounded-lg bg-blue-50 px-2.5 py-1 text-xs font-mono font-bold text-blue-700">
                {sec.num}
              </div>
              <h4 className="mt-4 text-base font-bold text-slate-950 tracking-tight">
                {sec.title}
              </h4>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                {sec.description}
              </p>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

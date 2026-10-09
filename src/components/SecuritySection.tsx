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
    <section id="security" className="py-20 lg:py-28 bg-slate-950 text-white border-b border-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">
            An toàn thông tin
          </span>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl text-white">
            Bảo mật tối đa dữ liệu Tài chính - Kế toán
          </h2>
          <p className="mt-4 text-base text-slate-400 leading-relaxed font-normal">
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
              className="rounded-xl border border-slate-800/80 bg-slate-900/40 p-6 transition-colors hover:border-slate-700"
            >
              <div className="text-xs font-mono font-semibold text-slate-400">
                {sec.num}
              </div>
              <h4 className="mt-3 text-base font-bold text-white tracking-tight">
                {sec.title}
              </h4>
              <p className="mt-2 text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
                {sec.description}
              </p>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

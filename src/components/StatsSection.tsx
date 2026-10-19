"use client";

import { StaggerContainer, StaggerItem } from "@/components/motion";

const stats = [
  {
    value: "85%",
    label: "Tiết kiệm thời gian thao tác",
    description: "Tự động hóa hoàn toàn việc tải lẻ và tra cứu hóa đơn thủ công trên Cổng Thuế.",
  },
  {
    value: "~80%",
    label: "Tải trực tiếp hóa đơn gốc",
    description: "Lấy thẳng file XML ký số và PDF từ các cổng giải pháp HĐĐT phổ biến nhất.",
  },
  {
    value: "100%",
    label: "Chuẩn định dạng Tổng cục Thuế",
    description: "Đồng bộ đầy đủ hóa đơn Mua vào và Bán ra có mã/không mã theo Thông tư 78.",
  },
  {
    value: "< 1s",
    label: "Tốc độ xử lý dữ liệu",
    description: "Tự động hóa kết nối và cập nhật hóa đơn tức thì, vận hành ổn định không gián đoạn.",
  },
];

export default function StatsSection() {
  return (
    <section id="stats" className="border-b border-slate-200/70 bg-slate-50/50 py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <StaggerContainer
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 sm:gap-6 lg:gap-8"
          delayChildren={0.1}
          staggerChildren={0.1}
        >
          {stats.map((stat, idx) => (
            <StaggerItem
              key={idx}
              className="flex flex-col justify-start border-l-2 border-slate-900/10 pl-5 transition-all hover:border-blue-600 sm:border-l-2 sm:pl-5"
            >
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-950">
                {stat.value}
              </div>
              <div className="mt-2 text-sm font-semibold text-slate-900 tracking-tight">
                {stat.label}
              </div>
              <p className="mt-1.5 text-xs text-slate-500 leading-relaxed font-normal">
                {stat.description}
              </p>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

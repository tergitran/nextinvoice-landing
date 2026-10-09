import { Clock, Layers, ShieldCheck, Zap } from "lucide-react";

const stats = [
  {
    icon: Clock,
    value: "85%",
    label: "Tiết kiệm thời gian kế toán",
    description: "Không còn mất hàng giờ đăng nhập và tải lẻ từng hóa đơn trên cổng Thuế.",
  },
  {
    icon: Layers,
    value: "~80%",
    label: "Hóa đơn gốc tải trực tiếp",
    description: "Hỗ trợ tải trực tiếp hóa đơn gốc từ hầu hết các nhà cung cấp phổ biến trên thị trường.",
  },
  {
    icon: ShieldCheck,
    value: "100%",
    label: "Dữ liệu chuẩn Tổng cục Thuế",
    description: "Đồng bộ đầy đủ dữ liệu Mua vào và Bán ra có mã/không mã theo chuẩn TCT.",
  },
  {
    icon: Zap,
    value: "0.4s",
    label: "Giải mã Captcha TCT bằng AI",
    description: "Xử lý Captcha hình ảnh tức thì, đồng bộ nhanh chóng theo khoảng thời gian tùy chọn.",
  },
];

export default function StatsSection() {
  return (
    <section className="border-y border-slate-200/80 bg-white py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="flex flex-col items-center text-center sm:items-start sm:text-left rounded-xl p-4 transition-all hover:bg-slate-50"
              >
                <div className="mb-3 inline-flex rounded-xl bg-blue-50 p-3 text-blue-600">
                  <Icon className="h-6 w-6" />
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm font-bold text-slate-800">
                  {stat.label}
                </div>
                <p className="mt-1.5 text-xs sm:text-sm text-slate-500 leading-relaxed">
                  {stat.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

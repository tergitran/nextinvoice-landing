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
    value: "136+",
    label: "Nhà cung cấp HĐĐT hỗ trợ",
    description: "Nhận diện và hỗ trợ tra cứu file gốc từ VNPT, Viettel, MISA, BKAV, Fast...",
  },
  {
    icon: ShieldCheck,
    value: "100%",
    label: "Dữ liệu gốc chuẩn Tổng cục Thuế",
    description: "Lưu trữ đầy đủ cả XML ký số và bản in PDF phục vụ thanh kiểm tra.",
  },
  {
    icon: Zap,
    value: "3 Giây",
    label: "Thời gian đồng bộ mỗi hóa đơn",
    description: "Tự động phân loại, kiểm tra trạng thái MST và bóc tách dữ liệu chi tiết.",
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

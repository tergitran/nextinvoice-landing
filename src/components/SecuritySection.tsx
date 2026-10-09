import { ShieldCheck, Lock, Database, UserCheck, KeyRound, Server } from "lucide-react";

const securityFeatures = [
  {
    icon: Lock,
    title: "Mã hóa cấp Ngân hàng AES-256",
    description: "Mọi dữ liệu truyền tải qua đường truyền đều được bảo vệ bởi chứng chỉ SSL 256-bit và mã hóa cấp dữ liệu độc lập.",
  },
  {
    icon: KeyRound,
    title: "Không lưu mật khẩu dạng Plain Text",
    description: "Mật khẩu Cổng Thuế của bạn được bảo mật đa tầng, không nhân sự nào kể cả đội ngũ phát triển có thể đọc được.",
  },
  {
    icon: Database,
    title: "Sao lưu tự động hàng ngày",
    description: "Dữ liệu hóa đơn, file XML và PDF được sao lưu định kỳ trên hạ tầng Cloud Storage đạt chuẩn dự phòng rủi ro 99.99%.",
  },
  {
    icon: UserCheck,
    title: "Phân quyền chi tiết (RBAC)",
    description: "Chủ doanh nghiệp dễ dàng phân quyền kế toán viên theo từng mã số thuế, tránh rò rỉ số liệu kinh doanh nội bộ.",
  },
  {
    icon: Server,
    title: "Cô lập môi trường dữ liệu",
    description: "Dữ liệu kế toán của từng công ty được phân tách logic rõ ràng, đảm bảo tính toàn vẹn và độc lập tuyệt đối.",
  },
  {
    icon: ShieldCheck,
    title: "Tuân thủ Nghị định 123 & TT 78",
    description: "Lưu trữ đầy đủ hóa đơn gốc, thông điệp phản hồi của TCT và chữ ký số nguyên vẹn phục vụ công tác thanh kiểm tra.",
  },
];

export default function SecuritySection() {
  return (
    <section id="security" className="py-20 lg:py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/20 border border-blue-400/30 px-3.5 py-1 text-xs font-bold text-blue-300 mb-4">
            <ShieldCheck className="h-4 w-4 text-blue-400" />
            <span>Tiêu Chuẩn Bảo Mật Hàng Đầu</span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Bảo mật tối đa dữ liệu Tài chính - Kế toán
          </h2>
          <p className="mt-4 text-base text-slate-300">
            Chúng tôi hiểu rằng dữ liệu hóa đơn là tài sản bí mật cốt lõi của doanh nghiệp. Next Invoice áp dụng các tiêu chuẩn an toàn thông tin nghiêm ngặt nhất.
          </p>
        </div>

        {/* Security Feature Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {securityFeatures.map((sec, idx) => {
            const Icon = sec.icon;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-800 bg-slate-800/50 p-6 backdrop-blur-xs transition-all hover:border-slate-700 hover:bg-slate-800/80"
              >
                <div className="mb-4 inline-flex rounded-xl bg-blue-500/10 border border-blue-500/20 p-3 text-blue-400">
                  <Icon className="h-6 w-6" />
                </div>
                <h4 className="text-lg font-bold text-white tracking-tight">
                  {sec.title}
                </h4>
                <p className="mt-2 text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {sec.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

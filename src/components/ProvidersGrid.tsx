import { Building2, CheckCircle2, Search } from "lucide-react";

const topProviders = [
  { name: "VNPT-Invoice", org: "Tập đoàn VNPT", count: "Phổ biến #1", color: "text-blue-600 bg-blue-50 border-blue-200" },
  { name: "Viettel S-Invoice", org: "Tập đoàn Viettel", count: "Phổ biến #2", color: "text-purple-600 bg-purple-50 border-purple-200" },
  { name: "MISA meInvoice", org: "Công ty Cổ phần MISA", count: "Phổ biến #3", color: "text-emerald-600 bg-emerald-50 border-emerald-200" },
  { name: "BKAV eHoadon", org: "Tập đoàn BKAV", count: "Phổ biến", color: "text-amber-600 bg-amber-50 border-amber-200" },
  { name: "Fast e-Invoice", org: "Công ty Phần mềm Fast", count: "Kế toán tin dùng", color: "text-sky-600 bg-sky-50 border-sky-200" },
  { name: "EasyInvoice", org: "Softdreams", count: "Phổ biến SMB", color: "text-indigo-600 bg-indigo-50 border-indigo-200" },
  { name: "Thái Sơn E-Invoice", org: "Công ty Phát triển Công nghệ Thái Sơn", count: "Doanh nghiệp FDI", color: "text-rose-600 bg-rose-50 border-rose-200" },
  { name: "Mắt Bão SafeVAT", org: "Mắt Bão", count: "Thương mại điện tử", color: "text-cyan-600 bg-cyan-50 border-cyan-200" },
  { name: "Mobifone Invoice", org: "Tổng công ty Mobifone", count: "Viễn thông", color: "text-blue-700 bg-blue-50 border-blue-200" },
  { name: "FPT.eInvoice", org: "Tập đoàn FPT", count: "Tập đoàn lớn", color: "text-orange-600 bg-orange-50 border-orange-200" },
  { name: "CyberBill", org: "Cyberlotus", count: "Dịch vụ thuế", color: "text-teal-600 bg-teal-50 border-teal-200" },
  { name: "VinaCA SmartVAS", org: "VinaCA", count: "Chữ ký số & HĐ", color: "text-violet-600 bg-violet-50 border-violet-200" },
];

export default function ProvidersGrid() {
  return (
    <section id="providers" className="py-20 lg:py-24 bg-white border-b border-slate-200/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-blue-600">
            Mạng Lưới Kết Nối Toàn Diện
          </span>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Tương thích với 136+ Nhà Cung Cấp Hóa Đơn Điện Tử
          </h2>
          <p className="mt-4 text-base text-slate-600">
            Dù đối tác của bạn phát hành hóa đơn qua VNPT, Viettel, MISA hay bất kỳ đơn vị trung gian T-VAN nào, Next Invoice đều tự động nhận diện và hỗ trợ lấy link tra cứu file gốc tức thì.
          </p>
        </div>

        {/* Grid Cards */}
        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 sm:gap-4">
          {topProviders.map((p, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50/50 p-4 transition-all hover:bg-white hover:shadow-md hover:border-slate-300"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className={`inline-flex rounded-md border px-2 py-0.5 text-[11px] font-bold ${p.color}`}>
                    {p.count}
                  </span>
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                </div>
                <h4 className="mt-3 text-sm sm:text-base font-extrabold text-slate-900">
                  {p.name}
                </h4>
                <p className="mt-1 text-xs text-slate-500 line-clamp-1">
                  {p.org}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-medium">
                <span>Hỗ trợ XML & PDF</span>
                <span className="text-emerald-600 font-bold">100%</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-10 rounded-2xl bg-gradient-to-r from-blue-900 to-indigo-900 p-6 sm:p-8 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="rounded-xl bg-white/10 p-3 hidden sm:block">
              <Building2 className="h-8 w-8 text-blue-300" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold">
                Doanh nghiệp của bạn có nhà cung cấp đặc thù riêng?
              </h3>
              <p className="text-xs sm:text-sm text-blue-200 mt-1">
                Hệ thống liên tục cập nhật thuật toán bóc tách file gốc cho tất cả các đơn vị T-VAN mới nhất trên thị trường.
              </p>
            </div>
          </div>
          <span className="shrink-0 rounded-xl bg-blue-500/20 border border-blue-400/30 px-4 py-2 text-xs sm:text-sm font-bold text-blue-200">
            Tự động cập nhật 24/7
          </span>
        </div>
      </div>
    </section>
  );
}

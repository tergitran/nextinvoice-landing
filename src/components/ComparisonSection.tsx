import { X, Check, ArrowRight } from "lucide-react";
import Link from "next/link";

const comparisons = [
  {
    feature: "Đăng nhập & Lấy dữ liệu Tổng cục Thuế",
    manual: "Đăng nhập thủ công, gõ captcha nhiều lần, trang Thuế thường xuyên giật lag hoặc quá tải.",
    nextInvoice: "Tự động hoàn toàn, giải Captcha bằng AI trong 0.4s, đồng bộ định kỳ lúc 06:00 sáng mỗi ngày.",
  },
  {
    feature: "Tải file bản gốc XML & PDF",
    manual: "Mở từng hóa đơn, copy mã tra cứu sang từng trang web NCC (VNPT, Viettel, MISA...) để tải về.",
    nextInvoice: "Tự động nhận diện 136+ NCC và tải sẵn cả file XML ký số và PDF bản in. Hỗ trợ tải trọn gói 1 click.",
  },
  {
    feature: "Kiểm tra tính hợp lệ & Rủi ro NCC",
    manual: "Phải tra cứu riêng từng mã số thuế xem người bán có còn hoạt động hay không. Rất dễ bỏ sót.",
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
    <section className="py-20 lg:py-28 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-blue-600">
            Hiệu Quả Thực Tế
          </span>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Tại sao hàng trăm Kế toán đã ngừng làm thủ công?
          </h2>
          <p className="mt-4 text-base text-slate-600">
            So sánh trực quan giữa phương thức truyền thống và khi có Next Invoice đồng hành.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="mt-12 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-200/50">
          <div className="grid grid-cols-1 md:grid-cols-12 border-b border-slate-200 bg-slate-100/70 text-xs sm:text-sm font-bold text-slate-700">
            <div className="p-4 md:col-span-4">Nghiệp vụ hóa đơn</div>
            <div className="p-4 md:col-span-4 border-t md:border-t-0 md:border-l border-slate-200 text-rose-700 flex items-center gap-1.5">
              <X className="h-4 w-4" /> Cách làm thủ công cũ
            </div>
            <div className="p-4 md:col-span-4 border-t md:border-t-0 md:border-l border-slate-200 bg-blue-50/70 text-blue-800 flex items-center gap-1.5">
              <Check className="h-4 w-4 stroke-[3]" /> Giải pháp Next Invoice
            </div>
          </div>

          <div className="divide-y divide-slate-100 text-xs sm:text-sm">
            {comparisons.map((item, idx) => (
              <div key={idx} className="grid grid-cols-1 md:grid-cols-12 transition-colors hover:bg-slate-50/60">
                <div className="p-4 md:col-span-4 font-bold text-slate-900 flex items-center">
                  {item.feature}
                </div>
                <div className="p-4 md:col-span-4 border-t md:border-t-0 md:border-l border-slate-100 text-slate-500 flex items-start gap-2">
                  <X className="h-4 w-4 text-rose-500 shrink-0 mt-0.5" />
                  <span>{item.manual}</span>
                </div>
                <div className="p-4 md:col-span-4 border-t md:border-t-0 md:border-l border-slate-100 bg-blue-50/20 text-slate-800 font-medium flex items-start gap-2">
                  <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5 stroke-[3]" />
                  <span>{item.nextInvoice}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mini CTA */}
        <div className="mt-10 text-center">
          <Link
            href="http://localhost:3000/register"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-md shadow-blue-500/20 transition-all hover:bg-blue-700 active:scale-[0.98]"
          >
            <span>Trải nghiệm miễn phí ngay hôm nay</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

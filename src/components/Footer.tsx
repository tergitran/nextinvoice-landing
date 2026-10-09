import Link from "next/link";
import { ShieldCheck, Mail, Phone, MapPin } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { LOGIN_URL, REGISTER_URL } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="border-t border-slate-900 bg-slate-950 text-slate-400 text-xs sm:text-sm">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link
              href="/"
              className="inline-flex items-center transition-transform hover:opacity-95 active:scale-98"
              aria-label="Trang chủ Next Invoice"
            >
              <Logo size="md" theme="dark" />
            </Link>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              Hệ thống tự động hóa đồng bộ, lưu trữ và quản lý hóa đơn điện tử từ Cổng Tổng cục Thuế dành cho Doanh nghiệp & Đại lý kế toán tại Việt Nam.
            </p>
            <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs">
              <ShieldCheck className="h-4 w-4" />
              <span>Chuẩn dữ liệu Tổng cục Thuế (Thông tư 78 / NĐ 123)</span>
            </div>
          </div>

          {/* Col 1: Tính năng */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Sản Phẩm
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="#features" className="hover:text-white transition">
                  Đồng bộ hóa đơn TCT
                </Link>
              </li>
              <li>
                <Link href="#features" className="hover:text-white transition">
                  Tải file XML & PDF gốc
                </Link>
              </li>
              <li>
                <Link href="#features" className="hover:text-white transition">
                  Rà soát rủi ro đối tác
                </Link>
              </li>
              <li>
                <Link href="#export" className="hover:text-white transition">
                  Xuất bảng kê chi tiết (.xlsx)
                </Link>
              </li>
              <li>
                <Link href="#providers" className="hover:text-white transition">
                  Nhà cung cấp hỗ trợ
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 2: Dịch vụ & Bảng giá */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Khách Hàng
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="#pricing" className="hover:text-white transition">
                  Gói Doanh nghiệp SMB
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="hover:text-white transition">
                  Gói Đại lý Kế toán
                </Link>
              </li>
              <li>
                <Link href={LOGIN_URL} className="hover:text-white transition">
                  Đăng nhập Webapp
                </Link>
              </li>
              <li>
                <Link href={REGISTER_URL} className="hover:text-white transition">
                  Đăng ký dùng thử
                </Link>
              </li>
              <li>
                <Link href="#faq" className="hover:text-white transition">
                  Câu hỏi thường gặp
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Liên hệ */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Hỗ Trợ & Liên Hệ
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-blue-400 shrink-0" />
                <span>Hotline: 090 123 4567</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-blue-400 shrink-0" />
                <span>support@nextinvoice.pro.vn</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" />
                <span>Hà Nội & TP. Hồ Chí Minh, Việt Nam</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 Next Invoice. Bản quyền thuộc về hệ thống Next Invoice.</p>
          <div className="flex gap-6">
            <span className="hover:text-slate-400 cursor-pointer">Chính sách bảo mật</span>
            <span className="hover:text-slate-400 cursor-pointer">Điều khoản sử dụng</span>
            <span className="hover:text-slate-400 cursor-pointer">Cam kết dịch vụ (SLA)</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

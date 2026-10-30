"use client";

import { Download, ArrowRight, Check, FileSpreadsheet, Filter } from "lucide-react";
import Link from "next/link";
import { ScrollReveal } from "@/components/motion";
import { SectionHeader } from "@/components/ui/section-header";
import { REGISTER_URL } from "@/lib/constants";

export default function DetailedExportSection() {
  return (
    <section id="export" className="py-20 lg:py-28 bg-white border-b border-slate-200/70">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <ScrollReveal>
          <SectionHeader
            badge="Nghiệp vụ chuyên sâu"
            title="Xuất Bảng Kê Chi Tiết Cấp Dòng Hàng (.xlsx)"
            description={
              <>
                Không chỉ xuất bảng kê tổng hợp 1 dòng/hóa đơn, Next Invoice tự động bóc tách từng mặt hàng từ dữ liệu gốc thành nhiều dòng: <strong className="text-slate-900 font-semibold">Tên hàng, ĐVT, Số lượng, Đơn giá, Thuế suất 8% / 10%</strong>. Sẵn sàng nạp vào MISA, Fast, Bravo trong 1 giây.
              </>
            }
          />
        </ScrollReveal>

        {/* 2 Lựa chọn xuất Excel (Màu sắc đồng bộ, bỏ text Chế độ 01/02) */}
        <ScrollReveal delay={0.1} className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-6 sm:p-7 transition-all hover:bg-white hover:border-slate-300 hover:shadow-xs">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center rounded-md border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-700">
                Chuẩn Thông tư 78 / NĐ 123
              </span>
              <span className="text-xs text-slate-400">Tổng hợp tờ khai</span>
            </div>
            <h3 className="mt-3 text-lg font-bold text-slate-950">
              Bảng Kê Tổng Hợp Hóa Đơn
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              Mỗi hóa đơn thể hiện trên 1 dòng duy nhất, tổng hợp tổng tiền hàng, tiền thuế GTGT và tổng thanh toán. Phù hợp cho việc lập Tờ khai thuế GTGT hàng quý/tháng và đối soát nhanh doanh số.
            </p>
            <ul className="mt-4 space-y-2 text-xs text-slate-700">
              <li className="flex items-center gap-2">
                <Check className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                <span>Tổng hợp theo từng kỳ tính thuế (tháng, quý, năm)</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                <span>Hiển thị đầy đủ trạng thái cấp mã của Tổng cục Thuế</span>
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-6 sm:p-7 transition-all hover:bg-white hover:border-slate-300 hover:shadow-xs">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center rounded-md border border-blue-200 bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">
                Bóc tách tự động từng mặt hàng
              </span>
              <span className="text-xs text-blue-600 font-semibold">Được kế toán tin dùng</span>
            </div>
            <h3 className="mt-3 text-lg font-bold text-slate-950">
              Bảng Kê Chi Tiết Từng Dòng Mặt Hàng
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              Tự động giải nén dữ liệu và trải rộng 1 hóa đơn thành N dòng hàng hóa. Chi tiết từng mã hàng, đơn giá, số lượng, tiền chiết khấu và mức thuế suất của từng mặt hàng riêng lẻ.
            </p>
            <ul className="mt-4 space-y-2 text-xs text-slate-700">
              <li className="flex items-center gap-2">
                <Check className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                <span>Bóc tách 9 cột thuộc tính vật tư hàng hóa chi tiết</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                <span>Tương thích 100% mẫu Excel Import vào MISA SME, AMIS, Fast, Bravo</span>
              </li>
            </ul>
          </div>
        </ScrollReveal>

        {/* Mockup Bảng Tính Excel Chuẩn Màu Sắc Excel */}
        <ScrollReveal delay={0.2} className="mt-10 overflow-hidden rounded-2xl border border-slate-300 bg-white shadow-xl shadow-slate-200/50 max-w-full">
          {/* Excel Application Header Bar (Màu xanh lá Excel chuẩn) */}
          <div className="flex items-center justify-between bg-emerald-800 px-3.5 sm:px-4 py-2.5 text-white gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <div className="rounded bg-emerald-700 p-1 shrink-0">
                <FileSpreadsheet className="h-4 w-4 text-white" />
              </div>
              <span className="text-xs sm:text-sm font-bold tracking-tight truncate max-w-[170px] sm:max-w-none">
                Bang_Ke_Chi_Tiet_Hoa_Don_Mua_Vao_Q3_2026.xlsx
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="hidden sm:inline-flex rounded bg-emerald-700/80 px-2 py-0.5 text-[11px] font-mono">
                Định dạng chuẩn XLSX
              </span>
              <button className="inline-flex items-center gap-1 rounded bg-white px-2.5 py-1 text-xs font-bold text-emerald-800 hover:bg-emerald-50 transition">
                <Download className="h-3 w-3" /> Tải về mẫu
              </button>
            </div>
          </div>

          {/* Sub Toolbar */}
          <div className="flex items-center gap-4 border-b border-slate-200 bg-slate-50 px-4 py-2 text-xs text-slate-600 overflow-x-auto">
            <span className="font-semibold text-slate-900">Sheet: Chi_Tiet_Hang_Hoa</span>
            <span className="text-slate-300">|</span>
            <span className="flex items-center gap-1 text-emerald-700 font-medium">
              <Filter className="h-3 w-3 text-emerald-600" /> Phân tách tự động thuế suất 8%, 10%
            </span>
          </div>

          {/* Excel Grid Preview */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100/90 text-slate-700 font-bold border-b border-slate-300">
                <tr>
                  <th className="py-2.5 px-3 border-r border-slate-200 text-center w-12">STT</th>
                  <th className="py-2.5 px-3 border-r border-slate-200">Ký hiệu</th>
                  <th className="py-2.5 px-3 border-r border-slate-200">Số HĐ</th>
                  <th className="py-2.5 px-3 border-r border-slate-200">Ngày lập</th>
                  <th className="py-2.5 px-3 border-r border-slate-200">Người bán</th>
                  <th className="py-2.5 px-3 border-r border-slate-200 bg-emerald-50/80 text-emerald-950 font-bold">
                    Tên hàng hóa, dịch vụ
                  </th>
                  <th className="py-2.5 px-2 border-r border-slate-200 text-center bg-emerald-50/80 text-emerald-950 font-bold">
                    ĐVT
                  </th>
                  <th className="py-2.5 px-2 border-r border-slate-200 text-right bg-emerald-50/80 text-emerald-950 font-bold">
                    Số lượng
                  </th>
                  <th className="py-2.5 px-3 border-r border-slate-200 text-right bg-emerald-50/80 text-emerald-950 font-bold">
                    Đơn giá
                  </th>
                  <th className="py-2.5 px-2 border-r border-slate-200 text-center bg-blue-50/80 text-blue-950 font-bold">
                    Thuế suất
                  </th>
                  <th className="py-2.5 px-3 border-r border-slate-200 text-right font-semibold">
                    Thành tiền
                  </th>
                  <th className="py-2.5 px-3 text-right font-semibold">Tiền thuế</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700 font-mono">
                {/* Invoice 1 - Item 1 */}
                <tr className="hover:bg-slate-50/75">
                  <td className="py-2 px-3 border-r border-slate-200 text-center font-sans text-slate-400">1</td>
                  <td className="py-2 px-3 border-r border-slate-200 font-sans font-medium">1C26TTA</td>
                  <td className="py-2 px-3 border-r border-slate-200 text-blue-600 font-bold">0004521</td>
                  <td className="py-2 px-3 border-r border-slate-200 font-sans">15/07/2026</td>
                  <td className="py-2 px-3 border-r border-slate-200 font-sans truncate max-w-[150px]">Cty CP Viễn Thông V-Connect</td>
                  <td className="py-2 px-3 border-r border-slate-200 font-sans font-bold text-slate-900 bg-emerald-50/30">
                    Thiết bị mạng Switch Cisco 24 Port
                  </td>
                  <td className="py-2 px-2 border-r border-slate-200 text-center font-sans">Bộ</td>
                  <td className="py-2 px-2 border-r border-slate-200 text-right">02</td>
                  <td className="py-2 px-3 border-r border-slate-200 text-right">6.500.000</td>
                  <td className="py-2 px-2 border-r border-slate-200 text-center font-bold text-blue-600 bg-blue-50/30">10%</td>
                  <td className="py-2 px-3 border-r border-slate-200 text-right font-semibold">13.000.000</td>
                  <td className="py-2 px-3 text-right">1.300.000</td>
                </tr>

                {/* Invoice 1 - Item 2 */}
                <tr className="hover:bg-slate-50/75 bg-slate-50/30">
                  <td className="py-2 px-3 border-r border-slate-200 text-center font-sans text-slate-400">2</td>
                  <td className="py-2 px-3 border-r border-slate-200 font-sans font-medium">1C26TTA</td>
                  <td className="py-2 px-3 border-r border-slate-200 text-blue-600 font-bold">0004521</td>
                  <td className="py-2 px-3 border-r border-slate-200 font-sans">15/07/2026</td>
                  <td className="py-2 px-3 border-r border-slate-200 font-sans truncate max-w-[150px]">Cty CP Viễn Thông V-Connect</td>
                  <td className="py-2 px-3 border-r border-slate-200 font-sans font-bold text-slate-900 bg-emerald-50/30">
                    Cáp mạng Cat6e UTP chính hãng
                  </td>
                  <td className="py-2 px-2 border-r border-slate-200 text-center font-sans">Cuộn</td>
                  <td className="py-2 px-2 border-r border-slate-200 text-right">05</td>
                  <td className="py-2 px-3 border-r border-slate-200 text-right">1.200.000</td>
                  <td className="py-2 px-2 border-r border-slate-200 text-center font-bold text-blue-600 bg-blue-50/30">10%</td>
                  <td className="py-2 px-3 border-r border-slate-200 text-right font-semibold">6.000.000</td>
                  <td className="py-2 px-3 text-right">600.000</td>
                </tr>

                {/* Invoice 2 - Item 1 */}
                <tr className="hover:bg-slate-50/75">
                  <td className="py-2 px-3 border-r border-slate-200 text-center font-sans text-slate-400">3</td>
                  <td className="py-2 px-3 border-r border-slate-200 font-sans font-medium">1C26MYY</td>
                  <td className="py-2 px-3 border-r border-slate-200 text-blue-600 font-bold">0001890</td>
                  <td className="py-2 px-3 border-r border-slate-200 font-sans">18/07/2026</td>
                  <td className="py-2 px-3 border-r border-slate-200 font-sans truncate max-w-[150px]">Cty CP Dịch Vụ An Minh</td>
                  <td className="py-2 px-3 border-r border-slate-200 font-sans font-bold text-slate-900 bg-emerald-50/30">
                    Dịch vụ bảo trì hệ thống máy chủ Cloud
                  </td>
                  <td className="py-2 px-2 border-r border-slate-200 text-center font-sans">Tháng</td>
                  <td className="py-2 px-2 border-r border-slate-200 text-right">12</td>
                  <td className="py-2 px-3 border-r border-slate-200 text-right">2.500.000</td>
                  <td className="py-2 px-2 border-r border-slate-200 text-center font-bold text-emerald-600 bg-emerald-50/30">8%</td>
                  <td className="py-2 px-3 border-r border-slate-200 text-right font-semibold">30.000.000</td>
                  <td className="py-2 px-3 text-right">2.400.000</td>
                </tr>
              </tbody>
              <tfoot className="bg-slate-100 font-sans font-bold text-slate-800 border-t-2 border-slate-300">
                <tr>
                  <td colSpan={10} className="py-2.5 px-4 text-right">Tổng cộng tiền hàng & thuế:</td>
                  <td className="py-2.5 px-3 text-right font-mono text-emerald-700">49.000.000</td>
                  <td className="py-2.5 px-3 text-right font-mono text-emerald-700">4.300.000</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </ScrollReveal>

        {/* Bottom CTA for Detailed Export with Primary Blue Button */}
        <ScrollReveal delay={0.25} className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-xl bg-slate-50/60 p-6 border border-slate-200/80">
          <div>
            <p className="text-sm font-bold text-slate-950">
              Tiết kiệm hàng chục giờ gõ lại từng dòng mặt hàng vào phần mềm kế toán
            </p>
            <p className="text-xs text-slate-500 mt-0.5 font-normal">
              Chỉ cần bấm &ldquo;Xuất Excel chi tiết&rdquo;, nạp thẳng vào MISA / Fast / Bravo không cần nhập thủ công.
            </p>
          </div>
          <Link
            href={REGISTER_URL}
            className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-xs sm:text-sm font-bold text-white hover:bg-blue-700 shadow-sm shadow-blue-500/20 transition"
          >
            <span>Trải nghiệm tính năng</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { Check, Download, AlertOctagon, Bot, ShieldCheck } from "lucide-react";
import { ScrollReveal } from "@/components/motion";
import { SectionHeader } from "@/components/ui/section-header";
import { Badge } from "@/components/ui/badge";

const features = [
  {
    id: "sync",
    tabTitle: "Đồng bộ hóa đơn TCT",
    badge: "Đồng bộ Tự động",
    title: "Đồng bộ hóa đơn Mua vào & Bán ra từ Tổng cục Thuế",
    description:
      "Khai báo tài khoản Thuế an toàn, chọn khoảng thời gian cần tra cứu và tiến hành đồng bộ. Hệ thống tự động thiết lập phiên làm việc và kéo toàn bộ danh sách hóa đơn theo thời gian thực.",
    highlights: [
      "Tự động kết nối và đồng bộ trực tiếp với Cổng HĐĐT Tổng cục Thuế",
      "Tùy chọn khoảng thời gian đồng bộ linh hoạt theo ngày, tháng, quý",
      "Kéo đầy đủ danh sách hóa đơn Mua vào và Bán ra có mã/không mã",
      "Theo dõi tiến trình đồng bộ trực quan theo từng phân đoạn",
    ],
    previewType: "sync",
  },
  {
    id: "archive",
    tabTitle: "Tải trọn bộ XML & PDF",
    badge: "Bản gốc có chữ ký số",
    title: "Hỗ trợ tải File gốc XML & PDF từ các Nhà Cung Cấp",
    description:
      "Next Invoice hỗ trợ trích xuất từ cổng tra cứu của hầu hết các nhà cung cấp phổ biến (VNPT, Viettel, MISA, BKAV, EasyInvoice, Thái Sơn...) để lấy file gốc có chữ ký số, hỗ trợ tải hàng loạt file ZIP.",
    highlights: [
      "Tải trực tiếp file XML ký số gốc và file PDF bản in thể hiện",
      "Hỗ trợ tải hàng loạt (Bulk download) đóng gói file ZIP nhanh chóng",
      "Tự động nhận diện nhà cung cấp và thông tin tra cứu",
      "Lưu trữ đám mây an toàn, phục vụ đối chiếu và thanh kiểm tra",
    ],
    previewType: "archive",
  },
  {
    id: "risk",
    tabTitle: "Rà soát rủi ro thuế",
    badge: "Đối soát dữ liệu",
    title: "Cảnh báo sớm rủi ro Người bán & Hóa đơn bất thường",
    description:
      "Chủ động bảo vệ doanh nghiệp trước các rủi ro bị truy thu thuế. Hệ thống tự động đối chiếu thông tin doanh nghiệp bán hàng với cơ sở dữ liệu quốc gia về trạng thái người nộp thuế.",
    highlights: [
      "Cảnh báo Người bán bỏ trốn, tạm ngừng kinh doanh, phá sản",
      "Phát hiện hóa đơn bị thay thế, điều chỉnh hoặc hủy bỏ",
      "Kiểm tra tính hợp lệ của cấu trúc dữ liệu và chữ ký số",
      "Bảo vệ chi phí hợp lý hợp lệ khi quyết toán thuế GTGT",
    ],
    previewType: "risk",
  },
  {
    id: "export",
    tabTitle: "Xuất bảng kê Excel",
    badge: "Chuẩn Thông tư 78",
    title: "Xuất Bảng kê & Báo cáo chi tiết sẵn sàng Import",
    description:
      "Bóc tách từng dòng chi tiết hàng hóa, đơn giá, số lượng và thuế suất. Xuất file Excel chuẩn mẫu để nhập ngay vào phần mềm kế toán như MISA, Fast, Bravo.",
    highlights: [
      "Bóc tách chi tiết từng dòng mặt hàng từ dữ liệu XML gốc",
      "Phân nhóm tự động theo thuế suất 0%, 5%, 8%, 10%",
      "Xuất bảng kê Mua vào / Bán ra theo quý hoặc theo tháng",
      "Cấu trúc tương thích để import vào MISA SME, AMIS, Fast...",
    ],
    previewType: "export",
  },
];

export default function FeatureTabsSection() {
  const [activeTab, setActiveTab] = useState(0);
  const current = features[activeTab];

  return (
    <section id="features" className="py-20 lg:py-28 bg-white border-b border-slate-200/70">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal>
          <SectionHeader
            badge="Năng lực cốt lõi"
            title="Tối ưu toàn diện quy trình xử lý hóa đơn"
            description="Từ khâu kết nối dữ liệu Tổng cục Thuế đến lưu trữ file gốc và xuất bảng kê chi tiết cho phần mềm kế toán."
          />
        </ScrollReveal>

        {/* Minimal Tab Bar - Responsive 2x2 grid on mobile, 4 tabs on desktop */}
        <ScrollReveal delay={0.1} className="mt-12 flex justify-center w-full">
          <div className="grid grid-cols-2 sm:grid-cols-4 rounded-xl border border-slate-200/80 bg-slate-100/70 p-1.5 max-w-2xl w-full gap-1.5">
            {features.map((item, idx) => {
              const isActive = activeTab === idx;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTab(idx)}
                  className={`rounded-lg py-2.5 px-2 text-xs sm:text-sm font-semibold transition-all text-center flex items-center justify-center ${
                    isActive
                      ? "bg-white text-slate-950 shadow-xs font-bold"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <span className="truncate block">{item.tabTitle}</span>
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        {/* Tab Content Display */}
        <ScrollReveal delay={0.2} className="mt-8 rounded-2xl border border-slate-200/80 bg-slate-50/40 p-5 sm:p-8 lg:p-10 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Feature Details */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <div className="mb-4">
                <Badge variant="blue">{current.badge}</Badge>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-950 tracking-tight leading-snug">
                {current.title}
              </h3>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed font-normal">
                {current.description}
              </p>

              {/* Highlights */}
              <div className="mt-6 space-y-2.5">
                {current.highlights.map((highlight, hIdx) => (
                  <div key={hIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                    <Check className="h-4 w-4 text-slate-950 shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Clean Interactive Preview Mockup */}
            <div className="lg:col-span-7 min-w-0">
              <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-6 shadow-2xs overflow-hidden">
                {/* Dynamic Preview 1: Sync */}
                {current.previewType === "sync" && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3 gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <Bot className="h-4 w-4 text-slate-900 shrink-0" />
                        <span className="font-semibold text-slate-900 text-sm truncate">Auto Sync Engine Log</span>
                      </div>
                      <span className="shrink-0 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
                        Đang kết nối TCT
                      </span>
                    </div>

                    <div className="space-y-2 font-mono text-xs text-slate-600">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between rounded-md bg-slate-50 p-2.5 border border-slate-100 gap-1">
                        <span className="truncate">[10:15:01] Khởi tạo phiên kết nối Cổng HĐĐT...</span>
                        <span className="text-emerald-700 font-semibold shrink-0">200 OK</span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between rounded-md bg-slate-50 p-2.5 border border-slate-100 gap-1">
                        <span className="truncate">[10:15:02] Xác thực phiên làm việc an toàn...</span>
                        <span className="text-blue-700 font-semibold shrink-0">Thành công (0.4s)</span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between rounded-md bg-slate-50 p-2.5 border border-slate-100 gap-1">
                        <span className="truncate">[10:15:04] Kéo hóa đơn Mua vào theo kỳ tra cứu...</span>
                        <span className="text-slate-800 font-semibold shrink-0">Tìm thấy 48 hóa đơn</span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between rounded-md bg-emerald-50/60 p-2.5 text-emerald-900 border border-emerald-200/60 font-semibold gap-1">
                        <span className="truncate">[10:15:06] Hoàn tất nạp dữ liệu vào hệ thống!</span>
                        <span className="shrink-0">Hoàn tất</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Dynamic Preview 2: Archive */}
                {current.previewType === "archive" && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <span className="font-semibold text-slate-900 text-sm">Kho lưu trữ File Gốc (XML + PDF)</span>
                      <button className="inline-flex items-center gap-1.5 rounded-lg bg-slate-950 px-3 py-1.5 text-xs font-semibold text-white hover:bg-slate-800">
                        <Download className="h-3.5 w-3.5" /> Tải ZIP trọn gói
                      </button>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between rounded-lg border border-slate-100 p-3 hover:bg-slate-50">
                        <div>
                          <p className="text-xs font-semibold text-slate-900">VNPT • 1C26TTA - Số: 0004521</p>
                          <p className="text-[11px] text-slate-500">Cty TNHH Điện Máy Toàn Thắng</p>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="rounded border border-slate-200 bg-slate-50 px-2 py-0.5 text-xs font-mono text-slate-700">XML</span>
                          <span className="rounded border border-slate-200 bg-slate-50 px-2 py-0.5 text-xs font-mono text-slate-700">PDF</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between rounded-lg border border-slate-100 p-3 hover:bg-slate-50">
                        <div>
                          <p className="text-xs font-semibold text-slate-900">MISA • 1C26MYY - Số: 0009841</p>
                          <p className="text-[11px] text-slate-500">Cty CP Giải Pháp Số Việt</p>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="rounded border border-slate-200 bg-slate-50 px-2 py-0.5 text-xs font-mono text-slate-700">XML</span>
                          <span className="rounded border border-slate-200 bg-slate-50 px-2 py-0.5 text-xs font-mono text-slate-700">PDF</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Dynamic Preview 3: Risk */}
                {current.previewType === "risk" && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <span className="font-semibold text-slate-900 text-sm">Kiểm soát Rủi ro Đối tác</span>
                      <span className="rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-800 border border-amber-200/60">
                        1 Cảnh báo
                      </span>
                    </div>

                    <div className="space-y-3">
                      <div className="rounded-lg border border-amber-200/80 bg-amber-50/40 p-3.5">
                        <div className="flex items-start gap-2.5">
                          <AlertOctagon className="h-4 w-4 text-amber-700 shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs font-bold text-amber-950">
                              CÔNG TY TNHH VẬT TƯ ĐÔNG NAM
                            </p>
                            <p className="text-[11px] text-amber-900 mt-1">
                              Trạng thái Thuế: <span className="font-semibold underline">Người nộp thuế ngừng hoạt động nhưng chưa hoàn thành thủ tục đóng MST</span>.
                            </p>
                            <p className="text-[11px] text-slate-600 mt-1">
                              Hóa đơn: 1C26TBB - 0003112 (48.000.000 đ) • Cần kiểm tra trước khi kê khai.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-lg border border-slate-100 p-3 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <ShieldCheck className="h-4 w-4 text-emerald-600" />
                          <span className="font-medium text-slate-800">126 Hóa đơn còn lại hợp lệ trên hệ thống Thuế</span>
                        </div>
                        <span className="text-emerald-700 font-semibold">Đã kiểm tra</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Dynamic Preview 4: Export */}
                {current.previewType === "export" && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <span className="font-semibold text-slate-900 text-sm">Bảng kê Hóa đơn Cấp Dòng hàng</span>
                      <span className="rounded border border-slate-200 bg-slate-50 px-2 py-0.5 text-xs font-mono text-slate-700">
                        Excel (.xlsx)
                      </span>
                    </div>

                    <div className="rounded-lg border border-slate-200 overflow-x-auto text-xs">
                      <div className="min-w-[320px]">
                        <div className="grid grid-cols-4 bg-slate-50 p-2 font-semibold text-slate-700 border-b border-slate-200">
                          <span>Tên hàng hóa</span>
                          <span className="text-center">Số lượng</span>
                          <span className="text-center">Thuế suất</span>
                          <span className="text-right">Tiền thuế (VNĐ)</span>
                        </div>
                        <div className="divide-y divide-slate-100 bg-white">
                          <div className="grid grid-cols-4 p-2 text-slate-700">
                            <span className="truncate">Máy chủ Dell R750</span>
                            <span className="text-center">02</span>
                            <span className="text-center font-mono">10%</span>
                            <span className="text-right font-mono">14.500.000</span>
                          </div>
                          <div className="grid grid-cols-4 p-2 text-slate-700">
                            <span className="truncate">Dịch vụ bảo trì Cloud</span>
                            <span className="text-center">12 tháng</span>
                            <span className="text-center font-mono">8%</span>
                            <span className="text-right font-mono">2.880.000</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-1">
                      <button className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50">
                        Mẫu MISA / Fast
                      </button>
                      <button className="rounded-lg bg-slate-950 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-slate-800">
                        Xuất file Excel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

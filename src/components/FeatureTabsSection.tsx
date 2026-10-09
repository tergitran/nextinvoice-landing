"use client";

import { useState } from "react";
import {
  RefreshCw,
  FileArchive,
  AlertOctagon,
  FileSpreadsheet,
  Check,
  Download,
  Bot,
  ShieldCheck,
  Search,
} from "lucide-react";

const features = [
  {
    id: "sync",
    tabTitle: "Đồng bộ tự động TCT",
    badge: "AI Powered",
    icon: RefreshCw,
    title: "Tự động đồng bộ 100% từ Cổng Tổng cục Thuế",
    description:
      "Chỉ cần khai báo tài khoản Thuế một lần, Next Invoice sẽ tự động kết nối, tự giải Captcha bằng AI và kéo toàn bộ hóa đơn Mua vào - Bán ra mới nhất về hệ thống.",
    highlights: [
      "Tự động giải mã Captcha hình ảnh độ chính xác 99%",
      "Hỗ trợ đồng bộ định kỳ hàng ngày hoặc 1-click tức thì",
      "Kéo đầy đủ danh sách hóa đơn theo từng kỳ khai thuế",
      "Không bao giờ bỏ sót hóa đơn người bán gửi muộn",
    ],
    previewBg: "bg-blue-600/5",
    previewBorder: "border-blue-200",
    previewType: "sync",
  },
  {
    id: "archive",
    tabTitle: "Tải trọn bộ XML & PDF",
    badge: "Gốc 136+ NCC",
    icon: FileArchive,
    title: "Tải & Lưu trữ trọn bộ bản gốc XML & PDF",
    description:
      "Không chỉ lưu trữ bảng kê, Next Invoice tự động kết nối đến cổng tra cứu của 136 nhà cung cấp (VNPT, Viettel, MISA, BKAV...) để lấy file gốc có chữ ký số hợp pháp.",
    highlights: [
      "Tải file XML gốc có chữ ký số điện tử của người bán",
      "Tải PDF bản in thể hiện rõ nét, sẵn sàng in ấn",
      "Lưu trữ đám mây an toàn, không lo thất lạc sau 10 năm",
      "Tải hàng loạt (Bulk download) file nén ZIP trong 1 click",
    ],
    previewBg: "bg-indigo-600/5",
    previewBorder: "border-indigo-200",
    previewType: "archive",
  },
  {
    id: "risk",
    tabTitle: "Rà soát rủi ro thuế",
    badge: "An toàn pháp lý",
    icon: AlertOctagon,
    title: "Cảnh báo sớm rủi ro Người bán & Hóa đơn bất thường",
    description:
      "Chủ động bảo vệ doanh nghiệp trước các rủi ro bị truy thu thuế. Hệ thống tự động đối chiếu thông tin doanh nghiệp bán hàng với cơ sở dữ liệu quốc gia.",
    highlights: [
      "Cảnh báo Người bán bỏ trốn, tạm ngừng kinh doanh, phá sản",
      "Phát hiện hóa đơn bị thay thế, điều chỉnh hoặc hủy bỏ",
      "Kiểm tra tính hợp lệ của chữ ký số trên file XML",
      "Giảm thiểu 100% nguy cơ bị loại chi phí thuế GTGT",
    ],
    previewBg: "bg-amber-600/5",
    previewBorder: "border-amber-200",
    previewType: "risk",
  },
  {
    id: "export",
    tabTitle: "Xuất bảng kê Excel",
    badge: "Chuẩn Thông tư 78",
    icon: FileSpreadsheet,
    title: "Xuất Bảng kê & Báo cáo chi tiết sẵn sàng Import",
    description:
      "Bóc tách từng dòng chi tiết hàng hóa, đơn giá, số lượng và thuế suất. Xuất file Excel chuẩn mẫu để nhập ngay vào phần mềm kế toán như MISA, Fast, Bravo.",
    highlights: [
      "Bóc tách chi tiết từng dòng mặt hàng từ XML gốc",
      "Phân nhóm tự động theo thuế suất 0%, 5%, 8%, 10%",
      "Xuất bảng kê Mua vào / Bán ra theo quý hoặc theo tháng",
      "Tương thích để import trực tiếp vào MISA SME, AMIS, Fast...",
    ],
    previewBg: "bg-emerald-600/5",
    previewBorder: "border-emerald-200",
    previewType: "export",
  },
];

export default function FeatureTabsSection() {
  const [activeTab, setActiveTab] = useState(0);
  const current = features[activeTab];

  return (
    <section id="features" className="py-20 lg:py-28 bg-slate-50/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-blue-600">
            Tính Năng Vượt Trội
          </span>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Tất cả những gì Kế toán cần trong một màn hình
          </h2>
          <p className="mt-4 text-base text-slate-600">
            Tối ưu hóa toàn diện từ khâu cào dữ liệu thô trên Tổng cục Thuế cho đến khi có báo cáo hoàn chỉnh cho kỳ quyết toán thuế.
          </p>
        </div>

        {/* Tab Buttons Navigation */}
        <div className="mt-12 flex justify-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 rounded-2xl bg-slate-200/70 p-1.5 max-w-4xl w-full">
            {features.map((item, idx) => {
              const Icon = item.icon;
              const isActive = activeTab === idx;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTab(idx)}
                  className={`flex items-center justify-center gap-2 rounded-xl py-3 px-3 sm:px-4 text-xs sm:text-sm font-bold transition-all ${
                    isActive
                      ? "bg-white text-blue-600 shadow-md shadow-slate-300/50"
                      : "text-slate-600 hover:text-slate-900 hover:bg-white/40"
                  }`}
                >
                  <Icon className={`h-4 w-4 ${isActive ? "text-blue-600" : "text-slate-500"}`} />
                  <span className="truncate">{item.tabTitle}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content Display */}
        <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 lg:p-12 shadow-xl shadow-slate-200/60">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Feature Details */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700 mb-4 border border-blue-200/60">
                {current.badge}
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                {current.title}
              </h3>
              <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
                {current.description}
              </p>

              {/* Checkmark Highlights */}
              <div className="mt-6 space-y-3">
                {current.highlights.map((highlight, hIdx) => (
                  <div key={hIdx} className="flex items-start gap-2.5">
                    <div className="mt-0.5 rounded-full bg-emerald-100 p-0.5 text-emerald-600 shrink-0">
                      <Check className="h-3.5 w-3.5 stroke-[3]" />
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-slate-700">
                      {highlight}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Dynamic Preview Mockup */}
            <div className="lg:col-span-7">
              <div className={`rounded-2xl border ${current.previewBorder} ${current.previewBg} p-4 sm:p-6 shadow-inner`}>
                {/* Dynamic Preview 1: Sync */}
                {current.previewType === "sync" && (
                  <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div className="flex items-center gap-2">
                        <Bot className="h-5 w-5 text-blue-600" />
                        <span className="font-bold text-slate-800 text-sm">AI Captcha Resolver Engine</span>
                      </div>
                      <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-700">
                        Đang kết nối TCT
                      </span>
                    </div>

                    <div className="space-y-2.5 font-mono text-xs text-slate-600">
                      <div className="flex items-center justify-between rounded-lg bg-slate-50 p-2.5">
                        <span>[06:00:01] Gửi yêu cầu đăng nhập Cổng HĐĐT...</span>
                        <span className="text-emerald-600 font-bold">200 OK</span>
                      </div>
                      <div className="flex items-center justify-between rounded-lg bg-slate-50 p-2.5">
                        <span>[06:00:02] Giải mã Captcha hình ảnh TCT...</span>
                        <span className="text-blue-600 font-bold">Thành công (0.4s)</span>
                      </div>
                      <div className="flex items-center justify-between rounded-lg bg-slate-50 p-2.5">
                        <span>[06:00:04] Cào hóa đơn Mua vào tháng 07/2026...</span>
                        <span className="text-indigo-600 font-bold">Tìm thấy 48 hóa đơn mới</span>
                      </div>
                      <div className="flex items-center justify-between rounded-lg bg-emerald-50 p-2.5 text-emerald-900 border border-emerald-200">
                        <span>[06:00:06] Hoàn tất đồng bộ dữ liệu vào cơ sở dữ liệu!</span>
                        <span className="font-bold">Hoàn tất</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Dynamic Preview 2: Archive */}
                {current.previewType === "archive" && (
                  <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <span className="font-bold text-slate-800 text-sm">Kho lưu trữ File Gốc (XML + PDF)</span>
                      <button className="inline-flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-bold text-white shadow-xs">
                        <Download className="h-3.5 w-3.5" /> Tải ZIP 100 HĐ
                      </button>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between rounded-lg border border-slate-100 p-3 hover:bg-slate-50">
                        <div className="flex items-center gap-3">
                          <span className="rounded bg-blue-100 px-2 py-1 text-xs font-bold text-blue-700">VNPT</span>
                          <div>
                            <p className="text-xs font-bold text-slate-800">1C26TTA - Số: 0004521</p>
                            <p className="text-[11px] text-slate-500">Cty TNHH Điện Máy Toàn Thắng</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="rounded bg-slate-100 px-2 py-1 text-xs font-mono font-semibold text-slate-600">XML Ký số</span>
                          <span className="rounded bg-rose-50 px-2 py-1 text-xs font-mono font-semibold text-rose-600">Bản in PDF</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between rounded-lg border border-slate-100 p-3 hover:bg-slate-50">
                        <div className="flex items-center gap-3">
                          <span className="rounded bg-emerald-100 px-2 py-1 text-xs font-bold text-emerald-700">MISA</span>
                          <div>
                            <p className="text-xs font-bold text-slate-800">1C26MYY - Số: 0009841</p>
                            <p className="text-[11px] text-slate-500">Cty CP Giải Pháp Số Việt</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="rounded bg-slate-100 px-2 py-1 text-xs font-mono font-semibold text-slate-600">XML Ký số</span>
                          <span className="rounded bg-rose-50 px-2 py-1 text-xs font-mono font-semibold text-rose-600">Bản in PDF</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Dynamic Preview 3: Risk */}
                {current.previewType === "risk" && (
                  <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <span className="font-bold text-slate-800 text-sm">Bảng Kiểm soát Rủi ro Đối tác</span>
                      <span className="rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-bold text-amber-700">
                        1 Cảnh báo
                      </span>
                    </div>

                    <div className="space-y-3">
                      <div className="rounded-xl border border-amber-200 bg-amber-50/60 p-3.5">
                        <div className="flex items-start gap-2.5">
                          <AlertOctagon className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs font-bold text-amber-900">
                              Phát hiện NCC: CÔNG TY TNHH VẬT TƯ ĐÔNG NAM
                            </p>
                            <p className="text-[11px] text-amber-700 mt-1">
                              Trạng thái trên CSDL Thuế: <span className="font-bold underline">Người nộp thuế ngừng hoạt động nhưng chưa hoàn thành thủ tục đóng MST</span>.
                            </p>
                            <p className="text-[11px] text-slate-600 mt-1">
                              Hóa đơn: 1C26TBB - 0003112 (Trị giá 48.000.000 đ). Kế toán cần kiểm tra kỹ trước khi kê khai khấu trừ.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-xl border border-emerald-200 bg-emerald-50/40 p-3.5 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <ShieldCheck className="h-5 w-5 text-emerald-600" />
                          <span className="text-xs font-bold text-emerald-900">126 Hóa đơn còn lại hoàn toàn an toàn</span>
                        </div>
                        <span className="text-xs font-bold text-emerald-700">Đã đối soát</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Dynamic Preview 4: Export */}
                {current.previewType === "export" && (
                  <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <span className="font-bold text-slate-800 text-sm">Xuất Bảng kê Mua vào / Bán ra</span>
                      <span className="rounded-md bg-emerald-100 px-2 py-0.5 text-xs font-bold text-emerald-800">
                        Excel (.xlsx)
                      </span>
                    </div>

                    <div className="rounded-lg border border-slate-200 overflow-hidden text-xs">
                      <div className="grid grid-cols-4 bg-slate-100 p-2 font-bold text-slate-700 border-b border-slate-200">
                        <span>Tên hàng hóa</span>
                        <span className="text-center">Số lượng</span>
                        <span className="text-center">Thuế suất</span>
                        <span className="text-right">Tiền thuế</span>
                      </div>
                      <div className="divide-y divide-slate-100 bg-white">
                        <div className="grid grid-cols-4 p-2 text-slate-600">
                          <span className="truncate">Máy chủ Dell R750</span>
                          <span className="text-center">02</span>
                          <span className="text-center font-bold text-blue-600">10%</span>
                          <span className="text-right font-mono">14.500.000</span>
                        </div>
                        <div className="grid grid-cols-4 p-2 text-slate-600">
                          <span className="truncate">Dịch vụ bảo trì Cloud</span>
                          <span className="text-center">12 tháng</span>
                          <span className="text-center font-bold text-emerald-600">8%</span>
                          <span className="text-right font-mono">2.880.000</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-1">
                      <button className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50">
                        Mẫu MISA
                      </button>
                      <button className="rounded-lg bg-emerald-600 px-3.5 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-emerald-700">
                        Xuất file Excel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

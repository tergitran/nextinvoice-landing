import * as XLSX from 'xlsx';
import { TaxLookupItem } from './tax-lookup-types';

/**
 * Xuất danh sách kết quả tra cứu mã số thuế ra file Excel chuẩn
 */
export function exportTaxLookupToExcel(items: TaxLookupItem[]): void {
  if (!items || items.length === 0) return;

  const rows = items.map((item, idx) => ({
    STT: idx + 1,
    'Mã số thuế': item.taxCode,
    'Tên người nộp thuế': item.name || '',
    'Trạng thái hoạt động': item.status || (item.isSuccess ? '' : item.error || 'Lỗi tra cứu'),
    'Cơ quan quản lý thuế': item.taxDepartment || '',
    'Địa chỉ trụ sở': item.address || '',
    'Người đại diện': item.representative || '',
    'Số điện thoại': item.phone || '',
    'Thời gian cập nhật nguồn': item.sourceUpdatedAt || '',
  }));

  const worksheet = XLSX.utils.json_to_sheet(rows);

  // Thiết lập độ rộng cột
  worksheet['!cols'] = [
    { wch: 6 },  // STT
    { wch: 16 }, // MST
    { wch: 38 }, // Tên
    { wch: 30 }, // Trạng thái
    { wch: 28 }, // CQT
    { wch: 45 }, // Địa chỉ
    { wch: 22 }, // Người đại diện
    { wch: 15 }, // SĐT
    { wch: 22 }, // Thời gian cập nhật
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'KetQuaTraCuu');
  const fileName = `Ket_qua_tra_cuu_MST_${new Date().toISOString().slice(0, 10)}.xlsx`;
  XLSX.writeFile(workbook, fileName);
}

'use client';

import * as React from 'react';
import qrcode from 'qrcode-generator';

export interface TctQrCodeProps {
  value: string;
  size?: number;
  bgColor?: string;
  fgColor?: string;
  className?: string;
}

/**
 * Component hiển thị mã QR hóa đơn chuẩn 100% Tổng cục Thuế (TCT)
 * Tái tạo chính xác thuật toán và thuộc tính SVG từ trang hoadondientu.gdt.gov.vn:
 * - Engine: qrcode-generator Type 0 (auto-detect Version, Level L)
 * - shapeRendering: "crispEdges" (sắc nét tuyệt đối, không bị mờ do khử răng cưa)
 * - viewBox: 0 0 {N} {N} theo đúng số module chuẩn TCT
 */
export function TctQrCode({
  value,
  size = 80,
  bgColor = '#FFFFFF',
  fgColor = '#000000',
  className = '',
}: TctQrCodeProps) {
  const qrData = React.useMemo(() => {
    if (!value) return null;
    try {
      // TCT dùng Type 0 (tự động phát hiện version tối ưu cho chuỗi dữ liệu) và Error Correction Level 'L'
      const qr = qrcode(0, 'L');
      qr.addData(value);
      qr.make();
      const count = qr.getModuleCount();

      const cells: Array<{ r: number; c: number }> = [];
      for (let r = 0; r < count; r++) {
        for (let c = 0; c < count; c++) {
          if (qr.isDark(r, c)) {
            cells.push({ r, c });
          }
        }
      }

      return { count, cells };
    } catch {
      return null;
    }
  }, [value]);

  if (!qrData) {
    return <div style={{ width: size, height: size }} className={className} />;
  }

  return (
    <svg
      shapeRendering="crispEdges"
      viewBox={`0 0 ${qrData.count} ${qrData.count}`}
      width={size}
      height={size}
      className={className}
      style={{ width: `${size}px`, height: `${size}px`, display: 'block' }}
    >
      <rect width={qrData.count} height={qrData.count} fill={bgColor} />
      {qrData.cells.map(({ r, c }) => (
        <rect
          key={`${r}-${c}`}
          x={c}
          y={r}
          width={1}
          height={1}
          fill={fgColor}
        />
      ))}
    </svg>
  );
}

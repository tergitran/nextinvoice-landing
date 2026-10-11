import React from 'react';
import { CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TaxStatusCategory } from './tax-lookup-types';

export function getTaxStatusCategory(status: string | null, isSuccess: boolean): TaxStatusCategory {
  if (!isSuccess || !status) return 'ERROR';
  const s = status.toLowerCase();
  if (s.includes('đang hoạt động')) return 'ACTIVE';
  if (s.includes('tạm nghỉ') || s.includes('tạm ngừng') || s.includes('chờ xác minh')) return 'WARNING';
  if (
    s.includes('không hoạt động') ||
    s.includes('chấm dứt') ||
    s.includes('đóng mst') ||
    s.includes('khóa mst') ||
    s.includes('giải thể')
  ) {
    return 'RISK';
  }
  return 'WARNING';
}

export function getTaxStatusConfig(status: string | null, isSuccess: boolean) {
  const category = getTaxStatusCategory(status, isSuccess);

  if (category === 'ERROR') {
    return {
      classes: 'bg-red-500/10 text-red-400 border-red-500/20',
      label: status || 'Lỗi tra cứu',
      category: 'ERROR',
      icon: XCircle,
    };
  }

  if (category === 'ACTIVE') {
    return {
      classes: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      label: status || 'Đang hoạt động',
      category: 'ACTIVE',
      icon: CheckCircle2,
    };
  }

  if (category === 'RISK') {
    return {
      classes: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
      label: status || 'Rủi ro / Đóng MST',
      category: 'RISK',
      icon: XCircle,
    };
  }

  return {
    classes: 'bg-amber-500/10 text-amber-300 border-amber-500/20',
    label: status || 'Cần lưu ý',
    category: 'WARNING',
    icon: AlertTriangle,
  };
}

interface TaxStatusBadgeProps {
  status: string | null;
  isSuccess: boolean;
  className?: string;
}

export function TaxStatusBadge({ status, isSuccess, className }: TaxStatusBadgeProps) {
  const config = getTaxStatusConfig(status, isSuccess);
  const Icon = config.icon;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border leading-tight transition-colors',
        config.classes,
        className,
      )}
    >
      <Icon className="h-3.5 w-3.5 shrink-0" />
      <span className="truncate max-w-[240px] sm:max-w-none">{config.label}</span>
    </span>
  );
}

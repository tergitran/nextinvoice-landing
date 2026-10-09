import React from "react";
import { cn } from "@/lib/utils";

export interface LogoProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Kích thước của Logo (sm = sidebar/header, md = default, lg = auth pages, xl = banner) */
  size?: "sm" | "md" | "lg" | "xl";
  /** Chỉ hiển thị biểu tượng SVG không kèm chữ */
  iconOnly?: boolean;
  /** Tùy chỉnh class cho icon SVG */
  iconClassName?: string;
  /** Tùy chỉnh class cho text 'Next Invoice' */
  textClassName?: string;
  /** Biến thể hiển thị trên nền tối hoặc nền sáng */
  theme?: "default" | "dark";
}

const sizeMap = {
  sm: {
    icon: "h-6 w-auto",
    text: "text-base font-extrabold",
    gap: "gap-1.5",
  },
  md: {
    icon: "h-8 w-auto",
    text: "text-lg font-extrabold",
    gap: "gap-2",
  },
  lg: {
    icon: "h-10 w-auto",
    text: "text-2xl font-extrabold",
    gap: "gap-2.5",
  },
  xl: {
    icon: "h-14 w-auto",
    text: "text-3xl font-black",
    gap: "gap-3",
  },
};

export function LogoIcon({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="220 0 2020 1480"
      preserveAspectRatio="xMidYMid meet"
      className={cn("shrink-0 fill-current select-none", className)}
      aria-hidden="true"
      {...props}
    >
      <defs>
        <linearGradient id="nextInvoiceLogoGradient" x1="0%" y1="100%" x2="90%" y2="10%">
          <stop offset="0%" stopColor="#2563EB" />
          <stop offset="25%" stopColor="#2951DE" />
          <stop offset="50%" stopColor="#4531F3" />
          <stop offset="75%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#1D51F2" />
        </linearGradient>
      </defs>
      <g
        transform="translate(0.000000,1536.000000) scale(0.100000,-0.100000)"
        fill="url(#nextInvoiceLogoGradient)"
        stroke="none"
      >
        <path d="M21845 15056 c-44 -24 -235 -125 -425 -226 -518 -274 -1651 -879 -2205 -1175 -269 -144 -893 -477 -1385 -740 -492 -262 -899 -481 -904 -485 -9 -9 49 -48 514 -345 449 -287 834 -536 843 -544 10 -10 -45 -98 -698 -1146 -601 -964 -895 -1437 -1180 -1895 -115 -184 -333 -535 -485 -780 -244 -393 -767 -1235 -1170 -1885 -350 -564 -444 -713 -476 -752 -22 -26 -59 -54 -101 -75 -122 -60 -254 -39 -351 55 -24 23 -52 56 -63 73 -10 17 -80 190 -155 385 -74 195 -182 473 -239 619 -95 244 -322 833 -500 1295 -40 105 -136 352 -212 550 -77 198 -211 545 -298 770 -87 226 -191 496 -232 600 -204 520 -473 899 -823 1160 -272 202 -551 322 -892 384 -207 37 -533 33 -737 -9 -503 -105 -880 -310 -1264 -689 -249 -244 -309 -327 -757 -1056 -156 -253 -461 -748 -678 -1100 -218 -352 -628 -1018 -912 -1480 -285 -462 -642 -1042 -795 -1290 -153 -247 -472 -765 -710 -1150 -237 -385 -545 -884 -684 -1110 -406 -658 -737 -1191 -1003 -1618 -136 -219 -248 -400 -248 -403 0 -2 462 -4 1028 -4 1098 0 1122 1 1322 51 342 86 675 300 900 581 134 166 228 314 985 1553 67 110 171 279 230 375 264 427 872 1419 1703 2780 113 184 224 367 248 405 75 122 142 167 260 173 154 8 240 -68 317 -283 27 -77 566 -1483 757 -1975 65 -168 182 -471 260 -675 688 -1792 708 -1839 933 -2138 214 -284 481 -504 812 -667 334 -164 716 -241 1060 -211 740 63 1430 487 1908 1173 37 53 244 384 461 735 365 594 461 748 731 1183 57 91 234 379 395 640 302 490 598 969 868 1405 243 392 432 698 602 975 86 140 241 392 345 560 468 758 586 948 800 1295 125 204 298 485 384 625 87 140 211 342 277 449 65 106 124 195 130 198 10 4 195 -111 489 -302 66 -43 199 -129 295 -190 96 -62 273 -176 394 -254 120 -78 219 -141 221 -139 1 2 10 233 19 513 9 281 21 618 26 750 5 132 14 377 20 545 6 168 17 494 25 725 30 841 84 2467 101 3033 4 122 5 222 3 222 -2 0 -40 -20 -84 -44 Z" />
      </g>
    </svg>
  );
}

export function Logo({
  size = "md",
  iconOnly = false,
  className,
  iconClassName,
  textClassName,
  theme = "default",
  ...props
}: LogoProps) {
  const currentSize = sizeMap[size];

  return (
    <div
      className={cn("inline-flex items-center select-none", currentSize.gap, className)}
      {...props}
    >
      <LogoIcon className={cn(currentSize.icon, iconClassName)} />
      {!iconOnly && (
        <span
          className={cn(
            "font-extrabold tracking-tight whitespace-nowrap",
            theme === "dark"
              ? "text-white"
              : "bg-gradient-to-r from-[#4330F0] via-[#4A20F5] to-[#4619E4] bg-clip-text text-transparent",
            currentSize.text,
            textClassName,
          )}
        >
          Next Invoice
        </span>
      )}
    </div>
  );
}

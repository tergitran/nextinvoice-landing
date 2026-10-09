import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Next Invoice — Quản lý Hóa đơn Điện tử",
    short_name: "Next Invoice",
    description: "Tự động hóa đồng bộ & quản lý hóa đơn điện tử chuẩn Tổng cục Thuế",
    start_url: "/",
    display: "standalone",
    background_color: "#020617",
    theme_color: "#2563EB",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}

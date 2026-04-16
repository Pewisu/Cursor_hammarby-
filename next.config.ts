import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/Cursor_hammarby-",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

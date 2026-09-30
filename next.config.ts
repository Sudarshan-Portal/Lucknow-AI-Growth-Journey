import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  basePath: process.env.NEXT_PUBLIC_SITE_BASE_PATH || "",
};

export default nextConfig;

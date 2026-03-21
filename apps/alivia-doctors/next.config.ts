import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  transpilePackages: ["@alli/ui", "@alli/clinical-models"],
}

export default nextConfig

import type { NextConfig } from "next";

// GitHub Pages serves this project at /IT-Career-Pathway/ (not the domain root),
// so every internal link/asset path needs that prefix baked in.
const repoBasePath = "/IT-Career-Pathway";

const nextConfig: NextConfig = {
  output: "export",
  basePath: repoBasePath,
  assetPrefix: repoBasePath,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

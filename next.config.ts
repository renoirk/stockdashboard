// next.config.js
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true, // 빌드 시 타입 에러 무시
  },
  eslint: {
    ignoreDuringBuilds: true, // 빌드 시 린트 에러 무시
  },
};

module.exports = nextConfig;


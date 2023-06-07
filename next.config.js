/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = nextConfig

module.exports = {
    output: 'standalone',
    webpack5: true,
    webpack: (config) => {
      config.resolve.fallback = { fs: false, path:false, "crypto": false  };
      return config;
    },
  };
/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
      return [
        {
          source: '/(.*)',
          headers: [
            {
              key: 'Cross-Origin-Opener-Policy',
              value: 'same-origin'
            },
            {
              key: 'Cross-Origin-Embedder-Policy',
              value: 'require-corp'
            }
          ]
        }
      ]
    },
  typescript: {
      ignoreBuildErrors: true,
    },

    webpack: (config) => {
      config.resolve.fallback = { fs: false, path:false, "crypto": false  };
      return config;
    },
}

module.exports = nextConfig

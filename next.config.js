/** @type {import('next').NextConfig} */
const defaultConfig = {
  swcMinify: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    domains: [
      'conan-dev.xyz',
    ],
  },
};

/** @type {import('next').NextConfig} */
const devConfig = {
  ...defaultConfig,
};

/** @type {import('next').NextConfig} */
const prodConfig = {
  ...defaultConfig,
  output: 'standalone',
  compiler: {
    removeConsole: {
      exclude: ['error'],
    },
  },
};

/** @type {import('next').NextConfig} */
const config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;

module.exports = config;

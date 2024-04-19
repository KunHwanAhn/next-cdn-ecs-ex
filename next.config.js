const { version: packageVersion } = require('./package.json');

/** @type {import('next').NextConfig} */
const defaultConfig = {
  swcMinify: true,
  images: {
    formats: ['image/avif', 'image/webp'],
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
  assetPrefix: `${process.env.CDN_BASE_URL}/${packageVersion}`,
  compiler: {
    removeConsole: {
      exclude: ['error'],
    },
  },
};

/** @type {import('next').NextConfig} */
const config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;

module.exports = config;

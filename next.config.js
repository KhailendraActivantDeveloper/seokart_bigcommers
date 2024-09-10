const createNextIntlPlugin = require('next-intl/plugin');
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'flagsapi.com'
      },
      {
        protocol: 'https',
        hostname: 'shopify.favseo.com'
      },
      {
        protocol: 'https',
        hostname: '**.mybigcommerce.com'
      },
      {
        protocol: 'https',
        hostname: 'cdn11.bigcommerce.com'
      },
      {
        protocol: 'https',
        hostname: 'app.seokart.com'
      }
    ],
  }
}

module.exports = withNextIntl(nextConfig);

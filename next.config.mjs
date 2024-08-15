import createNextIntPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntPlugin();

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  /* config options here */
  output: 'standalone',
  distDir: './dist',
  compiler: {
    styledComponents: true,
  },
  images: {
    unoptimized: true,
  },
};

export default withNextIntl(nextConfig);

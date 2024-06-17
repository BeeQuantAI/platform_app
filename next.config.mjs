/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  /* config options here */
  output: 'export',
  distDir: './dist',
  compiler: {
    styledComponents: true,
  },
};

export default nextConfig;

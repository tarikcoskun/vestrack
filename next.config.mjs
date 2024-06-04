/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/movie",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

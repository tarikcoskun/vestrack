/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/movie",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;

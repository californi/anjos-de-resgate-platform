/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@anjos/domain", "@anjos/shared", "@anjos/ui"],
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://127.0.0.1:3333/:path*",
      },
    ];
  },
};

export default nextConfig;

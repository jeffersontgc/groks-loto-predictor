/** @type {import('next').NextConfig} */
import createNextIntlPlugin from "next-intl/plugin";
const withNextIntl = createNextIntlPlugin();

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "trainme-v2-dev.s3.amazonaws.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "trainme-v2-stg.s3.amazonaws.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "trainme-v2-prod.s3.amazonaws.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "www.raplametall.ee",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "**",
      },
    ],
  },
  optimizeFonts: false,
};

export default withNextIntl(nextConfig);

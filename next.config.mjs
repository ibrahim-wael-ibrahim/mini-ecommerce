/** @type {import('next').NextConfig} */
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig = {
  env: {
    API_BASE_URL: "https://test-ecomerce.xn--hrt-w-ova.de/api",
    GOOGLE_CLIENT_ID:
      "939457397098-af0i8monehvqgrhr4rad4cvrk93kq1k7.apps.googleusercontent.com",
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "test-ecomerce.xn--hrt-w-ova.de",
      },
    ],
  },
};

export default withNextIntl(nextConfig);

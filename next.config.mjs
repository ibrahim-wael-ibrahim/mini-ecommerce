/** @type {import('next').NextConfig} */
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig = {
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

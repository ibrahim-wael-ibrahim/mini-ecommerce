import { Geist_Mono, Cairo } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "@/app/Providers";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getLocale } from "next-intl/server";
import { getLangDir } from "rtl-detect";
import Navbar from "@/components/molecules/Navbar";
import Footer from "@/components/molecules/Footer";
import CartSync from "@/components/atoms/CartSync";

const gilroy = localFont({
  src: [
    {
      path: "../../public/fonts/Gilroy-ExtraBold.otf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../../public/fonts/Gilroy-Light.otf",
      weight: "300",
      style: "normal",
    },
  ],
  variable: "--font-gilroy", // CSS variable name
});
const agency = localFont({
  src: [{ path: "../../public/fonts/Agency.ttf" }],
  variable: "--font-agency", // CSS variable name
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const cairo = Cairo({
  // Define Cairo font
  variable: "--font-cairo",
  subsets: ["latin"], // Specify subsets based on your needs <button class="citation-flag" data-index="8">
});
export const metadata = {
  // Basic Metadata
  title: {
    default: "Your E-commerce Store | Shop Quality Products", // Default title for the homepage
    template: "%s | Your E-commerce Store", // Template for dynamic pages (e.g., "Product Name | Your E-commerce Store")
  },
  description:
    "Discover premium products at Your E-commerce Store. Shop the latest trends, furniture, and essentials with fast shipping and great deals.",

  // Open Graph Metadata (for social media sharing)
  openGraph: {
    title: "Your E-commerce Store",
    description:
      "Explore our wide range of high-quality products and enjoy a seamless shopping experience.",
    siteName: "Your E-commerce Store",
    locale: "en_US", // Adjust based on your primary language
    type: "website",
  },

  // Twitter Card Metadata
  twitter: {
    card: "summary", // Changed to "summary" since we removed the image (no large image required)
    title: "Your E-commerce Store",
    description: "Shop premium products with ease at Your E-commerce Store.",
    creator: "@YourStoreHandle", // Replace with your Twitter handle
  },

  // Additional Metadata for SEO
  keywords:
    "e-commerce, online shopping, furniture, products, deals, Your E-commerce Store",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Language and Alternate Links (for internationalization, since you're using next-intl)
  alternates: {
    canonical: "https://www.yourecommercestore.com", // Replace with your domain
    languages: {
      "en-US": "/en-US", // Example for English (US)
      ar: "/ar", // Example for Arabic (if supporting RTL as per `getLangDir`)
    },
  },

  // Additional Metadata (optional)
  author: "Your E-commerce Store Team",
  publisher: "Your E-commerce Store",
  formatDetection: {
    telephone: false, // Prevents numbers from being treated as phone numbers
  },
};

export default async function RootLayout({ children }) {
  const messages = await getMessages();
  const locale = await getLocale();
  const direction = await getLangDir(locale);
  return (
    <html lang={locale} dir={direction} suppressHydrationWarning>
      <body
        className={`${gilroy.variable} ${agency.variable}  ${geistMono.variable} ${cairo.variable} antialiased overflow-x-hidden`}
      >
        <Providers>
          <CartSync />
          <NextIntlClientProvider messages={messages}>
            <Navbar />
            <main className="relative min-h-dvh w-full   ">{children}</main>
            <Footer />
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  );
}

import { Geist_Mono, Cairo } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "@/app/Providers";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getLocale } from "next-intl/server";
import { getLangDir } from "rtl-detect";
import Navbar from "@/components/molecules/Navbar";
import Footer from "@/components/molecules/Footer";

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
  title: "Create Next App",
  description: "Generated by create next app",
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

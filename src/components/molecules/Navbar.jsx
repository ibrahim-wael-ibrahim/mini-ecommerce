"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BiSearchAlt } from "react-icons/bi";

import ThemeSwitch from "@/components/atoms/ThemeSwitch";
import LocaleSwitch from "@/components/atoms/LocaleSwitch";
import { useTranslations } from "next-intl";
import BurgerMenu from "@/components/atoms/BurgerMenu";
import CartCounter from "@/components/atoms/CartCounter";

const navLinks = [
  { url: "/", label: "home" },
  { url: "/cart", label: "shop" },
];

export default function Navbar() {
  const pathname = usePathname();
  const t = useTranslations("molecules");

  return (
    <div
      className={`fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6  ${pathname === "/" ? "text-white" : ""}`}
    >
      <header className="absolute top-1/2 w-[90dvw] -translate-y-1/2  flex justify-between items-center mx-4 md:mx-14  ">
        <div className="w-3/6">
          <Link href="/">
            <span className="flex  font-agency uppercase font-bold text-2xl ">
              {t("navbar.logo")}
            </span>
          </Link>
        </div>

        <nav className=" items-center justify-center sm:mt-0 gap-4 hidden md:flex  mx-auto w-full">
          {navLinks.map((link) => (
            <Link
              key={link.url}
              href={link.url}
              className={`capitalize px-4  transition-colors duration-200 ${
                pathname === link.url
                  ? "font-extrabold "
                  : " hover:font-extrabold"
              }`}
            >
              {t(`navbar.links.${link.label}`)}
            </Link>
          ))}
        </nav>
        <div className="flex  gap-6 items-center justify-between">
          <Link href="/search" className="relative w-[216px] hidden md:block  ">
            <input
              type="text"
              className="w-[216px] h-[40px] pl-4 pr-10 text-sm text-white bg-white/10 bg-opacity-50 backdrop-blur-sm  rounded-full focus:outline-none focus:ring-1 focus:ring-gray-400 placeholder-gray-400"
              // placeholder={t("heroSection.searchPlaceholder")}
              id="search"
            />
            <button className="absolute inset-y-0 ltr:right-0 rtl:left-0 flex items-center justify-center w-10 text-gray-300 hover:text-white">
              <BiSearchAlt size={24} />
            </button>
          </Link>
          <Link href="/search" className="md:hidden ">
            <BiSearchAlt size={24} />
          </Link>
          <CartCounter />
          <ThemeSwitch />
          <LocaleSwitch className="hidden md:block" />
          <BurgerMenu />
        </div>
      </header>
    </div>
  );
}

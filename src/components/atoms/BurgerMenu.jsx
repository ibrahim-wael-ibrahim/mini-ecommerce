"use client";

import { useState } from "react";
import { TiThMenu } from "react-icons/ti";
import { HiX } from "react-icons/hi";
import { IoSunny, IoMoon } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";
import { useCusLocale } from "@/hooks/useCusLocale";
import { useThemeSwitch } from "@/hooks/useThemeSwitch";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

export default function BurgerMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { locale, updateLocale } = useCusLocale();
  const { isMounted, resolvedTheme, toggleTheme } = useThemeSwitch();
  const t = useTranslations("molecules");
  const pathname = usePathname();

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  // Navigation links with translation keys
  const navLinks = [
    { url: "/", key: "navbar.links.home" },
    { url: "/shop", key: "navbar.links.shop" },
  ];

  const languages = [
    { code: "ar", label: "AR", icon: "/images/AR_ICON.svg" },
    { code: "en", label: "EN", icon: "/images/EN_ICON.svg" },
  ];

  return (
    <div className="relative flex justify-between items-center md:hidden">
      <button onClick={toggleMenu} className="md:hidden z-30 mr-5">
        {isMenuOpen ? (
          <HiX color="#E58411" size={24} />
        ) : (
          <TiThMenu color="#E58411" size={24} />
        )}
      </button>
      <div
        className={`absolute -top-9 m-auto ltr:-right-[calc(100%)] rtl:-left-[calc(100%)] ${
          isMenuOpen ? "w-[103vw]" : "w-0"
        } min-h-screen transition-[width] duration-500 ease-in-out z-20 bg-white dark:bg-black text-black dark:text-white overflow-hidden`}
      >
        {isMenuOpen && (
          <div className="flex flex-col p-10">
            {/* Logo */}
            <span className="font-agency uppercase font-bold text-2xl mb-10">
              {t("navbar.logo")}
            </span>

            {/* Navigation Links */}
            <nav className="mb-10">
              <span className="font-extrabold text-3xl mb-4 block">
                {t("burgerMenu.menu")}
              </span>
              <ul className="text-xl space-y-4">
                {navLinks.map(({ url, key }) => (
                  <li
                    key={url}
                    className="border-b-2 px-6 py-4 flex items-center justify-start gap-2"
                  >
                    {pathname === url && <FaCheck color="#E58411" size={16} />}
                    <Link href={url}>{t(key)}</Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Language Section */}
            <section className="mb-10">
              <span className="text-3xl mb-4 block">
                {t("burgerMenu.language")}
              </span>
              <ul className="text-xl space-y-4">
                {languages.map(({ code, label, icon }) => (
                  <li
                    key={code}
                    className="border-b-2 px-6 py-4 flex items-center justify-start gap-2"
                  >
                    {locale === code && <FaCheck color="#E58411" size={16} />}
                    <button
                      onClick={() => updateLocale(code)}
                      className="flex items-center gap-2 p-2 rounded"
                    >
                      <Image
                        src={icon}
                        alt={`${label} Language`}
                        width={24}
                        height={24}
                      />
                      <span>{label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </section>

            {/* Theme Section */}
            <section>
              <span className="text-3xl mb-4 block">
                {t("burgerMenu.themes.head")}
              </span>
              <ul className="text-xl space-y-4">
                <li className="border-b-2 px-6 py-4 flex items-center justify-start gap-2">
                  {resolvedTheme === "light" && (
                    <FaCheck color="#E58411" size={16} />
                  )}
                  <button
                    onClick={() => resolvedTheme !== "light" && toggleTheme()}
                    className="flex items-center gap-2 p-2 rounded"
                  >
                    <IoSunny
                      size={24}
                      className="text-customOrange cursor-pointer"
                      title={t("burgerMenu.themes.lightMode")}
                    />
                    <span>{t("burgerMenu.themes.lightMode")}</span>
                  </button>
                </li>
                <li className="border-b-2 px-6 py-4 flex items-center justify-start gap-2">
                  {resolvedTheme === "dark" && (
                    <FaCheck color="#E58411" size={16} />
                  )}
                  <button
                    onClick={() => resolvedTheme !== "dark" && toggleTheme()}
                    className="flex items-center gap-2 p-2 rounded"
                  >
                    <IoMoon
                      size={24}
                      className="cursor-pointer"
                      title={t("burgerMenu.themes.darkMode")}
                    />
                    <span>{t("burgerMenu.themes.darkMode")}</span>
                  </button>
                </li>
              </ul>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}

"use client";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {BsHandbagFill} from "react-icons/bs";
import {CgSearch} from "react-icons/cg";
import ThemeSwitch from "@/components/atoms/ThemeSwitch";
import LocaleSwitch from "@/components/atoms/LocaleSwitch";
import {useTranslations} from "next-intl";
import BurgerMenu from "@/components/atoms/BurgerMenu";

const navLinks = [
    {url: "/", label: "home"},
    {url: "/shop", label: "shop"},
];

export default function Navbar() {
    const pathname = usePathname();
    const t = useTranslations("molecules");

    return (
        <div
            className={`fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6  ${pathname === "/" ? "text-white" : ""}`}
        >
            <header
                className="absolute top-1/2 w-[90dvw] -translate-y-1/2  flex justify-between items-center mx-4 md:mx-14 ">
        <span className="flex  font-agency uppercase font-bold text-2xl">
          {t("navbar.logo")}
        </span>
                <nav className=" items-center justify-between sm:mt-0 gap-4 hidden md:flex ">
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
                    <CgSearch size={24} className="md:text-white text-customOrange"/>
                    <span className="relative ">
            <BsHandbagFill size={24}/>
            <span
                className="absolute -top-0 -right-1  w-3.5 aspect-square bg-customOrange contain-none rounded-full"></span>
          </span>
                    <ThemeSwitch/>
                    <LocaleSwitch className="hidden md:block"/>
                    <BurgerMenu/>
                </div>
            </header>
        </div>
    );
}

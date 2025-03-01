import { BiSearchAlt } from "react-icons/bi";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function HeroSection() {
  const t = useTranslations("home");
  return (
    <section className="relative flex flex-col justify-center items-center gap-4 min-h-dvh w-full bg-[url(../../public/images/HERO_SECTION_PHONE.png)] md:bg-[url(../../public/images/HERO_SECTION.png)] hero-container bg-no-repeat  bg-cover md:bg-current bg-fixed">
      <h1 className="text-[36px] md:w-[950px] px-6  md:text-[80px] text-center capitalize   font-extrabold  text-white  ">
        {t("heroSection.title")}
      </h1>
      <p className="text-white/60 text-center font-extrabold  text-xl md:text-2xl my-6 text-wrap px-6 mb-60 md:mb-0  md:w-[650px]">
        {t("heroSection.description")}
      </p>
      <div className="relative w-[300px] hidden md:block  ">
        <input
          type="text"
          className="w-[300px] h-[40px] pl-4 pr-10 text-sm text-white bg-white/10 bg-opacity-50 backdrop-blur-sm  rounded-full focus:outline-none focus:ring-1 focus:ring-gray-400 placeholder-gray-400"
          placeholder={t("heroSection.searchPlaceholder")}
          id="search"
        />
        <button
          type="submit"
          className="absolute inset-y-0 ltr:right-0 rtl:left-0 flex items-center justify-center w-10 text-gray-300 hover:text-white"
        >
          <BiSearchAlt size={24} />
        </button>
      </div>
    </section>
  );
}

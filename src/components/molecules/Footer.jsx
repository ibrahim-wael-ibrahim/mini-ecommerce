"use client";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer"); // "footer" corresponds to the JSON file name

  return (
    <footer className="relative mt-6 w-full bg-customLightBg dark:bg-customOrangeBg flex flex-col flex-wrap justify-between items-center py-10 px-4 md:px-32 gap-12">
      <article className="relative min-h-8/12 w-10/12 xl:w-8/12 flex flex-col xl:flex-row md:flex justify-start items-start xl:justify-between xl:items-center gap-8 py-20">
        <div className="flex flex-col justify-center items-start gap-8">
          <h1 className="font-extrabold text-2xl">{t("logo")}</h1>
          <p className="w-[293px] text-[15px] font-normal">
            {t("description")}
          </p>
        </div>
        <div className="w-full flex xl:justify-evenly justify-start  gap-16 flex-wrap">
          <div className="flex flex-col justify-center items-start gap-4">
            <h1 className="font-bold capitalize text-customOrange">
              {t("services.title")}
            </h1>
            <span>{t("services.emailMarketing")}</span>
            <span>{t("services.campaigns")}</span>
            <span>{t("services.branding")}</span>
          </div>
          <div className="flex flex-col justify-center items-start gap-4">
            <h1 className="font-bold capitalize text-customOrange">
              {t("furniture.title")}
            </h1>
            <span>{t("furniture.beds")}</span>
            <span>{t("furniture.chair")}</span>
            <span>{t("furniture.all")}</span>
          </div>
          <div className="flex flex-col justify-center items-start gap-4">
            <h1 className="font-bold capitalize text-customOrange">
              {t("followUs.title")}
            </h1>
            <div className="flex items-center gap-4">
              <FaFacebookF />
              <span>{t("followUs.facebook")}</span>
            </div>
            <div className="flex items-center gap-4">
              <FaTwitter />
              <span>{t("followUs.twitter")}</span>
            </div>
            <div className="flex items-center gap-4">
              <FaInstagram />
              <span>{t("followUs.instagram")}</span>
            </div>
          </div>
        </div>
      </article>
      <article className="relative w-8/12 flex flex-wrap justify-between items-center gap-8">
        <div>{t("copyright")}</div>
        <div className="flex justify-center items-center gap-12">
          <span>{t("termsConditions")}</span>
          <span>{t("privacyPolicy")}</span>
        </div>
      </article>
    </footer>
  );
}

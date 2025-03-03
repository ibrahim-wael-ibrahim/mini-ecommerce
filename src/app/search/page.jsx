"use client";
import ImageShape from "@/components/atoms/ImageShape";
import BlobShape from "@/components/atoms/BlobShape";
import { BiSearchAlt } from "react-icons/bi";
import { useTranslations } from "next-intl";

export default function Search() {
  // Capitalized component name for convention
  const t = useTranslations("search");

  return (
    <section className="min-h-[80dvh] p-8 my-28 flex flex-col justify-start items-center mx-auto container">
      <BlobShape
        PathSvg="/images/blob/BLOB_8.svg"
        dirX="right"
        dirY="bottom-1/4"
        className="md:block hidden"
      />
      <BlobShape
        PathSvg="/images/blob/BLOB_6.svg"
        dirX="left"
        dirY="bottom-1/4"
        className="md:block hidden"
      />
      <div className="mx-auto px-4 py-8 w-full flex flex-col justify-center items-start md:grid md:grid-cols-4 gap-8">
        <article className="hidden md:block relative">
          <ImageShape
            alt="bed photo"
            id="bed-photo"
            image="/images/BEDROOM_CARD.png"
            className="!w-full !h-full !aspect-ratio"
            leftShapeClassName="!w-[232px] !h-[198px] !bg-white"
            rightShapeClassName="!w-[232px] !h-[141px] !bg-white"
          />
        </article>
        <article className="relative col-span-2 flex flex-col justify-start items-center">
          <BlobShape
            PathSvg="/images/blob/BLOB_10.svg"
            dirX="right"
            className="right-1/4 md:block hidden"
          />
          <div className="md:text-center">
            <h1 className="text-5xl font-extrabold">{t("title")}</h1>
            <p className="md:py-0 py-8">{t("subtitle")}</p>
          </div>
          <div className="my-10">
            <div className="relative w-[400px] ">
              <input
                type="text"
                className="w-[400px] h-[40px] pl-4 pr-10 text-sm text-white bg-white/10 bg-opacity-50 backdrop-blur-sm border-customOrange border-2 rounded-full focus:outline-none focus:ring-1 focus:ring-gray-400 placeholder-gray-400"
                placeholder={t("searchPlaceholder")}
                id="search"
              />
              <button className="absolute inset-y-0 ltr:right-0 rtl:left-0 flex items-center justify-center w-10 text-gray-300 hover:text-white">
                <BiSearchAlt size={24} />
              </button>
            </div>
          </div>
        </article>
        <article className="relative w-full flex flex-col justify-start items-center">
          <ImageShape
            alt="living photo"
            id="living-photo"
            image="/images/LIVING_ROOM_CARD.png"
            className="!w-full !h-full !aspect-ratio"
            leftShapeClassName="!w-[232px] !h-[198px] !bg-white"
            rightShapeClassName="!w-[232px] !h-[141px] !bg-white"
          />
        </article>
      </div>
    </section>
  );
}

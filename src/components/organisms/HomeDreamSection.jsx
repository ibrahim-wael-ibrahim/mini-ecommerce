import Image from "next/image";
import MoreInfo from "@/components/atoms/MoreInfo";
import BlobShape from "@/components/atoms/BlobShape";
import { useTranslations } from "next-intl";
import React from "react";
import ImageShape from "@/components/atoms/ImageShape";

export default function HomeDreamSection() {
  const t = useTranslations("home");

  return (
    <section className="relative min-h-[70dvh] w-full flex flex-wrap justify-evenly items-center gap-8  ">
      <BlobShape PathSvg="/images/blob/BLOB_1.svg" dirX="left" />
      {/*<article className="relative flex flex-col justify-center">*/}
      {/*  <div className="w-[495px] h-[422px] bg-gray-50 dark:bg-customOrangeBg rounded-3xl absolute -left-10 -top-16"></div>*/}
      {/*  <div className="w-[495px] h-[301px] bg-gray-50 dark:bg-customOrangeBg rounded-3xl absolute top-0 bottom-0 my-auto -right-16"></div>*/}
      {/*  <div className="w-[495px] h-[301px] bg-customOrange/60 rounded-3xl absolute -bottom-2 left-0 right-0 mx-auto blur-lg"></div>*/}
      {/*  <Image*/}
      {/*    src="/images/IMAGE_DREAM.png"*/}
      {/*    alt="dream image"*/}
      {/*    width={629}*/}
      {/*    height={445}*/}
      {/*    className="z-10 "*/}
      {/*  />*/}
      {/*</article>*/}
      <ImageShape
        id="dream"
        alt="dream image"
        image="/images/IMAGE_DREAM.png"
      />
      <article className="relative flex flex-col justify-center items-start gap-8">
        <h1 className="text-5xl font-extrabold  mb-4">
          {t("dreamSection.title")
            .split("\n")
            .map((line, index, arr) => (
              <React.Fragment key={index}>
                {line}
                {index < arr.length - 1 && <br />}
              </React.Fragment>
            ))}
        </h1>
        <p className="w-[500px] opacity-60">{t("dreamSection.description")}</p>
        <MoreInfo link="test" />
      </article>
    </section>
  );
}

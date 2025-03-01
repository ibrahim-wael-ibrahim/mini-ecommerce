import Image from "next/image";
import React from "react";

export default function ImageShape({ id, alt, image }) {
  return (
    <article
      className="relative  flex flex-col  justify-center w-[408px] h-[303px] md:w-[728px] md:h-[541px] p-8"
      id={id}
    >
      <div className="w-[277px] md:w-[495px] h-[236px] md:h-[422px] bg-customLightBg dark:bg-customOrangeBg rounded-3xl absolute md:-left-4 md:-top-12 -left-1 -top-2" />
      <div className="w-[277px] md:w-[495px] h-[169px] md:h-[301px] bg-customLightBg dark:bg-customOrangeBg rounded-3xl absolute md:top-0 md:bottom-0 my-auto md:-right-10 -right-2" />
      <div className="relative  aspect-video flex flex-col w-full h-full p-4 overflow-hidden  rounded-2xl ">
        <Image
          src={image}
          alt={alt}
          width={0}
          height={0}
          fill
          sizes="auto"
          style={{ width: "100%", height: "100%" }}
          quality="100"
          className="absolute z-10  object-center object-cover  "
          priority
        />
      </div>
    </article>
  );
}

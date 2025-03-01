"use client";
import React, { memo, useState, useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { useGetProductByIdQuery } from "@/features/products/productApi";
import { useCusLocale } from "@/hooks/useCusLocale";
import { useLanguageRefresh } from "@/hooks/useLanguageRefresh";
import ImageShape from "@/components/atoms/ImageShape";
import { HiArrowLongLeft } from "react-icons/hi2";
import { IoIosArrowForward } from "react-icons/io";
import fixImageUrl from "@/utils/fixImageUrl";
import Link from "next/link";
import { useTranslations } from "next-intl";
import Image from "next/image";

function ProductDetailsPage() {
  // All hooks must be called at the top level!
  const { locale } = useCusLocale();
  const { id } = useParams();
  const searchParams = useSearchParams();
  const currentLang = searchParams.get("lang");
  const [isMounted, setIsMounted] = useState(false);
  const t = useTranslations("categories");

  // This useEffect is now called unconditionally.
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const isLanguageRefreshing = useLanguageRefresh(
    currentLang,
    locale,
    id,
    (id, locale) => `/product/${id}?lang=${locale}`,
  );
  const {
    data: product,
    isLoading,
    error,
  } = useGetProductByIdQuery({ id, locale });

  // Conditional rendering based on data states:
  if (isLanguageRefreshing || isLoading) {
    return (
      <div className="min-h-[80dvh] p-8 mx-10 my-20 flex flex-col justify-center items-center">
        <div role="status">
          <svg
            aria-hidden="true"
            className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return <p>Error fetching product details</p>;
  }

  if (!product) {
    return <p>No product data found</p>;
  }

  // Render product details.
  return (
    <section className="min-h-[80dvh] p-8 my-32 flex flex-col justify-center items-start container mx-auto">
      <div className="flex flex-col justify-center items-start gap-8 mb-10">
        <Link href="/" className="text-customOrange">
          <HiArrowLongLeft size={16} />
        </Link>
        <div className="capitalize text-customOrange flex justify-start items-center gap-4">
          <span>{t("categoriesRoute")}</span>
          <IoIosArrowForward className="rtl:rotate-180" />
          <span>{product.categories[0].title}</span>
          <IoIosArrowForward className="rtl:rotate-180" />
          <span>{product.title}</span>
        </div>
      </div>
      <section
        className={`min-h-[60dvh] container  transition-opacity duration-500 ${
          isMounted ? "opacity-100" : "opacity-0"
        } bg-cyan-400 grid grid-cols-2 gap-8`}
      >
        <article className="w-full h-full bg-red-500 grid grid-cols-2 grid-rows-2 place-content-center gap-1">
          <div className="w-full h-full  col-span-2 bg-customLightBg dark:bg-customOrangeBg">
            <Image
              src={fixImageUrl(product.productimage[0].link)}
              alt={product.title}
              width={258}
              height={303}
              className="mx-auto"
            />
          </div>
          <div className="relative  bg-customLightBg dark:bg-customOrangeBg overflow-hidden">
            <Image
              src={fixImageUrl(product.productimage[0].link)}
              alt={product.title}
              width={400}
              height={400}
              className="  scale-[1.20] absolute -top-28 left-4"
            />
          </div>
          <div className="relative bg-customLightBg dark:bg-customOrangeBg overflow-hidden">
            <Image
              src={fixImageUrl(product.productimage[0].link)}
              alt={product.title}
              width={800}
              height={400}
              className="absolute scale-[2] -bottom-24 -left-[4.2rem] object-fill"
            />
          </div>
        </article>
        <article className="w-full h-full bg-red-500"></article>
      </section>
    </section>
  );
}

export default memo(ProductDetailsPage);

//

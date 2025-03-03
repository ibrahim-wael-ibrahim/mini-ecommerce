"use client";
import React, { memo, useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { useGetCategoryByIdQuery } from "@/features/categories/categoryApi";
import { useCusLocale } from "@/hooks/useCusLocale";
import { useLanguageRefresh } from "@/hooks/useLanguageRefresh";
import CategoryDetailSection from "@/components/organisms/CategoryDetailSection";
import ProductList from "@/components/molecules/ProductList";
import BlobShape from "@/components/atoms/BlobShape";
import Spinner from "@/components/atoms/Spinner";

function CategoryDetailsPage({ params, initialCategory }) {
  const { locale } = useCusLocale();
  const { id } = params;
  const searchParams = useSearchParams();
  const currentLang = searchParams.get("lang");
  const [isMounted, setIsMounted] = useState(false);

  const isLanguageRefreshing = useLanguageRefresh(currentLang, locale, id);

  const {
    data: category = initialCategory,
    isLoading,
    error,
  } = useGetCategoryByIdQuery(
    { id, locale },
    { skip: !isMounted || !!initialCategory },
  );

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted || isLanguageRefreshing || isLoading) {
    return (
      <div className="min-h-[80dvh] p-8 mx-10 my-20 flex flex-col justify-center items-center">
        <Spinner size="xl" />
      </div>
    );
  }

  if (error) return <p>Error fetching category details</p>;
  if (!category) return <p>No category data found</p>;

  return (
    <section className="min-h-full p-8 my-36 flex flex-col justify-center items-center container mx-auto">
      <CategoryDetailSection category={category} />
      <BlobShape
        PathSvg="/images/blob/BLOB_5.svg"
        dirX="right"
        dirY="top-[70rem]"
      />
      <BlobShape
        PathSvg="/images/blob/BLOB_6.svg"
        dirX="left"
        dirY="top-[110rem]"
      />
      <ProductList categoryId={id} />
    </section>
  );
}

export default memo(CategoryDetailsPage);

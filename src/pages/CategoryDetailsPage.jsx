"use client";
import React, { memo } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { useGetCategoryByIdQuery } from "@/features/categories/categoryApi";
import { useCusLocale } from "@/hooks/useCusLocale";
import { useLanguageRefresh } from "@/hooks/useLanguageRefresh";
import CategoryDetailSection from "@/components/organisms/CategoryDetailSection";
import ProductList from "@/components/molecules/ProductList";
import BlobShape from "@/components/atoms/BlobShape";

function CategoryDetailsPage() {
  const { locale } = useCusLocale();
  const { id } = useParams();
  const searchParams = useSearchParams();
  const currentLang = searchParams.get("lang");

  const isLanguageRefreshing = useLanguageRefresh(currentLang, locale, id);

  const {
    data: category,
    isLoading,
    error,
  } = useGetCategoryByIdQuery({ id, locale });

  // Render loading state if route refresh is in progress or data is still loading.
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

  // Render error state.
  if (error) {
    return <p>Error fetching category details</p>;
  }

  // Render empty state.
  if (!category) {
    return <p>No category data found</p>;
  }

  // Render category details.
  return (
    <section className="min-h-full p-8  my-36 flex flex-col justify-center items-center container mx-auto">
      <CategoryDetailSection category={category} />
      <BlobShape
        PathSvg="/images/blob/BLOB_5.svg"
        dirX="right"
        dirY="top-[70rem]"
      />{" "}
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

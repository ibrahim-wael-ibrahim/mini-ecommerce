"use client";
import React from "react";
import CategoryCard from "@/components/molecules/CategoryCard";
import { useTranslations } from "next-intl";
import { useGetCategoriesQuery } from "@/features/categories/categoryApi";
import { useCusLocale } from "@/hooks/useCusLocale";
import Spinner from "@/components/atoms/Spinner";

export default function HomeOurCategories() {
  const t = useTranslations("home");
  const { locale } = useCusLocale();

  const { data: categories, isLoading, error } = useGetCategoriesQuery(locale);

  return (
    <section className="relative min-h-[80dvh] w-full flex flex-wrap justify-evenly items-end gap-8 p-24">
      <h1 className="text-5xl font-extrabold mb-20">
        {t("ourCategories.title")
          .split("\n")
          .map((line, index, arr) => (
            <React.Fragment key={index}>
              {line}
              {index < arr.length - 1 && <br />}
            </React.Fragment>
          ))}
      </h1>
      {isLoading ? (
        <Spinner size="xl" />
      ) : error ? (
        <div>error</div>
      ) : (
        categories.map((category) => (
          <CategoryCard
            key={category.id}
            image={category.image}
            title={category.title}
            description={category.description}
            link={`/category/${category.id}?lang=${locale}`}
          />
        ))
      )}
    </section>
  );
}

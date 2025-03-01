import { useGetProductsByCategoryQuery } from "@/features/products/productApi";
import { useCusLocale } from "@/hooks/useCusLocale";
import ProductCard from "@/components/molecules/ProductCard";

import React from "react";

export default function ProductList({ categoryId }) {
  const { locale } = useCusLocale();
  const {
    data: products,
    isLoading,
    error,
  } = useGetProductsByCategoryQuery({ categoryId, locale });
  if (isLoading) return <div>load...</div>;
  console.log(products);
  return (
    <section className="min-h-dvh relative grid grid-cols-1 md:grid-cols-4 gap-28 justify-items-center w-full mt-20 py-20 mx-auto  ">
      {products &&
        products.length > 0 &&
        products.map((product, index) => (
          <ProductCard product={product} key={product.id} />
        ))}
    </section>
  );
}

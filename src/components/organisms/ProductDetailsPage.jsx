"use client";
import React, { memo, useState, useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { useGetProductByIdQuery } from "@/features/products/productApi";
import { useCusLocale } from "@/hooks/useCusLocale";
import { useLanguageRefresh } from "@/hooks/useLanguageRefresh";
import { HiArrowLongLeft } from "react-icons/hi2";
import { IoIosArrowForward } from "react-icons/io";
import fixImageUrl from "@/utils/fixImageUrl";
import Link from "next/link";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { getFormattedPriceComponents } from "@/utils/getFormattedPrice";
import { IoAddCircle } from "react-icons/io5";
import { HiMiniMinusCircle } from "react-icons/hi2";
import { GoShareAndroid } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "@/features/cart/cartSlice";
import { useAddItemToCartMutation } from "@/features/cart/cartApi";
import { toast } from "sonner";
import Spinner from "@/components/atoms/Spinner";

function ProductDetailsPage({ params, initialProduct }) {
  const { locale } = useCusLocale();
  const { id } = params;
  const searchParams = useSearchParams();
  const currentLang = searchParams.get("lang");
  const [isMounted, setIsMounted] = useState(false);
  const t = useTranslations("categories");
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const [quantity, setQuantity] = useState(1);
  const [addItemToCart, { isLoading: isAdding }] = useAddItemToCartMutation();

  const {
    data: product = initialProduct,
    isLoading,
    error,
  } = useGetProductByIdQuery(
    { id, locale },
    { skip: !isMounted || !!initialProduct },
  );

  const handleAddToCart = async () => {
    if (!product) return;
    const cartItem = {
      id: product.id,
      name: product.title,
      price: product.discount_Price || product.price,
      qty: quantity,
      image: product.productimage[0].link,
    };

    if (auth.token) {
      try {
        await addItemToCart({ item_id: product.id, qty: quantity }).unwrap();
        toast.success("Item added to cart!");
      } catch (error) {
        console.error("Add to cart failed:", error);
        toast.error("Failed to add item to cart.");
      }
    } else {
      dispatch(addItem(cartItem));
      toast.success("Item added to cart!");
    }
  };

  const isLanguageRefreshing = useLanguageRefresh(
    currentLang,
    locale,
    id,
    (id, locale) => `/product/${id}?lang=${locale}`,
  );

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted || isLanguageRefreshing || isLoading) {
    return (
      <div className="min-h-[80dvh] p-8 mx-10 my-20 flex flex-col justify-center items-center">
        <Spinner size="lx" />
      </div>
    );
  }

  if (error) return <p>Error fetching product details</p>;
  if (!product) return <p>No product data found</p>;

  const [priceSy, priceVal] = getFormattedPriceComponents(product.price);
  const [discountSy, discountVal] = getFormattedPriceComponents(
    product.discount_Price,
  );

  return (
    <section className="lg:min-h-[80dvh] p-8 my-32 flex flex-col justify-center items-start container mx-auto">
      <div className="flex flex-col justify-center items-start gap-8 mb-10">
        <Link
          href={`/category/${product.categories[0].id}?lang=${locale}`}
          className="text-customOrange"
        >
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
        className={` container transition-opacity duration-500 ${
          isMounted ? "opacity-100" : "opacity-0"
        } grid grid-cols-1 lg:grid-cols-2 gap-8  `}
      >
        <article className="w-full lg:h-full h-4/6 grid grid-cols-2 grid-rows-2 place-content-center gap-1">
          <div className="w-full h-full col-span-2 bg-customLightBg dark:bg-customOrangeBg">
            <Image
              src={fixImageUrl(product.productimage[0].link)}
              alt={product.title}
              width={258}
              height={303}
              className="mx-auto"
            />
          </div>
          <div className="relative bg-customLightBg dark:bg-customOrangeBg overflow-hidden">
            <Image
              src={fixImageUrl(product.productimage[0].link)}
              alt={product.title}
              width={400}
              height={400}
              className="scale-[1.20] absolute lg:-top-28 -top-16 left-4"
            />
          </div>
          <div className="relative bg-customLightBg dark:bg-customOrangeBg overflow-hidden">
            <Image
              src={fixImageUrl(product.productimage[0].link)}
              alt={product.title}
              width={800}
              height={400}
              className="absolute scale-[2] -bottom-24  -left-[4.2rem] lg:object-fill object-contain"
            />
          </div>
        </article>
        <article className="w-full h-full flex flex-col justify-between items-center">
          <div>
            <div className="flex justify-between items-end mb-8">
              <span className="text-6xl capitalize font-extrabold">
                {product.title}
              </span>
              {product.price === product.discount_Price ? (
                <span className="font-extrabold text-3xl flex justify-center items-start gap-2">
                  <span className="relative text-lg -top-1">{priceSy}</span>
                  <span>{priceVal}</span>
                </span>
              ) : (
                <div className="flex flex-col justify-end items-start font-extrabold">
                  <span className="text-md opacity-60 flex justify-center items-start gap-2">
                    <span className="relative text-lg -top-1">{priceSy}</span>
                    <span className="line-through">{priceVal}</span>
                  </span>
                  <span className="text-3xl flex justify-center items-start gap-2">
                    <span className="relative text-lg -top-1">
                      {discountSy}
                    </span>
                    <span>{discountVal}</span>
                  </span>
                </div>
              )}
            </div>
            <p>{product.description}</p>
            <p className="py-4 leading-6">
              {product.information.split("\n\n").map((line, index, arr) => (
                <React.Fragment key={index}>
                  {line}
                  {index < arr.length - 1 && <br />}
                </React.Fragment>
              ))}
            </p>
          </div>
          <div className="border-t-2 w-full">
            <div className="py-5 flex flex-col justify-between items-center gap-4">
              <div className="flex justify-between items-center gap-4 w-full">
                <div className="flex justify-start items-center gap-4 w-full">
                  <button
                    onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
                    disabled={quantity === 1}
                  >
                    <HiMiniMinusCircle size={48} />
                  </button>
                  <span className="text-2xl font-bold">{quantity}</span>
                  <button
                    onClick={() => setQuantity((prev) => prev + 1)}
                    disabled={isAdding}
                  >
                    <IoAddCircle size={48} />
                  </button>
                </div>
                <div className="text-center text-customOrange">
                  <GoShareAndroid size={48} />
                  <span>Share</span>
                </div>
              </div>
              <button
                className="w-full py-6 capitalize font-extrabold text-3xl rounded-full bg-customOrange"
                onClick={handleAddToCart}
                disabled={isAdding}
              >
                {isAdding ? "Adding..." : "Add to Cart"}
              </button>
            </div>
          </div>
        </article>
      </section>
    </section>
  );
}

export default memo(ProductDetailsPage);

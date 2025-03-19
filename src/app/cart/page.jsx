"use client";
import { useSelector } from "react-redux";
import { useGetCartItemsQuery } from "@/features/cart/cartApi";
import { useGetOrderPriceQuery } from "@/features/order/orderApi";
import BlobShape from "@/components/atoms/BlobShape";
import Link from "next/link";
import CartItems from "@/components/molecules/CartItems";
import { useTranslations } from "next-intl";

export default function CartPage() {
  const t = useTranslations("cart"); // Fetch translations from cart.json
  const { token } = useSelector((state) => state.auth);
  const localCart = useSelector((state) => state.cart.items);
  const {
    data: serverCart = [],
    isError,
    error,
  } = useGetCartItemsQuery(undefined, {
    skip: !token, // Skips the query in guest mode (no token)
  });
  const { data: orderPrice } = useGetOrderPriceQuery();
  console.log(orderPrice);
  const cartItems = token ? serverCart : localCart;
  if (token && isError) {
    return (
      <section className="min-h-[80dvh] p-8 my-40 flex flex-col justify-center items-center container mx-auto">
        <p className="text-red-500 font-bold">
          {t("errorFetchingCart")}: {error?.message || "Unknown error"}
        </p>
      </section>
    );
  }

  return (
    <section className="min-h-[80dvh] p-8 my-40 flex flex-col justify-start items-center container mx-auto">
      <article className="relative mx-auto flex flex-col justify-start items-center">
        <div className="absolute w-full mx-auto left-0 right-0">
          <BlobShape
            PathSvg="/images/blob/BLOB_7.svg"
            dirY="-bottom-4"
            className="-ml-10"
          />
        </div>
        <div className="z-10 bottom-1 left-0.5 text-center mb-16">
          <h1 className="text-5xl capitalize font-extrabold w-[250px] rtl:w-[350px]">
            {t("title")}
          </h1>
          <p>{t("subtitle")}</p>
        </div>
        <span className="font-extrabold capitalize text-center text-2xl">
          {t("itemsCount", { count: cartItems.length })}
        </span>
      </article>
      <article className="max-w-[787px] w-full h-full max-h-[727px] overflow-scroll flex flex-col justify-start items-center gap-2 pb-32 mt-24 hero-container">
        {cartItems.length > 0 &&
          cartItems.map((cartItem) => (
            <CartItems item={cartItem} key={cartItem.id} />
          ))}
      </article>
      <div className="flex flex-col justify-end items-center gap-6 w-full py-10">
        <div className="w-full flex justify-between items-center font-extrabold capitalize">
          <span>{t("total")}</span>
          <span>
            {orderPrice?.data?.grand_total} {t("currency")}
          </span>
        </div>
        <Link
          href="/checkout"
          className="bg-customOrange text-white px-4 py-4 mt-8 rounded-3xl font-extrabold w-full text-center"
        >
          {t("placeOrder")}
        </Link>
      </div>
    </section>
  );
}

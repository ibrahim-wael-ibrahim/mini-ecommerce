"use client";
import Image from "next/image";
import { Fragment } from "react";
import fixImageUrl from "@/utils/fixImageUrl";
import { useTranslations } from "next-intl";

export default function ReviewStep({
  cartItems,
  shippingAddress,
  paymentMethod,
  totalPriceS,
  totalPriceVal,
  onEditAddress,
  onEditPayment,
  onCreateOrder,
  isLoading,
}) {
  const t = useTranslations("checkout.reviewStep");

  return (
    <div className="mx-auto flex flex-col justify-start items-start w-full gap-8">
      <div className="mb-4">
        <h2 className="text-2xl font-bold">{t("title")}</h2>
        <p className="capitalize opacity-60">{t("subtitle")}</p>
      </div>
      <div className="flex flex-col-reverse md:flex-row gap-8 w-full">
        <div className="w-full md:px-32">
          <h3 className="lg:text-xl text-md font-semibold mb-2 uppercase">
            {t("cartTitle", { count: cartItems.length })}
          </h3>
          <article className="max-h-[645px] min-h-96 overflow-scroll scroll-m-2 bg-customLightBg dark:bg-customOrangeBg rounded-3xl py-8 md:w-full">
            {cartItems.map((item) => (
              <Fragment key={item.id}>
                <article className="flex justify-start items-start mb-2 px-4 py-4">
                  <div className="max-w-[135px] min-w-[135px] bg-customLightBg dark:bg-customOrangeBg aspect-square overflow-hidden rounded-3xl">
                    <Image
                      src={fixImageUrl(item?.image)}
                      alt={item.name}
                      width={135}
                      height={135}
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col justify-between items-start h-[135px] w-full">
                    <div>
                      <h1 className="capitalize font-extrabold">{item.name}</h1>
                      <span className="opacity-60">{t("cartDescription")}</span>
                    </div>
                    <div className="font-semibold text-2xl flex items-center gap-1">
                      <span className="relative -top-0.5">$</span>
                      {item.price}
                    </div>
                  </div>
                </article>
                <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700" />
              </Fragment>
            ))}
          </article>
        </div>
        <div className="mx-auto flex flex-col justify-start items-center w-full gap-8">
          <div className="flex items-center justify-between lg:w-full gap-8">
            <div>
              <h3 className="lg:text-xl text-md font-semibold mb-2 uppercase">
                {t("deliveryTitle")}
              </h3>
              <div className="lg:w-[253px] w-[186px] lg:h-[222px] h-[144px] bg-customLightBg dark:bg-customOrangeBg rounded-3xl flex flex-col justify-between items-start p-4">
                <div className="flex flex-col justify-start items-start gap-1 capitalize">
                  <span>{shippingAddress.city}</span>
                  <span>{shippingAddress.street}</span>
                  <span>{shippingAddress.building}</span>
                </div>
                <button
                  onClick={onEditAddress}
                  className="capitalize text-customOrange font-extrabold"
                >
                  {t("edit")}
                </button>
              </div>
            </div>
            <div>
              <h3 className="lg:text-xl text-md font-semibold mb-2 uppercase">
                {t("paymentTitle")}
              </h3>
              <div className="lg:w-[253px] w-[186px] lg:h-[222px] h-[144px] bg-customLightBg dark:bg-customOrangeBg rounded-3xl flex flex-col justify-between items-start p-4">
                <div className="flex justify-start items-start gap-1 capitalize">
                  <span>{paymentMethod}</span>
                  <span>{t("paymentSuffix")}</span>
                </div>
                <div>
                  <Image
                    src={
                      paymentMethod === "card"
                        ? `/images/VISA_MASTER.svg`
                        : `/images/PAYPAL.svg`
                    }
                    alt={paymentMethod}
                    width={100}
                    height={100}
                    className="object-cover"
                    priority
                  />
                </div>
                <button
                  onClick={onEditPayment}
                  className="capitalize text-customOrange font-extrabold"
                >
                  {t("edit")}
                </button>
              </div>
            </div>
          </div>
          <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700 w-full hidden md:inline-block" />
          <div className="hidden md:flex justify-between items-center w-full">
            <span className="capitalize font-extrabold">{t("total")}</span>
            <span className="font-extrabold text-2xl">
              <span>{totalPriceVal}</span>
              <span> {totalPriceS}</span>
            </span>
          </div>
        </div>
      </div>
      <button
        onClick={onCreateOrder}
        disabled={isLoading}
        className="bg-customOrange text-white px-4 py-4 mt-8 rounded-3xl font-extrabold w-full"
      >
        {isLoading ? t("processing") : t("buyNow")}
      </button>
    </div>
  );
}

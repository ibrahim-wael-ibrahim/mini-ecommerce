"use client";
import Image from "next/image";
import { getFormattedPriceComponents } from "@/utils/getFormattedPrice";
import { IoAddCircle } from "react-icons/io5";
import { HiMiniMinusCircle } from "react-icons/hi2";
import { FaRegTrashAlt } from "react-icons/fa";
import { useCartActions } from "@/hooks/useCartActions";
import fixImageUrl from "@/utils/fixImageUrl";
import Spinner from "@/components/atoms/Spinner";

export default function CartItems({ item }) {
  const {
    handleIncrease,
    handleDecrease,
    handleRemove,
    isIncreasing,
    isDecreasing,
    isRemoving,
  } = useCartActions();
  const totalPrice = item.price * item.qty;
  const [totalSy, totalVal] = getFormattedPriceComponents(totalPrice);

  return (
    <article className="w-full flex  justify-between items-center gap-4">
      <div className="max-w-[135px] min-w-[135px] bg-customLightBg dark:bg-customOrangeBg aspect-square overflow-hidden rounded-3xl">
        <Image
          src={fixImageUrl(item?.image)}
          alt={item.name}
          width={135}
          height={135}
          priority
          className="object-cover"
        />
      </div>
      <div className="w-full flex md:justify-between md:items-start md:flex-row md:flex-nowrap flex-col flex-wrap justify-between items-start h-full gap-4">
        <div className=" ">
          <h1 className="font-extrabold capitalize">{item.name}</h1>
          <p className="text-sm opacity-75">SKU: {item.sku || "N/A"}</p>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => handleRemove(item.id)} // Use item.id consistently
            disabled={isRemoving[item.id]}
            className="text-red-500 hover:text-red-700 transition-colors disabled:opacity-50"
          >
            {isRemoving[item.id] ? (
              <Spinner size="sm" />
            ) : (
              <FaRegTrashAlt size={20} />
            )}
          </button>
          <div className="flex justify-start items-center gap-4">
            <button
              onClick={() => handleDecrease(item.id)}
              disabled={item.qty <= 1 || isDecreasing[item.id]}
              className="disabled:opacity-50 text-customOrange hover:text-orange-600 transition-colors"
            >
              {isDecreasing[item.id] ? (
                <Spinner size="sm" />
              ) : (
                <HiMiniMinusCircle size={20} />
              )}
            </button>

            <span className="min-w-[20px] text-center">{item.qty}</span>

            <button
              onClick={() => handleIncrease(item.id)}
              disabled={isIncreasing[item.id]}
              className="text-customOrange hover:text-orange-600 transition-colors disabled:opacity-50"
            >
              {isIncreasing[item.id] ? (
                <Spinner size="sm" />
              ) : (
                <IoAddCircle size={20} />
              )}
            </button>
          </div>
        </div>
      </div>
      <div className=" flex justify-center items-center gap-4">
        <span className="font-extrabold text-lg flex items-center gap-1">
          <span className="relative -top-0.5">{totalSy}</span>
          {totalVal}
        </span>
      </div>
    </article>
  );
}

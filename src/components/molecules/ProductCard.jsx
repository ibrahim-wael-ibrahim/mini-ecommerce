import productTitle from "@/utils/productTitle";
import { useCusLocale } from "@/hooks/useCusLocale";
import { IoAddCircle } from "react-icons/io5";
import fixImageUrl from "@/utils/fixImageUrl";
import { getFormattedPriceComponents } from "@/utils/getFormattedPrice";
import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ product }) {
  const { locale } = useCusLocale();
  const { separatePart, joinedPart } = productTitle(product?.title, locale);
  const [priceSy, priceVal] = getFormattedPriceComponents(product.price);
  const [discountSy, discountVal] = getFormattedPriceComponents(
    product.discount_Price,
  );
  return (
    <Link href={`/product/${product.id}`}>
      <article className="relative w-[268px] h-[441px] flex items-start justify-center flex-col rounded-2xl  ">
        <div className=" relative min-h-[268px] min-w-full  bg-customLightBg dark:bg-customOrangeBg rounded-t-3xl flex justify-center items-center  ">
          {parseFloat(product.discount) > 0 && (
            <span className="h-[23px] w-[49px] rounded-[40px] font-extrabold bg-customOrange text-center absolute top-3 left-3 rtl:right-3">
              {parseFloat(product.discount)}%
            </span>
          )}
          <Image
            width={218}
            height={256}
            src={fixImageUrl(product.productimage[0].link)}
            alt={product.title}
            className="-mt-20"
          />
        </div>
        <div className=" flex flex-col justify-between items-start p-4 w-full h-full">
          <div className="leading-6">
            <span className="opacity-60 text-sm capitalize ">
              {separatePart}
            </span>
            <h1 className="font-extrabold text-2xl capitalize">{joinedPart}</h1>
          </div>
          <div className="flex justify-between items-end w-full">
            <div>
              {product.price === product.discount_Price ? (
                <span className="font-extrabold text-2xl flex justify-center items-start gap-2">
                  <span className="relative text-lg -top-1">{priceSy}</span>
                  <span className="">{priceVal}</span>
                </span>
              ) : (
                <div className="flex flex-col justify-end items-start ">
                  <span className="font-extrabold text-md opacity-60 flex justify-center items-start gap-2">
                    <span className="relative text-lg -top-1">
                      {discountSy}
                    </span>
                    <span className="line-through">{discountVal}</span>
                  </span>
                  <span className="font-extrabold text-2xl flex justify-center items-start gap-2">
                    <span className="relative text-lg -top-1">{priceSy}</span>
                    <span className="">{priceVal}</span>
                  </span>
                </div>
              )}
            </div>
            <button>
              <IoAddCircle size={49} />
            </button>
          </div>
        </div>
      </article>
    </Link>
  );
}

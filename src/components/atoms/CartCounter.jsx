// src/components/atoms/CartCounter.jsx
"use client";
import { useSelector } from "react-redux";
import { useGetCartItemsQuery } from "@/features/cart/cartApi";
import Link from "next/link";
import { BsHandbagFill } from "react-icons/bs";

export default function CartCounter() {
  const { token } = useSelector((state) => state.auth);
  const localCart = useSelector((state) => state.cart.items);
  const { data: serverCart = [] } = useGetCartItemsQuery(undefined, {
    skip: !token,
  });

  const cartItems = token ? serverCart : localCart;

  return (
    <Link href="/cart">
      <span className="relative">
        <BsHandbagFill size={24} />
        <span className="absolute -top-2 -right-2 min-w-5 text-center text-sm aspect-square bg-customOrange contain-none rounded-full">
          {cartItems.length}
        </span>
      </span>
    </Link>
  );
}

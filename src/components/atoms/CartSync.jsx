// src/components/atoms/CartSync.jsx
"use client";
import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAddItemToCartMutation } from "@/features/cart/cartApi";
import { clearCart } from "@/features/cart/cartSlice";
import { toast } from "sonner";

export default function CartSync() {
  const { token } = useSelector((state) => state.auth);
  const localCart = useSelector((state) => state.cart.items);
  const [addItemToCart] = useAddItemToCartMutation();
  const dispatch = useDispatch();
  const hasSynced = useRef(false); // Prevent multiple syncs

  useEffect(() => {
    // Sync only if token exists, local cart has items, and sync hasn’t occurred
    if (token && localCart.length > 0 && !hasSynced.current) {
      const syncCartToServer = async () => {
        try {
          // Define syncPromises as an array of addItemToCart promises
          const syncPromises = localCart.map((item) =>
            addItemToCart({ item_id: item.id, qty: item.qty }).unwrap(),
          );
          // Wait for all promises to resolve
          await Promise.all(syncPromises);
          dispatch(clearCart());
          toast.success("Cart synced successfully!");
          hasSynced.current = true;
        } catch (error) {
          console.error("Failed to sync cart:", error);
          toast.error("Failed to sync cart. Please try again.");
        }
      };

      syncCartToServer();
    }
  }, [token, localCart, addItemToCart, dispatch]);

  // Reset sync flag when token is removed (e.g., logout)
  useEffect(() => {
    if (!token) {
      hasSynced.current = false;
    }
  }, [token]);

  return null; // No UI rendering needed
}

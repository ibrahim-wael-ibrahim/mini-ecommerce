// src/hooks/useCartActions.jsx
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { api } from "@/store/api/api";
import {
  useIncreaseItemMutation,
  useDecreaseItemMutation,
  useRemoveItemMutation,
} from "@/features/cart/cartApi";
import {
  incrementItem,
  decrementItem,
  removeItem,
} from "@/features/cart/cartSlice";

export function useCartActions() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const [increaseServer] = useIncreaseItemMutation();
  const [decreaseServer] = useDecreaseItemMutation();
  const [removeServer] = useRemoveItemMutation();

  const [loadingStates, setLoadingStates] = useState({
    increase: {},
    decrease: {},
    remove: {},
  });

  const updateLoading = (action, itemId, isLoading) => {
    setLoadingStates((prev) => ({
      ...prev,
      [action]: { ...prev[action], [itemId]: isLoading },
    }));
  };

  const handleIncrease = async (itemId) => {
    try {
      updateLoading("increase", itemId, true);
      if (token) {
        await increaseServer({ item_id: itemId, qty: 1 }).unwrap();
      } else {
        dispatch(incrementItem(itemId));
      }
    } catch (error) {
      console.error("Increase failed:", error);
    } finally {
      updateLoading("increase", itemId, false);
    }
  };

  const handleDecrease = async (itemId) => {
    try {
      updateLoading("decrease", itemId, true);
      if (token) {
        await decreaseServer({ item_id: itemId, qty: 1 }).unwrap();
      } else {
        dispatch(decrementItem(itemId));
      }
    } catch (error) {
      console.error("Decrease failed:", error);
    } finally {
      updateLoading("decrease", itemId, false);
    }
  };

  const handleRemove = async (itemId) => {
    try {
      updateLoading("remove", itemId, true); // Optional: Show loading state
      if (token) {
        // Authenticated user: Remove from server
        await removeServer({ item_id: itemId }).unwrap();
        dispatch(api.util.invalidateTags(["Cart"])); // Refresh server cart data
        toast.success("Item removed from cart");
      } else {
        // Guest user: Remove from local cart
        dispatch(removeItem(itemId));
        toast.success("Item removed from cart");
      }
    } catch (error) {
      console.error("Remove failed:", error);
      toast.error("Failed to remove item. Please try again.");
    } finally {
      updateLoading("remove", itemId, false); // Reset loading state
    }
  };

  return {
    handleIncrease,
    handleDecrease,
    handleRemove,
    isIncreasing: loadingStates.increase,
    isDecreasing: loadingStates.decrease,
    isRemoving: loadingStates.remove,
  };
}

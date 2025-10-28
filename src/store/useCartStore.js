import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCartStore = create(
  persist(
    (set, get) => ({
      cart: [],

      addToCart: (item) => {
        const exists = get().cart.some((i) => i._id === item._id);
        if (!exists) {
          set((state) => ({ cart: [...state.cart, item] }));
        }
      },

      removeFromCart: (id) =>
        set((state) => ({
          cart: state.cart.filter((item) => item._id !== id),
        })),

      clearCart: () => set({ cart: [] }),
    }),
    {
      name: "cart", // key for localStorage
    }
  )
);

export default useCartStore;

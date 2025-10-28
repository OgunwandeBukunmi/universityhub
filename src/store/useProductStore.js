import { create } from "zustand";
import { persist } from "zustand/middleware";

const useProductStore = create(
  persist(
    (set) => ({
      products: [],
      loading: false,
      error: null,

      // ✅ Fetch data from your API or backend
      fetchData: async () => {
        try {
          set({ loading: true, error: null });

          // Replace this with your actual API route
          const res = await fetch("/api/docs");
          if (!res.ok) throw new Error("Failed to fetch products");

          const data = await res.json();

          // Assuming your API returns an array of products
          set({ products: data.data, loading: false });
        } catch (error) {
          console.error("❌ Error fetching products:", error);
          set({ error: error.message, loading: false });
        }
      },

      // ✅ Replace all products
      addNewProducts: (newProducts) =>
        set(() => ({
          products: newProducts,
        })),

      // ✅ Add one new product
      createNewProduct: (item) =>
        set((state) => ({
          products: [...state.products, item],
        })),

      // ✅ Remove a product by _id
      removeFromProducts: (id) =>
        set((state) => ({
          products: state.products.filter((item) => item._id !== id),
        })),
    }),
    {
      name: "product-storage", // key in localStorage
    }
  )
);

export default useProductStore;

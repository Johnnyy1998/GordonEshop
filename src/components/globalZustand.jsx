import { create } from "zustand";
import { devtools } from "zustand/middleware";

// Definujeme store pomocí Zustand
const useUserStore = create(
  devtools((set) => ({
    user: null,
    totalItems: 0,
    orderTotal: 0,
    resetStore: () => {
      localStorage.removeItem("cart");
      localStorage.removeItem("totalCount");
      set({
        user: null,
        totalItems: 0,
        orderTotal: 0,
      });
    },
    setUser: (newUser) => set({ user: newUser }),
    setTotalItems: (count) => set({ totalItems: count }),
    setOrderTotal: (total) => set({ orderTotal: total }),
    handleBasket: (item) => {
      const storedBasket = localStorage.getItem("cart");
      let updatedBasket = [];

      // Ověříme, že storedBasket je validní JSON, jinak odstraníme "cart" a použijeme prázdný košík
      if (storedBasket && storedBasket !== "undefined") {
        try {
          updatedBasket = JSON.parse(storedBasket);

          // Pokud parsedBasket není pole, nastavíme updatedBasket jako prázdné pole
          if (!Array.isArray(updatedBasket)) {
            updatedBasket = [];
          }
        } catch (error) {
          console.error("Error parsing cart from localStorage:", error);
          localStorage.removeItem("cart");
          updatedBasket = [];
        }
      }

      // Nyní je updatedBasket určitě pole, můžeme pokračovat
      const existingItem = updatedBasket.find(
        (cartItem) => cartItem.id === item.id
      );

      if (existingItem) {
        existingItem.quantity += 1; // Zvětšíme množství, pokud položka již existuje
      } else {
        const newItem = { ...item, quantity: 1 };
        updatedBasket.push(newItem); // Přidáme novou položku do košíku
      }

      // Uložíme aktualizovaný košík do localStorage
      localStorage.setItem("cart", JSON.stringify(updatedBasket));

      // Aktualizujeme počet položek
      const totalCount = localStorage.getItem("totalCount");
      let updateCount = 1;
      if (totalCount) {
        updateCount = JSON.parse(totalCount) + 1;
      }

      localStorage.setItem("totalCount", JSON.stringify(updateCount));
      set({ totalItems: updateCount });
    },
  }))
);

export default useUserStore;

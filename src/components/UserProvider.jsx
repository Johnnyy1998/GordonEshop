import { createContext, useContext, useState } from "react";

const context = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [totalItems, setTotalItems] = useState(0);

  const handleBasket = (item) => {
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
    setTotalItems(updateCount);
  };

  return (
    <context.Provider
      value={{ user, setUser, handleBasket, totalItems, setTotalItems }}
    >
      {children}
    </context.Provider>
  );
};

export const useUser = () => {
  return useContext(context);
};

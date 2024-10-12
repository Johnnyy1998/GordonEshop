import { useUser } from "../components/UserProvider";
import { priceModification } from "../utils";
import SectionTitle from "../components/SectionTitle";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import Order from "../components/Order";

export const loader = () => {
  try {
    const storedBasket = localStorage.getItem("cart");
    // Ověříme, že `storedBasket` není `null`, `undefined` nebo prázdný řetězec
    if (!storedBasket || storedBasket === "undefined") {
      return []; // Pokud je prázdný, vrátíme prázdné pole
    }
    const data = JSON.parse(storedBasket);
    return data || [];
  } catch (error) {
    console.error("Error parsing cart data from localStorage:", error);
    return []; // Pokud je v JSON nějaký problém, vrátíme prázdné pole
  }
};

function Cart() {
  const basket = useLoaderData();
  const navigate = useNavigate();
  const { setTotalItems, totalItems } = useUser();

  if (basket.length === 0) {
    setTotalItems(0);
    localStorage.setItem("totalCount", JSON.stringify(0));
    return <SectionTitle text="Your Cart is Empty" />;
  }

  const removeItem = (idToRemove, item) => {
    const currentCart = JSON.parse(localStorage.getItem("cart")) || [];
    let updateCart;

    if (item.quantity == 1) {
      updateCart = currentCart.filter((itemik) => itemik.id !== idToRemove);
    } else {
      // Najdi v localStorage id daneho itemu, změn mu quantity a nahraj ho zpátky, pozor je to pole objektu
      updateCart = currentCart.map((itemik) => {
        if (itemik.id === idToRemove) {
          return { ...itemik, quantity: itemik.quantity - 1 };
        }
        return itemik;
      });
    }
    setTotalItems((prevTotalItems) => {
      const newTotalItems = prevTotalItems - 1;
      localStorage.setItem("totalCount", JSON.stringify(newTotalItems));
      return newTotalItems;
    });

    localStorage.setItem("cart", JSON.stringify(updateCart));
    navigate("/cart");
  };

  return (
    <div>
      <SectionTitle text="Your Cart" />
      <div className="flex gap-10 mt-10">
        <div className="w-3/5 md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-4">
          {basket.map((cart) => {
            const { title, image, price } = cart.attributes;
            return (
              <section
                key={cart.id}
                className="card w-full shadow-xl hover:shadow-3xl transition duration-300 mt-2"
              >
                <Link to={`/product/${cart.id}`}>
                  <h1 className="text-2xl capitalize text-center">{title}</h1>
                  <figure className="px-4 pt-4">
                    <img
                      src={image}
                      alt={title}
                      className="rounded-xl h-64 md:h-48 w-full object-cover"
                    />
                  </figure>
                  <div className="px-5 my-5 ">
                    <div className="flex justify-between">
                      <h2 className="font-semibold">Quantity:</h2>
                      <h2 className="font-semibold">{cart.quantity}</h2>
                    </div>
                    <div className="flex justify-between mt-2">
                      <h2 className="font-semibold">Unit Price:</h2>
                      <h2 className="font-semibold">
                        {priceModification(price)}
                      </h2>
                    </div>
                  </div>
                </Link>
                <button
                  className="btn btn-secondary"
                  onClick={() => removeItem(cart.id, cart)}
                >
                  remove item
                </button>
              </section>
            );
          })}
        </div>
        <div className="w-2/5 md:w-1/3">
          <h1 className="capitalize text-2xl md:text-3xl text-center">Order</h1>
          <Order basket={basket} />
        </div>
      </div>
    </div>
  );
}

export default Cart;

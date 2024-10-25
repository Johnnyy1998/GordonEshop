import { priceModification } from "../utils";
import SectionTitle from "../components/SectionTitle";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import Order from "../components/Order";
import useUserStore from "../components/globalZustand";
import { useEffect, useState } from "react";

export const loader = () => {
  try {
    const storedBasket = localStorage.getItem("cart");
    if (!storedBasket || storedBasket === "undefined") {
      return []; // Pokud je prázdný, vrátíme prázdné pole
    }
    const data = JSON.parse(storedBasket);
    return data || [];
  } catch (error) {
    console.error("Error parsing cart data from localStorage:", error);
    return [];
  }
};

function Cart() {
  const [basket, setBasket] = useState(useLoaderData());
  const { setTotalItems, user, setUser } = useUserStore();

  useEffect(() => {
    const lastUser = JSON.parse(localStorage.getItem("user"));
    setUser(lastUser);
  }, []);

  const navigate = useNavigate();

  if (basket.length === 0) {
    return (
      <>
        <SectionTitle text="Your Cart is Empty" />
        <Link
          to="/"
          className="btn btn-secondary mt-4 link-hover flex items-center text-xl"
        >
          go home
        </Link>
      </>
    );
  }

  const handleCheckoutClick = () => {
    if (!user) {
      alert("musis se prihlasit");
    } else navigate("/checkout");
  };

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
    const currentTotalItems =
      JSON.parse(localStorage.getItem("totalCount")) || 0;
    const newTotalItems = currentTotalItems - 1;
    localStorage.setItem("totalCount", JSON.stringify(newTotalItems));
    setTotalItems(newTotalItems);

    localStorage.setItem("cart", JSON.stringify(updateCart));
    setBasket(updateCart);
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
          <button
            disabled={!user}
            onClick={handleCheckoutClick}
            className="link-hover link btn btn-secondary w-full mt-5"
          >
            Checkout
          </button>
          {!user && (
            <p className=" text-primary text-center mt-3">
              <Link to="/login" className="link-hover">
                First, you need to login
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;

import React from "react";
import { priceModification } from "../utils";

function Order({ basket }) {
  const totalPrice = basket.reduce((total, cart) => {
    const { price } = cart.attributes;
    return total + price * cart.quantity;
  }, 0);
  return (
    <div className="mt-5">
      {basket.map((cart) => {
        const { price } = cart.attributes;
        return (
          <div
            className="flex justify-between items-center border-t py-4 "
            key={cart.id}
          >
            <span className="text-xs md:text-lg font-semibold">
              Quantity: {cart.quantity}
            </span>
            <span className="text-xs md:text-lg font-semibold">
              {priceModification(price)} per unit
            </span>
          </div>
        );
      })}
      <div className="mt-3 border-t-2 flex justify-between">
        <h2 className="text-primary md:text-2xl mt-2">Total:</h2>
        <h2 className="text-primary md:text-2xl mt-2">
          {priceModification(totalPrice)}
        </h2>
      </div>
    </div>
  );
}

export default Order;

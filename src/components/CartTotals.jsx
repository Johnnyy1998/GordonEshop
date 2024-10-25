import React from "react";
import useUserStore from "./globalZustand";
import SectionTitle from "./SectionTitle";

function CartTotals() {
  const { orderTotal } = useUserStore();

  return (
    <div className="flex flex-col justify-center">
      <span className="text-3xl text-center mt-6">Total</span>
      <span className="text-3xl text-center mt-6">{orderTotal}</span>
    </div>
  );
}
export default CartTotals;

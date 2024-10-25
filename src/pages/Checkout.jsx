import React, { useEffect, useState } from "react";
import useUserStore from "../components/globalZustand";
import { SectionTitle } from "../components";
import CheckoutForm from "../components/CheckoutForm";
import CartTotals from "../components/CartTotals";

function Checkout() {
  const { totalItems, setTotalItems } = useUserStore();

  useEffect(() => {
    setTotalItems(JSON.parse(localStorage.getItem("totalCount")) || 0);
  }, [setTotalItems]);

  return (
    <>
      {totalItems > 0 ? (
        <>
          <SectionTitle text="place your order" />
          <div className="mt-8 grid gap-8 md:grid-cols-2 items-start">
            <CheckoutForm />
            <CartTotals />
          </div>
        </>
      ) : (
        <SectionTitle text="Your cart is empty" />
      )}
    </>
  );
}

export default Checkout;

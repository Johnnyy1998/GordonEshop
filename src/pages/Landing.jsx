import React from "react";
import { customFetch, priceModification } from "../utils";
import { Link, useLoaderData } from "react-router-dom";
import SectionTitle from "../components/SectionTitle";
import useUserStore from "../components/globalZustand";

const url = "/products";

export const loader = async () => {
  const response = await customFetch(url);
  const data = response.data.data;
  return data;
};

function Landing() {
  const { handleBasket } = useUserStore();
  const products = useLoaderData();

  return (
    <>
      <SectionTitle text="Products" />
      <div className="pt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => {
          const { title, company, image, price } = product.attributes;
          return (
            <section
              key={product.id}
              className="card w-full shadow-xl hover:shadow-3xl transition duration-300 mt-2"
            >
              <Link to={`/product/${product.id}`} className="link link-hover">
                <h1 className="text-2xl capitalize text-center">{title}</h1>
                <figure className="px-4 pt-4">
                  <img
                    src={image}
                    alt={title}
                    className="rounded-xl h-64 md:h-48 w-full object-cover"
                  />
                </figure>
                <div className="card-body items-center text-center">
                  <h2 className="card-title capitalize tracking-wider">
                    Made by: {company}
                  </h2>
                  <h2 className="text-secondary">{priceModification(price)}</h2>
                </div>
              </Link>
              <button
                className="btn btn-secondary"
                onClick={() => {
                  handleBasket(product);
                }}
              >
                Add to Cart
              </button>
            </section>
          );
        })}
      </div>
    </>
  );
}

export default Landing;

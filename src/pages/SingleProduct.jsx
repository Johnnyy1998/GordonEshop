import { customFetch, priceModification } from "../utils";
import { Link, useLoaderData } from "react-router-dom";
import SectionTitle from "../components/SectionTitle";
import useUserStore from "../components/globalZustand";

export const loader = async ({ params }) => {
  const { id } = params;
  const url = `/products/${id}`;
  const response = await customFetch(url);
  const data = response.data.data;
  return data;
};

function SingleProduct() {
  // Loader a context
  const { company, description, image, price, title } =
    useLoaderData().attributes;
  const product = useLoaderData();
  const { handleBasket } = useUserStore();

  // LocalStorage
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  let quantity = 0;
  if (Array.isArray(cart)) {
    const itemCart = cart.filter((item) => item.id === product.id);
    quantity = itemCart.length > 0 ? itemCart[0].quantity : 0;
  }

  console.log(product);

  return (
    <>
      <SectionTitle text={title} />
      <div className="text-md breadcrumbs">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link>{title}</Link>
          </li>
        </ul>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-2 mt-2 gap-4">
        <div>
          <img
            src={image}
            alt={title}
            className="h-96 object-cover w-full rounded-lg"
          />
        </div>
        <div className="flex flex-col p-6 shadow-lg rounded-lg">
          <p className="leading-8 text-justify">{description}</p>
          <h1 className="text-xl font-bold mt-2">{company}</h1>

          <div className="flex justify-between mt-3">
            <h1 className="text-2xl">Price: {priceModification(price)}</h1>
            <h1 className="text-2xl">Items: {quantity}</h1>
          </div>
          <button
            className="btn btn-secondary btn-md mt-auto font-bold"
            onClick={() => {
              handleBasket(product);
            }}
          >
            Add to Cart
          </button>
        </div>
      </section>
      <Link to="/cart" className="btn btn-primary w-full mt-3 text-2xl">
        Go to Your Cart
      </Link>
    </>
  );
}

export default SingleProduct;

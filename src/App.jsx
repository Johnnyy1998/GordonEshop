import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomeLayout from "./pages/HomeLayout";
import Landing from "./pages/Landing";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import SingleProduct from "./pages/SingleProduct";
import { ErrorElement } from "./components";

// Actions
import { action as loginAction } from "./pages/Login";
import { action as registerAction } from "./pages/Register";
import { action as checkoutAction } from "./components/CheckoutForm";

// Loaders
import { loader as landingLoader } from "./pages/Landing";
import { loader as cartLoader } from "./pages/Cart";
import { loader as singleProductLoader } from "./pages/SingleProduct";
import Checkout from "./pages/Checkout";
import useUserStore from "./components/globalZustand";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <ErrorElement />,
    children: [
      {
        element: <Landing />,
        index: true,
        loader: landingLoader,
      },
      {
        element: <Cart />,
        path: "/cart",
        loader: cartLoader,
      },
      {
        element: <SingleProduct />,
        path: "/product/:id",
        loader: singleProductLoader,
      },
      {
        element: <About />,
        path: "/about",
      },
      {
        element: <Checkout />,
        path: "/checkout",
        action: checkoutAction(useUserStore),
      },
      {
        path: "/login",
        element: <Login />,
        action: loginAction(useUserStore),
      },
      {
        path: "/register",
        element: <Register />,
        action: registerAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}
export default App;

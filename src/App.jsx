import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomeLayout from "./pages/HomeLayout";
import Landing from "./pages/Landing";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import { UserProvider } from "./components/UserProvider";
import SingleProduct from "./pages/SingleProduct";
import { ErrorElement } from "./components";

// Actions
import { action as loginAction } from "./pages/Login";
import { action as registerAction } from "./pages/Register";

// Loaders
import { loader as landingLoader } from "./pages/Landing";
import { loader as cartLoader } from "./pages/Cart";
import { loader as singleProductLoader } from "./pages/SingleProduct";

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
        path: "/login",
        element: <Login />,
        action: loginAction,
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
  return (
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  );
}
export default App;

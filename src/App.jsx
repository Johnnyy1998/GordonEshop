import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomeLayout from "./pages/HomeLayout";
import Landing from "./pages/Landing";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";

import { action as loginAction } from "./pages/Login";
import { action as registerAction } from "./pages/Register";
import { UserProvider } from "./components/UserProvider";
import { loader as landingLoader } from "./pages/Landing";
import { loader as cartLoader } from "./pages/Cart";
import Cart from "./pages/Cart";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
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

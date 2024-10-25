import { NavLink } from "react-router-dom";
import useUserStore from "./globalZustand";
import { useEffect } from "react";

const links = [
  { id: 1, url: "/", text: "home" },
  { id: 2, url: "/cart", text: "cart" },
  { id: 3, url: "/checkout", text: "checkout" },
  { id: 4, url: "/about", text: "about" },
];

function NavLinks() {
  const { user, setUser } = useUserStore();
  useEffect(() => {
    const lastUser = JSON.parse(localStorage.getItem("user"));
    setUser(lastUser);
  }, []);
  return (
    <>
      {links.map((link) => {
        const { id, url, text } = link;
        if (url === "/checkout" && !user) return null;
        return (
          <li key={id}>
            <NavLink className="capitalize" to={url}>
              {text}
            </NavLink>
          </li>
        );
      })}
    </>
  );
}

export default NavLinks;

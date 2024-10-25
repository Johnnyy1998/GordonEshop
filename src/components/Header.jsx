import React from "react";
import { Link } from "react-router-dom";
import useUserStore from "./globalZustand";

function Header() {
  const { setUser } = useUserStore();
  const isUserLogIn = JSON.parse(localStorage.getItem("user"));
  const handleSingOut = () => {
    localStorage.clear();
    //zustand.docs.pmnd.rs/getting-started/introduction
    https: setUser(null);
  };

  return (
    <header className="bg-neutral py-1 text-neutral-content text-sm">
      <div className="flex gap-6 justify-end align-element">
        {isUserLogIn ? (
          <>
            <span>Hello, {isUserLogIn.username}</span>
            <Link to="/login" className="link-hover" onClick={handleSingOut}>
              Sign out
            </Link>
          </>
        ) : (
          <>
            <Link to="/login" className="link-hover">
              Sign in
            </Link>
            <Link to="/register" className="link-hover">
              Create Account
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;

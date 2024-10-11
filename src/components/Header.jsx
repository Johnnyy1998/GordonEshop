import React from "react";
import { Link, Navigate } from "react-router-dom";
import { useUser } from "./UserProvider";

function Header() {
  const { user, setUser } = useUser();

  const handleSingOut = () => {
    localStorage.removeItem("user");
    setUser(null);
    Navigate("/login");
  };

  return (
    <header className="bg-neutral py-1 text-neutral-content text-sm">
      <div className="flex gap-6 justify-end align-element">
        {user ? (
          <Link to="/" className="link-hover" onClick={handleSingOut}>
            Sign out
          </Link>
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

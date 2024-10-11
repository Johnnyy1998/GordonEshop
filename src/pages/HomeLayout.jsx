import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";

function HomeLayout() {
  return (
    <>
      <Header />
      <Navbar />
      <section className="align-element py-10">
        <Outlet />
      </section>
    </>
  );
}

export default HomeLayout;

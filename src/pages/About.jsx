import React from "react";
import { Link } from "react-router-dom";
import useUserStore from "../components/globalZustand";

function About() {
  const { user } = useUserStore();

  return (
    <>
      <div className="flex flex-wrap gap-2 sm:gap-x-6 items-center justify-center text-4xl font-bold sm:text-5xl">
        <h1 className="text-primary">About</h1>
        <div>Gordon</div>
      </div>
      <p className="mt-6 text-lg">
        We are a dedicated team of professionals passionate about delivering
        top-quality solutions to meet your unique needs. Whether you're looking
        for specific products/services, or expert guidance in field, we are
        committed to helping you achieve your goals with integrity and
        excellence.
      </p>
      <div className="mt-6 flex justify-center">
        <img
          src="https://images.pexels.com/photos/2467506/pexels-photo-2467506.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          className="w-full rounded-md shadow-lg"
        ></img>
      </div>
      {!user && (
        <div className="flex justify-center mt-8 text-primary text-3xl">
          <Link to="/register" className="link-hover">
            Join Us
          </Link>
        </div>
      )}
    </>
  );
}

export default About;

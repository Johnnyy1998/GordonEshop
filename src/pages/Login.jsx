import React, { useEffect } from "react";
import { Form, redirect, useActionData, useNavigate } from "react-router-dom";
import FormInput from "../components/FormInput";
import SubmitBtn from "../components/SubmitBtn";
import { customFetch } from "../utils";

export const action = async ({ request }) => {
  const formData = await request.formData();
  //const data = Object.fromEntries(formData);
  const data = {
    identifier: formData.get("identifier"),
    password: formData.get("password"),
  };
  try {
    const response = await customFetch.post("/auth/local", data);
    localStorage.setItem("user", JSON.stringify(response.data));
    return redirect("/");
  } catch (error) {
    console.log(error);

    return null;
  }
};

function Login() {
  return (
    <section className="grid place-items-center mt-10">
      <Form
        method="POST"
        className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4"
      >
        <h1 className="text-3xl text-center text">Login</h1>
        <FormInput label="email" type="email" name="identifier" />
        <FormInput label="password" type="password" name="password" />
        <SubmitBtn text="login" />
      </Form>
    </section>
  );
}

export default Login;

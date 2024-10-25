import { Form, Link, redirect, useActionData } from "react-router-dom";
import FormInput from "../components/FormInput";
import SubmitBtn from "../components/SubmitBtn";

import { customFetch } from "../utils";
import { toast } from "react-toastify";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    const response = await customFetch.post("/auth/local/register", data);
    return redirect("/login");
  } catch (error) {
    return { error: "Please double check your credentials" };
  }
};

function Register() {
  const action = useActionData();
  return (
    <section className="grid place-items-center mt-10">
      <Form
        method="POST"
        className="card w-96 p-8 bg-base-100 shadow-lg gap-y-4"
      >
        <h1 className="text-3xl text-center">Register</h1>
        <FormInput label="username" name="username" type="text" />
        <FormInput label="email" name="email" type="email" />
        <FormInput label="password" name="password" type="password" />
        <SubmitBtn text="Register" />
        <span className="text-center text-primary">
          <Link to="/login" className="link-hover">
            Click for login
          </Link>
        </span>
        {action?.error && (
          <p className="text-center text-red-400 mt-2">{action.error}</p>
        )}
      </Form>
    </section>
  );
}

export default Register;

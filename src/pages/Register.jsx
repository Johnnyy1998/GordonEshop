import { Form, Link, redirect } from "react-router-dom";
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
    const errorMessage =
      error?.response?.data?.error?.message ||
      "please double check your credentials";

    toast.error(errorMessage);
    return null;
  }
};

function Register() {
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
      </Form>
    </section>
  );
}

export default Register;

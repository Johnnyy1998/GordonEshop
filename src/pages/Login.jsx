import {
  Form,
  Link,
  redirect,
  useActionData,
  useNavigate,
} from "react-router-dom";
import FormInput from "../components/FormInput";
import SubmitBtn from "../components/SubmitBtn";
import { customFetch } from "../utils";

export const action =
  (store) =>
  async ({ request }) => {
    const formData = await request.formData();
    const data = {
      identifier: formData.get("identifier"),
      password: formData.get("password"),
    };
    console.log(data);

    try {
      const response = await customFetch.post("/auth/local", data);
      const { setUser } = store.getState();
      setUser(response.data);
      localStorage.setItem(
        "user",
        JSON.stringify({
          confirmed: response.data.user.confirmed,
          username: response.data.user.username,
        })
      );
      return redirect("/");
    } catch (error) {
      return { error: "Invalid login credentials. Please try again." };
    }
  };

function Login() {
  const action = useActionData();

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
        <span className="text-center text-primary">
          <Link to="/register" className="link-hover">
            Click for Register
          </Link>
        </span>
        {action?.error && (
          <p className="text-center text-red-400 mt-2">{action.error}</p>
        )}
      </Form>
    </section>
  );
}

export default Login;

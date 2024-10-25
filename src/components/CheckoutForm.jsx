import { useEffect } from "react";
import { FormInput, SubmitBtn } from ".";
import { Form, redirect, useActionData } from "react-router-dom";

export const action =
  (store) =>
  async ({ request }) => {
    try {
      const formData = await request.formData();
      const data = Object.fromEntries(formData);
      if (data.address.length === 0 || data.name.length === 0) {
        return true;
      } else {
        const { resetStore } = store.getState();
        resetStore();
        return redirect("/");
      }
    } catch (error) {
      return { success: false };
    }
  };

function CheckoutForm() {
  const actionResult = useActionData();
  console.log(actionResult);

  return (
    <>
      <Form method="POST" className="flex flex-col gap-y-4">
        <FormInput label="first name" name="name" type="text" />
        <FormInput label="address" name="address" type="text" />
        <div className="mt-4">
          <SubmitBtn text="Place your order" />
          {actionResult && (
            <p className="text-center text-red-400 mt-2">Not valid data</p>
          )}
        </div>
      </Form>
    </>
  );
}

export default CheckoutForm;

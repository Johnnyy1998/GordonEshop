import React from "react";
import { useNavigation } from "react-router-dom";

function SubmitBtn({ text }) {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  console.log(navigation);

  return (
    <button
      disabled={isSubmitting}
      className="btn btn-primary mt-2"
      type="submit"
    >
      {text}
    </button>
  );
}

export default SubmitBtn;

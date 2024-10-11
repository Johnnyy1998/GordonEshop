import React from "react";

function FormInput({ label, type, name }) {
  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      <input type={type} name={name} className="input input-bordered" />
    </div>
  );
}

export default FormInput;

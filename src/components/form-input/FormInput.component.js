import React from "react";
import "./formInput.styles.scss";

export default function FormInput({ type, ...otherOptions }) {
  return (
    <div className="form-input">
      <input type={type} {...otherOptions} />
    </div>
  );
}

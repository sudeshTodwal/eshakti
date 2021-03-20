import React, { Children } from "react";

export default function SelectFormElement({
  name,
  optionList,
  children,
  ...otherOptions
}) {
  return (
    <div className="select-form-element">
      <select name={name} {...otherOptions}>
        {children}
      </select>
    </div>
  );
}

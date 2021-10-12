import React from "react";
import "./InputField.scss";

function InputField({ id, label, inputType, name, placeholder, value, validationError, handleChange, handleBlur }) {
  return (
    <div className="input-field my-3">
      <label htmlFor="" className="form-label">
        {label}
      </label>
      <input
        type={inputType}
        name={name}
        id={id}
        placeholder={placeholder}
        value={value}
        className="form-control"
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <small className="text-danger">{validationError}</small>
    </div>
  );
}
export default InputField;

import React from "react";
import "./InputField.scss";

function InputField({
  label,
  inputType,
  name,
  placeholder,
  value = "" /** solve error uncontrolled with undefined value */,
  icon,
  validationError,
  handleChange,
  handleBlur,
}) {
  return (
    <div className="input-field mb-3">
      <div className="input-group">
        <div className="input-group-prepend">
          <span className="input-group-text" id="basic-addon1">
            <i className={icon}></i>
          </span>
        </div>
        <input
          type={inputType}
          name={name}
          value={value}
          className="form-control"
          placeholder={placeholder}
          onBlur={handleBlur}
          onChange={handleChange}
        />
      </div>
      <small className="text-danger">{validationError}</small>
    </div>
  );
}
export default InputField;

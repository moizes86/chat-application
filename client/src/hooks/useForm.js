import { useState } from "react";
import { validateField } from "../DAL/validations";

export default function useForm() {
  const [values, setValues] = useState({});
  const [images, setImages] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});

  const handleBlur = ({ target: { name: fieldName, value } }) => {
    try {
      validateField(fieldName, value, values.password);
      setValidationErrors({ ...validationErrors, [fieldName]: "" });
    } catch (err) {
      setValidationErrors({ ...validationErrors, [fieldName]: err.message });
    }
  };

  const handleChange = ({ target: { name, value } }) => {
    setValues({ ...values, [name]: value });
  };

  const validateForm = () => {
    for (const key in values) {
      try {
        validateField(key, values[key], values.password);
        setValidationErrors({ ...validationErrors, [key]: "" });
      } catch (err) {
        setValidationErrors({ ...validationErrors, [key]: err.message });
        return false;
      }
    }
    return true;
  };

  return {
    values,
    validationErrors,
    validateForm,
    handleBlur,
    handleChange,
    setImages,
    setValues,
    images,
  };
}

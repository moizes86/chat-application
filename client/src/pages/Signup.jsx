import React, { useEffect } from "react";
//
import useForm from "../hooks/useForm";
import useFetch from "../hooks/useFetch";
//
import { signup } from "../DAL/users";
import { Link } from "react-router-dom";
//
//
import InputField from "../components/InputField";
import InputProfilePicture from "../components/InputProfilePicture";
import MyModal from "../components/MyModal";
//
import "./Signup.scss";
import SubmitButton from "../components/SubmitButton";
import SubmitErrorMessage from "../components/SubmitErrorMessage";
import SendEmailVerification from "../components/SendEmailVerification";

const defaultValues = {
  email: "",
  username: "",
  password: "",
  confirmPassword: "",
  profilePic: null,
};

function Signup() {
  const { values, validationErrors, handleBlur, handleChange, setValues, validateForm } = useForm();
  const { data, requestError, loading, sendRequest, Spinner } = useFetch();

  useEffect(() => {
    setValues(defaultValues);
    return () => setValues(defaultValues);
  }, [setValues]);

  useEffect(() => {
    if (data?.payload) {
      setValues(defaultValues);
    }
  }, [data, setValues]);

  function onSubmitSignup(e) {
    e.preventDefault();
    const formIsValid = validateForm(values);
    if (formIsValid) {
      const fd = new FormData();
      for (const key in values) if (key !== "profilePic") fd.append(key, values[key]);
      if (values.profilePic) fd.append("profilePic", values.profilePic);

      sendRequest(signup, fd);
    }
  }

  return (
    <div className="signup custom-form">
      <h3>Signup</h3>
      <form onSubmit={onSubmitSignup}>
        {loading && <Spinner />}
        <InputField
          inputType="email"
          label="Email:"
          placeholder="Email"
          name="email"
          id="email"
          value={values.email}
          validationError={validationErrors.email}
          icon="bi bi-at"
          handleChange={handleChange}
          handleBlur={handleBlur}
        />
        <InputField
          label="Username:"
          inputType="text"
          name="username"
          id="username"
          placeholder="Select username"
          value={values.username}
          validationError={validationErrors.username}
          icon="bi bi-person"
          handleChange={handleChange}
          handleBlur={handleBlur}
        />
        <InputField
          label="Password:"
          inputType="password"
          name="password"
          id="password"
          placeholder="Enter password"
          value={values.password}
          validationError={validationErrors.password}
          icon="bi bi-lock"
          handleChange={handleChange}
          handleBlur={handleBlur}
        />
        <InputField
          label="Confirm Password:"
          inputType="password"
          name="confirmPassword"
          id="confirmPassword"
          placeholder="Confirm password"
          value={values.confirmPassword}
          validationError={validationErrors.confirmPassword}
          icon="bi bi-lock"
          handleChange={handleChange}
          handleBlur={handleBlur}
        />

        <InputProfilePicture handleChange={handleChange} profilePic={values.profilePic} />

        <SubmitButton btnText="Signup" />

        <p className="text-center">
          Member? <Link to="/login">Login</Link>
        </p>

        <SubmitErrorMessage errorMessage={requestError.message} />

        {data?.payload && (
          <MyModal data={data}>
            <p>
              <Link to={`/verify-account/${data.payload.email}`}>Verify</Link> your account with the code sent
              to your email.
            </p>
            <SendEmailVerification
              email={data.payload.email}
              text={`Didn't get one? `}
              clickableText="Send again"
            />
          </MyModal>
        )}
      </form>
    </div>
  );
}

export default Signup;

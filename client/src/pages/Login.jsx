import React, { useEffect } from "react";
//
import useForm from "../hooks/useForm";
import useFetch from "../hooks/useFetch";
//
import { login } from "../DAL/users";
//
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../redux/user/user.actions";
import {onCreateSocket} from "../redux//chat/chat.actions";
//
import { Link } from "react-router-dom";
//
import InputField from "../components/InputField";
import SubmitButton from "../components/SubmitButton";
import SubmitErrorMessage from "../components/SubmitErrorMessage";
import MyModal from "../components/MyModal";
//
import "./Login.scss";

function Login() {
  // Handle form
  const { values, validationErrors, handleBlur, handleChange, setValues, validateForm } = useForm();
  
  //Handle async requests
  const { data, requestError, loading, sendRequest, Spinner } = useFetch();

  const dispatch = useDispatch();

  // Set initial values on mount and clear values on unmount
  useEffect(() => {
    setValues({ email: "", password: "" });
    return () => setValues({ email: "", password: "" });
  }, [setValues]);

  // Set user in redux state after login
  useEffect(() => {
    if (data) {
      dispatch(setCurrentUser(data.user));
      dispatch(onCreateSocket())
    }
  }, [data, dispatch]);

  function onSubmitLogin(e) {
    e.preventDefault();
    const formIsValid = validateForm(values);
    if (formIsValid) {
      sendRequest(login, values);
    }
  }
  return (
    <div className="login custom-form">
      <h3>Login</h3>
      {loading && <Spinner />}
      <form onSubmit={onSubmitLogin}>
        <InputField
          inputType="email"
          value={values.email}
          label="Email:"
          name="email"
          validationError={validationErrors.email}
          icon="bi bi-at"
          placeholder="Please enter a valid Email address"
          handleChange={handleChange}
          handleBlur={handleBlur}
        />

        <InputField
          inputType="password"
          value={values.password}
          label="Password:"
          name="password"
          validationError={validationErrors.password}
          placeholder="Please enter your password"
          icon="bi bi-lock"
          handleChange={handleChange}
          handleBlur={handleBlur}
        />

        <SubmitButton btnText="Login" />
        <p className="text-center">
          Not a member? <Link to="/signup">Signup</Link>
        </p>

        <SubmitErrorMessage errorMessage={requestError.message}>
          {requestError.needsVerification && (
            <div className="text-center">
              <Link to={`/verify-account/${values.email}`}>Verify your account</Link>
            </div>
          )}
        </SubmitErrorMessage>

        {data && (
          <MyModal data={data}>
            <div className="text-center">
              <Link to="/">Start Chatting</Link>
            </div>
          </MyModal>
        )}
      </form>
    </div>
  );
}

export default Login;

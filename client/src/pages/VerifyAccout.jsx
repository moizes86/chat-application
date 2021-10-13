import React, { useEffect } from "react";
//
import useForm from "../hooks/useForm";
import useFetch from "../hooks/useFetch";
//
import { useParams, Link } from "react-router-dom";
//
import InputField from "../components/InputField";
import SubmitButton from "../components/SubmitButton";
import SubmitErrorMessage from "../components/SubmitErrorMessage";
import MyModal from "../components/MyModal";
//
import "./VerifyAccount.scss";
import { verifyAccount } from "../DAL/users";
import SendEmailVerification from "../components/SendEmailVerification";

function VerifyAccount() {
  const { email } = useParams();
  const { values, validationErrors, handleChange, setValues, validateForm } = useForm();
  const { loading, requestError, data, sendRequest, Spinner } = useFetch();

  useEffect(() => {
    setValues({ email, verificationCode: "" });
    return () => setValues({ email, verificationCode: "" });
  }, [email, setValues]);

  useEffect(() => {
    if (data);
  }, [data]);

  const onSubmitVerify = (e) => {
    e.preventDefault();
    const formIsValid = validateForm(values);
    if (formIsValid) sendRequest(verifyAccount, values);
  };

  return (
    <div className="verify-account user-access-form pt-5">
      {loading && <Spinner />}
      <form onSubmit={onSubmitVerify}>
        <InputField
          inputType="number"
          label="Verification Code:"
          placeholder="Enter verification code"
          name="verificationCode"
          id="verificationCode"
          value={values.verificationCode}
          validationError={validationErrors.verificationCode}
          icon="bi bi-key"
          handleChange={handleChange}
        />
        <SubmitButton btnText="Verify Account" />

        <SendEmailVerification email={values.email} text={`Don't have code? `} clickableText="Send again" />
        <Link to="/"> Back</Link>
        <SubmitErrorMessage errorMessage={requestError.message}></SubmitErrorMessage>

        {data && (
          <MyModal data={data}>
            <div className="text-center">
              <Link to="/login"> Go to login</Link>
            </div>
          </MyModal>
        )}
      </form>
    </div>
  );
}

export default VerifyAccount;

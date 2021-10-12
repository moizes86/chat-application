import React from "react";
import useFetch from "../hooks/useFetch";
import { sendEmailVerification } from "../DAL/users";
import MyModal from "./MyModal";

function SendEmailVerification({ text, clickableText, email }) {
  const { data, loading, Spinner, sendRequest } = useFetch();
  return (
    <>
      {loading && <Spinner />}
      <div className="send-email-verification">
        <span>
            {text}
          <span className="text-primary pointer" onClick={() => sendRequest(sendEmailVerification, email)}>
          {clickableText}
          </span>
        </span>
      </div>

      {data && <MyModal data={data} />}
    </>
  );
}

export default SendEmailVerification;

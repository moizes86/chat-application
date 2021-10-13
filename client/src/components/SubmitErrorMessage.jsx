import React from "react";
import "./SubmitErrorMessage.scss";

function SubmitErrorMessage({errorMessage, children}) {
  return (
    <div className="submit-error-message">
      <p className="text-center">{errorMessage}</p>
      {children}
    </div>
  );
}

export default SubmitErrorMessage;

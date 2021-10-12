import React from "react";

function SubmitErrorMessage({errorMessage, children}) {
  return (
    <div className="text-danger">
      <p className="text-center">{errorMessage}</p>
      {children}
    </div>
  );
}

export default SubmitErrorMessage;

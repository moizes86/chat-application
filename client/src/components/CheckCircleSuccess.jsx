import React from "react";

export const CheckCircleSuccess = ({ message }) => {
  return (
    <div className="check-circle-success d-flex flex-column align-items-center">
      <i className="bi bi-check-circle-fill text-success h4"></i>
      <p>{message}</p>
    </div>
  );
};

export default CheckCircleSuccess;

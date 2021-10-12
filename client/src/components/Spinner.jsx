import React from "react";
import './Spinner.scss';

function Spinner() {
  return (
    <div className="spinner-container d-flex justify-content-center">
      <div className="spinner spinner-border " role="status">
      </div>
    </div>
  );
}

export default Spinner;

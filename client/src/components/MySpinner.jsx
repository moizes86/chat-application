import React from "react";
import './MySpinner.scss';

function MySpinner() {
  return (
    <div className="spinner-container d-flex justify-content-center">
      <div className="spinner spinner-border " role="status">
      </div>
    </div>
  );
}

export default MySpinner;

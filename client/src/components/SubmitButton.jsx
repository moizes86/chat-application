import React from 'react';
import './SubmitButton.scss';

function SubmitButton({btnText}) {
    return (
      <div className="submit-button py-2 d-flex justify-content-center">
        <button type="submit" className="btn text-light">
          {btnText}
        </button>
      </div>
    );
}

export default SubmitButton

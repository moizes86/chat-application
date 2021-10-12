import React from 'react'

function SubmitButton({btnText}) {
    return (
      <div className="py-3 d-flex justify-content-center">
        <button type="submit" className="btn btn-primary mr-4">
          {btnText}
        </button>
      </div>
    );
}

export default SubmitButton

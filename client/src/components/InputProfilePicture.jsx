import React, { useState, useEffect } from "react";
import { validationsAPI } from "../DAL/validations";
import "./InputProfilePicture.scss";
// import { useLocation } from "react-router";
// import {origin} from '../../DAL/http_Service';

const InputProfilePicture = ({ handleChange, errors, profilePic }) => {
  const [profilePicPreview, setProfilePicPreview] = useState(null);
  const [error, setError] = useState("");

  const addImage = ({ target: { files } }) => {
    if (files[0]) {
      try {
        validationsAPI.image(files[0]);
        const objectUrl = URL.createObjectURL(files[0]);
        setProfilePicPreview(objectUrl);
        handleChange({ target: { name: "profilePic", value: files[0] } });
      } catch (err) {
        setError(err.message);
      }
      // return handleChange({ target: { name: "images", value: images } });
    }
  };

  const removeImage = () => {
    handleChange({ target: { name: "profilePic", value: null } });
    setProfilePicPreview(null);
  };

  return (
    <div className="input-profile-picture-container">
      <input className="" type="file" id="customFile" accept="image/*" onChange={addImage} />
      <span>
        {!profilePic ? (
          "Select Profile Picture"
        ) : (
          <>
            {profilePic.name}
            <i className="bi bi-trash p-1 text-danger" onClick={removeImage}></i>
          </>
        )}
      </span>
      <label htmlFor="customFile" className=" d-flex flex-column align-items-center">
        {profilePic ? (
          <img src={profilePicPreview} alt="" />
        ) : (
          <i className="bi bi-person-circle text-muted"></i>
        )}
      </label>
      <small className="text-danger">{error}</small>
    </div>
  );
};

export default InputProfilePicture;

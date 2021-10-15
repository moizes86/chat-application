import React, { useEffect } from "react";
//
import useForm from "../hooks/useForm";
//
import { useDispatch } from "react-redux";
//
import { useHistory } from "react-router";
//
import "./JoinChat.scss";
//
import SubmitErrorMessage from "../components/SubmitErrorMessage";

export default function JoinChat() {
  // Handle Inputs
  const { values, validationErrors, setValues, handleChange, validateForm } = useForm();

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    setValues({ roomName__create: "" });

    return () => {
      setValues({ roomName__create: "" });
    };
  }, [setValues, dispatch]);

  return (
    <div className="join-chat custom-form">
      <h3>Join Chat</h3>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="form-group text-center">
          <select
            className="form-select"
            id="exampleFormControlSelect1"
            name="roomName__select"
            onChange={handleChange}
          >
            <option hidden>Choose one</option>

            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
          <button
            className="mt-2"
            onClick={(e) => {
              e.preventDefault();
              if (values.roomName__select) history.push(`/chat/room/${values.roomName__select}`);
              
            }}
          >
            Join Room
          </button>
        </div>

        <h4 className="text-center my-3"> Or</h4>

        <div className="text-center">
          <input
            className="form-control"
            name="roomName__create"
            type="text"
            placeholder="Room Name"
            onChange={handleChange}
          />
          <SubmitErrorMessage errorMessage={validationErrors.roomName__create} />
          <button
            className="mt-2"
            onClick={(e) => {
              e.preventDefault();
              if (validateForm()) history.push(`/chat/room/${values.roomName__create}`);
            }}
          >
            Create Room
          </button>
        </div>
      </form>
    </div>
  );
}

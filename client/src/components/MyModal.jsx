import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import CheckCircleSuccess from "./CheckCircleSuccess";
import "./MyModal.scss";

const MyModal = ({ data, children }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (data) setShow(true);
    return () => {
      setShow(false);
    };
  }, [data]);

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);

  return (
    <>
      <span onClick={handleShow}></span>

      <Modal show={show} onHide={handleClose} className="my-modal">
        <Modal.Header>
          <i className="bi bi-x-lg" onClick={handleClose}></i>
        </Modal.Header>
        <Modal.Body>
          <div className="my-5">
            <CheckCircleSuccess message={data?.message} />
          </div>
          {children}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default MyModal;

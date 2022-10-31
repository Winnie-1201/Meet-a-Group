import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import LoginForm from "./LoginForm";
import "./LoginForm.css";

function LoginFormModal({ newGroup }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {newGroup && (
        <button onClick={() => setShowModal(true)} className="start-new-group">
          Start a new group
        </button>
      )}
      {!newGroup && (
        <button onClick={() => setShowModal(true)} className="login-button">
          Log in
        </button>
      )}

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm />
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;

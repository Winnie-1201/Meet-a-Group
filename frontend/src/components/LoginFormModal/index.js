import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import LoginForm from "./LoginForm";
import "./LoginForm.css";

function LoginFormModal({ newGroup }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {newGroup === "newGroup" && (
        <button onClick={() => setShowModal(true)} className="start-new-group">
          Start a new group
        </button>
      )}

      {newGroup === "newGroupHome" && (
        <button
          onClick={() => setShowModal(true)}
          className="start-new-group-home"
        >
          Start a new group
        </button>
      )}

      {newGroup === "home-login" && (
        <button onClick={() => setShowModal(true)} className="join-meetagroup">
          Join MeetaGroup
        </button>
      )}

      {newGroup === "footerLogin" && (
        <button onClick={() => setShowModal(true)} className="footer-button">
          Log in
        </button>
      )}

      {newGroup === "getStarted" && (
        <button onClick={() => setShowModal(true)} className="get-started">
          Get Started
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

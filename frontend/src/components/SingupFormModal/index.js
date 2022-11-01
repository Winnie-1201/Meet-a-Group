import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import SignupForm from "./SignupForm";
import "./SignupForm.css";

function SignupFormModal({ prop }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {prop === "footerSignup" && (
        <button onClick={() => setShowModal(true)} className="footer-button">
          Sign up
        </button>
      )}
      {!prop && (
        <button onClick={() => setShowModal(true)} className="signup-button">
          Sign up
        </button>
      )}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SignupForm />
        </Modal>
      )}
    </>
  );
}

export default SignupFormModal;

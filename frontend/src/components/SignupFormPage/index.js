import React, { useEffect, useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import "./SignupFormPage.css";

const SignupFormPage = ({ user }) => {
  const dispatch = useDispatch();
  //   const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) {
    return <Redirect to="/" />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      firstName,
      lastName,
      username,
      email,
      password,
    };

    if (confirm !== password) {
      return setErrors(["Please enter the same password."]);
    }

    setErrors([]);
    return dispatch(sessionActions.signup(payload)).catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) setErrors(data.errors);
    });
    // const payload = {
    //   credential,
    //   password,
    // };

    // const returnUser = await dispatch(sessionActions.loginSession(payload));

    // if (returnUser) {
    //   history.push("/");
    // }
  };

  //   useEffect(() => {
  //     const error = [];
  //     if (confirm !== password) {
  //       error.push("Please enter the same password!");
  //     }
  //     setErrors(error);
  //   }, [confirm]);

  return (
    <section className="edit-form-holder centered middled">
      <form className="login-form" onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label className="form-label">
          First Name
          <input
            type="text"
            // placeholder="Username or Email"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        <label className="form-label">
          Last Name
          <input
            type="text"
            // placeholder="Username or Email"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        <label className="form-label">
          Username
          <input
            type="text"
            // placeholder="Username or Email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label className="form-label">
          Email
          <input
            type="text"
            // placeholder="Username or Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label className="form-label">
          Password
          <input
            type="text"
            // placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label className="form-label">
          Confirm Password
          <input
            type="text"
            // placeholder="Password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
          />
        </label>
        <button type="submit">Sign Up</button>
      </form>
    </section>
  );
};

export default SignupFormPage;

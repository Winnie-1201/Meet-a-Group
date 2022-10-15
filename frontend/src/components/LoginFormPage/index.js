import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import "./LoginForm.css";

const LoginFormPage = ({ user }) => {
  const dispatch = useDispatch();
  //   const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);

  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) {
    return <Redirect to="/" />;
  }

  const getCredential = (e) => setCredential(e.target.value);
  const getPassword = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors([]);
    return dispatch(
      sessionActions.loginSession({ credential, password })
    ).catch(async (res) => {
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

  return (
    // <section className="edit-form-holder centered middled">
    <form className="login-form" onSubmit={handleSubmit}>
      {errors.length > 0 && (
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
      )}
      <i className="fa-solid fa-cannabis fa-xl" />
      <h2>Log in</h2>
      <label>
        Username or email
        <input
          type="text"
          // placeholder="Username or Email"
          value={credential}
          onChange={getCredential}
        />
      </label>
      <label>
        Password
        <input
          type="text"
          // placeholder="Password"
          value={password}
          onChange={getPassword}
          required
        />
      </label>
      <button type="submit">Log in</button>
    </form>
    // </section>
  );
};

export default LoginFormPage;

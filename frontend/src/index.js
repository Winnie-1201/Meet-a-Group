import React from "react";

import "./index.css";

import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

import configureStore from "./store";

import { restoreCSRF, csrfFetch } from "./store/csrf";

// for testing the session action and reducer
import * as sessionActions from "./store/session";
import { ModalProvider } from "./context/Modal";

const store = configureStore();

if (process.env.NODE_ENV !== "production") {
  restoreCSRF();

  window.csrfFetch = csrfFetch;
  // store.getState()
  window.store = store;
  // for testing the session action and reducer
  // store.dispatch(sessionActions.loginSession({ credential: 'Demo-lition', password: 'password' }))
  window.sessionActions = sessionActions;
}

// define the Root React functional component
function Root() {
  return (
    <Provider store={store}>
      {/* <ModalProvider> */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
      {/* </ModalProvider> */}
    </Provider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById("root")
);

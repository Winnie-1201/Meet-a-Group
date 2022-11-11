import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useHistory } from "react-router-dom";

import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SingupFormModal";
import * as sessionActions from "../../store/session";

import "./Footer.css";

// const container = document.getElementsByClassName();

const Footer = ({ window }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const currentUser = useSelector((state) => state.session.user);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push("/");
  };
  return (
    <footer className="main-footer">
      <div className="footer-container">
        <div className="footer-one-flex">
          <div className="footer-one-detail">
            Create your own Meetup group.
            {currentUser && (
              <Link to="/groups/current/new" className="footer-new-group">
                Get Started
              </Link>
            )}
            {!currentUser && <LoginFormModal newGroup={"getStarted"} />}
          </div>
        </div>
        <div className="footer-two-flex">
          <div className="footer-detail">
            <span className="footer-title">Your Account</span>
            <ul className="footer-list">
              {currentUser && (
                <>
                  <li>
                    <Link
                      to="/groups/current"
                      className="source-link"
                      onClick={() => window.scrollTo(0, 0)}
                    >
                      Your groups
                    </Link>
                  </li>
                  <li className="icon-logout">
                    <button
                      className="icon-logout-button"
                      onClick={handleLogout}
                    >
                      Log out
                    </button>
                  </li>
                </>
              )}
              {!currentUser && (
                <>
                  <li>
                    <SignupFormModal prop={"footerSignup"} />
                  </li>
                  <li>
                    <LoginFormModal newGroup={"footerLogin"} />
                  </li>
                </>
              )}
            </ul>
          </div>
          <div className="footer-detail">
            <span className="footer-title">Discover</span>
            <ul className="footer-list">
              <li>
                <Link
                  to="/groups"
                  className="source-link"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  Groups
                </Link>
              </li>
              <li>
                <Link
                  to="/events"
                  className="source-link"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  Events
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-three-flex"></div>
      </div>
    </footer>
  );
};

export default Footer;

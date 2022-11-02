import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import * as sessionActions from "../../store/session";

import "./ProfileButton.css";

const ProfileButton = ({ user }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  // console.log("now in profilebutton component======================");

  const onClick = (e) => {
    e.preventDefault();
    setOpenMenu(true);
  };

  useEffect(() => {
    if (!openMenu) return;

    const closeMenu = () => {
      setOpenMenu(false);
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [openMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push("/");
  };

  return (
    <>
      <button className="header-bar-icon-button" onClick={onClick}>
        {/* <i className="fa-regular fa-circle-user" /> */}
        <div className="button-detail">{user.firstName[0]}</div>
      </button>
      {openMenu && (
        <ul className="icon-detail">
          <li className="icon-username">{user.username}</li>
          <li className="icon-email">{user.email}</li>
          <li className="icon-groups-link">
            <NavLink
              className="icon-groups-navlink"
              exact
              to={`/groups/current`}
            >
              Your groups
            </NavLink>
          </li>
          <li className="icon-logout">
            <button className="icon-logout-button" onClick={handleLogout}>
              Log Out
            </button>
          </li>
        </ul>
      )}
    </>
  );
};

export default ProfileButton;

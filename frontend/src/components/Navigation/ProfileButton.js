import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import * as sessionActions from "../../store/session";

import "./ProfileButton.css";

const ProfileButton = ({ user }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const dispatch = useDispatch();

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
  };

  return (
    <>
      <button onClick={onClick}>
        <i className="fa-regular fa-circle-user" />
      </button>
      {openMenu && (
        <ul>
          <li>{user.username}</li>
          <li>{user.email}</li>
          <li>
            <NavLink exact to={`/groups/current`}>
              My groups
            </NavLink>
          </li>
          <li>
            <button onClick={handleLogout}>Log Out</button>
          </li>
        </ul>
      )}
    </>
  );
};

export default ProfileButton;

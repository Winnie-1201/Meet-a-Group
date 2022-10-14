import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import "./Navigation.css";

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

  //   console.log(user);
  return (
    <>
      <button onClick={onClick}>
        <i className="fa-regular fa-circle-user" />
      </button>
      {openMenu && (
        <ul>
          <li>{user.username}</li>
          <li>{user.email}</li>
          <button onClick={handleLogout}>Log Out</button>
        </ul>
      )}
    </>
  );
};

export default ProfileButton;

import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import * as sessionActions from "../../store/session";
import ProfileButton from "./ProfileButton";

const Navigation = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.user);
  //   let logout = false;
  //   let signup = true;
  //   let login = true;
  //   if (currentUser) {
  //     logout = true;
  //     signup = false;
  //     login = false;
  //   }
  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    return <NavLink to="/" />;
  };

  if (currentUser) {
    return (
      <>
        <NavLink to="/">Home</NavLink>
        <ProfileButton user={currentUser} />
      </>
    );
  } else {
    return (
      <>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/signup">Sign Up</NavLink>
        <NavLink to="/login">Login</NavLink>
      </>
    );
  }

  //   return (
  //     <nav className="nav-bar">
  //       <NavLink to="/">Home</NavLink>
  //       {signup && <NavLink to="/signup">Sign Up</NavLink>}
  //       {login && <NavLink to="/login">Login</NavLink>}
  //       {logout && <button onClick={handleLogout}>Logout</button>}
  //     </nav>
  //   );
};

export default Navigation;

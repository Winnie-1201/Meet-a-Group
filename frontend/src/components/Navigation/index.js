import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
// import * as sessionActions from "../../store/session";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

const Navigation = () => {
  // const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.user);
  //   let logout = false;
  //   let signup = true;
  //   let login = true;
  //   if (currentUser) {
  //     logout = true;
  //     signup = false;
  //     login = false;
  //   }
  // const handleLogout = (e) => {
  //   e.preventDefault();
  //   dispatch(sessionActions.logout());
  //   return <NavLink to="/" />;
  // };

  return (
    <>
      <NavLink to="/" className="nav-link">
        Home
      </NavLink>
      {currentUser && <ProfileButton user={currentUser} />}
      <NavLink to="/login" className="nav-link">
        Log in
      </NavLink>
      <NavLink to="/signup" className="nav-link">
        Sign up
      </NavLink>
      {/* feature one Read: to get all groups */}
      <NavLink to="/groups" className="nav-link">
        Groups
      </NavLink>
      {/* <div>
        <img src="http://drive.google.com/uc?export=view&id=1s2m4KUrp0d0BzPucsrYs8XXJSEU7FJ5u"></img>
      </div> */}
    </>
  );

  // if (currentUser) {
  //   return (
  //     <>
  //       <NavLink to="/">Home</NavLink>
  //       <ProfileButton user={currentUser} />
  //     </>
  //   );
  // } else {
  //   return (
  //     <>
  //       <NavLink to="/" className="nav-link">
  //         Home
  //       </NavLink>
  //       <NavLink to="/login" className="nav-link">
  //         Log in
  //       </NavLink>
  //       <NavLink to="/signup" className="nav-link">
  //         Sign up
  //       </NavLink>
  //     </>
  //   );
  // }

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

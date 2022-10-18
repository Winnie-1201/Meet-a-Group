import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

const Navigation = ({ isLoaded }) => {
  const currentUser = useSelector((state) => state.session.user);
  console.log("getting in the navigation component======================");
  return (
    <>
      <NavLink to="/" className="nav-link">
        Home
      </NavLink>
      <NavLink to="/groups" className="nav-link">
        Groups
      </NavLink>
      <NavLink to="/events" className="nav-link">
        Events
      </NavLink>
      {isLoaded && currentUser && <ProfileButton user={currentUser} />}
      {isLoaded && !currentUser && (
        <>
          <NavLink to="/login" className="nav-link">
            Log in
          </NavLink>
          <NavLink to="/signup" className="nav-link">
            Sign up
          </NavLink>
        </>
      )}
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

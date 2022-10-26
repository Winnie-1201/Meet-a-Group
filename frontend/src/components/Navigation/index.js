import { useSelector } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
// import LoginFormModal from "../LoginFormModal";

const Navigation = ({ isLoaded }) => {
  const currentUser = useSelector((state) => state.session.user);
  // let sessionLinks;
  // if (currentUser) {
  //   sessionLinks = (

  //   )
  // }
  console.log("getting in the navigation component======================");
  return (
    <>
      <div className="header">
        <div className="header-left">
          <Link to="/" className="home">
            MeetaGroup
          </Link>
          <div className="header-search-bar">
            <input type="text" placeholder="Search for keywords" />
          </div>
        </div>

        <div className="header-right">
          {currentUser && (
            <Link className="start-new-group" to="/groups/current/new">
              Start a new group
            </Link>
          )}
          {/* come back here to change it for more details */}
          {!currentUser && (
            <Link className="start-new-group" to="/login">
              Start a new group
            </Link>
          )}
          {currentUser && <ProfileButton user={currentUser} />}
          {!currentUser && (
            <div className="user">
              <Link to="/login" className="login-link">
                Log in
              </Link>
              {/* <LoginFormModal /> */}
              <Link to="/signup" className="signup-link">
                Sign up
              </Link>
            </div>
          )}
        </div>
      </div>
      <div className="event-groups-body">
        <div className="event-groups-content">
          <div className="events-groups">
            <NavLink to="/events" className="event-link">
              Events
            </NavLink>
            <NavLink to="/groups" className="group-link">
              Groups
            </NavLink>
          </div>
        </div>
      </div>
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

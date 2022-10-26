import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProfileButton from "../Navigation/ProfileButton";
import "./HomeBar.css";

const HomeBar = () => {
  const currentUser = useSelector((state) => state.session.user);
  // console.log("getting in the navigation component======================");
  return (
    <>
      <div className="home-header">
        <div className="header-detail">
          <div className="header-left">
            <Link to="/" className="home-title">
              MeetaGroup
            </Link>
          </div>
          {currentUser && <ProfileButton user={currentUser} />}
          {!currentUser && (
            <div className="user">
              <Link to="/login" className="login-link">
                Log in
              </Link>
              <Link to="/signup" className="signup-link">
                Sign up
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default HomeBar;

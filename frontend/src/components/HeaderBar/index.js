import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProfileButton from "../Navigation/ProfileButton";
import "./HomeBar.css";
import LoginFormModal from "../LoginFormModal";

import SignupFormModal from "../SingupFormModal";

const HomeBar = () => {
  const currentUser = useSelector((state) => state.session.user);
  // console.log("getting in the navigation component======================");
  return (
    <>
      <img
        className="img-one-home"
        src="https://secure.meetupstatic.com/next/images/blobs/red-blob.svg"
      />
      <img
        className="img-two-home"
        src="https://secure.meetupstatic.com/next/images/blobs/yellow-blob.svg"
      />
      <img
        className="img-three-home"
        src="https://secure.meetupstatic.com/next/images/blobs/green-blob.svg"
      />
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
              {/* <Link to="/login" className="login-link">
                Log in
              </Link> */}
              <LoginFormModal />
              <SignupFormModal />
              {/* <Link to="/signup" className="signup-link">
                Sign up
              </Link> */}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default HomeBar;

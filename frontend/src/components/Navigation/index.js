import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import LoginFormModal from "../LoginFormModal";

import SignupFormModal from "../SingupFormModal";
import { useEffect, useState } from "react";
import { getSearchGroups } from "../../store/group";
import { getSearchEvents } from "../../store/event";
import { useSearch } from "../../context/search";

const Navigation = ({ window }) => {
  const currentUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  // const [keywords, setKeywords] = useState("");
  // const [location, setLocation] = useState("");
  const { keywords, location, setKeywords, setLocation } = useSearch();

  useEffect(() => {
    setKeywords(localStorage.getItem("keywords"));
    setLocation(localStorage.getItem("location"));
  }, []);

  useEffect(() => {
    localStorage.setItem("keywords", keywords);
    localStorage.setItem("location", location);
  }, [keywords, location]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const searchGroups = dispatch(getSearchGroups(keywords, location));
    const searchEvents = dispatch(getSearchEvents(keywords, location));

    if (searchEvents) history.push("/events");
    if (searchGroups) history.push("/groups");
  };

  // console.log("getting in the navigation component======================");
  return (
    <div className="header-bar-sticky">
      <div className="header">
        <div className="header-left">
          {currentUser && (
            <Link
              to="/groups"
              className="home-title"
              onClick={() => window.scrollTo(0, 0)}
            >
              MeetaGroup
            </Link>
          )}
          {!currentUser && (
            <Link
              to="/"
              className="home-title"
              onClick={() => window.scrollTo(0, 0)}
            >
              MeetaGroup
            </Link>
          )}
          <div className="header-search-bar">
            <div className="form-detail-one">
              <input
                type="text"
                id="search-box"
                value={keywords}
                placeholder="Search for keywords"
                onChange={(e) => setKeywords(e.target.value)}
              />
            </div>
            <div className="form-detail-two">
              <input
                type="text"
                value={location}
                id="search-box"
                placeholder="Enter location"
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <button className="search-button-flex" onClick={handleSubmit}>
              <i className="fa-solid fa-magnifying-glass" />
            </button>
            {/* </div> */}
            {/* </form> */}
            {/* <input type="text" placeholder="Search for keywords" />
            <input type="text" placeholder="Enter location" /> */}
          </div>
        </div>

        <div className="header-right">
          {currentUser && (
            <>
              <Link className="start-new-group" to="/groups/current/new">
                Start a new group
              </Link>
              <ProfileButton user={currentUser} />
            </>
          )}
          {/* {currentUser && <ProfileButton user={currentUser} />} */}
          {/* come back here to change it for more details */}
          {!currentUser && (
            // <Link className="start-new-group" to="/login">
            //   Start a new group
            // </Link>
            <LoginFormModal newGroup={"newGroup"} />
          )}
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
      {/* <div className="event-groups-body">
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
      </div> */}
    </div>
  );
};

export default Navigation;

import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link, useHistory } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import LoginFormModal from "../LoginFormModal";

import SignupFormModal from "../SingupFormModal";
import { useState } from "react";
import { useSearch } from "../../context/search";
import { getSearchGroups } from "../../store/group";
import { getSearchEvents } from "../../store/event";

const Navigation = () => {
  const currentUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const { setKeywords, setLocation, keywords, location } = useSearch();

  const handleSubmit = async (e) => {
    // e.preventDefault();
    const searchGroups = dispatch(getSearchGroups(keywords, location));
    const searchEvents = dispatch(getSearchEvents(keywords, location));

    if (searchEvents) history.push("/events");
    if (searchGroups) history.push("/groups");
    // return the dispatch;
  };

  // console.log("getting in the navigation component======================");
  return (
    <div className="header-bar-sticky">
      <div className="header">
        <div className="header-left">
          <Link to="/" className="home">
            MeetaGroup
          </Link>
          <div className="header-search-bar">
            {/* <form className="header-search-form"> */}
            {/* <div className="form-container-flex"> */}
            <div className="form-detail-one">
              <input
                type="text"
                placeholder="Search for keywords"
                onChange={(e) => setKeywords(e.target.value)}
              />
            </div>
            <div className="form-detail-two">
              <input
                type="text"
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

// import { useEffect } from "react";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getGroups, getSearchGroups } from "../../store/group";
import "./groups.css";
import { useSearch } from "../../context/search";
import Footer from "../Footer";
import Navigation from "../Navigation";

const Groups = () => {
  // const currentUser = useSelector((state) => state.session.user);
  const history = useHistory();
  const groups = Object.values(useSelector((state) => state.group.allGroups));

  const keywords = localStorage.getItem("keywords");
  const location = localStorage.getItem("location");

  const { setKeywords, setLocation } = useSearch();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSearchGroups(keywords, location));
  }, [dispatch]);

  const handleReset = async (e) => {
    e.preventDefault();

    setKeywords("");
    setLocation("");

    // localStorage.setItem("keywords", "");
    // localStorage.setItem("location", "");

    const reset = await dispatch(getGroups());
    if (reset) history.push("/groups");
  };

  return (
    <>
      <Navigation window={window} />
      <div className="full-width">
        <div className="event-groups-body">
          <div className="event-groups-content">
            <div className="events-groups">
              <h2
                // to="/events"
                className="event-link"
                onClick={() => {
                  window.scrollTo(0, 0);
                  history.push("/events");
                }}
              >
                Events
              </h2>
              <h2 className="group-link active">Groups</h2>
            </div>
          </div>
        </div>
      </div>
      {groups.length === 0 && (keywords?.length > 0 || location?.length > 0) && (
        <div className="flex-column-groups">
          <div className="not-found-image">
            <img src="https://secure.meetupstatic.com/next/images/find/emptyResultsIcon.svg?w=384" />
          </div>
          <span className="not-found-text">
            {`Sorry, there are no groups results for "${keywords}" ${
              location?.length > 0 ? `in ${location}` : ""
            } that match
            these filters.`}
          </span>
          {/* <span className="not-found-text">
            Please try resetting the filters
          </span> */}
          <button className="not-found-button" onClick={handleReset}>
            Try resetting the filters
          </button>
        </div>
      )}
      {groups.length > 0 && (
        <div className="all-groups-body">
          <div className="all-groups">
            {/* <h2 className="group-header">All groups</h2> */}
            {groups.map((group) => (
              <div className="one-group" key={group.id}>
                <Link to={`/groups/${group.id}`} className="one-group-link">
                  <div className="group-image">
                    <img className="group-img" src={`${group?.previewImage}`} />
                  </div>
                  <div className="one-group-detail">
                    <p className="group-name">{group.name}</p>
                    <p className="group-location">
                      {group.city}, {group.state}
                    </p>
                    <p className="group-about">{group.about}</p>
                    <p className="group-type">
                      {group.numMembers} members · {group.type}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          <div></div>
          {/* </div> */}
        </div>
      )}
      {/* <div className="event-groups-content"> */}
      <Footer window={window} />
    </>
  );
};

export default Groups;

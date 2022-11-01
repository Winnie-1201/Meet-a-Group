import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useHistory } from "react-router-dom";
import { getEvents } from "../../store/event";
import { getGroups } from "../../store/group";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SingupFormModal";
import * as sessionActions from "../../store/session";
import "./Home.css";

const Home = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const currentUser = useSelector((state) => state.session.user);
  const events = Object.values(
    useSelector((state) => state.event.allEvents)
  ).sort(
    (a, b) =>
      new Date(a.startDate) - new Date() - (new Date(b.startDate) - new Date())
  );
  const groups = Object.values(useSelector((state) => state.group.allGroups));
  console.log(events, groups);

  useEffect(() => {
    dispatch(getEvents());
    dispatch(getGroups());
  }, [dispatch]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push("/");
  };

  if (!groups || !events) return null;
  // console.log("getting in the navigation component======================");
  return (
    <>
      <div className="homepage">
        <main className="homepage-main">
          <div className="main-div">
            <div className="main-div-one">
              <div className="one-left">
                <div className="one-left-top">
                  <h1>
                    Celebrating 20 years of real connections on MeetaGroup
                  </h1>
                </div>
                <div className="one-left-bottom">
                  <p>
                    Whatever you are looking to do this year, MeetaGroup can
                    help. For 20 years, people have turned to Meetup to meet
                    people, make friends, find support, grow a business, and
                    explore their interests. Thousands of events are happening
                    every day—join the fun
                  </p>
                </div>
              </div>
              <div className="one-right">
                <img src="	https://secure.meetupstatic.com/next/images/shared/online_events.svg?w=1080" />
              </div>
            </div>

            <div className="main-div-two">
              <div className="two-top">
                <div className="top-grid-pics">
                  <div className="grid-one-flex-content">
                    <img src="https://secure.meetupstatic.com/next/images/indexPage/category1.webp?w=3840" />
                    <p className="nav-link" to="the-event">
                      Make new friends
                    </p>
                  </div>
                  <div className="grid-two-flex-content">
                    <img src="https://secure.meetupstatic.com/next/images/indexPage/category2.webp?w=3840" />
                    <p className="nav-link" to="the-event">
                      Explore the outdoors
                    </p>
                  </div>
                  <div className="grid-three-flex-content">
                    <img src="https://secure.meetupstatic.com/next/images/indexPage/category3.webp?w=3840" />
                    <p className="nav-link" to="the-event">
                      Connect over tech
                    </p>
                  </div>
                </div>
              </div>
              <div className="two-middle">
                <div className="flex-two-content">
                  <div className="content-detail">
                    <p>Boost your career</p>
                  </div>
                  <div className="content-detail">
                    <p>Find your zen</p>
                  </div>
                  <div className="content-detail">
                    <p>Get moving</p>
                  </div>
                  <div className="content-detail">
                    <p>Share language + culture</p>
                  </div>
                  <div className="content-detail">
                    <p>Read with friends</p>
                  </div>
                  <div className="content-detail">
                    <p>Write together</p>
                  </div>
                  <div className="content-detail">
                    <p>Hone your craft</p>
                  </div>
                </div>
              </div>
              <div className="tow-bottom"></div>
            </div>

            <div className="main-div-three-grid">
              <div className="three-flex-left">
                <h2 className="three-header">Where do you want to do?</h2>

                <form className="input-button">
                  <div className="three-input-area-flex">
                    <div className="input-area-one">
                      <input type="text" placeholder={`Search for "tennis"`} />
                    </div>
                    <div className="input-area-two">
                      <input
                        type="text"
                        placeholder="Neighborhood or City or zip"
                      />
                    </div>
                  </div>
                  {/* --
                  --- */}
                  {/* change it back to button later> */}
                  {/* <button className="three-search-button">Search</button> */}
                  <div className="three-search-button">
                    <p>Search</p>
                  </div>
                  {/* --
                  --- */}
                  {/* </div> */}
                </form>
              </div>
              <div className="three-flex-right">
                {/* <div className="right-top"> */}
                <h2>{`See what's happening`}</h2>
                {/* </div> */}
                {/* <div className="right-bottom"> */}
                <div className="right-bottom-one-flex">
                  <div className="bottom-detail">
                    <p>Starting soon</p>
                  </div>
                  <div className="bottom-detail">
                    <p>Today</p>
                  </div>
                  <div className="bottom-detail">
                    <p>Tomorrow</p>
                  </div>
                  <div className="bottom-detail-two">
                    <p>This week</p>
                  </div>
                </div>
                <div className="right-bottom-two-flex">
                  <div className="bottom-detail">
                    <p>Online</p>
                  </div>
                  <div className="bottom-detail">
                    <p>In person</p>
                  </div>
                  <div className="bottom-detail-two">
                    <p>Trending near you</p>
                  </div>
                </div>
                {/* </div> */}
              </div>
            </div>

            <div className="main-div-five">
              <h2>How Meetup works</h2>
              <p>
                Meet new people who share your interests through online and
                in-person events. It's free to create an account
              </p>
              <div className="div-five-flex-container">
                <div className="div-five-flex">
                  <div className="div-five-flex-detail">
                    <div className="flex-top-pic">
                      <img src="https://secure.meetupstatic.com/next/images/shared/handsUp.svg?w=256" />
                    </div>
                    <div className="flex-bottom-text">
                      <Link className="bottom-text-link" to="/groups">
                        <h3>Join a group</h3>
                      </Link>
                      <p>
                        Do what you love, meet others who love it, find your
                        community. The rest is history!
                      </p>
                    </div>
                  </div>
                  <div className="div-five-flex-detail">
                    <div className="flex-top-pic">
                      <img src="https://secure.meetupstatic.com/next/images/shared/ticket.svg?w=256" />
                    </div>
                    <div className="flex-bottom-text">
                      <Link className="bottom-text-link" to="/events">
                        <h3>Find an event</h3>
                      </Link>
                      <p>
                        Events are happening on just about any topic you can
                        think of, from online gaming and photography to yoga and
                        hiking.
                      </p>
                    </div>
                  </div>
                  <div className="div-five-flex-detail">
                    <div className="flex-top-pic">
                      <img src="https://secure.meetupstatic.com/next/images/shared/joinGroup.svg?w=256" />
                    </div>
                    <div className="flex-bottom-text">
                      {currentUser && (
                        <Link
                          className="bottom-text-link"
                          to="/groups/current/new"
                        >
                          <h3>Start a group</h3>
                        </Link>
                      )}
                      {!currentUser && (
                        <LoginFormModal newGroup={"newGroupHome"} />
                      )}
                      <p>
                        You don't have to an expert to gather people together
                        and explore shred interests.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {!currentUser && <LoginFormModal newGroup={"home-login"} />}
            </div>

            <div className="main-div-four">
              <div className="four-flex">
                <div className="four-flex-one">
                  <div className="one-header-flex">
                    <h2>Upcoming online events</h2>
                    {/* put the events link here all events */}
                    {/* <div className="explore-link">
                      <p>Explore more events</p>
                    </div> */}
                    <NavLink exact to="/events" className="explore-link">
                      Explore more events
                    </NavLink>
                  </div>

                  <div className="one-body">
                    {/* <div className="one-body-detail"> */}
                    <ul className="detail-list-flex">
                      {/* put the events details here later */}
                      {events.map((event) => (
                        <li key={event.id} className="detail-list-li">
                          <Link
                            to={`/events/${event.id}`}
                            className="list-detail-flex"
                          >
                            <div className="list-detail-top">
                              <div className="event-type-home">
                                <i className="fa-solid fa-video" />
                                <p>{event.type} Event</p>
                              </div>
                              <img
                                src={`${event.previewImage}`}
                                className="list-detail-top-img"
                              />
                            </div>
                            <div className="list-detail-middle-flex">
                              <div className="list-detail-middle-flex-top">
                                <p className="event-date-home">
                                  {new Intl.DateTimeFormat("en-US", {
                                    weekday: "short",
                                  })
                                    .format(new Date(event.startDate))
                                    .toUpperCase()}
                                  ,{" "}
                                  {new Intl.DateTimeFormat("en-US", {
                                    month: "short",
                                  })
                                    .format(new Date(event.startDate))
                                    .toUpperCase()}{" "}
                                  {new Date(event.startDate).getDate()}·{" "}
                                  {new Date(event.startDate).getHours()}:
                                  {new Date(event.startDate).getMinutes()}
                                  {new Date(event.startDate).getMinutes() == 0
                                    ? 0
                                    : ""}{" "}
                                  {new Date(event.startDate).getHours() >= 12
                                    ? "PM"
                                    : "AM"}
                                  {/* {event.startDate} */}
                                </p>
                                <p className="event-name-home">{event.name}</p>
                                <p className="event-group-name-home">
                                  {event.Group.name}
                                </p>
                              </div>
                              {/* <div className="list-detail-bottom-detail-flex"> */}
                              <p className="event-attend-home">
                                {event.numAttending} Attend
                              </p>
                              {/* </div> */}
                            </div>
                          </Link>
                        </li>
                      ))}
                      {/* <li className="list-one"></li>
                      <li className="list-two">list one</li>
                      <li className="list-three">list one</li>
                      <li className="list-four">list one</li> */}
                    </ul>
                  </div>
                  {/* </div> */}
                </div>

                <div className="four-flex-two">
                  <div className="two-header-flex">
                    <h2>Popular groups</h2>
                    {/* put the events link here all events */}
                    {/* <div className="explore-groups-link">
                      <p>Explore more groups</p>
                    </div> */}
                    <NavLink exact to="/groups" className="explore-groups-link">
                      Explore more groups
                    </NavLink>
                  </div>
                  <div className="two-body">
                    {/* <div className="two-body-detail-two"> */}
                    <ul className="detail-list-flex">
                      {/* put the groups details here later */}
                      {groups.map((group) => (
                        <li key={group.id} className="detail-list-li">
                          <div className="group-container-flex">
                            <Link
                              to={`/groups/${group.id}`}
                              className="container-top-flex"
                            >
                              <img
                                src={group.previewImage}
                                className="container-top-img"
                              />
                              <h3>{group.name}</h3>
                            </Link>
                            {/* not sure how to get the relevant event */}
                          </div>
                        </li>
                      ))}
                      {/* <li className="detail-list-one">list one</li>
                        <li className="detail-list-two">list one</li>
                        <li className="detail-list-three">list one</li> */}
                    </ul>
                  </div>
                  {/* </div> */}
                </div>
              </div>
            </div>

            {/* the story part work on in if have time */}
            <div className="main-div-six"></div>
          </div>
        </main>
        <footer className="main-footer">
          <div className="footer-container">
            <div className="footer-one-flex">
              <div className="footer-one-detail">
                Create your own Meetup group.
                {currentUser && (
                  <Link to="/groups/current/new" className="footer-new-group">
                    Get Started
                  </Link>
                )}
                {!currentUser && <LoginFormModal newGroup={"getStarted"} />}
              </div>
            </div>
            <div className="footer-two-flex">
              <div className="footer-detail">
                <span className="footer-title">Your Account</span>
                <ul className="footer-list">
                  {currentUser && (
                    <>
                      <li>
                        <Link to="/groups/current" className="source-link">
                          Your groups
                        </Link>
                        <li className="icon-logout">
                          <button
                            className="icon-logout-button"
                            onClick={handleLogout}
                          >
                            Log Out
                          </button>
                        </li>
                      </li>
                    </>
                  )}
                  {!currentUser && (
                    <>
                      <li>
                        <SignupFormModal prop={"footerSignup"} />
                      </li>
                      <li>
                        <LoginFormModal newGroup={"footerLogin"} />
                      </li>
                    </>
                  )}
                </ul>
              </div>
              <div className="footer-detail">
                <span className="footer-title">Discover</span>
                <ul className="footer-list">
                  <li>
                    <Link to="/groups" className="source-link">
                      Groups
                    </Link>
                  </li>
                  <li>
                    <Link to="/events" className="source-link">
                      Events
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="footer-three-flex"></div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Home;

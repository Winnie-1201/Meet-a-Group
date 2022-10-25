import { useSelector } from "react-redux";
import { NavLink, Link, Redirect } from "react-router-dom";
import ProfileButton from "../Navigation/ProfileButton";
import "./Home.css";

const Home = ({ isLoaded }) => {
  const currentUser = useSelector((state) => state.session.user);
  console.log("getting in the navigation component======================");
  return (
    <>
      <div className="homepage">
        {/* <div className="home-header"> */}
        {/* <div className="header-detail"> */}
        {/* <div className="header-left">
              <Link to="/" className="home-title">
                MeetaGroup
              </Link>
            </div> */}
        {/* {isLoaded && currentUser && <ProfileButton user={currentUser} />} */}
        {/* {isLoaded && !currentUser && (
              <div className="user">
                <Link to="/login" className="login-link">
                  Log in
                </Link>
                <Link to="/signup" className="signup-link">
                  Sign up
                </Link>
              </div>
            )} */}
        {/* </div> */}
        {/* </div> */}

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
                    <div className="one-body-detail">
                      <ul className="detail-list-flex">
                        {/* put the events details here later */}
                        <li className="list-one">list one</li>
                        <li className="list-two">list one</li>
                        <li className="list-three">list one</li>
                        <li className="list-four">list one</li>
                      </ul>
                    </div>
                  </div>
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
                    <div className="two-body-detail-two">
                      <ul className="detail-two-list-flex">
                        {/* put the groups details here later */}
                        <li className="detail-list-one">list one</li>
                        <li className="detail-list-two">list one</li>
                        <li className="detail-list-three">list one</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Home;

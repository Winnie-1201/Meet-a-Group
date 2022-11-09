import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, useHistory, NavLink } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import Groups from "./components/Groups";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import MyGroups from "./components/MyGroups";
import CreateGroup from "./components/CreateGroup";
import GroupDetails from "./components/CreateGroup/GroupDetails";
import EditGroup from "./components/CreateGroup/EditGroupForm";
import Events from "./components/Events";
import CreateEvent from "./components/CreateEvent";
import EventDetails from "./components/CreateEvent/EventDetails";
import EditEvent from "./components/CreateEvent/EditEvent";
import Home from "./components/Home";
import HomeBar from "./components/HeaderBar";

function App() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      {/* <Home isLoaded={isLoaded} /> */}
      {/* <HomeBar isLoaded={isLoaded} /> */}
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <HomeBar />
            <Home />
          </Route>
          {/* <Route path="/login">
            <HomeBar /> */}
          {/* <LoginFormPage /> */}
          {/* <Navigation /> */}
          {/* </Route> */}
          {/* <Route path="/signup">
            <HomeBar />
            <SignupFormPage />
          </Route> */}
          <Route exact path="/groups">
            <Navigation />
            {/* <div className="event-groups-body">
              <div className="event-groups-content">
                <div className="events-groups">
                  <h2
                    // to="/events"
                    className="event-link inactive"
                    onClick={() => history.push("/events")}
                  >
                    Events
                  </h2>
                  <h2 className="group-link active">Groups</h2>
                </div>
              </div>
            </div> */}
            {/* <Navigation /> */}
            <Groups />
          </Route>
          <Route exact path="/events">
            <Navigation />
            {/* <Navigation /> */}
            {/* <div className="event-groups-body">
              <div className="event-groups-content">
                <div className="events-groups">
                  <h2 className="event-link active">Events</h2>
                  <h2
                    // to="/groups"
                    className="group-link inactive"
                    onClick={() => history.push("/groups")}
                  >
                    Groups
                  </h2>
                </div>
              </div>
            </div> */}
            <Events />
          </Route>
          <Route exact path="/events/group/:groupId/new">
            <Navigation />
            <CreateEvent />
          </Route>
          <Route exact path="/events/:eventId/edit">
            <Navigation />
            <EditEvent />
          </Route>
          <Route exact path="/events/:eventId">
            <Navigation />
            <EventDetails />
          </Route>
          <Route exact path="/groups/current">
            <Navigation />
            <MyGroups />
          </Route>
          <Route exact path="/groups/current/new">
            <Navigation />
            <CreateGroup />
          </Route>
          <Route exact path="/groups/:groupId">
            <Navigation />
            <GroupDetails />
          </Route>
          <Route exact path="/groups/current/:groupId/edit">
            <Navigation />
            <EditGroup />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;

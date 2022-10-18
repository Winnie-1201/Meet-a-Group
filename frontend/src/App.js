import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
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
import MyEvents from "./components/MyEvents";
import EventDetails from "./components/CreateEvent/EventDetails";
import EditEvent from "./components/CreateEvent/EditEvent";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/groups">
            <Groups />
          </Route>
          <Route exact path="/events">
            <Events />
          </Route>
          <Route exact path="/events/group/:groupId/new">
            <CreateEvent />
          </Route>
          {/* <Route exact path="/events/groups/:groupId">
            <MyEvents />
          </Route> */}
          <Route exact path="/events/:eventId/edit">
            <EditEvent />
          </Route>
          <Route exact path="/events/:eventId">
            <EventDetails />
          </Route>
          <Route exact path="/groups/current">
            <MyGroups />
          </Route>
          <Route exact path="/groups/current/new">
            <CreateGroup />
          </Route>
          <Route exact path="/groups/:groupId">
            <GroupDetails />
          </Route>
          <Route exact path="/groups/current/:groupId/edit">
            <EditGroup />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;

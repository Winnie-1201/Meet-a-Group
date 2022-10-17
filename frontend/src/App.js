import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import Groups from "./components/Groups";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
// import Home from "./components/Home";
import MyGroups from "./components/MyGroups";
import CreateGroup from "./components/CreateGroup";
import GroupDetails from "./components/CreateGroup/GroupDetails";
import EditGroup from "./components/CreateGroup/EditGroupForm";

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
          {/* create the route for groups */}
          <Route exact path="/groups/current/new">
            <CreateGroup />
          </Route>
          <Route exact path="/groups/current/:groupId">
            <GroupDetails />
          </Route>
          <Route exact path="/groups/current/:groupId/edit">
            <EditGroup />
          </Route>
          <Route exact path="/groups/current">
            <MyGroups />
          </Route>
          <Route path="/groups">
            <Groups />
          </Route>
          {/* <Route path="/groups/mygroups">
            <MyGroups />
          </Route> */}
        </Switch>
      )}
    </>
  );
}

export default App;

import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import groupsReducer from "./group";
import imagesReducer from "./image";
import sessionReducer from "./session";

// create a rootReducer
const rootReducer = combineReducers({
  session: sessionReducer,
  group: groupsReducer,
  image: imagesReducer,
});

// initialize enhancer
let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

// create a configureStore function;
// will be used by index.js to attach the Redux store to the React application;
const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;

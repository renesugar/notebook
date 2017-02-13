import "phoenix_html"
import React                            from "react";
import ReactDOM                         from "react-dom";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { Provider }                     from "react-redux";
import thunk                            from "redux-thunk";
import createLogger                     from "redux-logger";
import { Router, Route, hashHistory }   from "react-router";
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import Constants                        from "./constants";
import Utils                            from "./utils";
import requestReducer                   from "./reducers/request_reducer";
import flashReducer                     from "./reducers/flash_reducer";
import sessionReducer                   from "./reducers/session_reducer";
import AppContainer                     from "./containers/app_container";
import SignInContainer                  from "./containers/sign_in_container";

function persistStore() {
  const stringifiedState = JSON.stringify(store.getState());
  Utils.debounce(localStorage.setItem("appState", stringifiedState));
}

const defaultState = Constants.DEFAULT_STATE;
const persistedState = JSON.parse(localStorage.getItem("appState"));
const initialState = persistedState == null ? defaultState : persistedState;

const appReducer = combineReducers(
  {
    flash: flashReducer,
    request: requestReducer,
    session: sessionReducer,
    routing: routerReducer
  }
);

const logger = createLogger();
const store = createStore(appReducer, initialState, applyMiddleware(thunk, logger));
store.subscribe(persistStore);

const history = syncHistoryWithStore(hashHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={AppContainer}>
        <Route path="/sign_in" component={SignInContainer} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById("app-container")
);

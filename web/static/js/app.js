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

function persistStore() {
  const stringifiedState = JSON.stringify(store.getState());
  Utils.debounce(localStorage.setItem("appState", stringifiedState));
}

const defaultState = Constants.DEFAULT_STATE;
const persistedState = JSON.parse(localStorage.getItem("appState"));
const initialState = persistedState == null ? defaultState : persistedState;

const appReducer = combineReducers(
  {
    routing: routerReducer
  }
);

const logger = createLogger();
const store = createStore(appReducer, initialState, applyMiddleware(thunk, logger));
store.subscribe(persistStore);

const history = syncHistoryWithStore(hashHistory, store);


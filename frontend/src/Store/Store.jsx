import { createStore, combineReducers } from "redux";

import {
  currentPage,
  AddEvents,
  EditProfile,
  AddUtility,
  Comment_Box,
  showNotifications
} from "./reducers";

const reducers = combineReducers({
  currentPage,
  AddEvents,
  EditProfile,
  AddUtility,
  Comment_Box,
  showNotifications
});

const Store = createStore(reducers);

export default Store;
import { createStore, combineReducers } from "redux";

import {
  currentPage,
  AddEvents,
  EditProfile,
  AddUtility,
  Comment_Box,
  showNotifications,
  showAchievementsForm,
  newNotification
} from "./reducers";

const reducers = combineReducers({
  currentPage,
  AddEvents,
  EditProfile,
  AddUtility,
  Comment_Box,
  showNotifications,
  showAchievementsForm,
  newNotification
});

const Store = createStore(reducers);

export default Store;
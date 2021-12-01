import { createStore, combineReducers } from "redux";

import {
  currentPage,
  AddEvents,
  EditProfile,
  AddUtility,
  Comment_Box,
  showNotifications,
  showAchievementsForm,
  achievements,
  ImagesGridLength,
  loading,
  reloadUtilities,
  reloadEvents
} from "./reducers";

const reducers = combineReducers({
  currentPage,
  AddEvents,
  EditProfile,
  AddUtility,
  Comment_Box,
  showNotifications,
  showAchievementsForm,
  achievements,
  ImagesGridLength,
  loading,
  reloadUtilities,
  reloadEvents
});

const Store = createStore(reducers);

export default Store;
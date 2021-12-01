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
  ImagesGridLength
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
  ImagesGridLength
});

const Store = createStore(reducers);

export default Store;
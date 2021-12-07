import { createStore, combineReducers } from "redux";

import {
  currentPage,
  AddEvents,
  EditProfile,
  AddUtility,
  UserData,
  Comment_Box,
  showNotifications,
  showAchievementsForm,
  newNotification,
  newNotificationCount,
  achievements,
  ImagesGridLength,
  loading,
  reloadUtilities,
  reloadEvents,
  pdfFile
} from "./reducers";

const reducers = combineReducers({
  currentPage,
  AddEvents,
  EditProfile,
  AddUtility,
  UserData,
  Comment_Box,
  showNotifications,
  showAchievementsForm,
  newNotification,
  newNotificationCount,
  achievements,
  ImagesGridLength,
  loading,
  reloadUtilities,
  reloadEvents,
  pdfFile
});

const Store = createStore(reducers);

export default Store;
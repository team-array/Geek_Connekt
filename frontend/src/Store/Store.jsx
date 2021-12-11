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
  pdfFile,
  currentChatProfilePic
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
  pdfFile,
  currentChatProfilePic
});

const Store = createStore(reducers);

export default Store;
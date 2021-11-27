import { createStore, combineReducers } from "redux";

import {currentPage,AddEvents,EditProfile,AddUtility} from "./reducers";

const reducers =  combineReducers({
    currentPage,
    AddEvents,
    EditProfile,
    AddUtility
});

const Store = createStore(reducers);

export default Store;

import { createStore, combineReducers } from "redux";

import {currentPage,AddEvents,EditProfile} from "./reducers";

const reducers =  combineReducers({
    currentPage,
    AddEvents,
    EditProfile
});

const Store = createStore(reducers);

export default Store;

import { createStore, combineReducers } from "redux";

import {currentPage,AddEvents} from "./reducers";

const reducers =  combineReducers({
    currentPage: currentPage,
    AddEvents
});

const Store = createStore(reducers);

export default Store;

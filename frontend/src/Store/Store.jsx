import { createStore, combineReducers } from "redux";

import {currentPage} from "./reducers";

const reducers =  combineReducers({
    currentPage: currentPage
});

const Store = createStore(reducers);

export default Store;

import { createStore, combineReducers } from "redux";

<<<<<<< HEAD
import {currentPage} from "./reducers";

const reducers =  combineReducers({
    currentPage: currentPage
=======
import {currentPage,AddEvents} from "./reducers";

const reducers =  combineReducers({
    currentPage: currentPage,
    AddEvents
>>>>>>> 068cc4411acf7bb43d7ad522c1cafb0b04cb59fc
});

const Store = createStore(reducers);

export default Store;

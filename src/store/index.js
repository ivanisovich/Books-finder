import { configureStore, combineReducers } from "@reduxjs/toolkit";
import searchReducer from "../components/search/searchReducer";

const rootReducer = combineReducers({
  search: searchReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;

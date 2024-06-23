// Import createStore function from Redux library
import { createStore } from "redux";

// Import combined reducer from combineReducer.js file
import combineReducer from "./combineReducer"; 

// Create the Redux store by passing the combined reducer
export const store = createStore(combineReducer);

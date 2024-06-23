// Import the combineReducers function from Redux
import { combineReducers } from 'redux';

// Import the salesReducer
import salesReducer from './reducers/salesReducer';

// Combine individual reducers into a single root reducer
const combineReducer = combineReducers({
  sales: salesReducer,
});

export default combineReducer; // Export using the same name as the variable

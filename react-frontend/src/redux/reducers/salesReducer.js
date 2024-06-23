
// Import the new action types
import {
  FETCH_TODAYS_TOTAL_REVENUE_SUCCESS,
  FETCH_TODAYS_TOTAL_REVENUE_FAILURE,
  FETCH_TOTAL_REVENUE_SUCCESS,
  FETCH_TOTAL_REVENUE_FAILURE
} from '../actions/salesActions';

// Define the initial state of the sales reducer
const initialState = {
  totalRevenue: null,
  error: null,
  todaysTotalRevenue: null, // New state for today's total revenue
  todaysTotalRevenueError: null // New state for error in fetching today's total revenue
};

// The sales reducer function that updates the state based on the action type
const salesReducer = (state = initialState, action) => {
  switch (action.type) {
    // Handle the case when total revenue is successfully fetched

    case FETCH_TOTAL_REVENUE_SUCCESS:
      return {
        ...state,
        totalRevenue: action.payload,
        error: null,
      };

    // Handle the case when there is an error fetching total revenue
    case FETCH_TOTAL_REVENUE_FAILURE:
      return {
        ...state,
        totalRevenue: null,
        error: action.payload,
      };
    // Handle the case when today's total revenue is successfully fetched
    case FETCH_TODAYS_TOTAL_REVENUE_SUCCESS:
      return {
        ...state,
        todaysTotalRevenue: action.payload,
        todaysTotalRevenueError: null,
      };
    // Handle the case when there is an error fetching today's total revenue
    case FETCH_TODAYS_TOTAL_REVENUE_FAILURE:
      return {
        ...state,
        todaysTotalRevenue: null,
        todaysTotalRevenueError: action.payload,
      };

    // Return the current state if the action type does not match any cases
    default:
      return state;
  }
};

// Export the sales reducer as the default export
export default salesReducer;

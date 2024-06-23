
// Existing action types
export const FETCH_TOTAL_REVENUE_SUCCESS = 'FETCH_TOTAL_REVENUE_SUCCESS';
export const FETCH_TOTAL_REVENUE_FAILURE = 'FETCH_TOTAL_REVENUE_FAILURE';

// New action type for fetching today's total revenue
export const FETCH_TODAYS_TOTAL_REVENUE_SUCCESS = 'FETCH_TODAYS_TOTAL_REVENUE_SUCCESS';
export const FETCH_TODAYS_TOTAL_REVENUE_FAILURE = 'FETCH_TODAYS_TOTAL_REVENUE_FAILURE';

// Action creator for successful total revenue fetch
export const fetchTotalRevenueSuccess = (totalRevenue) => ({
  type: FETCH_TOTAL_REVENUE_SUCCESS,
  payload: totalRevenue,
});

// Action creator for failed total revenue fetch
export const fetchTotalRevenueFailure = (error) => ({
  type: FETCH_TOTAL_REVENUE_FAILURE,
  payload: error,
});

// Action creators for fetching today's total revenue
export const fetchTodaysTotalRevenueSuccess = (totalRevenue) => ({
  type: FETCH_TODAYS_TOTAL_REVENUE_SUCCESS,
  payload: totalRevenue,
});

// Action creator for failed today's total revenue fetch
export const fetchTodaysTotalRevenueFailure = (error) => ({
  type: FETCH_TODAYS_TOTAL_REVENUE_FAILURE,
  payload: error,
});

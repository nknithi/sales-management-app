// Import statements
import React, { useEffect } from 'react';

// Importing CSS file for styling
import './App.css';
import { API_BASE_URL } from './config' // Importing API base URL from configuration

// Redux imports for state management
import { useSelector, useDispatch } from 'react-redux';
import { fetchTotalRevenueSuccess, fetchTotalRevenueFailure } from './redux/actions/salesActions';
import axios from 'axios'; // Importing axios for making HTTP requests

function Totalrevenue() {
  const totalRevenue = useSelector(state => state.sales.totalRevenue); // Selecting totalRevenue from Redux store state
  const dispatch = useDispatch(); // Redux dispatch function for triggering actions

  // Effect to fetch today's total revenue from the server
  useEffect(() => {
    const fetchData = async () => {
      try {

        // Configuration object for API request, including Authorization header with JWT token
        const CONFIG_OBJ = {
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
          }
        };

        // Fetch today's total revenue from the API
        const response = await axios.get(`${API_BASE_URL}/todaystotalrevenue`, CONFIG_OBJ);

        // Dispatching action to update Redux store with fetched total revenue
        dispatch(fetchTotalRevenueSuccess(response.data.totalRevenue));
      } catch (error) {

        // Dispatching action to handle failure in fetching total revenue
        dispatch(fetchTotalRevenueFailure(error.message));
      }
    };

    // Calling fetchData function when component mounts
    fetchData();
  }, [dispatch]); // Dependency array ensures effect runs only once on component mount

  // JSX structure for rendering today's total revenue
  return (
    <div className="container pt-5 pb-5 ps-3 pe-3 mt-lg-5">
      <div className="row">
        <div className="col-lg-6 col-md-9 col-sm-10 mx-auto">
          <div className="p-4 shadow bg-light mt-3 rounded">
            <h3 className="text-center">Today's Total Revenue: {totalRevenue}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Totalrevenue;

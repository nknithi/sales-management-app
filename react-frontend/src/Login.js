
// Import statements
import React, { useState } from 'react';
import './App.css';
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';

import axios from 'axios'
import { API_BASE_URL } from './config'
import Swal from 'sweetalert2'


function Login() {

  // State variables for email, password, and loading state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  // Redux hook for dispatching actions
  const dispatch = useDispatch();

  // React Router hook for navigation
  const navigate = useNavigate();

  // Function to handle form submission for login
  const login = (event) => {
    event.preventDefault();
    setLoading(true);

    // Prepare data to send in the login request
    const requestData = { email, password }

    // Sending login request to server
    axios.post(`${API_BASE_URL}/login`, requestData)
      .then((result) => {

        // Handle successful login response
        if (result.status === 200) {
          setLoading(false);

          // Storing token and user data in local storage
          localStorage.setItem("token", result.data.result.token);
          localStorage.setItem('user', JSON.stringify(result.data.result.user));

          // Dispatching login success action to Redux store
          dispatch({ type: 'LOGIN_SUCCESS', payload: result.data.result.user });
          setLoading(false);

          // Showing success message using SweetAlert
          Swal.fire({
            icon: 'success',
            title: 'User successfully logged in'
          }).then(() => {

            // Redirecting to the addsales page after successful login
            navigate('/addsales');

            window.location.reload(); // Refresh the page
          })





        }
      })
      .catch((error) => {
        // Handle login failure or error


        console.log(error);
        setLoading(false);

        // Displaying error message using SweetAlert based on server response
        Swal.fire({
          icon: 'error',
          title: error.response.data.error
        })
      })
  }

  return (

    <div className="container pt-5 pb-5 ps-3 pe-3 mt-lg-5 ">




      <div className="row">
        <div className="col-lg-6 col-md-9 col-sm-10 mx-auto">

          <form className=" p-4   shadow bg-light mt-3 rounded" onSubmit={(e) => login(e)}>
            <h3 className="text-center">Login </h3>

            {/* Loading spinner */}
            {loading && (
              <div className="text-center">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            )}

            {/* Input field for email */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label fw-bold ">Email: </label>
              <input type="email" className="form-control" id="email" value={email} onChange={(ev) => setEmail(ev.target.value)}
                required placeholder="Enter your email" />
            </div>

            {/* Input field for password */}
            <div className="mb-3">
              <label htmlFor="password" className="form-label fw-bold">Password:</label>
              <input type="password" id="password" value={password}
                onChange={(ev) => setPassword(ev.target.value)}
                required className="form-control" placeholder="Enter your password" />

            </div>


            {/* Submit button */}
            <div className="mb-3">

              <button className="btn bg-primary btn-block w-100 fw-bold  mb-2 p-2 mt-3 text-light" type="submit">Login</button>
            </div>



          </form>

        </div>
      </div>






    </div>

  );
}


export default Login;

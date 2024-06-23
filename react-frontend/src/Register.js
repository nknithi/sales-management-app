
import React, { useState, } from 'react';
import './App.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { API_BASE_URL } from './config'
import Swal from 'sweetalert2'


// Component for user registration form
function Register() {
  const navigate = useNavigate();

  // State variables for form fields and loading state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);

  // Function to handle form submission
  const signup = (event) => {

    // Prevent default form submission behavior
    event.preventDefault();

    // Set loading state to true to display spinner
    setLoading(true);

    // Prepare data object to send in POST request
    const requestData = { firstName, lastName, email, password };

    // POST request to server API for user registration
    axios
      .post(`${API_BASE_URL}/signup`, requestData)
      .then((result) => {
        setLoading(false); // Set loading state to false after successful response

        // Handle successful registration with status code 201
        if (result.status === 201) {

          // Show success message using SweetAlert2
          Swal.fire({
            icon: 'success',
            title: 'User successfully registered',
          }).then(() => {
            navigate('/login'); // Navigate to login page after success
          });

          // Clear form fields after successful registration
          setFirstName('');
          setLastName('');
          setEmail('');
          setPassword('');
        }
      })
      .catch((error) => {
        setLoading(false); // Set loading state to false in case of error

        // Handle different types of errors from API response
        if (error.response) {
          if (error.response.status === 400) {

            // Handle validation errors
            Swal.fire({
              icon: 'error',
              title: 'Validation Error',
              text: error.response.data.error,
            });
          } else if (error.response.status === 500 && error.response.data.error.includes('already registered')) {

            // Handle specific error: user with email already registered
            Swal.fire({
              icon: 'error',
              title: 'Registration Failed',
              text: 'User with this email is already registered.',
            });
          } else {

            // Handle unexpected server errors
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Unexpected error occurred. Please try again later.',
            });
          }
        } else if (error.request) {

          // Handle network errors
          Swal.fire({
            icon: 'error',
            title: 'Network Error',
            text: 'Failed to reach the server. Please check your network connection.',
          });
        } else {

          // Handle other errors
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Unexpected error occurred. Please try again later.',
          });
        }
        console.error('Error during signup:', error);
      });
  };

  // JSX structure for user registration form
  return (
    <div className="container pt-5 pb-5 ps-3 pe-3 mt-lg-5 ">
      <div className="row">
        <div className="col-lg-6 col-md-9 col-sm-10 mx-auto">
          <form className="p-4 shadow bg-light mt-3 rounded" onSubmit={(e) => signup(e)}>
            <h3 className="text-center">Register</h3>


            {/* Display loading spinner when loading state is true */}
            {loading && (
              <div className="text-center">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            )}

            {/* Input fields for first name */}
            <div className="mb-3">
              <label htmlFor="firstName" className="form-label fw-bold">First Name:</label>
              <input type="text" className="form-control" id="firstName" value={firstName}
                onChange={(ev) => setFirstName(ev.target.value)} required placeholder="Enter your first name" />
            </div>

            {/* Input fields for last name */}
            <div className="mb-3">
              <label htmlFor="lastName" className="form-label fw-bold">Last Name:</label>
              <input type="text" className="form-control" id="lastName" value={lastName}
                onChange={(ev) => setLastName(ev.target.value)} required placeholder="Enter your last name" />
            </div>

            {/* Input fields for email */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label fw-bold">Email:</label>
              <input type="email" className="form-control" id="email" value={email}
                onChange={(ev) => setEmail(ev.target.value)} required placeholder="Enter your email" />
            </div>

            {/* Input fields for password */}
            <div className="mb-3">
              <label htmlFor="password" className="form-label fw-bold">Password:</label>
              <input type="password" className="form-control" id="password" value={password}
                onChange={(ev) => setPassword(ev.target.value)} required placeholder="Enter your password" />
            </div>

            {/* Submit button */}
            <div className="mb-3">
              <button className="btn bg-primary btn-block w-100 fw-bold mb-2 p-2 mt-3 text-light" type="submit">Register</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;

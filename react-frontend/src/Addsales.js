// Import statements
import React, { useState } from 'react';
import './App.css';
import { API_BASE_URL } from './config'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'

function AddSales() {

  // State for product name input
  const [productName, setProductName] = useState('');

  // State for quantity input
  const [quantity, setQuantity] = useState('');

  // State for price input
  const [price, setPrice] = useState('');

  // State for loading spinner
  const [loading, setLoading] = useState(false);

  // Navigation hook for redirecting
  const navigate = useNavigate();

  // Configuration object for HTTP headers, including JWT token for authorization
  const CONFIG_OBJ = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem("token")
    }
  }

  // Function to handle form submission
  const addSale = async (e) => {
    e.preventDefault();

    // Basic form validation using SweetAlert
    if (productName === '') {
      Swal.fire({
        icon: 'error',
        title: 'Product Name is mandatory!'
      })
    } else if (quantity === '') {
      Swal.fire({
        icon: 'error',
        title: 'Quantity is mandatory!'
      })
    } else if (price === '') {
      Swal.fire({
        icon: 'error',
        title: 'Price is mandatory!'
      })

    } else {
      setLoading(true); // Set loading state to true during API call
      const request = { productName: productName, quantity: quantity, price: price }

      // API call to add sales entry
      const postResponse = await axios.post(`${API_BASE_URL}/addsale`, request, CONFIG_OBJ)
      setLoading(false);

      // Handling response based on HTTP status code
      if (postResponse.status === 201) {
        Swal.fire({
          icon: 'success',
          title: 'Sales Added Sucessfulyy!!'
        })

        // Redirect to /addsales route on successful addition
        navigate("/addsales")
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Some error occurred while adding sales'
        })
      }
    }
  }

  // JSX structure for rendering the form
  return (
    <div className="container pt-5 pb-5 ps-3 pe-3 mt-lg-5 ">
      <div className="row">
        <div className="col-lg-6 col-md-9 col-sm-10 mx-auto">
          <form className="p-4 shadow bg-light mt-3 rounded" onSubmit={addSale}>
            <h3 className="text-center ">Add Sale Entry</h3>


            {/* Conditional rendering of loading spinner */}
            {loading && (
              <div className="text-center">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            )}


            {/* Form inputs for productName, quantity, and price */}
            <div className="mb-3">
              <label htmlFor="productName" className="form-label fw-bold">Product Name:</label>
              <input type="text" className="form-control" id="productName" value={productName}
                onChange={(e) => setProductName(e.target.value)} required placeholder="Enter product name" />
            </div>

            <div className="mb-3">
              <label htmlFor="quantity" className="form-label fw-bold">Quantity:</label>
              <input type="number" className="form-control" id="quantity" value={quantity}
                onChange={(e) => setQuantity(e.target.value)} required placeholder="Enter quantity" />
            </div>

            <div className="mb-3">
              <label htmlFor="price" className="form-label fw-bold">Price:</label>
              <input type="number" step="0.01" className="form-control" id="price" value={price}
                onChange={(e) => setPrice(e.target.value)} required placeholder="Enter price" />
            </div>

            {/* Submit button for adding sale */}
            <div className="mb-3">
              <button className="btn bg-primary btn-block w-100 fw-bold mb-2 p-2 mt-3 text-light" type="submit">Add Sale</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// Exporting AddSales component as default
export default AddSales;

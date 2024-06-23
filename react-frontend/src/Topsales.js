// Import statements
import './App.css';
import { API_BASE_URL } from './config'
import axios from 'axios';
import Swal from 'sweetalert2'
import React, { useState, useEffect } from 'react'

function Topsales() {

  // State variables for storing sales data
  const [allSales, setAllSales] = useState([]);
  const [top5SalesToday, settop5SalesToday] = useState([]);

  // Configuration object for API requests, including Authorization header with JWT token
  const CONFIG_OBJ = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem("token")
    }
  }

  // Function to fetch all sales entries from the server
  const getAllSales = async () => {
    const response = await axios.get(`${API_BASE_URL}/allsales`, CONFIG_OBJ);

    if (response.status === 200) {
      setAllSales(response.data.salesEntries); // Update state with fetched sales data
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Some error occurred while getting all your posts'
      })
    }
  }

  // Function to filter and retrieve top 5 sales entries for today
  const gettop5SalesToday = () => {

    // Get today's date and define start and end of day
    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

    // Filter sales entries for today
    const salesForToday = allSales.filter(sale => {
      const saleDate = new Date(sale.createdAt);
      return saleDate >= startOfDay && saleDate < endOfDay;
    });

    // Sort and select top 5 sales for today
    const sortedSales = salesForToday.slice().sort((a, b) => {
      const totalAmountA = a.quantity * a.price;
      const totalAmountB = b.quantity * b.price;
      return totalAmountB - totalAmountA;
    });
    const top5 = sortedSales.slice(0, 5);
    settop5SalesToday(top5); // Update state with top 5 sales entries for today
  };

  // Effect to fetch all sales entries when component mounts
  useEffect(() => {
    getAllSales();
  }, []);

  useEffect(() => {
    gettop5SalesToday();
  }, [allSales]);


  // JSX structure for rendering top 5 sales table
  return (
    <div className="container pt-5 pb-5 ps-3 pe-3 mt-lg-5">
      <div className="row">
        <div className="col-lg-12 bg-light p-lg-4 p-md-2 p-sm-2 rounded">

          {/* Title */}
          <h3 className="text-center mb-4">Top 5 Sales</h3>

          {/* Table displaying top 5 sales entries */}
          <table className="table table-bordered blue-stripes rounded">
            <thead>
              <tr>
                <th>#</th>
                <th>Sales ID</th>
                <th>Product Name</th>
                <th>Qty</th>

                <th>Total Amount</th>
              </tr>
            </thead>
            <tbody>

              {/* Mapping over top5SalesToday array to populate table rows */}
              {top5SalesToday && top5SalesToday.map((sale, index) => (
                <tr key={sale._id}>
                  <td>{index + 1}</td>
                  <td>{`SS${sale._id.substring(0, 3)}${index + 1}`}</td>
                  <td>{sale.productName}</td>
                  <td>{sale.quantity}</td>
                  <td>{sale.quantity * sale.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>

  );
}

export default Topsales;

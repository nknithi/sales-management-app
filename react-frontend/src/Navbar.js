// Import statements
import React from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import LogoutModal from './LogoutModal';

const Navbar = ({ isLoggedIn, handleLogout }) => {
  // State to control visibility of the logout modal
  const [showModal, setShowModal] = React.useState(false);

  // Function to open the logout modal
  const openModal = () => setShowModal(true);

  // Function to close the logout modal
  const closeModal = () => setShowModal(false);

  // Function to confirm logout action
  const confirmLogout = () => {

    // Call the handleLogout function passed as props
    handleLogout();

    // Show success notification using SweetAlert2
    Swal.fire({
      icon: 'success',
      title: 'Logged out successfully!',
      showConfirmButton: false,
      timer: 1500,
    }).then(() => {
      window.location.href = '/login'; // Redirect to login page after logout
    });

    // Close the logout modal after confirmation
    closeModal();
  };

  return (
    <nav className="navbar navbar-expand-lg bg-primary navbar-dark shadow">
      <div className="container-fluid">

        {/* Brand logo/link */}
        <Link className="navbar-brand" to={isLoggedIn ? '/' : '/login'} title="Home">
          SALES APP
        </Link>

        {/* Navbar toggler button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar links container */}
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">

            {/* Add Sales link */}
            <li className="nav-item">
              <Link
                className={`nav-link ${!isLoggedIn ? 'disabled' : ''}`}
                to="/addsales"
                tabIndex={isLoggedIn ? '0' : '-1'}
                aria-disabled={!isLoggedIn}
              >
                ADD SALES
              </Link>
            </li>

            {/* Today's Top 5 Sales link */}
            <li className="nav-item">
              <Link
                className={`nav-link ${!isLoggedIn ? 'disabled' : ''}`}
                to="/topsales"
                tabIndex={isLoggedIn ? '0' : '-1'}
                aria-disabled={!isLoggedIn}
              >
                TODAY'S TOP 5 SALES
              </Link>
            </li>

            {/* Today's Total Revenue link */}
            <li className="nav-item">
              <Link
                className={`nav-link ${!isLoggedIn ? 'disabled' : ''}`}
                to="/totalrevenue"
                tabIndex={isLoggedIn ? '0' : '-1'}
                aria-disabled={!isLoggedIn}
              >
                TODAY'S TOTAL REVENUE
              </Link>
            </li>

            {/* Login link */}
            <li className="nav-item">
              <Link className="nav-link" to="/login" tabIndex={isLoggedIn ? '-1' : '0'} aria-disabled={isLoggedIn}>
                LOGIN
              </Link>
            </li>

            {/* Register link */}
            <li className="nav-item">
              <Link className="nav-link" to="/register" tabIndex={isLoggedIn ? '-1' : '0'} aria-disabled={isLoggedIn}>
                REGISTER
              </Link>
            </li>

            {/* Logout link */}
            <li className="nav-item">
              <Link
                className={`nav-link ${!isLoggedIn ? 'disabled' : ''}`}
                to="#"
                onClick={isLoggedIn ? openModal : null}
                tabIndex={isLoggedIn ? '0' : '-1'}
                aria-disabled={!isLoggedIn}
              >
                LOGOUT
              </Link>
            </li>
          </ul>
        </div>
      </div>
      {/* Logout Modal */}
      <LogoutModal show={showModal} onHide={closeModal} onConfirm={confirmLogout} />
    </nav>
  );
};

export default Navbar;

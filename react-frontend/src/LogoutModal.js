// LogoutModal.js
import React from 'react';
import { Modal, Button } from 'react-bootstrap';

// Modal component for logout confirmation
const LogoutModal = ({ show, onHide, onConfirm }) => {

  // Renders modal dialog with "Logout" title, logout confirmation message, and buttons for cancel and logout
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Logout</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to logout?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={onConfirm}>
          Logout
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LogoutModal;

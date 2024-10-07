import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./DisplayUser.css"; 

function DisplayUser(props) {
  const { _id, name, userName, password, contactNumber, address, role, email, salary,
    total_salary_with_OT } = props.user;

  const navigate = useNavigate();

  const deleteHandler = async () => {
    try {
      await axios.delete(`http://localhost:3001/users/${_id}`);
      // Call the function to refresh the user list
      if (props.refreshUsers) props.refreshUsers();
      navigate("/"); // Navigate to the home page or wherever you want
    } catch (error) {
      console.error("Error deleting user:", error);
      // Optionally, show an alert or a message to the user
    }
  };

  return (
    <div className="container">
      <h2 className="heading">Employee Details</h2>
      <p className="detail"><strong>Id:</strong> {_id}</p>
      <p className="detail"><strong>Name:</strong> {name}</p>
      <p className="detail"><strong>Username:</strong> {userName}</p>
      <p className="detail"><strong>Email:</strong> {email}</p>
      <p className="detail"><strong>Contact Number:</strong> {contactNumber}</p>
      <p className="detail"><strong>Address:</strong> {address}</p>
      <p className="detail"><strong>Role:</strong> {role}</p>
      <p className="detail"><strong>Salary:</strong> ${salary}</p>
      <p className="detail"><strong>Total Slary , with OT:</strong> ${ total_salary_with_OT}</p>

      <div className="button-group">
        <button className="button delete-button" onClick={deleteHandler}>Delete</button>
        <Link to={`/UpdateUser/${_id}`}>
          <button className="button update-button">Update</button>
        </Link>
      </div>
    </div>
  );
}

export default DisplayUser;

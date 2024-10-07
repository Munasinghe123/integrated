// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import './UpdateUser.css'; // Import the CSS file

// function UpdateUser() {
//   const [inputs, setInputs] = useState({});
//   const navigate = useNavigate(); // Changed to navigate
//   const id = useParams().id;

//   useEffect(() => {
//     const fetchHandler = async () => {
//       await axios
//         .get(`http://localhost:3001/users/${id}`)
//         .then((res) => res.data)
//         .then((data) => setInputs(data.user));
//     };
//     fetchHandler();
//   }, [id]);

//   const sendRequest = async () => {
//     await axios
//       .put(`http://localhost:3001/users/${id}`, {
//         name: String(inputs.name),
//         userName: String(inputs.userName),
//         password: String(inputs.password),
//         contactNumber: Number(inputs.contactNumber),
//         address: String(inputs.address),
//         role: String(inputs.role),
//         email: String(inputs.email),
//         salary: Number(inputs.salary),
//       })
//       .then((res) => res.data);
//   };

//   const handleChange = (e) => {
//     setInputs((prevState) => ({
//       ...prevState,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(inputs);
//     sendRequest().then(() => navigate("/user/userDetails"));
//   };

//   const handleBack = () => {
//     navigate("/user/userDetails");
//   };

//   return (
//     <div className="update-user-container">
//       <h1>Update User</h1>

//       <form onSubmit={handleSubmit} className="update-user-form">
//         <label>Name</label>
//         <input
//           type="text"
//           name="name"
//           onChange={handleChange}
//           value={inputs.name || ""}
//           required
//         />

//         <label>Username</label>
//         <input
//           type="text"
//           name="userName"
//           onChange={handleChange}
//           value={inputs.userName || ""}
//           required
//         />

//         <label>Password</label>
//         <input
//           type="password"
//           name="password"
//           onChange={handleChange}
//           value={inputs.password || ""}
//           required
//         />

//         <label>Contact Number</label>
//         <input
//           type="number"
//           name="contactNumber"
//           onChange={handleChange}
//           value={inputs.contactNumber || ""}
//           required
//         />

//         <label>Address</label>
//         <input
//           type="text"
//           name="address"
//           onChange={handleChange}
//           value={inputs.address || ""}
//           required
//         />

//         <label>Role</label>
//         <input
//           type="text"
//           name="role"
//           onChange={handleChange}
//           value={inputs.role || ""}
//           required
//         />

//         <label>Email</label>
//         <input
//           type="email"
//           name="email"
//           onChange={handleChange}
//           value={inputs.email || ""}
//         />

//         <label>Salary</label>
//         <input
//           type="number"
//           name="salary"
//           onChange={handleChange}
//           value={inputs.salary || ""}
//         />

//         <div className="update-user-buttons">
//           <button type="button" className="back-button" onClick={handleBack}>
//             Back
//           </button>
//           <button type="submit" className="submit-button">
//             Submit
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default UpdateUser;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import './UpdateUser.css'; // Import the CSS file

// function UpdateUser() {
//   const [inputs, setInputs] = useState({});
//   const navigate = useNavigate(); // Changed to navigate
//   const id = useParams().id;

//   useEffect(() => {
//     const fetchHandler = async () => {
//       await axios
//         .get(`http://localhost:3001/users/${id}`)
//         .then((res) => res.data)
//         .then((data) => setInputs(data.user));
//     };
//     fetchHandler();
//   }, [id]);

//   const sendRequest = async () => {
//     await axios
//       .put(`http://localhost:3001/users/${id}`, {
//         name: String(inputs.name),
//         userName: String(inputs.userName),
//         password: String(inputs.password),
//         contactNumber: Number(inputs.contactNumber),
//         address: String(inputs.address),
//         role: String(inputs.role),
//         email: String(inputs.email),
//         salary: Number(inputs.salary),
//       })
//       .then((res) => res.data);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     // Validation based on the field
//     switch (name) {
//       case "name":
//       case "userName":
//       case "role":
//         // Allow only letters
//         if (/^[A-Za-z\s]*$/.test(value) || value === "") {
//           setInputs((prevState) => ({
//             ...prevState,
//             [name]: value,
//           }));
//         }
//         break;

//       case "contactNumber":
//       case "salary":
//         // Allow only numbers
//         if (/^[0-9]*$/.test(value) || value === "") {
//           setInputs((prevState) => ({
//             ...prevState,
//             [name]: value,
//           }));
//         }
//         break;

//       case "email":
//         // Allow all characters for typing
//         setInputs((prevState) => ({
//           ...prevState,
//           [name]: value,
//         }));
//         break;

//       default:
//         setInputs((prevState) => ({
//           ...prevState,
//           [name]: value,
//         }));
//         break;
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Validate email format before proceeding
//     if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(inputs.email)) {
//       alert("Please enter a valid email address.");
//       return;
//     }

//     console.log(inputs);
//     sendRequest().then(() => navigate("/user/userDetails"));
//   };

//   const handleBack = () => {
//     navigate("/user/userDetails");
//   };

//   return (
//     <div className="update-user-container">
//       <h1>Update User</h1>

//       <form onSubmit={handleSubmit} className="update-user-form">
//         <label>Name</label>
//         <input
//           type="text"
//           name="name"
//           onChange={handleChange}
//           value={inputs.name || ""}
//           required
//         />

//         <label>Username</label>
//         <input
//           type="text"
//           name="userName"
//           onChange={handleChange}
//           value={inputs.userName || ""}
//           required
//         />

//         <label>Password</label>
//         <input
//           type="password"
//           name="password"
//           onChange={handleChange}
//           value={inputs.password || ""}
//           required
//         />

//         <label>Contact Number</label>
//         <input
//           type="text"  // Change to text to control input manually
//           name="contactNumber"
//           onChange={handleChange}
//           value={inputs.contactNumber || ""}
//           required
//         />

//         <label>Address</label>
//         <input
//           type="text"
//           name="address"
//           onChange={handleChange}
//           value={inputs.address || ""}
//           required
//         />

//         <label>Role</label>
//         <input
//           type="text"
//           name="role"
//           onChange={handleChange}
//           value={inputs.role || ""}
//           required
//         />

//         <label>Email</label>
//         <input
//           type="email"
//           name="email"
//           onChange={handleChange}
//           value={inputs.email || ""}
//           required
//         />

//         <label>Salary</label>
//         <input
//           type="text"  // Change to text to control input manually
//           name="salary"
//           onChange={handleChange}
//           value={inputs.salary || ""}
//         />

//         <div className="update-user-buttons">
//           <button type="button" className="back-button" onClick={handleBack}>
//             Back
//           </button>
//           <button type="submit" className="submit-button">
//             Submit
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default UpdateUser;


import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import './UpdateUser.css'; // Import the CSS file

function UpdateUser() {
  const [inputs, setInputs] = useState({});
  const navigate = useNavigate(); 
  const id = useParams().id;

  useEffect(() => {
    const fetchHandler = async () => {
      await axios
        .get(`http://localhost:3001/users/${id}`)
        .then((res) => res.data)
        .then((data) => setInputs(data.user));
    };
    fetchHandler();
  }, [id]);

  const sendRequest = async () => {
    await axios
      .put(`http://localhost:3001/users/${id}`, {
        name: String(inputs.name),
        userName: String(inputs.userName),
        password: String(inputs.password),
        contactNumber: Number(inputs.contactNumber),
        address: String(inputs.address),
        role: String(inputs.role),
        email: String(inputs.email),
        salary: Number(inputs.salary),
      })
      .then((res) => res.data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validation based on the field
    switch (name) {
      case "name":
      case "userName":
      case "role":
        // Allow only letters
        if (/^[A-Za-z\s]*$/.test(value) || value === "") {
          setInputs((prevState) => ({
            ...prevState,
            [name]: value,
          }));
        }
        break;

      case "contactNumber":
        // Allow only numbers and ensure exactly 10 digits
        if (/^\d{0,10}$/.test(value)) {
          setInputs((prevState) => ({
            ...prevState,
            [name]: value,
          }));
        }
        break;

      case "salary":
        // Allow only numbers
        if (/^[0-9]*$/.test(value) || value === "") {
          setInputs((prevState) => ({
            ...prevState,
            [name]: value,
          }));
        }
        break;

      case "email":
        // Allow all characters for typing
        setInputs((prevState) => ({
          ...prevState,
          [name]: value,
        }));
        break;

      default:
        setInputs((prevState) => ({
          ...prevState,
          [name]: value,
        }));
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate email format before proceeding
    if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(inputs.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    // Validate contact number length
    if (inputs.contactNumber.length !== 10) {
      alert("Contact number must be exactly 10 digits.");
      return;
    }

    console.log(inputs);
    sendRequest().then(() => navigate("/user/userDetails"));
  };

  const handleBack = () => {
    navigate("/user/userDetails");
  };

  return (
    <div className="update-user-container">
      <h1>Update Employee</h1>

      <form onSubmit={handleSubmit} className="update-user-form">
        <label>Name</label>
        <input
          type="text"
          name="name"
          onChange={handleChange}
          value={inputs.name || ""}
          required
        />

        <label>Username</label>
        <input
          type="text"
          name="userName"
          onChange={handleChange}
          value={inputs.userName || ""}
          required
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          onChange={handleChange}
          value={inputs.password || ""}
          required
        />

        <label>Contact Number</label>
        <input
          type="text"  // Change to text to control input manually
          name="contactNumber"
          onChange={handleChange}
          value={inputs.contactNumber || ""}
          required
        />

        <label>Address</label>
        <input
          type="text"
          name="address"
          onChange={handleChange}
          value={inputs.address || ""}
          required
        />

        <label>Role</label>
        <input
          type="text"
          name="role"
          onChange={handleChange}
          value={inputs.role || ""}
          required
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          onChange={handleChange}
          value={inputs.email || ""}
          required
        />

        <label>Salary</label>
        <input
          type="text"  // Change to text to control input manually
          name="salary"
          onChange={handleChange}
          value={inputs.salary || ""}
        />

        <div className="update-user-buttons">
          <button type="button" className="back-button" onClick={handleBack}>
            Back
          </button>
          <button type="submit" className="submit-button">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateUser;

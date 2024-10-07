// import React, { useEffect, useState, useRef } from "react";
// import axios from "axios";
// import DisplayUser from "../DisplayUser/DisplayUser";
// import { useReactToPrint } from "react-to-print";
// import './UserDetails.css'; 

// const URL = "http://localhost:3001/users";

// const fetchHandler = async () => {
//   return await axios.get(URL).then((res) => res.data);
// };

// export default function UserDetails() {
//   const [users, setUsers] = useState([]);
//   const [filteredUsers, setFilteredUsers] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [noResults, setNoResults] = useState(false);
//   const componentsRef = useRef();

//   useEffect(() => {
//     fetchHandler().then((data) => {
//       const usersList = data.users || data;
//       setUsers(usersList);
//       setFilteredUsers(usersList);
//     });
//   }, []);

//   // Update the filtered users as the search query changes
//   useEffect(() => {
//     const filtered = users.filter((user) =>
//       Object.values(user).some((field) =>
//         field.toString().toLowerCase().includes(searchQuery.toLowerCase())
//       )
//     );

//     setFilteredUsers(filtered);
//     setNoResults(filtered.length === 0);
//   }, [searchQuery, users]);

//   //report generation
//   const handlePrint = useReactToPrint({
//     content: () => componentsRef.current,
//     documentTitle: "Users Report",
//     onAfterPrint: () => alert("Users report successfully downloaded"),
//   });

//   return (
//     <div className="user-details-container">
//       <div className="search-container">
//         <input
//           onChange={(e) => setSearchQuery(e.target.value)}
//           type="text"
//           name="search"
//           placeholder="Search users"
//           value={searchQuery}
//         />
       
//       </div>

//       {noResults ? (
//         <div className="no-results">
//           <p>No users found</p>
//         </div>
//       ) : (
//         <div className="user-list" ref={componentsRef}>
//           {filteredUsers.map((user) => (
//             <div key={user._id}>
//               <DisplayUser user={user} />
//             </div>
//           ))}
//         </div>
//       )}

//       <button className="download-button" onClick={handlePrint}>Download Report</button>
//     </div>
//   );
// }

// import React, { useEffect, useState, useRef } from "react";
// import axios from "axios";
// import DisplayUser from "../DisplayUser/DisplayUser";
// import { useReactToPrint } from "react-to-print";
// import './UserDetails.css'; 

// const URL = "http://localhost:3001/users";

// const fetchHandler = async () => {
//   return await axios.get(URL).then((res) => res.data);
// };

// export default function UserDetails() {
//   const [users, setUsers] = useState([]);
//   const [filteredUsers, setFilteredUsers] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [noResults, setNoResults] = useState(false);
//   const componentsRef = useRef();

//   useEffect(() => {
//     fetchHandler().then((data) => {
//       const usersList = data.users || data;
//       setUsers(usersList);
//       setFilteredUsers(usersList);
//     });
//   }, []);

//   // Update the filtered users as the search query changes
//   useEffect(() => {
//     const filtered = users.filter((user) =>
//       user.name.toLowerCase().includes(searchQuery.toLowerCase()) // Filter by name only
//     );

//     setFilteredUsers(filtered);
//     setNoResults(filtered.length === 0);
//   }, [searchQuery, users]);

//   // Report generation
//   const handlePrint = useReactToPrint({
//     content: () => componentsRef.current,
//     documentTitle: "Users Report",
//     onAfterPrint: () => alert("Users report successfully downloaded"),
//   });

 
//   return (
//     <div className="user-details-container">
//       <div className="search-container">

//         {/* search bar */}
//         <input
//           onChange={(e) => setSearchQuery(e.target.value)}
//           type="text"
//           name="search"
//           placeholder="Search employees by name"
//           value={searchQuery}
//         />
//       </div>

//       {noResults ? (
//         <div className="no-results">
//           <p>No employees found</p>
//         </div>
//       ) : (
//         <div className="user-list" ref={componentsRef}>
//           {filteredUsers.map((user) => (
//             <div key={user._id}>
//               <DisplayUser user={user} />
//             </div>
//           ))}
//         </div>
//       )}

//       <button className="download-button" onClick={handlePrint}>Download Report</button>
//     </div>
//   );
// }

import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import DisplayUser from "../DisplayUser/DisplayUser";
import { useReactToPrint } from "react-to-print";
import './UserDetails.css'; 

const URL = "http://localhost:3001/users";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

export default function UserDetails() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);
  const componentsRef = useRef();

  useEffect(() => {
    fetchHandler().then((data) => {
      const usersList = data.users || data;
      setUsers(usersList);
      setFilteredUsers(usersList);
    });
  }, []);

  // Update the filtered users as the search query changes
  useEffect(() => {
    const filtered = users.filter((user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) // Filter by name only
    );

    setFilteredUsers(filtered);
    setNoResults(filtered.length === 0);
  }, [searchQuery, users]);

  // Report generation
  const handlePrint = useReactToPrint({
    content: () => componentsRef.current,
    documentTitle: "Users Report",
    onAfterPrint: () => alert("Users report successfully downloaded"),
  });

  // WhatsApp Message functionality
  const sendWhatsAppMessage = () => {
    const phoneNumber = "+94726221723"; //  number

    // Format the user data as a readable string
    const formattedData = filteredUsers.map(user => (
      `Name: ${user.name}\n` +
      `Username: ${user.username}\n` +
      `Password: ${user.password}\n` +
      `Contact Number: ${user.contactNumber}\n` +
      `Address: ${user.address}\n` +
      `Role: ${user.role}\n` +
      `Email: ${user.email}\n` +
      `Salary: ${user.salary}\n\n`
    )).join(""); // Join all users' data into one string

    const message = `User Report:\n\n${formattedData}`;

    // WhatsApp API URL with the formatted message
    const whatsAppUrl = `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;

    // Open WhatsApp in a new window
    window.open(whatsAppUrl, "_blank");
  };

  return (
    <div className="user-details-container">
      <div className="search-container">

        {/* Search bar */}
        <input
          onChange={(e) => setSearchQuery(e.target.value)}
          type="text"
          name="search"
          placeholder="Search employees by name"
          value={searchQuery}
        />
      </div>

      {noResults ? (
        <div className="no-results">
          <p>No employees found</p>
        </div>
      ) : (
        <div className="user-list" ref={componentsRef}>
          {filteredUsers.map((user) => (
            <div key={user._id}>
              <DisplayUser user={user} />
            </div>
          ))}
        </div>
      )}

      {/* Buttons */}
      <button className="download-button" onClick={handlePrint}>Download Report</button>
      <br /><br />
      <button className="whatsapp-button" onClick={sendWhatsAppMessage}>Send Report via WhatsApp</button>
    </div>
  );
}

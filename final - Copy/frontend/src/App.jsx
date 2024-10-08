import React, { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import AdminPromotion from "./promo/AdminPromotion.jsx";
import DisplayPromotion from "./promo/DisplayPromotion.jsx";
import AddPromotion from "./promo/AddPromotion.jsx";
import UpdatePromotion from "./promo/UpdatePromotion.jsx";

import AdminPanelReviews from "./review/AdminPanelReviews.jsx";
import UserAddReviews from "./review/UserAddReviews.jsx";

import Signup from './employee/Components/Signup/Signup.jsx';
import Login from "./employee/Components/Login/Login";
import Home from "./employee/Components/Home";
import Navbar from "./employee/NavBar/NavBar";
import { AuthContext } from "./employee/Context/AuthContext";
import AddUser from "./employee/Components/User/AddUser/AddUser";
import UserDetails from "./employee/Components/User/UserDetails/UserDetails";
import UpdateUser from "./employee/Components/User/UpdateUser/UpdateUser";
import OvertimeCalculator from "./employee/Components/User/CalculateOT/CalculateOT";
import ContactAdmin from "./employee/Components/User/ContactAdmin/ContactAdmin";

function App() {
  const { user, logout,loading } = useContext(AuthContext); //added loading

  //added loading
  if (loading) {
    
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
        <div className="loading-message">Please Wait...</div>
      </div>
    );
  }

  return (
    <div>
      <React.Fragment>
        <Routes>
          <Route path="/allPromo" element={<DisplayPromotion />} />
          <Route path="/addPromo" element={<AddPromotion />} />
          <Route path="/update/:id" element={<UpdatePromotion />} />
          <Route path="/adminPromo" element={<AdminPromotion />} />

          <Route path="/addReview" element={<UserAddReviews />} />
          <Route path="/userReview" element={<AdminPanelReviews />} />

          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected routes based on user roles */}
          {user ? (
            <>
              {/* Routes for admin users */}
              {user.role === "admin" ? (
                <>
                  <Route
                    path="/"
                    element={
                      <>
                        <Navbar handleLogout={logout} />
                        <Home />
                      </>
                    }
                  />
                  <Route
                    path="/user/AddUser"
                    element={
                      <>
                        <Navbar handleLogout={logout} />
                        <AddUser />
                      </>
                    }
                  />
                  <Route
                    path="/user/UserDetails"
                    element={
                      <>
                        <Navbar handleLogout={logout} />
                        <UserDetails />
                      </>
                    }
                  />
                  <Route
                    path="/UpdateUser/:id"
                    element={
                      <>
                        <Navbar handleLogout={logout} />
                        <UpdateUser />
                      </>
                    }
                  />
                  <Route
                    path="/user/CalculateOT"
                    element={
                      <>
                        <Navbar handleLogout={logout} />
                        <OvertimeCalculator />
                      </>
                    }
                  />
                </>
              ) : (
                // Routes for employee users
                user.role === "employee" && (
                  <>
                    <Route
                      path="/"
                      element={
                        <>
                          <Navbar handleLogout={logout} />
                          <Home />
                        </>
                      }
                    />
                    <Route
                      path="/user/ContactAdmin"
                      element={
                        <>
                          <Navbar handleLogout={logout} />
                          <ContactAdmin />
                        </>
                      }
                    />
                  </>
                )
              )}
            </>
          ) : (
            // Redirect to login if not authenticated
            <Route path="/*" element={<Navigate to="/login" />} />
          )}
        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;

import React, { useState } from "react";
import "../UserStyles/UserDashboard.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, removeError, removeSuccess } from "../features/user/userSlice";
import { toast } from "react-toastify";
function UserDashboard({ user }) {
  const dispatch = useDispatch();
  const {cartItems}=useSelector(state=>state.cart)
  const [menuVisible,setMenuVisible]=useState(false)
  const toggleMenu=()=>{
    setMenuVisible(!menuVisible)
  }
  const options = [
    { name: "Orders", funcName: orders },
    { name: "Account", funcName: account },
    { name: `Cart (${cartItems.length})`, funcName: myCart, isCart:true },
    { name: "Logout", funcName: logoutUser },
  ];
  if (user.role === "admin") {
    options.unshift({
      name: "Admin Dashboard",
      funcName: dashboard,
    });
  }
  const navigate = useNavigate();
  function orders() {
    navigate("/orders/user");
  }
  function myCart() {
    navigate("/cart");
  }
  function account() {
    navigate("/profile");
  }
  function logoutUser() {
    dispatch(logout())
      .unwrap()
      .then(() => {
        toast.success("Logout Successful", {
          position: "top-center",
          autoClose: 3000,
        });
        dispatch(removeSuccess());
        navigate("/login");
      })
      .catch((error) => {
        toast.error(error?.message || "Logout Failed", {
          position: "top-center",
          autoClose: 3000,
        });
        dispatch(removeError());
      });
  }
  function dashboard() {
    navigate("/admin/dashboard");
  }
  return (
    <>
      <div
        className={`overlay ${menuVisible ? "show" : ""}`}
        onClick={toggleMenu}
      ></div>
      <div className="dashboard-container">
        <div className="profile-header" onClick={toggleMenu}>
          <img
            src={user.avatar.url ? user.avatar.url : "./images/profile.webp"}
            alt="Profile picture"
            className="profile-avatar"
          />
          <span className="profile-name">{user.name || "User"}</span>
        </div>
        {menuVisible && (
          <div className="menu-options">
            {options.map((item) => (
              <button
                className={`menu-option-btn ${item.isCart?(cartItems.length>0?'cart-not-empty':''):''}`}
                onClick={item.funcName}
                key={item.name}
              >
                {item.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default UserDashboard;

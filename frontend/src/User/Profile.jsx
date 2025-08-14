import React, { useEffect } from 'react'
import PageTitle from '../components/PageTitle'
import '../UserStyles/Profile.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Loader from '../components/Loader'

function Profile() {
  const {loading,isAuthenticated,user}=useSelector(state=>state.user)
  const navigate=useNavigate();
  useEffect(()=>{
    if(isAuthenticated===false){
      navigate("/login")
    }
  },[isAuthenticated])
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <PageTitle title={`${user.name} Profile`} />
          <Navbar />
          <div className="profile-container">
            <div className="profile-image">
              <h1 className="profile-heading">My Profile</h1>
              <img
                src={user.avatar.url || "./images/profile.webp"}
                alt="User Profile"
                className="profile-image"
              />
              <Link to="/profile/update">Edit Profile</Link>
            </div>
            <div className="profile-details">
              <div className="profile-detail">
                <h2>Username:</h2>
                <p>{user.name}</p>
              </div>
              <div className="profile-detail">
                <h2>Email:</h2>
                <p>{user.email}</p>
              </div>
              <div className="profile-detail">
                <h2>Joined On:</h2>
                <p>
                  {user.createdAt
                    ? String(user.createdAt).substring(0, 10)
                    : "N/A"}
                </p>
              </div>
            </div>
            <div className="profile-buttons">
              <Link to="/orders/user">My Orders</Link>
              <Link to="/password/update">Change Password</Link>
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
}

export default Profile
import React, { useEffect, useState } from "react";
import "../AdminStyles/UpdateRole.css";
import Navbar from "../components/Navbar";
import PageTitle from "../components/PageTitle";
import Footer from "../components/Footer";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearMessage, getSingleUser, removeError, removeSuccess, updateUserRole } from "../features/admin/adminSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

function UpdateRole() {
  const { userId } = useParams();
  const { user, loading, error, success, message } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const navigate=useNavigate();

  useEffect(() => {
    dispatch(getSingleUser(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        role: user.role || "",
      });
    }
  },[user]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
  });
  const { name, email, role } = formData;
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit=(e)=>{
    e.preventDefault();
    dispatch(updateUserRole({userId,role}))
  }
  useEffect(() => {
        if (error) {
          toast.error(error, { position: "top-center", autoClose: 3000 });
          dispatch(removeError());
        }
        if (success) {
          toast.success(message, {
            position: "top-center",
            autoClose: 3000,
          });
          dispatch(removeSuccess());
          dispatch(clearMessage());
          navigate("/admin/users")
          
        }
      }, [dispatch, error, success, message]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Navbar />
          <PageTitle title="Update Role" />
          <div className="page-wrapper">
            <div className="update-user-role-container">
              <h1>Update User Role</h1>
              <form className="update-user-role-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    readOnly
                    value={name}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    readOnly
                    value={email}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="role">Role</label>
                  <select
                    name="role"
                    id="role"
                    required
                    value={role}
                    onChange={handleChange}
                  >
                    <option value="">Select Role</option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </select>
                </div>
                <button className="btn btn-primary">Update Role</button>
              </form>
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
}

export default UpdateRole;

import React, { useEffect } from "react";
import "../AdminStyles/UsersList.css";
import Navbar from "../components/Navbar";
import PageTitle from "../components/PageTitle";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { Delete, Edit } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  clearMessage,
  deleteUser,
  fetchUsers,
  removeError,
  removeSuccess,
} from "../features/admin/adminSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

function UsersList() {
  const { users, loading, error, success, message } = useSelector(
    (state) => state.admin
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
  useEffect(() => {
    if (error) {
      toast.error(error, { position: "top-center", autoClose: 3000 });
      dispatch(removeError());
    }
  }, [dispatch, error]);

  const handleDelete = (userId) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirm) {
      dispatch(deleteUser(userId));
    }
  };
  useEffect(() => {
    if (success) {
      toast.success(message, {
        position: "top-center",
        autoClose: 3000,
      });
      dispatch(removeSuccess());
      dispatch(clearMessage());
      dispatch(fetchUsers())
    }
  }, [dispatch, message, success]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Navbar />
          <PageTitle title="All Users" />
          <div className="usersList-container">
            <h1 className="usersList-title">All Users</h1>
            <div className="usersList-table-container">
              <table className="usersList-table">
                <thead>
                  <tr>
                    <th>Sl No</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Created At</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={user._id}>
                      <td>{index + 1}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                      <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                      <td>
                        <Link
                          to={`/admin/user/${user._id}`}
                          className="action-icon edit-icon"
                        >
                          <Edit />
                        </Link>
                        <button
                          className="action-icon delete-icon"
                          onClick={() => handleDelete(user._id)}
                        >
                          <Delete />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
}

export default UsersList;

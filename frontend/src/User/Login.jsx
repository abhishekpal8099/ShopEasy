import React, { useEffect, useState } from "react";
import "../UserStyles/Form.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, removeError, removeSuccess } from "../features/user/userSlice";
import { toast } from "react-toastify";

function Login() {
  const { error, loading, success, isAuthenticated } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const location=useLocation();
  const redirect=new URLSearchParams(location.search).get("redirect")||"/"
  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email: loginEmail, password: loginPassword }));
  };
  useEffect(() => {
    if (error) {
      toast.error(error, { position: "top-center", autoClose: 3000 });
      dispatch(removeError());
    }
  }, [dispatch, error]);
  useEffect(() => {
    if (isAuthenticated) {
      navigate(redirect);
    }
  });
  useEffect(() => {
    if (success) {
      toast.success("Login successful", {
        position: "top-center",
        autoClose: 3000,
      });
      dispatch(removeSuccess());
    }
  }, [dispatch, success]);
  return (
    <div className="form-container container">
      <div className="form-content">
        <form className="form" onSubmit={loginSubmit}>
          <h2>Sign In</h2>
          <div className="input-group">
            <input
              type="email"
              placeholder="Email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
            />
          </div>
          <button className="authBtn">Sign In</button>
          <p className="form-links">
            Forgot your password?<Link to="/forgot/password">Reset Here</Link>
          </p>
          <p className="form-links">
            Don't have an account?<Link to="/register">Sign up here</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;

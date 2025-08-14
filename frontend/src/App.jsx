import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Products from "./pages/Products";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Register from "./User/Register";
import Login from "./User/Login";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./features/user/userSlice";
import UserDashboard from "./User/UserDashboard";
import Profile from "./User/Profile";
import ProtectedRoutes from "./components/ProtectedRoutes";
import UpdateProfile from "./User/UpdateProfile";
import UpdatePassword from "./User/UpdatePassword";
import ForgotPassword from "./User/ForgotPassword";
import ResetPassword from "./User/ResetPassword";
import Cart from "./Cart/Cart";
import Shipping from "./Cart/Shipping";
import OrderConfirm from "./Cart/OrderConfirm";
import Payment from "./Cart/Payment";
import PaymentSuccess from "./Cart/PaymentSuccess";
import MyOrders from "./Orders/MyOrders";
import OrderDetails from "./Orders/OrderDetails";
import Dashboard from "./Admin/Dashboard";
import ProductsList from "./Admin/ProductsList";
import CreateProduct from "./Admin/CreateProduct";
import UpdateProduct from "./Admin/UpdateProduct";
import UsersList from "./Admin/UsersList";
import UpdateRole from "./Admin/UpdateRole";
import OrdersList from "./Admin/OrdersList";
import UpdateOrder from "./Admin/UpdateOrder";
import ReviewsList from "./Admin/ReviewsList";
function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(loadUser());
    }
  }, [dispatch]);
  console.log(isAuthenticated, user);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:keyword" element={<Products />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot/password" element={<ForgotPassword />} />
          <Route
            path="/profile"
            element={<ProtectedRoutes element={<Profile />} />}
          />
          <Route
            path="/profile/update"
            element={<ProtectedRoutes element={<UpdateProfile />} />}
          />
          <Route
            path="/password/update"
            element={<ProtectedRoutes element={<UpdatePassword />} />}
          />
          <Route path="/reset/:token" element={<ResetPassword />} />
          <Route path="/cart" element={<Cart />} />
          <Route
            path="/shipping"
            element={<ProtectedRoutes element={<Shipping />} />}
          />
          <Route
            path="/order/confirm"
            element={<ProtectedRoutes element={<OrderConfirm />} />}
          />
          <Route
            path="/process/payment"
            element={<ProtectedRoutes element={<Payment />} />}
          />
          <Route
            path="/paymentSuccess"
            element={<ProtectedRoutes element={<PaymentSuccess />} />}
          />
          <Route
            path="/orders/user"
            element={<ProtectedRoutes element={<MyOrders />} />}
          />
          <Route
            path="/order/:orderId"
            element={<ProtectedRoutes element={<OrderDetails />} />}
          />

          {/* Admin Routes */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoutes element={<Dashboard />} adminOnly={true} />
            }
          />
          <Route
            path="/admin/products"
            element={
              <ProtectedRoutes element={<ProductsList />} adminOnly={true} />
            }
          />
          <Route
            path="/admin/product/create"
            element={
              <ProtectedRoutes element={<CreateProduct />} adminOnly={true} />
            }
          />
          <Route
            path="/admin/product/:updateId"
            element={
              <ProtectedRoutes element={<UpdateProduct />} adminOnly={true} />
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedRoutes element={<UsersList />} adminOnly={true} />
            }
          />
          <Route
            path="/admin/user/:userId"
            element={
              <ProtectedRoutes element={<UpdateRole />} adminOnly={true} />
            }
          />
          <Route
            path="/admin/orders"
            element={
              <ProtectedRoutes element={<OrdersList />} adminOnly={true} />
            }
          />
          <Route
            path="/admin/order/:orderId"
            element={
              <ProtectedRoutes element={<UpdateOrder />} adminOnly={true} />
            }
          />
          <Route
            path="/admin/reviews"
            element={
              <ProtectedRoutes element={<ReviewsList />} adminOnly={true} />
            }
          />
        </Routes>
        {isAuthenticated && <UserDashboard user={user} />}
      </Router>
    </>
  );
}

export default App;

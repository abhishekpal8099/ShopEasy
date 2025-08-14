import React, { useEffect } from "react";
import "../OrderStyles/MyOrders.css";
import Navbar from "../components/Navbar";
import PageTitle from "../components/PageTitle";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { LaunchOutlined } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { getAllMyOrders } from "../features/order/orderSlice";
import Loader from "../components/Loader";

function MyOrders() {
  const {orders,loading}=useSelector(state=>state.order)
  console.log(orders);
  const dispatch=useDispatch();
  useEffect(()=>{
    dispatch(getAllMyOrders())
  },[dispatch])
  return (
    <>
      <Navbar />
      <PageTitle title="My Orders" />
      {loading ? (
        <Loader />
      ) :orders.length>0?(
        <div className="my-orders-container">
          <h1>My Orders</h1>
          <div className="table-responsive">
            <table className="orders-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Items Count</th>
                  <th>Status</th>
                  <th>Total Price</th>
                  <th>View Order</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr>
                    <td>{order._id}</td>
                    <td>{order.orderItems.length}</td>
                    <td>{order.orderStatus}</td>
                    <td>{order.totalPrice}/-</td>
                    <td>
                      <Link to={`/order/${order._id}`}>
                        <LaunchOutlined />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ):(
        <div className="no-orders">
          <p className="no-order-message">No Orders Found.</p>
        </div>
      )}
      <Footer />
    </>
  );
}

export default MyOrders;

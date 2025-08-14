import React, { useEffect } from "react";
import "../AdminStyles/ProductsList.css";
import Navbar from "../components/Navbar";
import PageTitle from "../components/PageTitle";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { Delete, Edit } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { deleteProduct, fetchAdminProducts, removeError } from "../features/admin/adminSlice";
import { toast } from "react-toastify";

function ProductsList() {
  const { products, loading, error, deleting } = useSelector((state) => state.admin);
  console.log(products);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAdminProducts());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error, { position: "top-center", autoClose: 3000 });
      dispatch(removeError());
    }
  }, [dispatch, error]);
  if (!products || products.length === 0) {
    return (
      <div className="product-list-container">
        <h1 className="product-list-title">All Products</h1>
        <p className="admin-no-products">No Products Found</p>
      </div>
    );
  }
  const handleDelete=(productId)=>{
    const isConfirmed=window.confirm("Are you sure you want to delete this product?")
    if(isConfirmed){
      dispatch(deleteProduct(productId)).then((action)=>{
        if(action.type==='admin/deleteProduct/fulfilled'){
          toast.success("Product Deleted Successfully",{position:'top-center',autoClose:3000})
        }
      })
    }
  }
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Navbar />
          <PageTitle title="All Products" />
          <div className="product-list-container">
            <h1 className="product-list-title">All Products</h1>
            <table className="product-table">
              <thead>
                <tr>
                  <th>Sl No</th>
                  <th>Product Image</th>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Ratings</th>
                  <th>Category</th>
                  <th>Stock</th>
                  <th>Created At</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={product._id}>
                    <td>{index + 1}</td>
                    <td>
                      <img
                        src={product.image[0].url}
                        alt={product.name}
                        className="admin-product-image"
                      />
                    </td>
                    <td>{product.name}</td>
                    <td>{product.price}/-</td>
                    <td>{product.ratings}</td>
                    <td>{product.category}</td>
                    <td>{product.stock}</td>
                    <td>{new Date(product.createdAt).toLocaleDateString()}</td>
                    <td>
                      <Link
                        to={`/admin/product/${product._id}`}
                        className="action-icon edit-icon"
                        disabled={loading}
                      >
                        <Edit />
                      </Link>
                      <button
                        className="action-icon delete-icon"
                        onClick={() => handleDelete(product._id)}
                        disabled={deleting[product._id]}
                      >
                        {deleting[product._id] ? <Loader /> : <Delete />}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Footer />
        </>
      )}
    </>
  );
}

export default ProductsList;

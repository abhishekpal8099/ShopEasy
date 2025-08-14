import React, { useEffect, useState } from "react";
import "../AdminStyles/UpdateProduct.css";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import PageTitle from "../components/PageTitle";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getProductDetails } from "../features/products/productSlice";
import { removeError, removeSuccess, updateProduct } from "../features/admin/adminSlice";
import { toast } from "react-toastify";

function UpdateProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState([]);
  const [oldImage, setOldImage] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);
  const { product } = useSelector((state) => state.product);
  const { success, error, loading } = useSelector((state) => state.admin);
  const navigate=useNavigate();

  const dispatch = useDispatch();
  const { updateId } = useParams();
  useEffect(() => {
    if (updateId) {
      dispatch(getProductDetails(updateId));
    }
  }, [dispatch, updateId]);
  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setDescription(product.description);
      setCategory(product.category);
      setStock(product.stock);
      setOldImage(product.image);
    }
  }, [product]);
  const categories = [
    "fashion",
    "mobile",
    "laptop",
    "footwear",
    "watches",
    "sunglasses",
    "bags",
    "wallets",
  ];
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImage([]);
    setImagePreview([]);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImage((old) => [...old, reader.result]);
          setImagePreview((old) => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };
  const updateProductSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("stock", stock);
    image.forEach((img) => {
      myForm.append("image", img);
    });
    dispatch(updateProduct({id:updateId,formData:myForm}))
  };
  useEffect(() => {
      if (error) {
        toast.error(error, { position: "top-center", autoClose: 3000 });
        dispatch(removeError());
      }
      if (success) {
        toast.success("Product Updated Successfully", {
          position: "top-center",
          autoClose: 3000,
        });
        dispatch(removeSuccess());
        navigate("/admin/products")
        
      }
    }, [dispatch, error, success]);
  return (
    <>
      <Navbar />
      <PageTitle title="Update Product" />
      <div className="update-product-wrapper">
        <h1 className="update-product-title">Update Product</h1>
        <form
          className="update-product-form"
          encType="multipart/form-data"
          onSubmit={updateProductSubmit}
        >
          <label htmlFor="name">Product Name</label>
          <input
            type="text"
            name="name"
            id="name"
            required
            className="update-product-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label htmlFor="price">Product Price</label>
          <input
            type="number"
            name="price"
            id="price"
            required
            className="update-product-input"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <label htmlFor="description">Product Description</label>
          <textarea
            type="text"
            name="description"
            id="description"
            required
            className="update-product-textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <label htmlFor="category">Product Category</label>
          <select
            name="category"
            id="category"
            required
            className="update-product-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select a Category</option>
            {categories.map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>

          <label htmlFor="stock">Product Stock</label>
          <input
            type="number"
            name="stock"
            id="stock"
            required
            className="update-product-input"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />

          <label htmlFor="image">Product Image</label>
          <div className="update-product-file-wrapper">
            <input
              type="file"
              className="update-product-file-input"
              accept="image/"
              name="image"
              id="image"
              multiple
              onChange={handleImageChange}
            />
          </div>
          <div className="update-product-preview-wrapper">
            {imagePreview.map((img, index) => (
              <img
                src={img}
                alt="Product Preview"
                className="update-product-preview-image"
                key={index}
              />
            ))}
          </div>
          <div className="update-product-old-images-wrapper">
            {oldImage.map((img, index) => (
              <img
                src={img.url}
                alt="Old Image Preview"
                className="update-product-old-image"
                key={index}
              />
            ))}
          </div>
          <button className="update-product-submit-btn">{loading?'Updating Product...':'Update'}</button>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default UpdateProduct;

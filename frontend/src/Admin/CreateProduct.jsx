import React, { useEffect, useState } from "react";
import "../AdminStyles/CreateProduct.css";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import PageTitle from "../components/PageTitle";
import { useDispatch, useSelector } from "react-redux";
import {
  createProduct,
  removeError,
  removeSuccess,
} from "../features/admin/adminSlice";
import { toast } from "react-toastify";

function CreateProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);
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
  const { loading, success, error } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const createProductSubmit = (e) => {
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
    dispatch(createProduct(myForm));
  };
  const createProductImage = (e) => {
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
  useEffect(() => {
    if (error) {
      toast.error(error, { position: "top-center", autoClose: 3000 });
      dispatch(removeError());
    }
    if (success) {
      toast.success("Product Created Successfully", {
        position: "top-center",
        autoClose: 3000,
      });
      dispatch(removeSuccess());
      // Reset Form
      setName("");
      setPrice("");
      setDescription("");
      setCategory("");
      setStock("");
      setImage([]);
      setImagePreview([]);
    }
  }, [dispatch, error, success]);
  return (
    <>
      <Navbar />
      <PageTitle title="Create Product" />
      <div className="create-product-container">
        <h1 className="form-title">Create Product</h1>
        <form
          className="product-form"
          encType="multipart/form-data"
          onSubmit={createProductSubmit}
        >
          <input
            type="text"
            placeholder="Enter Product Name"
            className="form-input"
            name="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Enter Product Price"
            className="form-input"
            name="price"
            required
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter Product Description"
            className="form-input"
            name="description"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <select
            name="category"
            className="form-select"
            required
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
          <input
            type="number"
            placeholder="Enter Product Stock"
            className="form-input"
            name="stock"
            required
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />
          <div className="file-input-container">
            <input
              type="file"
              accept="image/"
              name="image"
              className="form-input-file"
              multiple
              onChange={createProductImage}
            />
          </div>
          <div className="image-preview-container">
            {imagePreview.map((img, index) => (
              <img
                src={img}
                alt="Product Preview"
                className="image-preview"
                key={index}
              />
            ))}
          </div>
          <button className="submit-btn">{loading?'Creating Product...':'Create'}</button>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default CreateProduct;

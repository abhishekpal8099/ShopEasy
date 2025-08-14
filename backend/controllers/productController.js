import handleAsyncError from "../middleware/handleAsyncError.js";
import Product from "../models/productModel.js";
import APIFunctionality from "../utils/apiFunctionality.js";
import HandleError from "../utils/handleError.js";
import { v2 as cloudinary } from "cloudinary";

// Create Products
export const createProducts = handleAsyncError(async (req, res) => {
  let image = [];
  if (typeof req.body.image === "string") {
    image.push(req.body.image);
  } else {
    image = req.body.image;
  }

  const imageLinks = [];
  for (let i = 0; i < image.length; i++) {
    const result = await cloudinary.uploader.upload(image[i], {
      folder: "products",
    });
    imageLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }
  req.body.image = imageLinks;
  req.body.user = req.user.id;
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

// Get all products
export const getAllProducts = handleAsyncError(async (req, res, next) => {
  const resultsPerPage = 4;
  const apiFeatures = new APIFunctionality(Product.find(), req.query)
    .search()
    .filter();
  const filteredQuery = apiFeatures.query.clone();
  const productCount = await filteredQuery.countDocuments();
  const totalPages = Math.ceil(productCount / resultsPerPage);
  const page = Number(req.query.page) || 1;

  if (page > totalPages && productCount > 0) {
    return next(new HandleError("This page does not exist", 404));
  }
  apiFeatures.pagination(resultsPerPage);
  const products = await apiFeatures.query;
  if (!products || products.length == 0) {
    return next(new HandleError("No Products Found", 404));
  }
  res.status(200).json({
    success: true,
    products,
    resultsPerPage,
    productCount,
    totalPages,
    currentPage: page,
  });
});

// Update Products
export const updateProduct = handleAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new HandleError("Product Not Found", 404));
  }
  // Handle Image
  let images = [];
  if (typeof req.body.image === "string") {
    images.push(req.body.image);
  } else if (Array.isArray(req.body.image)) {
    images = req.body.image;
  }

  if (images.length > 0) {
    for (let i = 0; i < product.image.length; i++) {
      await cloudinary.uploader.destroy(product.image[i].public_id);
    }
    const imageLinks = [];
    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.uploader.upload(images[i], {
        folder: "products",
      });
      imageLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }
    req.body.image = imageLinks;
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    success: true,
    product,
  });
});

// Delete Product
export const deleteProduct = handleAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new HandleError("Product Not Found", 404));
  }
  // Delete Image
  for (let i = 0; i < product.image.length; i++) {
    await cloudinary.uploader.destroy(product.image[0].public_id)
  }
  product = await Product.findByIdAndDelete(req.params.id);
  return res.status(200).json({
    success: true,
    message: "Product Deleted Successfully",
  });
});

// Accessing Single Product
export const getProductDetails = handleAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new HandleError("Product Not Found", 404));
  }
  res.status(200).json({
    success: true,
    product,
  });
});

// Create/Update Review
export const createReviewForProduct = handleAsyncError(
  async (req, res, next) => {
    const { rating, comment, productId } = req.body;
    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    };
    const product = await Product.findById(productId);
    if (!product) {
      return next(new HandleError("No Product Found", 400));
    }
    const reviewExists = product.reviews.find(
      (review) => review.user.toString() === req.user.id.toString()
    );
    if (reviewExists) {
      // Update review
      product.reviews.forEach((review) => {
        if (review.user.toString() === req.user.id.toString()) {
          (review.rating = rating), (review.comment = comment);
        }
      });
    } else {
      product.reviews.push(review);
    }
    product.numOfReviews = product.reviews.length;
    let sum = 0;
    product.reviews.forEach((review) => {
      sum += review.rating;
    });
    product.ratings =
      product.reviews.length > 0 ? sum / product.reviews.length : 0;
    await product.save({ validateBeforeSave: false });
    res.status(200).json({
      success: true,
      product,
    });
  }
);

// Get Product Review
export const getProductReviews = handleAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.id);
  if (!product) {
    return next(new HandleError("No Product Found", 400));
  }
  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

// Delete Product Review
export const deleteReview = handleAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);
  if (!product) {
    return next(new HandleError("No Product Found", 400));
  }
  const reviews = product.reviews.filter(
    (review) => review._id.toString() !== req.query.id.toString()
  );
  const numOfReviews = reviews.length;
  let sum = 0;
  reviews.forEach((review) => {
    sum += review.rating;
  });
  const ratings = reviews.length ? sum / reviews.length : 0;
  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      numOfReviews,
      ratings,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json({
    success: true,
    message: "Review deleted successfully",
  });
});

// Admin - Get all products
export const getAdminProducts = handleAsyncError(async (req, res, next) => {
  const products = await Product.find();
  res.status(200).json({
    success: true,
    products,
  });
});

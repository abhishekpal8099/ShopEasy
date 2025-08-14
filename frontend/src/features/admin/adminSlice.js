import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch all Admin Products
export const fetchAdminProducts = createAsyncThunk(
  "admin/fetchAdminProducts",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/api/v1/admin/products");
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to Fetch Products"
      );
    }
  }
);

// Create Product
export const createProduct = createAsyncThunk(
  "admin/createProduct",
  async (productData, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.post(
        "/api/v1/admin/product/create",
        productData,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to Create Product"
      );
    }
  }
);

// Update Product
export const updateProduct = createAsyncThunk(
  "admin/updateProduct",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.put(
        `/api/v1/admin/product/${id}`,
        formData,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to Update Product"
      );
    }
  }
);

// Delete Product
export const deleteProduct = createAsyncThunk(
  "admin/deleteProduct",
  async (productId, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`/api/v1/admin/product/${productId}`);
      return { productId };
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to Delete Product"
      );
    }
  }
);

// Fetch All Users
export const fetchUsers = createAsyncThunk(
  "admin/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/api/v1/admin/users");
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to Fetch Users");
    }
  }
);

// Fetch Single User
export const getSingleUser = createAsyncThunk(
  "admin/getSingleUser",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/v1/admin/user/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to Fetch Single User"
      );
    }
  }
);

// Update User Role
export const updateUserRole = createAsyncThunk(
  "admin/updateUserRole",
  async ({ userId, role }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(`/api/v1/admin/user/${userId}`, {
        role,
      });
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to Update User Role"
      );
    }
  }
);

// Delete User Profile
export const deleteUser = createAsyncThunk(
  "admin/deleteUser",
  async (userId, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`/api/v1/admin/user/${userId}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to Delete User");
    }
  }
);

// Fetch Orders
export const fetchAllOrders = createAsyncThunk(
  "admin/fetchAllOrders",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/api/v1/admin/orders");
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to Fetch Orders");
    }
  }
);

// Delete Order
export const deleteOrder = createAsyncThunk(
  "admin/deleteOrder",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`/api/v1/admin/order/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to Delete Order");
    }
  }
);

// Update Order status
export const updateOrderStatus = createAsyncThunk(
  "admin/updateOrderStatus",
  async ({ orderId, status }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.put(
        `/api/v1/admin/order/${orderId}`,
        { status },
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to Update Order Status"
      );
    }
  }
);

// Fetch All Reviews
export const fetchProductReviews = createAsyncThunk(
  "admin/fetchProductReviews",
  async (productId, { rejectWithValue }) => {
    try {
      const {data}=await axios.get(`/api/v1/admin/reviews?id=${productId}`)
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to Fetch Product Reviews"
      );
    }
  }
);

// Delete Reviews
export const deleteReview = createAsyncThunk(
  "admin/deleteReview",
  async ({ productId, reviewId }, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`/api/v1/admin/reviews?productId=${productId}&id=${reviewId}`);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to Delete Product Review"
      );
    }
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    products: [],
    loading: false,
    success: false,
    error: null,
    product: {},
    deleting: {},
    users: [],
    user: {},
    message: null,
    orders: [],
    totalAmount: 0,
    order: {},
    reviews:[]
  },
  reducers: {
    removeError: (state) => {
      state.error = null;
    },
    removeSuccess: (state) => {
      state.success = false;
    },
    clearMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
      })
      .addCase(fetchAdminProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to Fetch Products";
      });

    builder
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.success;
        state.products.push(action.payload.product);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to Create Product";
      });

    builder
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.success;
        state.product = action.payload.product;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to Update Product";
      });

    builder
      .addCase(deleteProduct.pending, (state, action) => {
        const productId = action.meta.arg;
        state.deleting[productId] = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        const productId = action.payload.productId;
        state.deleting[productId] = false;
        state.products = state.products.filter(
          (product) => product._id !== productId
        );
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        const productId = action.meta.arg;
        state.deleting[productId] = false;
        state.error = action.payload?.message || "Failed to Delete Product";
      });

    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.users;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to Fetch Users";
      });

    builder
      .addCase(getSingleUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSingleUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(getSingleUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to Fetch Single User";
      });

    builder
      .addCase(updateUserRole.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserRole.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.success;
        state.message = action.payload.message;
      })
      .addCase(updateUserRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to Update User Role";
      });

    builder
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.success;
        state.message = action.payload.message;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to Delete User";
      });

    builder
      .addCase(fetchAllOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.totalAmount = action.payload.totalAmount;
        state.orders = action.payload.orders;
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to Fetch Orders";
      });

    builder
      .addCase(deleteOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.success;
        state.message = action.payload.message;
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to Delete Order";
      });

    builder
      .addCase(updateOrderStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.success;
        state.order = action.payload.order;
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || "Failed to Update Order Status";
      });

      builder
        .addCase(fetchProductReviews.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchProductReviews.fulfilled, (state, action) => {
          state.loading = false;
          state.reviews = action.payload.reviews;
        })
        .addCase(fetchProductReviews.rejected, (state, action) => {
          state.loading = false;
          state.error =
            action.payload?.message || "Failed to Fetch Product Reviews";
        });

        builder
          .addCase(deleteReview.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(deleteReview.fulfilled, (state, action) => {
            state.loading = false;
            state.success = action.payload.success;
            state.message = action.payload.message;
          })
          .addCase(deleteReview.rejected, (state, action) => {
            state.loading = false;
            state.error =
              action.payload?.message || "Failed to Delete Product Review";
          });
  },
});

export const { removeError, removeSuccess, clearMessage } = adminSlice.actions;
export default adminSlice.reducer;

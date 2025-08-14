import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//Create Order
export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (order, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post("/api/v1/new/order", order, config);
      console.log("Order Data", data);

      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to create order");
    }
  }
);

//Get All Orders
export const getAllMyOrders = createAsyncThunk(
  "order/getAllMyOrders",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/api/v1/orders/user");

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to Fetch All Orders"
      );
    }
  }
);

//Get Order Details
export const getOrderDetails = createAsyncThunk(
  "order/getOrderDetails",
  async (orderId, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/v1/order/${orderId}`);

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to Fetch Order Details"
      );
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    loading: false,
    error: null,
    success: false,
    order: {},
    orders: [],
  },
  reducers: {
    removeError: (state) => {
      state.error = null;
    },
    removeSuccess: (state) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    // Create Order
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.success;
        state.order = action.payload.order;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to create order";
      });

    // Get All Orders
    builder
      .addCase(getAllMyOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllMyOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.orders;
      })
      .addCase(getAllMyOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to Fetch All Orders";
      });

    // Get Order Details
    builder
      .addCase(getOrderDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload.order;
      })
      .addCase(getOrderDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to Fetch Order Details";
      });
  },
});

export const { removeError, removeSuccess } = orderSlice.actions;
export default orderSlice.reducer;

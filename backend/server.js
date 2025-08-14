import app from "./app.js";
import dotenv from "dotenv";
import { connectMongoDatabase } from "./config/db.js";
import { v2 as cloudinary } from "cloudinary";
import Razorpay from "razorpay";
if(process.env.NODE_ENV!=='PRODUCTION'){
dotenv.config({ path: "backend/config/config.env" });
}
connectMongoDatabase();
cloudinary.config({
  cloud_name:process.env.CLOUDINARY_NAME,
  api_key:process.env.API_KEY,
  api_secret:process.env.API_SECRET
})
process.on("uncaughtException", (err) => {
  console.log(`Error:${err.message}`);
  console.log(`Server is shutting down, due to unhandled exception error`);
  process.exit(1);
});
const port = process.env.PORT || 3000;

// Instance of Razorpay
export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});

const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

process.on("unhandledRejection", (err) => {
  console.log(`Error:${err.message}`);
  console.log(`Server is shutting down, due to unhandled promise rejections`);
  server.close(() => {
    process.exit(1);
  });
});

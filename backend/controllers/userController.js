import handleAsyncError from "../middleware/handleAsyncError.js";
import User from "../models/userModel.js";
import HandleError from "../utils/handleError.js";
import { sendToken } from "../utils/jwtToken.js";
import { sendEmail } from "../utils/sendEmail.js";
import crypto from 'crypto';
import {v2 as cloudinary} from 'cloudinary'
// REGISTER USER
export const registerUser = handleAsyncError(async (req, res, next) => {
  const { name, password, email, avatar } = req.body;
  const myCloud=await cloudinary.uploader.upload(avatar,{
    folder:'avatars',
    width:150,
    crop:'scale'
  })
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });
  sendToken(user,201,res)
});

// LOGIN USER
export const loginUser = handleAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new HandleError("Email and Password cannot be empty", 400));
  }

  const user = await User.findOne({ email }).select('+password')
  if (!user) {
    return next(new HandleError("Invalid Email or Password", 400));
  }
  const isPasswordValid = await user.verifyPassword(password);
  if(!isPasswordValid){
    return next(new HandleError("Invalid Email or Password", 400));
  }
  sendToken(user, 200, res);
});

// LOGOUT USER

export const logout=handleAsyncError(async(req,res,next)=>{
    res.cookie('token',null,{
        expires:new Date(Date.now()),
        httpOnly:true
    })
    res.status(200).json({
        success:true,
        message:"Successfully Logged Out"
    })
})

// Forgot Password Reset Link
export const requestPasswordReset=handleAsyncError(async(req,res,next)=>{
  const {email}=req.body;
  const user=await User.findOne({email});
  if(!user){
    return next(new HandleError("User doesn't exist",404))
  }

  let resetToken;
  try {
    resetToken = user.generatePasswordResetToken();
    await user.save({validateBeforeSave:false})
    } catch (error) {
    console.log(`Error ${error}`);
    return next(new HandleError('Could not save reset token, please try again later',400))
    
  }
  const resetPasswordURL = `${req.protocol}://${req.get("host")}/reset/${resetToken}`;
  const message=`Use the following link to reset your password: ${resetPasswordURL}. \n\n This link will expire in 5 minutes. \n\n If you didn't request a password reset, please ignore this message.`;
  try {
    // Send email functionality
    await sendEmail({
      email:user.email,
      subject:'Password Reset Request',
      message
    })
    res.status(200).json({
      success:true,
      message:`Email sent to ${user.email} successfully`
    })
  } catch (error) {
    user.resetPasswordToken=undefined;
    user.resetPasswordExpire=undefined;
    await user.save({validateBeforeSave:false})
    return next(new HandleError('Email could not be sent. Please try again later',500))
  }
})

// Reset Password
export const resetPassword=handleAsyncError(async(req,res,next)=>{
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
    const user=await User.findOne({
      resetPasswordToken,
      resetPasswordExpire:{$gt:Date.now()}
    })
    if(!user){
      return next(new HandleError('Reset password token is invalid or has been expired',404))
    }
    const {password,confirmPassword}=req.body;
    if(password!==confirmPassword){
      return next(new HandleError("Password doesn't match",404))
    }
    user.password=password;
    user.resetPasswordToken=undefined;
    user.resetPasswordExpire=undefined;
    await user.save();
    sendToken(user, 200, res);
})

// Getting User Details
export const getUserDetails=handleAsyncError(async(req,res,next)=>{
  const user=await User.findById(req.user.id);
  res.status(200).json({
    success:true,
    user
  })
})

// UPDATE PASSWORD
export const updatePassword=handleAsyncError(async(req,res,next)=>{
  const {oldPassword,newPassword,confirmPassword}=req.body;
  const user=await User.findById(req.user.id).select('+password');
  const checkPasswordMatch=await user.verifyPassword(oldPassword)
  if(!checkPasswordMatch){
    return next(new HandleError('Old password is incorrect',400))
  }
  if(newPassword!==confirmPassword){
    return next(new HandleError("Password doesn't match",400))
  }
  user.password=newPassword;
  await user.save();
  sendToken(user,200,res)
})

// PROFILE UPDATE
export const updateProfile=handleAsyncError(async(req,res,next)=>{
  const {name,email,avatar}=req.body;
  const updateUserDetails={
    name,
    email
  }
  if(avatar!==""){
    const user=await User.findById(req.user.id)
    const imageId=user.avatar.public_id;
    await cloudinary.uploader.destroy(imageId);
    const myCloud=await cloudinary.uploader.upload(avatar,{
      folder:'avatars',
      width:150,
      crop:'scale'
    })
    updateUserDetails.avatar={
      public_id:myCloud.public_id,
      url:myCloud.secure_url
    }
  }
  const user = await User.findByIdAndUpdate(req.user.id, updateUserDetails,{
    new:true,
    runValidators:true
  })
  res.status(200).json({
    success:true,
    message:"Profile Updated Successfully",
    user
  })
})

// Admin - Get all users
export const getUsersList=handleAsyncError(async(req,res,next)=>{
  const users=await User.find();
  res.status(200).json({
    success:true,
    users
  })
})

// Admin - Get single user
export const getSingleUser=handleAsyncError(async(req,res,next)=>{
  const user=await User.findById(req.params.id);
  if(!user){
    return next(new HandleError("User doesn't exists",400));
  }
  res.status(200).json({
    success:true,
    user
  })
  
})

// Admin - Update user role
export const updateUserRole=handleAsyncError(async(req,res,next)=>{
  const {role}=req.body
  const user=await User.findByIdAndUpdate(req.params.id,{role},{
    new:true,
    runValidators:true
  })
  if(!user){
    return next(new HandleError("User doesn't exists",400));
  }
  res.status(200).json({
    success:true,
    message:'User Profile Updated Successfully'
  })
})

// Admin - Delete user profile
export const deleteUser=handleAsyncError(async(req,res,next)=>{
  let user=await User.findById(req.params.id);
  if(!user){
    return next(new HandleError("User doesn't exists",400));
  }
  const imageId=user.avatar.public_id;
  await cloudinary.uploader.destroy(imageId)
  user = await User.findByIdAndDelete(req.params.id);
  res.status(200).json({
    success:true,
    message:'User Profile Deleted'
  })
})
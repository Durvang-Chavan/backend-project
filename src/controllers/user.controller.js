import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiErrors.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/couldinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registUser = asyncHandler(async (req, res) => {
  // Getting data from frontend
  const { fullname, email, username, password } = req.body;

  // Validation
  if (
    [fullname, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required!");
  }

  // Check if the user already exists by username or email
  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  // Throwing error if the username or email already exists
  if (existedUser) {
    throw new ApiError(409, "Sorry, the username or email already exists!");
  }

  // check for avatar and check for images
  const avatarLocalPath = req.files?.avatar[0]?.path;
  let coverImageLocalPath;
  if (
    req.files &&
    Array.isArray(req.files.coverImage) &&
    req.files.coverImage.length > 0
  ) {
    coverImageLocalPath = req.files.coverImage[0].path;
  }

  if (!avatarLocalPath) {
    throw new ApiError(400, "avatar is required!");
  }

  //upload it to couldinary
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar) {
    throw new ApiError(400, "avatar image upload failed!");
  }

  //create entry in database using user object
  const user = await User.create({
    fullname,
    username: username.toLowerCase(),
    password,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
  });

  //removing password and refreshToken from the response and checking that the user is created
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering user!");
  }

  //returning response finally
  return res
    .status(201)
    .json(
      new ApiResponse(
        200,
        createdUser,
        "user successfully registered in data base!"
      )
    );
});

export { registUser };

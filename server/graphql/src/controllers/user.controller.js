import { User } from "../models/user.model.js";

const generateAccessandRefreshTokens = async (req, res, userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    console.log("====================================");
    console.log("rttor in generating tokens", error);
    console.log("====================================");
    return;
    // return res.status(500).json({
    //   message: "Something went wrong while generating access and refresh token",
    // });
  }
};
const registerUser = async (req, res) => {
  const {
    businessName,
    email,
    password,
    phoneNumber,
    businessType,
    address,
    pincode,
  } = req.body;
  console.log("====================================");
  console.log("checking the request", req.body);
  console.log("====================================");
  try {
    const user = await User.create({
      businessName,
      email,
      password,
      phoneNumber,
      businessType,
      address,
      pincode,
    });
    console.log("====================================");
    console.log("logging to see if useer is created", user);
    console.log("====================================");
    const { accessToken, refreshToken } = generateAccessandRefreshTokens(
      req,
      res,
      user._id
    );
    const registeredUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );
    return res
      .status(200)
      .cookie("accessToken", accessToken)
      .cookie("refreshToken", refreshToken)
      .json({
        message: "User registered succasfully",
        user: registeredUser,
        accessToken,
      });
  } catch (error) {
    console.log("error while registering", error);
    console.log("error while registering", error.message);

    return res
      .status(400)
      .json({ message: "Error while registering the user" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: "User doesnt exist" });
  }
  console.log("====================================");
  console.log("this is user", user);
  console.log("====================================");
  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid Password" });
  }

  const { accessToken, refreshToken } = await generateAccessandRefreshTokens(
    req,
    res,
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    " -password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json({
      message: "User Logged In Successfully",
      user: loggedInUser,
      accessToken,
    });
};

const logoutUser = async (req, res) => {
  await User.findByIdAndUpdate(req.user._id, {
    $unset: {
      accessToken: 1,
      refreshToken: 1,
    },
  });

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json({ message: "User logged out succesfully" });
};

const getProfile = async (req, res) => {
  const user = req.user._id;
  const profile = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  return res.status(200).json({
    message: "User Profile fetched SuccessFully",
    profile,
    accessToken,
  });
};
const updateProfile = async (req, res) => {
  const { phoneNumber, address, pincode } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        phoneNumber,
        address,
        pincode,
      },
      { new: true }
    ).select("-password refreshToken accessToken");
    return res
      .status(200)
      .json({ message: "User Updated Successfully", updatedUser });
  } catch (error) {
    console.log("erroe while updating profile", error);
    return res.status(400).json({ error: "Failed to update the profile" });
  }
};
export { registerUser, loginUser, logoutUser, updateProfile, getProfile };

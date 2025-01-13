import { User } from "../models/user.model";

const generateAccessandRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong while generating access and refresh token",
    });
  }
};
const registerUser = async (req, res) => {
  const {
    businessName,
    email,
    passwordHash,
    phoneNumber,
    businesstype,
    address,
    pincode,
  } = req.body;

  try {
    const user = await User.create({
      businessName,
      email,
      passwordHash,
      phoneNumber,
      businesstype,
      address,
      pincode,
    });
    const { accessToken, refreshToken } = generateAccessandRefreshTokens(
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
    return res
      .status(200)
      .json({ message: "Error while registering the user" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: "User doesnt exist" });
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid Password" });
  }

  const { accessToken, refreshToken } = await generateAccessandRefreshTokens(
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

const logoutUser = asyncHandler(async (req, res) => {
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
});

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

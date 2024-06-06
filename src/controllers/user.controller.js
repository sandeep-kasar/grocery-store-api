import { asyncHandler } from "../utils/asyncHandler.js"
import ApiError from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import ApiResponse from "../utils/ApiResponse.js"

const registerUser = asyncHandler(async (req, res) => {
    res.status(200).json({
        message:"ok"
    })

    const {fullName, email, username, password} = req.body
    console.log("email==", email);

    if (
        [fullName, email, username, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })
    
    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists")
    }
    console.log("req.files",req.files);
    
    const avatarLocalPath = req.files?.avatar[0]?.path;
    console.log("avatarLocalPath",avatarLocalPath);
    
    
    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    console.log("avatar-cloudinary",avatar.url);

    if (!avatar) {
        throw new ApiError(400, "Avatar file is required")
    }

    const user = await User.create({
        username: username.toLowerCase(),
        fullName,
        email, 
        avatar: avatar.url,
        password
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    )
    


})






export default registerUser
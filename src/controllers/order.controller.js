import { asyncHandler } from "../utils/asyncHandler.js"
import ApiError from "../utils/ApiError.js"
import {Order} from "../models/order.model.js"
import ApiResponse from "../utils/ApiResponse.js"


const placeOrder = asyncHandler(async (req, res) => {

    const {deliveryDate,packingDate,product, quantity, amount, payment} = req.body

    if (
        [deliveryDate, product, quantity, amount, payment].some((field) => field === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const order = await Order.create({
        user: req.user._id,
        deliveryDate,
        packingDate,
        product, 
        quantity,
        amount,
        payment
    })

    const createdOrder = await Order.findById(order._id)

    if (!createdOrder) {
        throw new ApiError(500, "Something went wrong while placing the order")
    }

    return res.status(201).json(
        new ApiResponse(200, createdOrder, "Order Is Created Successfully")
    )
    
})


export  {
    placeOrder
}
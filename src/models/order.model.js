import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        deliveryDate: {
            type: Date,
            min: Date.now,
            max: "2024-12-31"
        },
        packingDate: {
            type: Date,
            min: Date.now,
            max: "2024-12-31"
        },
        product: {
            type: Schema.Types.ObjectId,
            ref: "Product"
        },
        quantity: {
            type: Number,
            required: true
        },
        amount: {
            type: Number,
            required: true
        },
        payment: {
            type: Schema.Types.ObjectId,
            ref: "Payment"
        },
        status: { // created, shipped, delivered, cancel, pending
            type: Number,
            default: 1, // created
            required: true
        }

    },
    {
        timestamps: true
    }
)

export const Order = mongoose.model("Order", orderSchema)
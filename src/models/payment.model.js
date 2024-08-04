import mongoose, { Schema } from "mongoose";

const paymentSchema = new Schema(
    {
        paymentType: {  // online, COD
            type: Number,
            required: true
        },
        paymentMethod: { // cash, UPI , Banking
            type: Number,
            required: true
        },
        paymentStatus: {  // paid, pending
            type: Number,
            required: true
        }

    },
    {
        timestamps: true
    }
)

export const Order = mongoose.model("Payment", paymentSchema)
import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
    {
        productName: { 
            type: Number,
            required: true
        },
        productType: { // vegitables, milk, fruit etc
            type: Number,
            required: true
        },
        productStatus: {  // is available, not in stock
            type: Number,
            required: true
        },
        productStock: {  // available quantity in stock
            type: Number,
            required: true
        },
        productPicture: {
            type: String, // cloudinary url
            required: true,
        }

    },
    {
        timestamps: true
    }
)

export const Order = mongoose.model("Product", productSchema)

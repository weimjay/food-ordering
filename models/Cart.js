import {model, models, Schema} from "mongoose";

const CartSchema = new Schema({
    email: {type: String, required: true},
    products: {type: Object},
}, {timestamps: true});

export const Cart = models?.Cart || model('Cart', CartSchema);
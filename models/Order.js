import {model, models, Schema} from "mongoose";

const OrderSchema = new Schema({
    email: {type: String, required: true},
    subTotal: {type: Number},
    delivery: {type: Number},
    totalPrice: {type: Number},
    products: {type: Object},
    address: {
        phone: {type: String},
        street: {type: String},
        postcode: {type: String},
        city: {type: String},
        country: {type: String},
    },
    paid: {type: Boolean, default: false},
}, {timestamps: true});

export const Order = models?.Order || model('Order', OrderSchema);
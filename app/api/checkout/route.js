import mongoose from "mongoose";
import {Order} from "@/models/Order";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/options";
import {Menu} from "@/models/Menu";
const stripe = require('stripe')(process.env.STRIPE_SK);

export async function POST(req) {
    const {cartProducts, subTotal, delivery, address} = await req.json();
    const totalPrice = subTotal + delivery;
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;
    if (!email) {
        return Response.json({ok: false, message: "Please login first!"});
    }
    if (cartProducts?.length < 1) {
        return Response.json({ok: false, message: "Cart is empty!"});
    }
    mongoose.connect(process.env.MONGO_URL);

    let calcSubTotal = 0;
    const stripeLineItems = [];
    for (const cartProduct of cartProducts) {
        const productInfo = await Menu.findById(cartProduct._id);

        let productPrice = productInfo.basePrice;
        if (cartProduct.size) {
            const size = productInfo.sizes.find(size => size._id.toString() === cartProduct.size._id.toString());
            productPrice += size.price;
        }
        if (cartProduct.extras?.length > 0) {
            for (const cartExtra of cartProduct.extras) {
                const productExtras = productInfo.extraIngredients;
                const extraInfo = productExtras.find(extra => extra._id.toString() === cartExtra._id.toString());
                productPrice += extraInfo.price;
            }
        }
        calcSubTotal += productPrice * cartProduct.quantity;

        const productName = cartProduct.name;

        stripeLineItems.push({
            quantity: 1,
            price_data: {
                currency: 'AUD',
                product_data: {
                    name: productName,
                },
                unit_amount: productPrice * 100,
            },
        });
    }
    if (subTotal !== calcSubTotal) {
        return Response.json({ok: false, message: "Cart items changed, please try again!"});
    }

    const order = {
        email,
        subTotal,
        delivery,
        totalPrice,
        products: cartProducts,
        address: address,
        paid: false,
    };
    const res = await Order.create(order);
    if (!res._id) {
        return Response.json({ok: false, message: "Order checkout failed!"});
    }

    const stripeSession = await stripe.checkout.sessions.create({
        line_items: stripeLineItems,
        mode: 'payment',
        customer_email: email,
        success_url: process.env.NEXTAUTH_URL + '/orders/' + res._id.toString() + '?clear-cart=1',
        cancel_url: process.env.NEXTAUTH_URL + '/cart?canceled=1',
        metadata: {orderId:res._id.toString()},
        payment_intent_data: {
            metadata:{orderId:res._id.toString()},
        },
        shipping_options: [
            {
                shipping_rate_data: {
                    display_name: 'Delivery fee',
                    type: 'fixed_amount',
                    fixed_amount: {amount: 500, currency: 'AUD'},
                },
            }
        ],
    });

    return Response.json({ok: true, message: "Order checkout success!", redirect: stripeSession.url});
}
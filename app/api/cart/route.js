import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import mongoose from "mongoose";
import {Cart} from "@/models/Cart";

export async function POST(req) {
    const {cartProducts} = await req.json();
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;
    if (!email) {
        return Response.json({ok: false, message: "Please login first!"});
    }
    mongoose.connect(process.env.MONGO_URL);
    await Cart.findOneAndUpdate({email}, {products: cartProducts}, {upsert: true});
    return Response.json({ok: true, message: "success"});
}

export async function GET() {
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;
    if (!email) {
        return Response.json({ok: false, message: "Please login first!"});
    }
    mongoose.connect(process.env.MONGO_URL);
    const data = await Cart.findOne({email});
    return Response.json({ok: true, message: "success", data: data});
}
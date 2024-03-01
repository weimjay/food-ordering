import mongoose from "mongoose";
import {User} from "@/models/User";

export async function GET(req, {params}) {
    mongoose.connect(process.env.MONGO_URL);
    const user = await User.findOne({_id: params.id});
    return Response.json(user);
}

export async function PUT(req, {params}) {
    mongoose.connect(process.env.MONGO_URL);
    const data = await req.json();
    await User.findByIdAndUpdate({_id: params.id}, data);
    return Response.json(true);
}
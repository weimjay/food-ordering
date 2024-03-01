import {Category} from "@/models/Category";
import mongoose from "mongoose";

export async function POST(req) {
    mongoose.connect(process.env.MONGO_URL);
    const {name} = await req.json();
    const res = await Category.create({name});
    return Response.json(res);
}

export async function PUT(req) {
    mongoose.connect(process.env.MONGO_URL);
    const {_id, name} = await req.json();
    const res = await Category.updateOne({_id}, {name});
    return Response.json(true);
}

export async function GET() {
    mongoose.connect(process.env.MONGO_URL);
    return Response.json(await Category.find());
}

export async function DELETE(req) {
    const {searchParams} = new URL(req.url);
    const _id = searchParams.get('_id');
    mongoose.connect(process.env.MONGO_URL);
    const res = await Category.deleteOne({_id});
    return Response.json(res);
}

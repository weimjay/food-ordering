import mongoose from "mongoose";
import {Menu} from "@/models/Menu";
import {useParams} from "next/navigation";

export async function POST(req) {
    mongoose.connect(process.env.MONGO_URL);
    const data = await req.json();
    const res = await Menu.create(data);
    return Response.json(res);
}

export async function PUT(req) {
    mongoose.connect(process.env.MONGO_URL);
    const {_id, ...data} = await req.json();
    await Menu.findByIdAndUpdate(_id, data);
    return Response.json(true);
}

export async function GET(req) {
    const {searchParams} = new URL(req.url);
    const id = searchParams.get('id');
    mongoose.connect(process.env.MONGO_URL);
    let res;
    if (id) {
        res = await Menu.findOne({_id: id});
    } else {
        res = await Menu.find();
    }
    return Response.json(res);
}

export async function DELETE(req) {
    const {searchParams} = new URL(req.url);
    const _id = searchParams.get('_id');
    mongoose.connect(process.env.MONGO_URL);
    await Menu.deleteOne({_id});
    return Response.json(true);
}
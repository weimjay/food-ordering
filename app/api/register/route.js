import mongoose from "mongoose";
import {User} from "@/models/User";
import bcrypt from "bcrypt";

export async function POST(req) {
    const body = await req.json();
    const pwd = body.password;
    if (!pass?.length || pass.length < 5) {
        new Error('password must be at least 5 characters');
    }

    const salt = bcrypt.genSaltSync(10);
    body.password = bcrypt.hashSync(pwd, salt);

    const res = mongoose.connect(process.env.MONGO_URL);
    const createdUser = await User.create(body);

    return Response.json(createdUser);
}
import mongoose from "mongoose";
import {User} from "@/models/User";
import {Menu} from "@/models/Menu";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/options";

export async function GET() {
    mongoose.connect(process.env.MONGO_URL);
    const users = await User.find();
    return Response.json(users);
}

import {getServerSession} from "next-auth";
import {authOptions, isAdmin} from "@/app/api/auth/[...nextauth]/route";
import {Order} from "@/models/Order";

export async function GET(req) {
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;
    const admin = await isAdmin();

    const url = new URL(req.url);
    const _id = url.searchParams.get('_id');
    if (_id) {
        return Response.json(await Order.findById(_id));
    }

    if (admin) {
        return Response.json(await Order.find());
    }

    if (email) {
        return Response.json(await Order.find({email}));
    }
}
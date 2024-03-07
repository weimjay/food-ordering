import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/options";
import {Order} from "@/models/Order";
import {isAdmin} from "@/app/api/users/service";

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
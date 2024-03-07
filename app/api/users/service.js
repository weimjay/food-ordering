import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/options";
import {User} from "@/models/User";

export async function isAdmin() {
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;
    if (!email) {
        return false;
    }
    const userInfo = await User.findOne({email});
    if (!userInfo) {
        return false;
    }
    return userInfo.admin;
}
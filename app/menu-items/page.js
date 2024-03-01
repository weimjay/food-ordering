"use client";
import UserTabs from "@/components/layout/UserTabs";
import useProfile from "@/components/UseProfile";
import EditableImage from "@/components/layout/EditableImage";
import {useEffect, useState} from "react";
import {reject} from "bcrypt/promises";
import toast from "react-hot-toast";
import Link from "next/link";
import Right from "@/components/icons/Right";
import Image from "next/image";

export default function MenuPage() {

    const [menuItems, setMenuItems] = useState([]);
    const {loading, data} = useProfile();
    useEffect(() => {
        fetch('/api/menu-items').then(response => {
            response.json().then(items => {
                setMenuItems(items);
            })
        })
    }, []);

    if (loading) {
        return 'Profile loading!';
    }

    if (!data.admin) {
        return 'Unauthorized!';
    }

    return (
        <section className="mt-8 max-w-2xl mx-auto">
            <UserTabs isAdmin={data.admin} />
            <div className="mt-8">
                <Link className="flex button" href={'/menu-items/create'}>
                    <span>Create new menu item</span>
                    <Right />
                </Link>
            </div>
            <div>
                <h2 className="text-sm text-gray-500 mt-8">Edit menu item: </h2>
                <div className="grid grid-cols-3 gap-2">
                    {menuItems?.length > 0 && menuItems.map(item => (
                        <Link href={'/menu-items/edit/'+item._id} key={item._id} className="bg-gray-200 rounded-lg p-4">
                            <div className="relative">
                                <Image className="rounded-md" src={item.image} alt="" width="200" height="200" />
                            </div>
                            <div className="text-center">
                                {item.name}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
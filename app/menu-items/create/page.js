"use client";
import useProfile from "@/components/UseProfile";
import UserTabs from "@/components/layout/UserTabs";
import EditableImage from "@/components/layout/EditableImage";
import toast from "react-hot-toast";
import {useState} from "react";
import Link from "next/link";
import Left from "@/components/icons/Left";
import {redirect} from "next/navigation";
import MenuItemForm from "@/components/layout/MenuItemForm";

export default function NewMenuPage() {

    const [redirectToItems, setRedirectToItems] = useState(false);
    const {loading, data} = useProfile();

    async function handleFormSubmit(ev, fields) {
        ev.preventDefault();
        const savingPromise = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/menu-items', {
                method: 'POST',
                body: JSON.stringify(fields),
                headers: {'Content-Type': 'application/json'},
            });
            if (response.ok) {
                resolve();
            } else {
                reject();
            }
        });
        await toast.promise(savingPromise, {
            loading: 'Saving...',
            success: 'Menu item saved!',
            error: 'Got an error, please try again.',
        })

        setRedirectToItems(true);
    }

    if (redirectToItems) {
        return redirect('/menu-items');
    }

    if (loading) {
        return 'Profile loading!';
    }

    if (!data.admin) {
        return 'Unauthorized!';
    }

    return (
        <section className="mt-8 max-w-2xl mx-auto">
            <UserTabs isAdmin={data.admin}/>
            <div className="mt-8">
                <Link href={'/menu-items'} className="button">
                    <span>Show all menu items</span>
                    <Left />
                </Link>
            </div>
            <MenuItemForm menuItem={null} onSubmit={handleFormSubmit} />
        </section>
    );
}
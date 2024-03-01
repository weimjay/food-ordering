"use client";
import useProfile from "@/components/UseProfile";
import UserTabs from "@/components/layout/UserTabs";
import EditableImage from "@/components/layout/EditableImage";
import toast from "react-hot-toast";
import {useEffect, useState} from "react";
import Link from "next/link";
import Left from "@/components/icons/Left";
import {redirect, useParams} from "next/navigation";
import MenuItemForm from "@/components/layout/MenuItemForm";
import DeleteButton from "@/components/DeleteButton";

export default function EditMenuPage() {

    const {id} = useParams();
    const [menuItem, setMenuItem] = useState(null);
    const [redirectToItems, setRedirectToItems] = useState(false);
    const {loading, data} = useProfile();

    useEffect(() => {
        fetch('/api/menu-items?id='+id).then(response => {
            response.json().then(item => {
                setMenuItem(item);
            });
        })
    }, []);

    async function handleFormSubmit(ev, fields) {
        ev.preventDefault();
        const data = {...fields, _id: id};
        const savingPromise = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/menu-items', {
                method: 'PUT',
                body: JSON.stringify(data),
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

    async function handleDeleteClick() {
        const delPromise = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/menu-items?_id='+id, {
                method: 'DELETE',
            });
            if (response.ok) {
                resolve();
            } else {
                reject();
            }
        });
        await toast.promise(delPromise, {
            loading: 'Deleting...',
            success: 'Menu item deleted!',
            error: 'Got an error, please try again.',
        })
        setRedirectToItems(true);
    }

    if (redirectToItems) {
        return redirect('/menu-items');
    }

    if (loading || !menuItem) {
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
            <MenuItemForm menuItem={menuItem} onSubmit={handleFormSubmit}/>
            <div className="max-w-xl mt-2">
                <div className="ml-auto" style={{maxWidth: '21.5rem'}}>
                    <DeleteButton label="Delete this menu item" onDelete={handleDeleteClick} />
                </div>
            </div>
        </section>
    );
}
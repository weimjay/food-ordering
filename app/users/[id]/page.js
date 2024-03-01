"use client";
import {useEffect, useState} from "react";
import useProfile from "@/components/UseProfile";
import UserTabs from "@/components/layout/UserTabs";
import UserForm from "@/components/layout/UserForm";
import {useParams} from "next/navigation";
import toast from "react-hot-toast";

export default function EditUserPage() {

    const [user, setUser] = useState(null);
    const {loading, data} = useProfile();
    const {id} = useParams();

    useEffect(() => {
        fetch('/api/users/'+id).then(response => {
            response.json().then(user => {
                setUser(user);
            })
        });
    }, [loading]);

    function handleSaveUser(ev, data) {
        ev.preventDefault();
        const savingPromise = new Promise(async (resolve, reject) => {
            const res = await fetch('/api/users/'+id, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data),
            });
            if (res.ok) {
                resolve();
            } else {
                reject();
            }
            await toast.promise(savingPromise, {
                loading: 'Saving...',
                success: 'User saved!',
                error: 'Got an error, please try again.',
            })
        });
    }

    if (loading || !user) {
        return 'Profile loading!';
    }

    if (!data.admin) {
        return 'Unauthorized!';
    }

    return (
        <section className="max-w-2xl mx-auto mt-8">
            <UserTabs isAdmin={data.admin} />
            <div className="mt-8">
                <UserForm user={user} onSubmit={handleSaveUser}/>
            </div>
        </section>
    );
}
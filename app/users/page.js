"use client";
import UserTabs from "@/components/layout/UserTabs";
import useProfile from "@/components/UseProfile";
import {useEffect, useState} from "react";
import Link from "next/link";

export default function UsersPage() {

    const [users, setUsers] = useState([]);
    const {loading, data} = useProfile();

    useEffect(() => {
        fetch('/api/users').then(response => {
           response.json().then(users => {
               console.log('Users: ', users);
                setUsers(users);
           })
        });
    }, [loading]);

    if (loading) {
        return 'Profile loading!';
    }

    if (!data.admin) {
        return 'Unauthorized!';
    }

    return (
        <section className="max-w-2xl mx-auto mt-8">
            <UserTabs isAdmin={data.admin}/>
            <div className="mt-8">
                {users?.length > 0 && users.map(user => (
                    <div key={user._id} className="bg-gray-100 rounded-lg mb-2 p-1 px-4 flex items-center gap-4">
                        <div className="grid grid-cols-2 md:grid-cols-3 grow">
                            <div className="text-gray-900">
                                {user.name && (<span>{user.name}</span>)}
                                {!user.name && (<span className="italic">No name</span>)}
                            </div>
                            <span className="text-gray-500">{user.email}</span>
                        </div>
                        <div>
                            <Link className="button" href={'/users/'+user._id}>Edit</Link>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
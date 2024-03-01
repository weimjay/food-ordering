"use client";
import {useSession} from "next-auth/react";
import {redirect} from "next/navigation";
import Image from 'next/image';
import {useEffect, useState} from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import UserTabs from "@/components/layout/UserTabs";
import EditableImage from "@/components/layout/EditableImage";
import UserForm from "@/components/layout/UserForm";

export default function ProfilePage() {
    const session = useSession();

    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [profileFetched, setProfileFetched] = useState(false);
    const {status} = session;

    useEffect(() => {
        if (status === 'authenticated') {
            fetch('/api/profile').then(response => {
                response.json().then(profile => {
                    setUser(profile);
                    setIsAdmin(profile.admin);
                    setProfileFetched(true);
                })
            });
        }
    }, [session, status]);

    if (status === 'loading' || !profileFetched) {
        return 'Loading';
    }

    if (status === 'unauthenticated') {
        return redirect('/login');
    }

    async function handleProfileUpdate(ev, data) {
        ev.preventDefault();
        const savingPromise = new Promise(async (resolve, reject) => {
            const res = await fetch('/api/profile', {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data),
            })
            if (res.ok) {
                resolve();
            } else {
                reject();
            }
        });
        await toast.promise(savingPromise, {
            loading: 'Saving...',
            success: 'Profile saved!',
            error: 'Got an error, please try again.',
        })
    }

    return (
        <section className="mt-8">
            <UserTabs isAdmin={isAdmin} />
            <div className="max-w-2xl mx-auto mt-8">
                <UserForm user={user} onSubmit={handleProfileUpdate}/>
            </div>
        </section>
    );
}
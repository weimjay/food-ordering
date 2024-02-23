"use client";
import {useSession} from "next-auth/react";
import {redirect} from "next/navigation";
import Image from 'next/image';
import {useEffect, useState} from "react";

export default function ProfilePage() {
    const session = useSession();
    const [userName, setUserName] = useState('');
    const [image, setImage] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [saved, setSaved] = useState(false);

    const {status} = session;

    useEffect(() => {
        if (status === 'authenticated') {
            setUserName(session.data.user.name);
            setImage(session.data.user.image);
        }
    }, [session, status]);

    async function handleAvatarChange(ev) {
        setIsUploading(true);
        const files = ev.target.files;
        if (files?.length === 1) {
            const data = new FormData;
            data.set('file', files[0]);
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: data,
            })
            const resData = await res.json();
            if (resData.ok && resData.filepath) {
                setImage(resData.filepath);
            }
        }
        setIsUploading(false);
    }

    if (status === 'loading') {
        return 'Loading';
    }

    if (status === 'unauthenticated') {
        return redirect('/login');
    }

    async function handleProfileUpdate(ev) {
        ev.preventDefault();
        setIsSaving(true);
        setSaved(false);
        const res = await fetch('/api/profile', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({name: userName, image}),
        })
        if (res.ok) {
            setSaved(true);
        }
        setIsSaving(false);
    }

    return (
        <section className="mt-8">
            <h1 className="text-center text-primary text-4xl mb-4">
                Profile
            </h1>
            <div className="max-w-md mx-auto">
                {saved && (
                    <h2 className="text-center bg-green-100 p-4 rounded-lg border-2 border-green-300">
                        Profile saved!
                    </h2>
                )}
                {isSaving && (
                    <h2 className="text-center bg-blue-100 p-4 rounded-lg border-2 border-blue-300">
                        Saving!
                    </h2>
                )}
                <div className="flex gap-4 items-center">
                    <div>
                        <div className="p-2 rounded-lg relative">
                            {image && (
                                <Image className="rounded-lg mb-1" src={image}
                                       width={80} height={80} alt={'avatar'} />
                            )}
                            <label>
                                <input type="file" className="hidden" onChange={handleAvatarChange}/>
                                <span className="block border border-gray-300 rounded-lg p-2
                                text-center cursor-pointer">Edit</span>
                            </label>
                        </div>
                    </div>

                    <form className="grow" onSubmit={handleProfileUpdate}>
                        <input type="text" placeholder="First and last name" value={userName}
                               onChange={ev => setUserName(ev.target.value)}/>
                        <input type="text" disabled={true} value={session.data.user.email}/>
                        <button type={"submit"}>Save</button>
                    </form>
                </div>
            </div>
        </section>
    );
}
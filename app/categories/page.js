"use client";
import UserTabs from "@/components/layout/UserTabs";
import {useEffect, useState} from "react";
import useProfile from "@/components/UseProfile";
import toast from "react-hot-toast";
import DeleteButton from "@/components/DeleteButton";

export default function CategoriesPage() {
    const [cateName, setCateName] = useState('');
    const [categories, setCategories] = useState('');
    const {loading: profileLoading, data: profile} = useProfile();
    const [editCate, setEditCate] = useState(null);

    useEffect(() => {
        fetchCategories();
    }, []);

    function fetchCategories() {
        fetch('/api/categories').then(response => {
            response.json().then(categories => {
                setCategories(categories);
            })
        })
    }

    async function handleCateSubmit(ev) {
        ev.preventDefault();
        const createPromise = new Promise(async (resolve, reject) => {
            const data = {name: cateName};
            if (editCate) {
                data._id = editCate._id;
            }
            const res = await fetch('/api/categories', {
                method: editCate ? 'PUT' : 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data),
            })
            setCateName('');
            fetchCategories();
            if (res.ok) {
                resolve();
            } else {
                reject();
            }
        })
        await toast.promise(createPromise, {
            loading: editCate ? 'Updating category...' : 'Creating new category...',
            success: editCate ? 'Category updated' : 'Category created',
            error: 'Got an error, please try again.'
        })
    }

    async function handleDeleteClick(_id) {
        const delPromise = new Promise(async (resolve, reject) => {
            const response = await fetch('api/categories?_id='+_id, {
                method: 'DELETE',
            });
            if (response.ok) {
                resolve();
            } else {
                reject();
            }
        })
        await toast.promise(delPromise, {
            loading: 'Deleting...',
            success: 'Deleted',
            error: 'Got an error, please try again.'
        })
        fetchCategories();
    }

    if (profileLoading) {
        return 'Profile loading!';
    }

    if (!profile.admin) {
        return 'Unauthorized!';
    }

    return (
        <section className="mt-8 max-w-2xl mx-auto">
            <UserTabs isAdmin={profile.admin} />
            <form className="mt-8" onSubmit={handleCateSubmit}>
                <div className="flex gap-2 items-end">
                    <div className="grow">
                        <label>
                            {editCate ? 'Update category' : 'New category name'}
                            {editCate && (
                                <>: <b>{editCate.name}</b></>
                            )}
                        </label>
                        <input type="text" value={cateName}
                               onChange={ev => setCateName(ev.target.value)}/>
                    </div>
                    <div className="pb-3 flex gap-2">
                        <button type="submit">{editCate ? 'Update' : 'Create'}</button>
                        <button type="button" onClick={() => {
                            setEditCate(null);
                            setCateName('');
                        }}>Cancel</button>
                    </div>
                </div>
            </form>
            <div>
                <h2 className="mt-8 text-sm text-gray-500">Existing categories</h2>
                {categories?.length > 0 && categories.map(c => (
                    <div className="bg-gray-100 rounded-lg p-2 px-4 flex items-center gap-1 mb-2" key={c._id}>
                        <div className="grow">{c.name}</div>
                        <div className="flex gap-1">
                            <button type="button" onClick={() => {
                                setEditCate(c);
                                setCateName(c.name);
                            }}>Edit</button>
                            <DeleteButton label="Delete" onDelete={() => handleDeleteClick(c._id)}/>
                        </div>
                    </div>
                ))}
            </div>


        </section>
    );
}
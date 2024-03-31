"use client";
import {useEffect, useState} from "react";
import SectionHeaders from "@/components/layout/SectionHeaders";
import MenuItem from "@/components/menu/MenuItem";

export default function MenuPage() {

    const [categories, setCategories] = useState([]);
    const [menuItems, setMenuItems] = useState([]);

    useEffect(() => {
        fetch('/api/categories').then(response => {
            response.json().then(categories => setCategories(categories.filter(v => v.name !== 'Deals')));
        })
        fetch('/api/menu-items').then(response => {
            response.json().then(menuItems => setMenuItems(menuItems));
        })
    }, []);

    return (
        <section className="menu mt-8">
            {categories?.length > 0 && categories.map(cate => (
                <div key={cate._id}>
                    <div className="text-center">
                        <SectionHeaders mainHeader={cate.name}/>
                    </div>
                    <div className="menu-list grid grid-cols-3 gap-4 mt-4 mb-12">
                        {menuItems.filter(item => item.category === cate._id).map(item => (
                            <MenuItem key={item._id} {...item} />
                        ))}
                    </div>
                </div>
            ))}
        </section>
    );
}
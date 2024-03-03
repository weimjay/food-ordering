"use client";
import Image from "next/image";
import MenuItem from "@/components/menu/MenuItem";
import SectionHeaders from "@/components/layout/SectionHeaders";
import {useEffect, useState} from "react";

export default function HomeMenu() {

    const [bestSellers, setBestSellers] = useState([]);
    useEffect(() => {
        fetch('/api/menu-items').then(response => {
            response.json().then(items => {
                const pizzaCategory = items[0].category;
                const bestSellers = items.filter(v => v.category === pizzaCategory).slice(-3);
                setBestSellers(bestSellers);
            });
        })
    }, []);

    return (
        <section className="">
            <div className="absolute  left-0 right-0 w-full justify-start">
                <div className="absolute left-0 -top-[70px] text-left -z-10">
                    <Image src={'/salad1.png'} width={109} height={189} alt={'salad'}/>
                </div>
                <div className="absolute right-0 -top-[100px] -z-10">
                    <Image src={'/salad2.png'} width={109} height={189} alt={'salad'}/>
                </div>
            </div>
            <div className="text-center mb-4">
                <SectionHeaders subHeader={'Check out'} mainHeader={'Our Best Sellers'} />
            </div>
            <div className="grid grid-cols-3 gap-4">
                {bestSellers?.length > 0 && bestSellers.map(item => (
                    <MenuItem key={item._id} {...item}/>
                ))}
            </div>
        </section>
    );
}
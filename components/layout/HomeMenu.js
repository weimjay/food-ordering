"use client";
import Image from "next/image";
import MenuItem from "@/components/menu/MenuItem";
import SectionHeaders from "@/components/layout/SectionHeaders";
import {useEffect, useState} from "react";

export default function HomeMenu() {

    const [bestSellers, setBestSellers] = useState([]);
    const [deals, setDeals] = useState([]);
    useEffect(() => {
        fetch('/api/menu-items').then(response => {
            response.json().then(items => {
                const bestSellers = items.filter(v => v.tag === 'best-seller').slice(-3);
                setBestSellers(bestSellers);
                const deals = items.filter(v => v.tag === 'deals').slice(-3);
                setDeals(deals);
            });
        })
    }, []);

    return (
        <section className="home-menu">
            <div className="absolute left-0 right-0 w-full justify-start">
                <div className="absolute left-0 -top-[70px] text-left -z-10">
                    <Image src={'/salad1.png'} width={109} height={189} alt={'salad'}/>
                </div>
                <div className="absolute right-0 -top-[100px] -z-10">
                    <Image src={'/salad2.png'} width={109} height={189} alt={'salad'}/>
                </div>
            </div>
            <div className="text-center mb-4 pt-4">
                <SectionHeaders subHeader={'Check out'} mainHeader={'Our Best Sellers'} />
            </div>
            <div className="best-seller grid grid-cols-3 gap-4">
                {bestSellers?.length > 0 && bestSellers.map(item => (
                    <MenuItem key={item._id} {...item}/>
                ))}
            </div>
            {deals.length > 0 && (
                <section className="text-center my-16">
                    <div className="mb-4">
                        <SectionHeaders subHeader={'Deals'} mainHeader={'More offers, deals'}/>
                    </div>
                    <div className="deals grid grid-cols-3 gap-4">
                        {deals.map(item => (<MenuItem key={item._id} {...item}/>))}
                    </div>
                </section>

            )}
        </section>
    );
}
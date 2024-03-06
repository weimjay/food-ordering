"use client";
import UserTabs from "@/components/layout/UserTabs";
import useProfile from "@/components/UseProfile";
import {useEffect, useState} from "react";
import {dbTimeForHuman} from "@/libs/datetime";
import Link from "next/link";

export default function OrdersPage() {

    const [orders, setOrders] = useState([]);
    const [loadingOrders, setLoadingOrders] = useState(true);
    const {loading, data: profile} = useProfile();

    useEffect(() => {
        fetchOrders();
    }, []);

    function fetchOrders() {
        fetch('/api/orders').then(response => {
            setLoadingOrders(true);
            response.json().then(orders => {
                setOrders(orders.reverse());
                setLoadingOrders(false);
            })
        })
    }

    return (
        <section className="mt-8 max-w-max mx-auto">
            <UserTabs isAdmin={profile.admin}/>
            <div className="mt-8">
                {loadingOrders && (
                    <div>Loading orders...</div>
                )}
                {orders?.length > 0 && orders.map(order => (
                    <div key={order._id} className="bg-gray-100 mb-2 p-4 rounded-lg flex flex-col md:flex-row items-center gap-5">
                        <div className="grow flex flex-col md:flex-row items-center gap-5">
                            <div>
                                <div className={
                                    (order.paid ? 'bg-green-500' : 'bg-red-400')
                                    + ' p-2 rounded-md text-white w-24 text-center'
                                }>
                                    {order.paid ? 'Paid' : 'Not paid'}
                                </div>
                            </div>
                            <div className="grow">
                                <div className="gap-2 items-center mb-1">
                                    <div className="grow">{order.email}</div>
                                    <div className="text-gray-500 text-xs max-w-80">
                                        {order.products.map(p => p.name).join(', ')}
                                    </div>
                                </div>
                            </div>
                            <div className="text-gray-500 text-sm font-semibold">${order.totalPrice}</div>
                            <div className="text-gray-500 text-sm">{dbTimeForHuman(order.createdAt)}</div>

                        </div>
                        <div className="border border-gray-300 px-2.5 py-2 rounded-xl text-gray-700 font-semibold">
                            <Link href={"/orders/" + order._id}>Show order</Link>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
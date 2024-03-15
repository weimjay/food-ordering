"use client";
import UserTabs from "@/components/layout/UserTabs";
import useProfile from "@/components/UseProfile";
import {useEffect, useState} from "react";
import {dbTimeForHuman} from "@/libs/datetime";
import Link from "next/link";
import Right from "@/components/icons/Right";

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
                    <div key={order._id} className="bg-gray-100 mb-2 p-3 rounded-lg grid justify-stretch items-center gap-4">
                        <div className="flex items-center gap-4 text-sm">
                            <div className={
                                (order.paid ? 'bg-green-500' : 'bg-red-400')
                                + ' py-2 rounded-md text-white w-1/6  text-center'
                            }>
                                {order.paid ? 'Paid' : 'Not paid'}
                            </div>
                            <div className="w-2/5">
                                <div className="gap-2 items-center mb-1">
                                    <div className="">{order.email}</div>
                                    <div className="text-gray-500 text-xs max-w-80">
                                        {order.products.map(p => p.name).join(', ')}
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-3 w-2/5">
                                <div className="text-gray-500 font-semibold w-1/3">${order.totalPrice}</div>
                                <div className="text-gray-500 ">{dbTimeForHuman(order.createdAt)}</div>
                            </div>
                            <div className="text-gray-600">
                                <Link href={"/orders/" + order._id}><Right /></Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
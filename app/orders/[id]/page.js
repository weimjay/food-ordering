"use client";
import SectionHeaders from "@/components/layout/SectionHeaders";
import {CartContext, cartProductPrice} from "@/components/AppContext";
import {useContext, useEffect, useState} from "react";
import {useParams} from "next/navigation";
import AddressInput from "@/components/layout/AddressInput";
import CartProduct from "@/components/menu/CartProduct";

export default function OrderPage() {
    const {clearCart} = useContext(CartContext);
    const [order, setOrder] = useState();
    const [loadingOrder, setLoadingOrder] = useState(true);
    const {id} = useParams();

    useEffect(() => {
        if (id) {
            setLoadingOrder(true);
            fetch('/api/orders?_id='+id).then(response => {
               response.json().then(orderData => {
                   setOrder(orderData);
                   setLoadingOrder(false);
               })
            });
        }
    }, []);

    let subtotal = 0;
    if (order?.products) {
        for (const product of order.products) {
            subtotal += cartProductPrice(product);
        }
    }

    return (
        <section className="max-w-2xl mx-auto mt-8">
            <div className="text-center">
                <SectionHeaders mainHeader="Your order" />
                <div className="mt-4 mb-8">
                    <p>Thanks for your order.</p>
                    <p>We will call you when your order will be on the way.</p>
                </div>
            </div>
            {loadingOrder && (
                <div>Loading order...</div>
            )}
            {order && (
                <div className="grid md:grid-cols-2 md:gap-16">
                    <div>
                        {order.products.map((product, index) => (
                            <CartProduct key={product._id + '-' + index} product={product} readonly={true}/>
                        ))}
                        <div className="text-right py-2 text-gray-500">
                            Subtotal:
                            <span className="text-black text-lg font-bold inline-block w-12">${subtotal}</span>
                            <br />
                            Delivery:
                            <span className="text-black text-lg font-bold inline-block w-12">$5</span>
                            <br />
                            <span className="text-primary font-bold">Total:</span>
                            <span className="text-primary text-lg font-bold inline-block w-12">
                                ${subtotal + 5}
                            </span>
                        </div>
                    </div>
                    <div>
                        <div className="bg-gray-100 p-4 rounded-lg">
                            <AddressInput disabled={true} addressProps={order?.address}/>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
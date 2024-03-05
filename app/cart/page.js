"use client";
import SectionHeaders from "@/components/layout/SectionHeaders";
import {useContext, useEffect, useState} from "react";
import Image from "next/image";
import {CartContext, cartProductPrice} from "@/components/AppContext";
import Trash from "@/components/icons/Trash";
import AddressInput from "@/components/layout/AddressInput";
import useProfile from "@/components/UseProfile";

export default function CartPage() {
    const {cartProducts, addToCart, decrCartQuantity, removeCartProduct} = useContext(CartContext);
    const [address, setAddress] = useState({phone: '', street: '', postcode: '', city: '', country: ''});
    const {data: profile} = useProfile();

    useEffect(() => {
        if (profile?.city) {
            const {phone, street, postcode, city, country} = profile;
            const addressFromProfile = {phone, street, postcode, city, country};
            setAddress(addressFromProfile);
        }
    }, [profile]);

    let totalPrice = 0;
    for (const p of cartProducts) {
        totalPrice += cartProductPrice(p);
    }
    function handleAddressChange(propName, value) {
        setAddress(prevAddress => {
            return {...prevAddress, [propName]: value};
        })
    }

    return (
        <section className="mt-8">
           <div className="text-center">
               <SectionHeaders mainHeader="Cart" />
           </div>
            <div className="mt-8 grid gap-8 grid-cols-2">
                <div>
                    {cartProducts?.length === 0 && (
                        <div>Empty here</div>
                    )}
                    {cartProducts?.length > 0 && cartProducts.map((product, index) => (
                        <div key={product._id} className="flex items-center gap-4 border-b py-4">
                            <div className="w-24">
                                <Image src={product.image} alt={''} width={240} height={240} />
                            </div>
                            <div className="grow">
                                <h3 className="font-semibold">{product.name}</h3>
                                {product.size && (
                                    <div className="text-sm">Size: <span>{product.size.name}</span></div>
                                )}
                                {product.extras?.length > 0 && (
                                    <div className="text-sm text-gray-500">
                                        {product.extras.map(extra => (
                                            <div>{extra.name} ${extra.price}</div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="rounded-full border w-8 h-8 flex items-center justify-center cursor-pointer"
                                    onClick={() => decrCartQuantity(product)}>-
                                </span>
                                <span className="m-2">{product.quantity}</span>
                                <span className="rounded-full border w-8 h-8 flex items-center justify-center cursor-pointer"
                                    onClick={() => addToCart(product, product.size, product.extras)}>+
                                </span>
                            </div>
                            <div className="text-lg font-semibold">
                                ${cartProductPrice(product)}
                            </div>
                            <div className="ml-2">
                                <button onClick={() => removeCartProduct(index)} className="p-2"><Trash/></button>
                            </div>
                        </div>
                    ))}
                    <div className="py-4 text-right pr-16">
                        <span className="text-gray-500">Subtotal:</span>
                        <span className="text-lg font-semibold pl-2">${totalPrice}</span>
                    </div>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg">
                    <h2 className="text-2xl mb-2">Checkout</h2>
                    <span>Address</span>
                    <form>
                        <AddressInput
                            addressProps={address}
                            setAddressProps={handleAddressChange}
                        />
                        <button type="submit">Pay ${totalPrice}</button>
                    </form>
                </div>
            </div>
        </section>
    );
}
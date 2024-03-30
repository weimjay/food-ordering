"use client";
import SectionHeaders from "@/components/layout/SectionHeaders";
import {useContext, useEffect, useState} from "react";
import Image from "next/image";
import {CartContext, cartProductPrice} from "@/components/AppContext";
import Trash from "@/components/icons/Trash";
import AddressInput from "@/components/layout/AddressInput";
import useProfile from "@/components/UseProfile";
import toast from "react-hot-toast";
import CartProduct from "@/components/menu/CartProduct";
import Link from "next/link";
import Right from "@/components/icons/Right";
import {getSession} from "next-auth/react";
import {usePathname, useRouter} from "next/navigation";

export default function CartPage() {
    const {cartProducts, addToCart, decrCartQuantity, removeCartProduct, clearCart} = useContext(CartContext);
    const cartCtx = {addToCart, decrCartQuantity, removeCartProduct, clearCart};
    const delivery = 5;
    const [address, setAddress] = useState({phone: '', street: '', postcode: '', city: '', country: ''});
    const {data: profile} = useProfile();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (profile?.city) {
            const {phone, street, postcode, city, country} = profile;
            const addressFromProfile = {phone, street, postcode, city, country};
            setAddress(addressFromProfile);
        }
    }, [profile]);

    let subTotal = 0;
    for (const p of cartProducts) {
        subTotal += cartProductPrice(p);
    }
    function handleAddressChange(propName, value) {
        setAddress(prevAddress => {
            return {...prevAddress, [propName]: value};
        })
    }
    async function handleCartCheckout(ev) {
        ev.preventDefault();
        const session = await getSession();
        if (!session) {
            toast('Please login first. Redirect in 2s...', {icon: '👉'});
            setTimeout(() => {
                router.push(`/login?referrer=${encodeURIComponent(pathname)}`);
            }, 2200);
            return;
        }
        const createPromise = new Promise( async (resolve, reject) => {
            const data = {cartProducts, subTotal, delivery, address}
            await fetch('/api/checkout', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data),
            }).then(response => {
                response.json().then(resData => {
                    if (resData.ok) {
                        clearCart();
                        resolve();
                        window.location = resData.redirect;
                    } else {
                        reject();
                    }
                });
            });
        })
        await toast.promise(createPromise, {
            loading: 'Preparing your order...',
            success: 'Redirecting to payment',
            error: 'Got an error, please try again.'
        })
    }

    return (
        <section className="mt-8">
           <div className="text-center">
               <SectionHeaders mainHeader="Cart" />
           </div>
            <div className="cart-container mt-8 grid gap-8 grid-cols-2">
                <div>
                    {cartProducts?.length === 0 && (
                        <div className="flex">
                            <div className="mr-2 text-gray-600">Your cart is empty...</div>
                            <Link className="flex text-primary items-center underline gap-1" href={'/menu'}>
                                Order now <Right/>
                            </Link>
                        </div>
                    )}
                    {cartProducts?.length > 0 && cartProducts.map((product, index) => (
                        <CartProduct key={product._id + "-" + index} product={product} index={index} {...cartCtx} />
                    ))}
                    {cartProducts?.length > 0 && (
                        <div className="cart-summary">
                            <table className="w-full text-right border-collapse">
                                <tbody>
                                <tr>
                                    <td className="pt-2 pr-2 pl-32 text-gray-500">Subtotal:</td>
                                    <td className="pt-2 pr-1.5 text-lg text-right font-semibold">${subTotal}</td>
                                </tr>
                                <tr>
                                    <td className="pr-2 text-gray-500">Delivery:</td>
                                    <td className="pr-1.5 text-lg text-right font-semibold">${delivery}</td>
                                </tr>
                                <tr className="text-primary text-lg font-semibold">
                                    <td className="py-1 pr-2">Total:</td>
                                    <td className="py-1 pr-1.5 text-right">${subTotal + delivery}
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
                {cartProducts?.length > 0 && (
                    <div className="bg-gray-100 p-4 rounded-lg">
                        <h2 className="text-2xl mb-2">Checkout</h2>
                        <span>Address</span>
                        <form>
                            <AddressInput
                                addressProps={address}
                                setAddressProps={handleAddressChange}
                            />
                            <button onClick={handleCartCheckout} type="submit">Pay ${subTotal + delivery}</button>
                        </form>
                    </div>
                )}
            </div>
        </section>
    );
}
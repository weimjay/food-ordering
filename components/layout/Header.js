"use client";
import Link from "next/link";
import {signOut, useSession} from "next-auth/react";
import {useContext, useState} from "react";
import {CartContext} from "@/components/AppContext";
import ShoppingCart from "@/components/icons/ShoppingCart";

export default function Header() {
    const session = useSession();
    const status = session.status;
    const userData = session.data?.user;
    let userName = userData?.name || userData?.email;
    if (userName && userName.includes(' ')) {
        userName = userName.split(' ')[0];
    }
    const [showSideMenu, setShowSideMenu] = useState(false);
    const {cartProducts} = useContext(CartContext);
    return (
        <header className="flex items-center justify-between">
            <nav className="flex items-center gap-8 text-gray-600 font-semibold">
                <Link className="logo text-primary font-semibold text-2xl" href="/">Casino PIZZA</Link>
                <div className="nav-menu flex gap-8">
                    <Link href={'/'}>Home</Link>
                    <Link href={'/menu'}>Menu</Link>
                    <Link href={'/#about'}>About</Link>
                    <Link href={'/#contact'}>Contact</Link>
                </div>
            </nav>
            <div id="js-hamburger" className="hamburger" title="Menu" onClick={() => setShowSideMenu(prev => !prev)}>
                <div id="js-top-line" className={`top-line ${showSideMenu ? 'active' : ''}`}></div>
                <div id="js-center-line" className={`center-line ${showSideMenu ? 'hidden' : ''}`}></div>
                <div id="js-bottom-line" className={`bottom-line ${showSideMenu ? 'active' : ''}`}></div>
            </div>
            {showSideMenu && (
                <nav className="side-nav" role="menubar">
                    <ul role="group" onClick={() => setShowSideMenu(prev => !prev)}>
                        <li role="menuitem">
                            <Link href={'/menu'}>Menu</Link>
                        </li>
                        {status === 'authenticated' && (
                            <li role="menuitem">
                                <Link href={'/orders'}>Orders</Link>
                            </li>
                        )}
                        <li role="menuitem">
                            <Link href={'/#about'}>About</Link>
                        </li>
                        <li role="menuitem">
                            <Link href={'/#contact'}>Contact</Link>
                        </li>
                    </ul>
                </nav>
            )}

            <nav className="auth-nav flex items-center gap-4 text-gray-600 font-semibold">
                {status === 'authenticated' && (
                    <>
                        <Link href={'/profile'} className="whitespace-nowrap">
                            <div className="pc-profile">Hello, {userName}</div>
                            <div className="mb-profile">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                                </svg>
                            </div>
                        </Link>
                        <button onClick={() => signOut({callbackUrl: '/'})}
                                className="auth-btn bg-primary border-primary rounded-full text-white px-8 py-2">Logout
                        </button>
                    </>

                )}
                {status === 'unauthenticated' && (
                    <>
                        <Link href={'/login'}>Login</Link>
                        <Link href={'/register'}
                              className="auth-btn bg-primary rounded-full text-white px-8 py-2">Register</Link>
                    </>
                )}

                <Link href={'/cart'} className="relative">
                    <ShoppingCart/>
                    <span
                        className="absolute -top-2 -right-4 w-5 h-5 bg-primary text-white text-xs flex items-center justify-center py-1 px-1 rounded-full">
                        {cartProducts?.reduce((accumulator, currentItem) => accumulator + currentItem.quantity, 0)}
                    </span>
                </Link>

            </nav>
        </header>
    )
}
'use client'
import Link from "next/link";
import { useState } from "react";
// import "logoDEIA.svg"

const Navbar = () => {
    const [isClick, setisClick] = useState(false);

    const toggleNavBar = (): void => {
        setisClick(!isClick);
    }

    return (
        <>
            <nav className="bg-white shadow-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center justify-center w-full">
                            <div className="flex-shrink-0">
                                <Link href="/" className="text-white text-center">DEIA</Link>
                            </div>
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-4 flex items-center px-4 py-3 rounded-md  space-x-4 bg-secondary">
                                <Link href="./login" className="text-white hover:bg-white hover:text-primary rounded-lg">Login</Link>
                            </div>
                        </div>
                        <div className="md:hidden flex items-center">
                            <button className="inline-flex items-center justify-center p-2 rounded-md text-white md:text-white hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                onClick={toggleNavBar}>
                                {isClick ? (
                                    <div className="bg-red-400">Logo1</div>
                                ) : (
                                    <div className="bg-green-600">Logo2</div>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
                {isClick && (
                    <div className="md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            <div className="ml-4 flex items-center space-x-4">
                                <Link href="./login" className="block text-white hover:bg-white hover:text-black rounded-lg">Login</Link>
                            </div>
                        </div>
                    </div>
                )}
            </nav>
        </>
    );
}

export default Navbar;
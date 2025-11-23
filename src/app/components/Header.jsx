"use client"
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

const Header = () => {
    const [user, setUser] = useState(false)
    const [loading, setLoading] = useState(false)


    return (
        <div>
            <section className="py-5 bg-white">
            <div className="container">
                <div className="flex justify-between items-center">
                    <div>
                        <Link href={'/'} className='text-2xl font-semibold text-gray-900'>SkillSwap</Link>
                    </div>
                    <div>
                        <nav>
                            <ul>
                                <li><Link href="/" className='text-gray-800'>Home</Link></li>
                            </ul>
                        </nav>
                    </div>
                    <div className="flex items-center gap-4">
                        {user && !loading ? (
                            <div className="relative">
                                <div className="flex gap-5">
                                    <Link
                                        href={'/profile'}
                                        className="flex items-center gap-2 group"
                                    >
                                        <Image
                                            src={''}
                                            alt={''}
                                            className="peer w-8 h-8 rounded-full"
                                        />

                                        <div className="peer-hover:block hidden absolute right-1/2 top-full mt-2 z-50 w-48 bg-white border border-gray-100 rounded-lg shadow-lg p-2">
                                            <p className="px-4 py-2 text-sm font-medium text-gray-900">{'Rahat Hossain'}</p>
                                        </div>
                                    </Link>
                                    <button
                                        className="px-3 cursor-pointer py-2 rounded-lg bg-red-500 text-white"
                                    >
                                        Logout
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className='flex gap-2'>
                                    <Link href={'/auth/sign-in'} className="hidden text-gray-900 sm:inline-flex bg-transparent hover:text-white duration-200 border hover:bg-gray-900 border-gray-900 px-4 py-2 rounded-lg">
                                        Sign In
                                    </Link>
                                    <Link className='px-4 py-2 rounded-lg bg-gray-900 text-white' href={'/auth/sign-up'}>Sign Up</Link>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </section>
        </div>
    );
};

export default Header;
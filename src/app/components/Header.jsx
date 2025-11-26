"use client"
import { useCart } from '@/hook/useCart';
import { Menu, ShoppingCart, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

const Header = () => {

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const { cartItems } = useCart()
    const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

    return (
        <div>
            <header className="border-b border-border sticky top-0 z-50 bg-background">
                <nav className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
                    <Link href="/" className="text-2xl font-bold text-blue-600">
                        ShopHub
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link href="/" className="hover:text-blue-600 transition">
                            Home
                        </Link>
                        <Link href="/products" className="hover:text-blue-600 transition">
                            Products
                        </Link>
                        <Link href="/login" className="hover:text-blue-600 transition">
                            Sign In
                        </Link>
                        <Link href="/admin" className="hover:text-blue-600 transition">
                            Admin
                        </Link>
                    </div>

                    {/* Cart & Mobile Menu */}
                    <div className="flex items-center gap-4">
                        <Link href="/cart">
                            <button className="relative">
                                <ShoppingCart className="w-6 h-6" />
                                {cartCount > 0 && (
                                    <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                        {cartCount}
                                    </span>
                                )}
                            </button>
                        </Link>

                        {/* Mobile Menu Button */}
                        <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </nav>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden border-t border-border">
                        <div className="px-4 py-4 space-y-4">
                            <Link href="/" className="block hover:text-blue-600">
                                Home
                            </Link>
                            <Link href="/products" className="block hover:text-blue-600">
                                Products
                            </Link>
                            <Link href="/login" className="block hover:text-blue-600">
                                Sign In
                            </Link>
                            <Link href="/admin" className="block hover:text-blue-600">
                                Admin
                            </Link>
                        </div>
                    </div>
                )}
            </header>
        </div>
    );
};

export default Header;
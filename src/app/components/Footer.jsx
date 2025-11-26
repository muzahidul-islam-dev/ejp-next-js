"use client"
import { Facebook, Linkedin, Mail, Phone, Twitter } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const Footer = () => {
    const currentYear = new Date().getFullYear()
    return (
        <div>
            <footer className="bg-slate-900 text-slate-200 border-t border-slate-700">
                <div className="max-w-6xl mx-auto px-4 py-16">
                    {/* Footer Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                        {/* Brand */}
                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold text-white">ShopHub</h3>
                            <p className="text-slate-400">Your trusted online shopping destination for premium products.</p>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
                            <ul className="space-y-2">
                                <li>
                                    <Link href="/" className="text-slate-400 hover:text-white transition">
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/products" className="text-slate-400 hover:text-white transition">
                                        Products
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/cart" className="text-slate-400 hover:text-white transition">
                                        Cart
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Customer Service */}
                        <div>
                            <h4 className="font-semibold text-white mb-4">Customer Service</h4>
                            <ul className="space-y-2">
                                <li>
                                    <Link href="/login" className="text-slate-400 hover:text-white transition">
                                        Sign In
                                    </Link>
                                </li>
                                <li>
                                    <a href="mailto:support@shophub.com" className="text-slate-400 hover:text-white transition">
                                        Contact Us
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-slate-400 hover:text-white transition">
                                        FAQ
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Legal */}
                        <div>
                            <h4 className="font-semibold text-white mb-4">Legal</h4>
                            <ul className="space-y-2">
                                <li>
                                    <a href="#" className="text-slate-400 hover:text-white transition">
                                        Privacy Policy
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-slate-400 hover:text-white transition">
                                        Terms of Service
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-slate-400 hover:text-white transition">
                                        Shipping Info
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-slate-700 pt-8">
                        <p className="text-center text-slate-400">&copy; {currentYear} ShopHub. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Footer;
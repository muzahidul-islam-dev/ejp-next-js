"use client"
import { Facebook, Linkedin, Mail, Phone, Twitter } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const Footer = () => {
    return (
        <div>
            <footer className="bg-gray-900 text-white py-12">
            <div className="container">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    <div>
                        <h3 className="font-bold text-lg mb-4">Contact Us</h3>
                        <div className="flex items-center gap-2 mb-2">
                            <Mail size={18} />
                            <a href="mailto:rahat1470.com@gmail.com">
                                rahat1470.com@gmail.com
                            </a>
                        </div>
                        <div className="flex items-center gap-2">
                            <Phone size={18} />
                            <a href="tel:+8801907641877">
                                +8801907641877
                            </a>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-bold text-lg mb-4">Follow Us</h3>
                        <div className="flex gap-4">
                            <a href="#">
                                <Facebook size={24} />
                            </a>
                            <a href="#">
                                <Twitter size={24} />
                            </a>
                            <a href="#">
                                <Linkedin size={24} />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-bold text-lg mb-4">Legal</h3>
                        <div className="space-y-2">
                            <Link href="#" className="block">
                                Privacy Policy
                            </Link>
                            <Link href="#" className="block">
                                Terms of Service
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
                    <p>&copy; {new Date().getFullYear()} SkillSwap. All rights reserved.</p>
                </div>
            </div>
        </footer>
        </div>
    );
};

export default Footer;
'use client';

import Link from 'next/link';
import { ChevronRight, MapPin, Phone, Mail, ChevronDown } from 'lucide-react';
import { useState } from 'react';

export default function EnquiryPage() {
    return (
        <main className="font-sans text-zinc-800">
            {/* 1. Breadcrumb Section */}
            <section className="relative bg-amber-50 py-20 overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    {/* Placeholder for shapes if needed */}
                </div>

                <div className="container mx-auto px-4 relative z-10 text-center">
                    <h2 className="text-4xl font-bold text-zinc-900 mb-4">My Enquiry</h2>
                    <div className="flex items-center justify-center gap-2 text-sm font-semibold">
                        <Link href="/" className="text-zinc-500 hover:text-primary transition">Home</Link>
                        <ChevronRight size={14} className="text-zinc-400" />
                        <span className="text-primary">My Enquiry</span>
                    </div>
                </div>
            </section>

            {/* 2. Contact Info Cards */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Address */}
                        <div className="p-8 rounded-xl border border-zinc-100 shadow-sm hover:shadow-md transition text-center group">
                            <div className="w-16 h-16 mx-auto bg-primary/5 text-primary rounded-full flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition duration-300">
                                <MapPin size={28} />
                            </div>
                            <h4 className="text-xl font-bold text-zinc-900 mb-4">Our Address</h4>
                            <p className="text-zinc-500 leading-relaxed px-4">
                                102, 1st Flr, Navnidhi Indl. Premises Society Ltd., A.D. Marg, Sewree(W), Mumbai - 400 015.
                            </p>
                        </div>

                        {/* Phone */}
                        <div className="p-8 rounded-xl border border-zinc-100 shadow-sm hover:shadow-md transition text-center group">
                            <div className="w-16 h-16 mx-auto bg-primary/5 text-primary rounded-full flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition duration-300">
                                <Phone size={28} />
                            </div>
                            <h4 className="text-xl font-bold text-zinc-900 mb-4">Contact Us</h4>
                            <a href="tel:+91-22-224142646" className="text-zinc-500 hover:text-primary font-medium text-lg">
                                +91-22-224142646
                            </a>
                        </div>

                        {/* Email */}
                        <div className="p-8 rounded-xl border border-zinc-100 shadow-sm hover:shadow-md transition text-center group">
                            <div className="w-16 h-16 mx-auto bg-primary/5 text-primary rounded-full flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition duration-300">
                                <Mail size={28} />
                            </div>
                            <h4 className="text-xl font-bold text-zinc-900 mb-4">Email Us</h4>
                            <a href="mailto:info@rktransport.in" className="text-zinc-500 hover:text-primary font-medium text-lg">
                                info@rktransport.in
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Map Section */}
            <div className="w-full h-[450px] bg-zinc-100">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2026.2318475481811!2d72.84966993873073!3d18.99875693164676!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7cf4ebd0bfcad%3A0x96384a33f88597c!2sR%20K%20Transport%20Service!5e1!3m2!1sen!2sin!4v1766482966038!5m2!1sen!2sin"
                    className="w-full h-full border-0"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade">
                </iframe>
            </div>

            {/* 4. Contact Form Section */}
            <section className="py-24 bg-white relative -mt-20 z-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto bg-amber-50 rounded-2xl p-12 shadow-xl border border-amber-100">
                        <div className="text-center mb-10">
                            <h4 className="text-3xl font-bold text-zinc-900 mb-4">Send Us Message</h4>
                            <p className="text-zinc-500">Your email address will not be published. Required fields are marked *</p>
                        </div>

                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <input type="text" placeholder="First Name*" required className="w-full p-4 bg-white rounded-lg border border-zinc-200 outline-none focus:border-primary transition shadow-sm" />
                                <input type="text" placeholder="Last Name" className="w-full p-4 bg-white rounded-lg border border-zinc-200 outline-none focus:border-primary transition shadow-sm" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <input type="email" placeholder="Email*" required className="w-full p-4 bg-white rounded-lg border border-zinc-200 outline-none focus:border-primary transition shadow-sm" />
                                <div className="relative">
                                    <select className="w-full p-4 bg-white rounded-lg border border-zinc-200 outline-none focus:border-primary transition shadow-sm appearance-none cursor-pointer text-zinc-500">
                                        <option>Service Type</option>
                                        <option value="Lubricant & Additives">Lubricant & Additives</option>
                                        <option value="Hazard & Non-Hazard chemical">Hazard & Non-Hazard chemical</option>
                                        <option value="FMCG">FMCG</option>
                                        <option value="Industrial Oil">Industrial Oil</option>
                                    </select>
                                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" size={18} />
                                </div>
                            </div>
                            <textarea placeholder="Message" rows={6} className="w-full p-4 bg-white rounded-lg border border-zinc-200 outline-none focus:border-primary transition shadow-sm resize-none"></textarea>

                            <div className="text-left">
                                <button type="button" onClick={() => alert("Message sent successfully!")} className="px-10 py-4 bg-primary text-white font-bold rounded-full hover:bg-primary-light transition shadow-lg flex items-center gap-2 group">
                                    Submit Now <ChevronRight className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </main>
    );
}

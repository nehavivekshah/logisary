'use client';
import Link from 'next/link';
import { ChevronRight, ChevronLeft, Facebook, Linkedin, Instagram, Twitter, Share2 } from 'lucide-react';

export default function MembershipPage() {
    // Team data
    const teamMembers = [
        { name: "Alex Fargusion", role: "Manager", image: "bg-zinc-200" },
        { name: "Richad Stones", role: "Coordinator", image: "bg-zinc-300" },
        { name: "Pep Gurdiola", role: "Specialist", image: "bg-zinc-400" },
        { name: "Alex Fargusion", role: "Ceo & Funder", image: "bg-zinc-200" },
        { name: "Jyle Richardson", role: "Coordinator", image: "bg-zinc-300" },
        { name: "Kyle Richardson", role: "Courier", image: "bg-zinc-400" },
        { name: "Kyle Jamension", role: "Specialist", image: "bg-zinc-200" },
        { name: "Phill Foden", role: "Manager", image: "bg-zinc-300" },
    ];

    return (
        <main className="font-sans text-zinc-800 bg-white">
            {/* 1. Breadcrumb Section */}
            <section className="relative bg-amber-50 py-20 overflow-hidden text-center">
                <div className="container mx-auto px-4 relative z-10">
                    <h2 className="text-4xl font-bold text-zinc-900 mb-4">Membership</h2>
                    <div className="flex items-center justify-center gap-2 text-sm font-semibold">
                        <Link href="/" className="text-zinc-500 hover:text-primary transition">Home</Link>
                        <ChevronRight size={14} className="text-zinc-400" />
                        <span className="text-primary">Membership</span>
                    </div>
                </div>
            </section>

            {/* 2. Team Grid Section */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                        {teamMembers.map((member, index) => (
                            <div key={index} className="group relative">
                                {/* Image Container */}
                                <div className="relative overflow-hidden rounded-lg mb-0">
                                    {/* Placeholder Image */}
                                    <div className={`w-full aspect-[3/4] ${member.image} bg-cover bg-center transition-transform duration-500 group-hover:scale-105`}>
                                        <div className="w-full h-full flex items-center justify-center text-zinc-400 font-bold uppercase tracking-widest bg-zinc-100">
                                            IMAGE
                                        </div>
                                    </div>

                                    {/* Social Overlay */}
                                    <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/40 transition-all duration-300 flex items-center justify-center">
                                        <ul className="flex gap-2 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                                            <li><a href="#" className="w-10 h-10 bg-white text-zinc-900 hover:bg-primary-light hover:text-white rounded-full flex items-center justify-center transition-colors"><Twitter size={16} /></a></li>
                                            <li><a href="#" className="w-10 h-10 bg-white text-zinc-900 hover:bg-primary-light hover:text-white rounded-full flex items-center justify-center transition-colors"><Linkedin size={16} /></a></li>
                                            <li><a href="#" className="w-10 h-10 bg-white text-zinc-900 hover:bg-pink-600 hover:text-white rounded-full flex items-center justify-center transition-colors"><Instagram size={16} /></a></li>
                                            <li><a href="#" className="w-10 h-10 bg-white text-zinc-900 hover:bg-primary-light hover:text-white rounded-full flex items-center justify-center transition-colors"><Facebook size={16} /></a></li>
                                        </ul>
                                    </div>
                                </div>

                                {/* Content Box */}
                                <div className="relative mx-4 -mt-8 bg-white p-6 rounded-lg shadow-lg border-b-2 border-transparent group-hover:border-primary transition-all z-10 text-center">
                                    <h4 className="font-bold text-lg text-zinc-900 hover:text-primary transition-colors cursor-pointer">{member.name}</h4>
                                    <span className="text-zinc-500 text-sm block mb-0">{member.role}</span>

                                    <div className="absolute right-4 top-4 text-zinc-300">
                                        <Share2 size={16} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-center">
                        <div className="flex gap-2 items-center">
                            <button className="w-10 h-10 flex items-center justify-center rounded-full border border-zinc-200 text-zinc-500 hover:bg-primary hover:text-white hover:border-primary transition-all">
                                <ChevronLeft size={16} />
                            </button>
                            <button className="w-10 h-10 flex items-center justify-center rounded-full bg-primary text-white font-bold transition-all">
                                01
                            </button>
                            <button className="w-10 h-10 flex items-center justify-center rounded-full border border-zinc-200 text-zinc-500 hover:bg-primary hover:text-white hover:border-primary transition-all">
                                02
                            </button>
                            <span className="text-zinc-500 font-bold px-2">...</span>
                            <button className="w-10 h-10 flex items-center justify-center rounded-full border border-zinc-200 text-zinc-500 hover:bg-primary hover:text-white hover:border-primary transition-all">
                                12
                            </button>
                            <button className="w-10 h-10 flex items-center justify-center rounded-full border border-zinc-200 text-zinc-500 hover:bg-primary hover:text-white hover:border-primary transition-all">
                                <ChevronRight size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

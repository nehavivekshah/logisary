'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Search, Calendar, ChevronRight, Truck, Phone, Mail, MapPin, CheckCircle, Globe, Award, ShieldCheck, User, Facebook, Linkedin, Instagram, Twitter, Play } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/utils/api';

export default function LandingPage() {
    const router = useRouter();
    const [data, setData] = useState<any>({
        loads: [],
        vehicles: [],
        tenders: [],
        events: [],
        partners: []
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Check installation status first
        fetchData();
    }, [router]);

    const fetchData = async () => {
        try {
            const res = await api.get('/public/landing');
            setData(res);
        } catch (err: any) {
            console.error("Fetch data error:", err);
            setError('Unable to load latest data from server.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="font-sans text-zinc-800">
            {/* 1. KM Calculate / Quick Enquiry Section (Top Priority) */}
            <section className="py-12 bg-white border-b border-zinc-200">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row gap-6">

                        {/* Left Sidebar: Search & Ad */}
                        <div className="w-full lg:w-64 flex flex-col gap-6">
                            <div>
                                <h3 className="text-blue-900 font-bold uppercase text-xs mb-2 tracking-wider">SEARCH</h3>
                                <div className="flex">
                                    <input type="text" placeholder="search jobs..." className="w-full p-2 border border-zinc-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm" />
                                    <button className="bg-blue-900 text-white p-2 rounded-r-md hover:bg-blue-800 transition">
                                        <Search size={18} />
                                    </button>
                                </div>
                            </div>
                            <div className="h-64 bg-zinc-100 rounded-md flex items-center justify-center text-zinc-400 text-sm font-bold border border-zinc-300 shadow-inner">
                                ADVERTISEMENT
                            </div>
                        </div>

                        {/* Center: Quick Enquiry & Tables */}
                        <div className="flex-1 flex flex-col gap-6">
                            {/* Quick Enquiry Card */}
                            <div className="bg-white border border-zinc-200 rounded-lg shadow-sm p-6">
                                <h2 className="text-center text-lg font-bold text-zinc-900 mb-6 border-b pb-4">Quick Enquiry</h2>
                                <form className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-2">
                                                <label className="text-sm font-semibold w-24">From</label>
                                                <input type="text" className="flex-1 p-2 border border-zinc-300 rounded text-sm focus:border-blue-500 outline-none" />
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <label className="text-sm font-semibold w-24">To</label>
                                                <input type="text" className="flex-1 p-2 border border-zinc-300 rounded text-sm focus:border-blue-500 outline-none" />
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <label className="text-sm font-semibold w-24">Material</label>
                                                <input type="text" className="flex-1 p-2 border border-zinc-300 rounded text-sm focus:border-blue-500 outline-none" />
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <label className="text-sm font-semibold w-24">Vehicle Type</label>
                                                <select className="flex-1 p-2 border border-zinc-300 rounded text-sm bg-white focus:border-blue-500 outline-none">
                                                    <option>Select</option>
                                                    <option>Tanker</option>
                                                    <option>Container</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-2">
                                                <label className="text-sm font-semibold w-24">KL / MT</label>
                                                <input type="text" className="flex-1 p-2 border border-zinc-300 rounded text-sm focus:border-blue-500 outline-none" />
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <label className="text-sm font-semibold w-24">Date</label>
                                                <input type="date" className="flex-1 p-2 border border-zinc-300 rounded text-sm focus:border-blue-500 outline-none" />
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <label className="text-sm font-semibold w-24">Class</label>
                                                <input type="text" className="flex-1 p-2 border border-zinc-300 rounded text-sm focus:border-blue-500 outline-none" />
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <label className="text-sm font-semibold w-24">Mobile</label>
                                                <input type="text" className="flex-1 p-2 border border-zinc-300 rounded text-sm focus:border-blue-500 outline-none" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="pt-4 flex flex-col md:flex-row justify-between items-center gap-4">
                                        <div className="flex border border-blue-900 rounded overflow-hidden">
                                            <button type="button" className="px-6 py-2 bg-orange-500 text-white font-bold text-sm hover:bg-orange-600 transition">LOADS</button>
                                            <button type="button" className="px-6 py-2 bg-blue-900 text-white font-bold text-sm hover:bg-blue-800 transition">VEHICLES</button>
                                        </div>
                                        <div className="flex gap-2">
                                            <button type="button" className="px-4 py-2 border border-zinc-300 text-zinc-700 font-bold text-sm rounded hover:bg-zinc-50 transition">Check KM</button>
                                            <button type="button" className="px-6 py-2 bg-blue-900 text-white font-bold text-sm rounded hover:bg-blue-800 transition">Save & Proceed</button>
                                        </div>
                                    </div>
                                </form>
                            </div>

                            {/* Tables: Loads & Vehicles */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-white border border-zinc-200 rounded-lg shadow-sm">
                                    <h3 className="text-center font-bold py-3 border-b bg-zinc-50">Loads Available</h3>
                                    <div className="h-64 overflow-y-auto custom-scrollbar">
                                        <table className="w-full text-xs">
                                            <thead className="bg-zinc-100 sticky top-0">
                                                <tr>
                                                    <th className="p-2 text-left font-semibold">From</th>
                                                    <th className="p-2 text-left font-semibold">To</th>
                                                    <th className="p-2 text-left font-semibold">Capacity</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-zinc-100">
                                                {loading ? <tr className="p-2"><td colSpan={3} className="text-center p-2">Loading...</td></tr> :
                                                    data.loads.length > 0 ? data.loads.map((job: any, i: number) => (
                                                        <tr key={i} className="hover:bg-zinc-50">
                                                            <td className="p-2">{job.origin}</td>
                                                            <td className="p-2 text-zinc-600">{job.destination}</td>
                                                            <td className="p-2 text-zinc-500">{job.weight_volume}</td>
                                                        </tr>
                                                    )) : [1, 2, 3, 4, 5].map(i => (
                                                        <tr key={i} className="hover:bg-zinc-50">
                                                            <td className="p-2">Mumbai</td><td className="p-2">Chennai</td><td className="p-2">25MT</td>
                                                        </tr>
                                                    ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="bg-white border border-zinc-200 rounded-lg shadow-sm">
                                    <h3 className="text-center font-bold py-3 border-b bg-zinc-50">Vehicles Available</h3>
                                    <div className="h-64 overflow-y-auto custom-scrollbar">
                                        <table className="w-full text-xs">
                                            <thead className="bg-zinc-100 sticky top-0">
                                                <tr>
                                                    <th className="p-2 text-left font-semibold">From</th>
                                                    <th className="p-2 text-left font-semibold">To</th>
                                                    <th className="p-2 text-left font-semibold">Capacity</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-zinc-100">
                                                {loading ? <tr className="p-2"><td colSpan={3} className="text-center p-2">Loading...</td></tr> :
                                                    data.vehicles.length > 0 ? data.vehicles.map((v: any, i: number) => (
                                                        <tr key={i} className="hover:bg-zinc-50">
                                                            <td className="p-2">{v.company_name}</td>
                                                            <td className="p-2 text-zinc-600">Delhi</td>
                                                            <td className="p-2 text-zinc-500">20MT</td>
                                                        </tr>
                                                    )) : [1, 2, 3, 4, 5].map(i => (
                                                        <tr key={i} className="hover:bg-zinc-50">
                                                            <td className="p-2">Kolkata</td><td className="p-2">Delhi</td><td className="p-2">20MT</td>
                                                        </tr>
                                                    ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Sidebar: Tenders & Events */}
                        <div className="w-full lg:w-72 flex flex-col gap-4">
                            <div className="bg-white border border-zinc-200 rounded-lg shadow-sm p-4">
                                <h3 className="text-center font-bold text-zinc-800 mb-4 text-sm uppercase border-b pb-2">Public Tenders</h3>
                                <div className="h-64 overflow-y-auto custom-scrollbar space-y-2">
                                    {(data.tenders.length > 0 ? data.tenders : [1, 2, 3, 4, 5]).map((tender: any, i: number) => (
                                        <div key={i} className="border-b border-zinc-100 pb-2 last:border-0">
                                            <Link href="#" className="text-xs font-bold text-red-600 hover:underline block">25000244{i}</Link>
                                            <span className="text-[11px] font-semibold text-zinc-800 block leading-tight mt-1">LAB INFRA WORKS - MEP</span>
                                            <span className="text-[10px] text-zinc-500">Due: 15-Jan-2026</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="bg-white border border-zinc-200 rounded-lg shadow-sm p-4">
                                <h3 className="font-bold text-sm uppercase mb-3 border-b pb-2">Upcoming Events</h3>
                                <div className="space-y-3">
                                    <div className="flex items-start gap-2">
                                        <Calendar className="w-4 h-4 text-red-500 mt-0.5" />
                                        <div className="text-xs font-semibold text-zinc-600">Transport Expo 2026</div>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <Play className="w-4 h-4 text-red-500 mt-0.5" />
                                        <div className="text-xs font-semibold text-zinc-600">Liquid Safety Webinar</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. Hero Section (Replicating Slider Look) */}
            <section className="relative bg-amber-50 py-20 overflow-hidden">
                <div className="container mx-auto px-4 relative z-10">
                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <div className="md:w-1/2 space-y-6">
                            <span className="bg-blue-100 text-blue-900 px-4 py-1.5 rounded-full text-sm font-bold tracking-wide">RK Transportation</span>
                            <h1 className="text-4xl md:text-5xl font-extrabold text-zinc-900 leading-tight">
                                Specialists in Bulk Liquid & Chemical Transportation
                            </h1>
                            <p className="text-lg text-zinc-600 leading-relaxed">
                                We transport liquid chemicals, petrochemicals, solvents, FMCG liquids, and high-viscosity materials using advanced SS tankers.
                            </p>
                            <div className="flex gap-4 pt-4">
                                <Link href="/about" className="px-8 py-3 bg-blue-900 text-white rounded-full font-bold hover:bg-blue-800 transition shadow-lg flex items-center gap-2">
                                    About Us <ChevronRight size={18} />
                                </Link>
                                <Link href="/contact" className="px-8 py-3 border-2 border-blue-900 text-blue-900 rounded-full font-bold hover:bg-blue-50 transition flex items-center gap-2">
                                    Contact Us <ChevronRight size={18} />
                                </Link>
                            </div>
                        </div>
                        <div className="md:w-1/2 relative">
                            {/* Placeholder for truck image */}
                            <div className="relative z-10">
                                <Truck className="w-full h-64 text-blue-900 opacity-20" strokeWidth={0.5} />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <p className="text-zinc-400 font-bold bg-white/80 p-4 rounded uppercase">Truck Image Placeholder</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Decorative background elements would go here */}
            </section>

            {/* 3. About Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            {/* Counters Grid */}
                            <div className="grid grid-cols-2 gap-6">
                                <div className="bg-zinc-50 p-6 rounded-xl border border-zinc-100 text-center hover:shadow-md transition">
                                    <h3 className="text-3xl font-extrabold text-blue-900 mb-1">30+</h3>
                                    <p className="text-sm font-semibold text-zinc-500">Years Experience</p>
                                </div>
                                <div className="bg-zinc-50 p-6 rounded-xl border border-zinc-100 text-center hover:shadow-md transition">
                                    <h3 className="text-3xl font-extrabold text-blue-900 mb-1">1000+</h3>
                                    <p className="text-sm font-semibold text-zinc-500">Successful Shipments</p>
                                </div>
                                <div className="bg-zinc-50 p-6 rounded-xl border border-zinc-100 text-center hover:shadow-md transition">
                                    <h3 className="text-3xl font-extrabold text-blue-900 mb-1">500+</h3>
                                    <p className="text-sm font-semibold text-zinc-500">Satisfied Clients</p>
                                </div>
                                <div className="bg-zinc-50 p-6 rounded-xl border border-zinc-100 text-center hover:shadow-md transition">
                                    <h3 className="text-3xl font-extrabold text-blue-900 mb-1">2K+</h3>
                                    <p className="text-sm font-semibold text-zinc-500">Specialized Tankers</p>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-6">
                            <span className="bg-blue-100 text-blue-900 px-3 py-1 rounded-full text-xs font-bold uppercase">About Us</span>
                            <h2 className="text-4xl font-bold text-zinc-900 leading-tight">Your Trusted Partner in Bulk Liquid Transportation</h2>
                            <p className="text-zinc-600 leading-relaxed">
                                R. K. Transportation Services Pvt. Ltd. company based in Mumbai, has been formed to initially transporting Liquid bulk materials in tankers, All over India.
                            </p>
                            <div className="space-y-3">
                                {[
                                    'Pan India Liquid Transportation',
                                    'Specialized SS Tanker Fleet',
                                    'Chemical & Petrochemical Expertise',
                                    'Customer Focused Logistics Solutions'
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                            <CheckCircle size={14} />
                                        </div>
                                        <span className="font-semibold text-zinc-800">{item}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="bg-amber-50 p-6 rounded-lg border border-amber-100 italic text-zinc-600 text-sm">
                                "The company has been formed to provide other logistic service as well. Currently R. K. Transport Service has been serving continuously for more than 30 years."
                            </div>
                            <Link href="/about" className="inline-flex items-center gap-2 font-bold text-blue-900 hover:text-blue-700 transition">
                                Read More <ChevronRight size={18} />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. Service Section */}
            <section className="py-20 bg-amber-50">
                <div className="container mx-auto px-4 text-center max-w-4xl mb-12">
                    <span className="bg-blue-100 text-blue-900 px-3 py-1 rounded-full text-xs font-bold uppercase">Our Service</span>
                    <h2 className="text-3xl font-bold text-zinc-900 mt-4 mb-4">Our Range of Logistics Services</h2>
                    <p className="text-zinc-600">Our state-of-the-art facilities and innovative technology support e-commerce fulfillment and project cargo handling.</p>
                </div>
                <div className="container mx-auto px-4 max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { title: 'Lubricant & Additives', desc: 'Secure reliable and efficient solutions for lubricants across India.' },
                        { title: 'Hazard & Non-Hazard', desc: 'Compliant transportation for all chemical grades with zero contamination.' },
                        { title: 'FMCG', desc: 'Hygienic transportation solutions for consumer liquid products.' },
                        { title: 'Industrial Oil', desc: 'Specialized SS tankers for various grades of industrial oils.' }
                    ].map((s, i) => (
                        <div key={i} className="bg-white p-8 rounded-xl shadow-sm border border-zinc-100 hover:shadow-md transition group">
                            <div className="w-12 h-12 bg-blue-50 text-blue-900 rounded-lg flex items-center justify-center mb-6 group-hover:bg-blue-900 group-hover:text-white transition">
                                <Truck />
                            </div>
                            <h3 className="font-bold text-lg text-zinc-900 mb-3">{s.title}</h3>
                            <p className="text-sm text-zinc-500 leading-relaxed mb-4">{s.desc}</p>
                            <Link href="/services" className="text-sm font-bold text-blue-900 flex items-center gap-1 group-hover:gap-2 transition-all">
                                Read More <ChevronRight size={14} />
                            </Link>
                        </div>
                    ))}
                </div>
            </section>

            {/* 5. Working Process */}
            <section className="py-20 bg-zinc-900 text-white">
                <div className="container mx-auto px-4 text-center max-w-4xl mb-16">
                    <span className="bg-zinc-800 text-zinc-300 px-3 py-1 rounded-full text-xs font-bold uppercase">How It Works</span>
                    <h2 className="text-3xl font-bold mt-4 mb-4">Efficient Working Process</h2>
                    <p className="text-zinc-400">From the initial consultation to the final delivery, our process is designed for reliability.</p>
                </div>
                <div className="container mx-auto px-4 max-w-6xl grid grid-cols-1 md:grid-cols-4 gap-8">
                    {[
                        { icon: <Mail />, title: 'Post Request', desc: 'Shippers post detailed transportation requests specifying tanker type and timeline.' },
                        { icon: <Truck />, title: 'Carriers Place Bids', desc: 'Specialized equipment carriers place bids based on requirements.' },
                        { icon: <Award />, title: 'Select Best Bid', desc: 'Sort by price and rating. Review carrier profiles and Select.' },
                        { icon: <ShieldCheck />, title: 'Secure & Track', desc: 'Real-time tracking ensures visibility throughout the journey.' }
                    ].map((w, i) => (
                        <div key={i} className="text-center group">
                            <div className="w-16 h-16 mx-auto bg-zinc-800 rounded-full flex items-center justify-center mb-6 group-hover:bg-blue-600 transition duration-300 border border-zinc-700">
                                {w.icon}
                            </div>
                            <h3 className="font-bold text-lg mb-3">{w.title}</h3>
                            <p className="text-sm text-zinc-400 leading-relaxed">{w.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* 6. Testimonials */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 text-center mb-12">
                    <h2 className="text-3xl font-bold text-zinc-900">Trusted by Industry Leaders</h2>
                </div>
                <div className="container mx-auto px-4 max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[1, 2, 3].map((t) => (
                        <div key={t} className="bg-zinc-50 p-8 rounded-xl border border-zinc-100">
                            <div className="flex gap-1 text-orange-400 mb-4 text-xs">
                                {[1, 2, 3, 4, 5].map(s => <span key={s}>★</span>)}
                            </div>
                            <h4 className="font-bold text-zinc-900 mb-4">"Read about how our tailored solutions have helped businesses achieve."</h4>
                            <p className="text-sm text-zinc-500 mb-6 italic">
                                "Our clients' satisfaction is our top priority, and their feedback speaks volumes about our dedication to excellence."
                            </p>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-zinc-300 rounded-full"></div>
                                <div>
                                    <p className="font-bold text-sm">Client Name</p>
                                    <p className="text-xs text-zinc-500">Co-Founder</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 7. Contact Section */}
            <section className="py-20 bg-amber-50">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="bg-white p-8 rounded-xl shadow-lg">
                            <h3 className="text-2xl font-bold mb-6 text-zinc-900">Send Us A Message</h3>
                            <form className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <input type="text" placeholder="First Name" className="w-full p-3 bg-zinc-50 rounded border border-zinc-200 text-sm outline-none focus:border-blue-500" />
                                    <input type="text" placeholder="Last Name" className="w-full p-3 bg-zinc-50 rounded border border-zinc-200 text-sm outline-none focus:border-blue-500" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <input type="text" placeholder="Phone" className="w-full p-3 bg-zinc-50 rounded border border-zinc-200 text-sm outline-none focus:border-blue-500" />
                                    <input type="email" placeholder="Email" className="w-full p-3 bg-zinc-50 rounded border border-zinc-200 text-sm outline-none focus:border-blue-500" />
                                </div>
                                <textarea placeholder="Message" rows={4} className="w-full p-3 bg-zinc-50 rounded border border-zinc-200 text-sm outline-none focus:border-blue-500"></textarea>
                                <button className="w-full py-3 bg-blue-900 text-white font-bold rounded hover:bg-blue-800 transition">Submit Now</button>
                            </form>
                        </div>
                        <div className="space-y-8 pl-0 lg:pl-12">
                            <div>
                                <h3 className="text-2xl font-bold mb-4">Contact Info</h3>
                                <p className="text-zinc-600">Gain insights into effective warehouse management strategies that maximize space.</p>
                            </div>
                            <div className="flex gap-4 items-start">
                                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-blue-900 shadow-sm shrink-0"><MapPin /></div>
                                <div>
                                    <h4 className="font-bold text-lg">Address</h4>
                                    <p className="text-zinc-500 text-sm">102, 1st Flr, Navnidhi Indl. Premises Society Ltd., A.D. Marg, Sewree(W), Mumbai - 400 015.</p>
                                </div>
                            </div>
                            <div className="flex gap-4 items-start">
                                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-blue-900 shadow-sm shrink-0"><Phone /></div>
                                <div>
                                    <h4 className="font-bold text-lg">Phone</h4>
                                    <p className="text-zinc-500 text-sm">+91-22-224142646</p>
                                </div>
                            </div>
                            <div className="flex gap-4 items-start">
                                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-blue-900 shadow-sm shrink-0"><Mail /></div>
                                <div>
                                    <h4 className="font-bold text-lg">Email</h4>
                                    <p className="text-zinc-500 text-sm">info@rktransport.in</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

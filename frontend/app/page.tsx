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
    const [activeTab, setActiveTab] = useState<'SUPPLIER' | 'TRANSPORTER'>('SUPPLIER');
    const [searchQuery, setSearchQuery] = useState('');
    const [form, setForm] = useState({ from: '', to: '', materialName: '', materialQty: '', vehicleType: '' });

    useEffect(() => {
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

            {/* 1. Header Enquiry Section - Matching reference layout */}
            <section className="bg-white border-b border-zinc-200 py-3">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col xl:flex-row gap-0 min-h-[240px]">

                        {/* Col 1: Search + Supplier/Transporter Toggle */}
                        <div className="w-full xl:w-48 flex-shrink-0 pr-3 border-r border-zinc-200 flex flex-col gap-3 py-2">
                            <div>
                                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">SEARCH</p>
                                <div className="flex">
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={e => setSearchQuery(e.target.value)}
                                        placeholder="Search Jobs..."
                                        className="w-full px-2 py-1.5 border border-zinc-300 rounded-l text-xs focus:outline-none focus:border-primary-light"
                                    />
                                    <button className="bg-primary-light hover:bg-primary-light text-white px-2.5 rounded-r transition">
                                        <Search size={13} />
                                    </button>
                                </div>
                            </div>
                            {/* SUPPLIER / TRANSPORTER Toggle */}
                            <div className="flex rounded overflow-hidden border border-primary text-xs font-bold">
                                <button
                                    onClick={() => setActiveTab('SUPPLIER')}
                                    className={`flex-1 py-2 transition ${activeTab === 'SUPPLIER' ? 'bg-primary-light text-white' : 'bg-white text-primary hover:bg-primary/5'}`}
                                >
                                    SUPPLIER
                                </button>
                                <button
                                    onClick={() => setActiveTab('TRANSPORTER')}
                                    className={`flex-1 py-2 transition ${activeTab === 'TRANSPORTER' ? 'bg-primary-light text-white' : 'bg-white text-primary hover:bg-primary/5'}`}
                                >
                                    TRANSPORTER
                                </button>
                            </div>
                        </div>

                        {/* Col 2: Enquiry Form */}
                        <div className="flex-1 px-4 py-2 border-r border-zinc-200">
                            <form className="space-y-2.5">
                                {/* From */}
                                <div className="flex items-center gap-2">
                                    <label className="text-xs font-semibold text-zinc-700 w-24 flex-shrink-0">From</label>
                                    <input
                                        type="text"
                                        value={form.from}
                                        onChange={e => setForm({ ...form, from: e.target.value })}
                                        placeholder="Source Location"
                                        className="flex-1 px-2.5 py-1.5 border border-zinc-300 rounded text-xs focus:outline-none focus:border-primary-light"
                                    />
                                </div>
                                {/* To */}
                                <div className="flex items-center gap-2">
                                    <label className="text-xs font-semibold text-zinc-700 w-24 flex-shrink-0">To</label>
                                    <input
                                        type="text"
                                        value={form.to}
                                        onChange={e => setForm({ ...form, to: e.target.value })}
                                        placeholder="Destination Location"
                                        className="flex-1 px-2.5 py-1.5 border border-zinc-300 rounded text-xs focus:outline-none focus:border-primary-light"
                                    />
                                </div>
                                {/* Material Name */}
                                <div className="flex items-center gap-2">
                                    <label className="text-xs font-semibold text-zinc-700 w-24 flex-shrink-0">Material Name</label>
                                    <input
                                        type="text"
                                        value={form.materialName}
                                        onChange={e => setForm({ ...form, materialName: e.target.value })}
                                        placeholder="Enter Material Name"
                                        className="flex-1 px-2.5 py-1.5 border border-zinc-300 rounded text-xs focus:outline-none focus:border-primary-light"
                                    />
                                </div>
                                {/* Material Qty with MT badge */}
                                <div className="flex items-center gap-2">
                                    <label className="text-xs font-semibold text-zinc-700 w-24 flex-shrink-0">Material Qty</label>
                                    <div className="flex flex-1">
                                        <input
                                            type="text"
                                            value={form.materialQty}
                                            onChange={e => setForm({ ...form, materialQty: e.target.value })}
                                            placeholder="Qty"
                                            className="flex-1 px-2.5 py-1.5 border border-zinc-300 rounded-l text-xs focus:outline-none focus:border-primary-light min-w-0"
                                        />
                                        <span className="bg-primary-light text-white text-[10px] font-bold px-2.5 flex items-center rounded-r">MT</span>
                                    </div>
                                </div>
                                {/* Type of Vehicle */}
                                <div className="flex items-center gap-2">
                                    <label className="text-xs font-semibold text-zinc-700 w-24 flex-shrink-0">Type of Vehicle</label>
                                    <select
                                        value={form.vehicleType}
                                        onChange={e => setForm({ ...form, vehicleType: e.target.value })}
                                        className="flex-1 px-2.5 py-1.5 border border-zinc-300 rounded text-xs bg-white focus:outline-none focus:border-primary-light text-zinc-400"
                                    >
                                        <option value="">Select Vehicle Type</option>
                                        <option value="tanker">Tanker</option>
                                        <option value="container">Container</option>
                                        <option value="flatbed">Flatbed</option>
                                    </select>
                                </div>
                                {/* CTA Button */}
                                <div className="pt-1">
                                    <button
                                        type="button"
                                        className="w-full py-2 bg-primary-light hover:bg-primary text-white text-xs font-bold uppercase rounded tracking-widest transition"
                                    >
                                        Check Availability
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Col 3: Logistics Hero Image */}
                        <div className="w-full xl:w-72 flex-shrink-0 border-r border-zinc-200 relative overflow-hidden min-h-[200px]">
                            <div
                                className="absolute inset-0 bg-cover bg-center"
                                style={{
                                    backgroundImage: `url('https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=600&q=80')`,
                                }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
                            <div className="absolute bottom-3 left-3 right-3">
                                <p className="text-white text-xs font-bold drop-shadow">Pan-India Bulk Liquid Logistics</p>
                                <p className="text-primary-light/70 text-[10px]">Reliable · Compliant · On-Time</p>
                            </div>
                        </div>

                        {/* Col 4: Public Tenders */}
                        <div className="w-full xl:w-52 flex-shrink-0 py-2 pl-3">
                            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2 text-center">PUBLIC TENDERS</p>
                            <div className="space-y-2 overflow-y-auto max-h-52 pr-1">
                                {(data.tenders.length > 0 ? data.tenders : [
                                    { id: '250002440', title: 'LAB INFRA WORKS – MEP & CASEWORK', due: '15-Jan-2026' },
                                    { id: '250002441', title: 'LAB INFRA WORKS – MEP & CASEWORK', due: '15-Jan-2026' },
                                    { id: '250002442', title: 'LAB INFRA WORKS – MEP & CASEWORK', due: '15-Jan-2026' },
                                    { id: '250002443', title: 'LAB INFRA WORKS – MEP & CASEWORK', due: '15-Jan-2026' },
                                    { id: '250002444', title: 'LAB INFRA WORKS – MEP & CASEWORK', due: '15-Jan-2026' },
                                ]).map((tender: any, i: number) => (
                                    <div key={i} className="border-l-2 border-secondary pl-2 py-0.5">
                                        <Link href="#" className="text-[11px] font-bold text-orange-600 hover:underline block leading-tight">
                                            {tender.id || `25000244${i}`}
                                        </Link>
                                        <p className="text-[10px] font-semibold text-zinc-800 leading-tight mt-0.5">
                                            {tender.title || 'LAB INFRA WORKS – MEP & CASEWORK'}
                                        </p>
                                        <p className="text-[9px] text-zinc-400">Due: {tender.due || '15-Jan-2026'}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </section>


            <section className="relative bg-amber-50 py-20 overflow-hidden">
                <div className="container mx-auto px-4 relative z-10">
                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <div className="md:w-1/2 space-y-6">
                            <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-bold tracking-wide">RK Transportation</span>
                            <h1 className="text-4xl md:text-5xl font-extrabold text-zinc-900 leading-tight">
                                Specialists in Bulk Liquid & Chemical Transportation
                            </h1>
                            <p className="text-lg text-zinc-600 leading-relaxed">
                                We transport liquid chemicals, petrochemicals, solvents, FMCG liquids, and high-viscosity materials using advanced SS tankers.
                            </p>
                            <div className="flex gap-4 pt-4">
                                <Link href="/about" className="px-8 py-3 bg-primary text-white rounded-full font-bold hover:bg-primary-light transition shadow-lg flex items-center gap-2">
                                    About Us <ChevronRight size={18} />
                                </Link>
                                <Link href="/contact" className="px-8 py-3 border-2 border-primary text-primary rounded-full font-bold hover:bg-primary/5 transition flex items-center gap-2">
                                    Contact Us <ChevronRight size={18} />
                                </Link>
                            </div>
                        </div>
                        <div className="md:w-1/2 relative">
                            {/* Placeholder for truck image */}
                            <div className="relative z-10">
                                <Truck className="w-full h-64 text-primary opacity-20" strokeWidth={0.5} />
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
                                    <h3 className="text-3xl font-extrabold text-primary mb-1">30+</h3>
                                    <p className="text-sm font-semibold text-zinc-500">Years Experience</p>
                                </div>
                                <div className="bg-zinc-50 p-6 rounded-xl border border-zinc-100 text-center hover:shadow-md transition">
                                    <h3 className="text-3xl font-extrabold text-primary mb-1">1000+</h3>
                                    <p className="text-sm font-semibold text-zinc-500">Successful Shipments</p>
                                </div>
                                <div className="bg-zinc-50 p-6 rounded-xl border border-zinc-100 text-center hover:shadow-md transition">
                                    <h3 className="text-3xl font-extrabold text-primary mb-1">500+</h3>
                                    <p className="text-sm font-semibold text-zinc-500">Satisfied Clients</p>
                                </div>
                                <div className="bg-zinc-50 p-6 rounded-xl border border-zinc-100 text-center hover:shadow-md transition">
                                    <h3 className="text-3xl font-extrabold text-primary mb-1">2K+</h3>
                                    <p className="text-sm font-semibold text-zinc-500">Specialized Tankers</p>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-6">
                            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase">About Us</span>
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
                                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary-light">
                                            <CheckCircle size={14} />
                                        </div>
                                        <span className="font-semibold text-zinc-800">{item}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="bg-amber-50 p-6 rounded-lg border border-amber-100 italic text-zinc-600 text-sm">
                                "The company has been formed to provide other logistic service as well. Currently R. K. Transport Service has been serving continuously for more than 30 years."
                            </div>
                            <Link href="/about" className="inline-flex items-center gap-2 font-bold text-primary hover:text-primary transition">
                                Read More <ChevronRight size={18} />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. Service Section */}
            <section className="py-20 bg-amber-50">
                <div className="container mx-auto px-4 text-center max-w-4xl mb-12">
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase">Our Service</span>
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
                            <div className="w-12 h-12 bg-primary/5 text-primary rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition">
                                <Truck />
                            </div>
                            <h3 className="font-bold text-lg text-zinc-900 mb-3">{s.title}</h3>
                            <p className="text-sm text-zinc-500 leading-relaxed mb-4">{s.desc}</p>
                            <Link href="/services" className="text-sm font-bold text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
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
                            <div className="w-16 h-16 mx-auto bg-zinc-800 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary-light transition duration-300 border border-zinc-700">
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
                            <div className="flex gap-1 text-secondary mb-4 text-xs">
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
                                    <input type="text" placeholder="First Name" className="w-full p-3 bg-zinc-50 rounded border border-zinc-200 text-sm outline-none focus:border-primary" />
                                    <input type="text" placeholder="Last Name" className="w-full p-3 bg-zinc-50 rounded border border-zinc-200 text-sm outline-none focus:border-primary" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <input type="text" placeholder="Phone" className="w-full p-3 bg-zinc-50 rounded border border-zinc-200 text-sm outline-none focus:border-primary" />
                                    <input type="email" placeholder="Email" className="w-full p-3 bg-zinc-50 rounded border border-zinc-200 text-sm outline-none focus:border-primary" />
                                </div>
                                <textarea placeholder="Message" rows={4} className="w-full p-3 bg-zinc-50 rounded border border-zinc-200 text-sm outline-none focus:border-primary"></textarea>
                                <button className="w-full py-3 bg-primary text-white font-bold rounded hover:bg-primary-light transition">Submit Now</button>
                            </form>
                        </div>
                        <div className="space-y-8 pl-0 lg:pl-12">
                            <div>
                                <h3 className="text-2xl font-bold mb-4">Contact Info</h3>
                                <p className="text-zinc-600">Gain insights into effective warehouse management strategies that maximize space.</p>
                            </div>
                            <div className="flex gap-4 items-start">
                                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary shadow-sm shrink-0"><MapPin /></div>
                                <div>
                                    <h4 className="font-bold text-lg">Address</h4>
                                    <p className="text-zinc-500 text-sm">102, 1st Flr, Navnidhi Indl. Premises Society Ltd., A.D. Marg, Sewree(W), Mumbai - 400 015.</p>
                                </div>
                            </div>
                            <div className="flex gap-4 items-start">
                                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary shadow-sm shrink-0"><Phone /></div>
                                <div>
                                    <h4 className="font-bold text-lg">Phone</h4>
                                    <p className="text-zinc-500 text-sm">+91-22-224142646</p>
                                </div>
                            </div>
                            <div className="flex gap-4 items-start">
                                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary shadow-sm shrink-0"><Mail /></div>
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

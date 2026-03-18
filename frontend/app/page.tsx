'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Search, Calendar, ChevronRight, Truck, Phone, Mail, MapPin, CheckCircle, Globe, Award, ShieldCheck, User, Facebook, Linkedin, Instagram, Twitter, Play, Check, PackageCheck, Users, Droplets, FilePlus, MousePointer2, ClipboardCheck, Star } from 'lucide-react';
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
    const [currentSlide, setCurrentSlide] = useState(0);
    const [form, setForm] = useState({ from: '', to: '', materialName: '', materialQty: '', vehicleType: '' });
    const [activeService, setActiveService] = useState(0);
    const [activeTestimonial, setActiveTestimonial] = useState(0);

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

    // Auto-advance carousel
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % 3);
        }, 3000);
        return () => clearInterval(timer);
    }, []);

    return (
        <main className="font-sans text-zinc-800">

            {/* 1. Header Section - Matching Screenshot Layout */}
            <section className="py-3" style={{ backgroundColor: '#f8f9fa' }}>
                <div className="container mx-auto px-4">
                    <div className="flex flex-col xl:flex-row gap-4 min-h-[300px]">

                        {/* Top Left: Form & Carousel Area */}
                        <div className="flex-1 flex flex-col md:flex-row gap-4">

                            {/* Enquiry Form */}
                            <div className="w-full md:w-[42%] border border-zinc-200 rounded-lg overflow-hidden flex flex-col bg-white shadow-sm">
                                <div className="flex bg-zinc-50 border-b border-zinc-200 p-1" style={{ background: '#f8f9fa' }}>
                                    <button
                                        onClick={() => setActiveTab('SUPPLIER')}
                                        className={`flex-1 py-3 text-sm font-semibold transition rounded ${activeTab === 'SUPPLIER' ? 'bg-[#1a5a96] text-white' : 'text-zinc-600 hover:bg-zinc-100'}`}
                                    >
                                        SUPPLIER
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('TRANSPORTER')}
                                        className={`flex-1 py-3 text-sm font-semibold transition rounded ${activeTab === 'TRANSPORTER' ? 'bg-[#1a5a96] text-white' : 'text-zinc-600 hover:bg-zinc-100'}`}
                                    >
                                        TRANSPORTER
                                    </button>
                                </div>

                                <div className="p-4 flex-1 flex flex-col">
                                    {activeTab === 'SUPPLIER' ? (
                                        <form className="space-y-3">
                                            <div className="flex items-center gap-3">
                                                <label className="text-[11px] font-bold text-zinc-600 w-34">From</label>
                                                <input type="text" placeholder="Source Location" className="w-full py-[10px] px-[15px] border border-zinc-200 rounded text-xs outline-none focus:border-primary" />
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <label className="text-[11px] font-bold text-zinc-600 w-34">To</label>
                                                <input type="text" placeholder="Destination Location" className="w-full py-[10px] px-[15px] border border-zinc-200 rounded text-xs outline-none focus:border-primary" />
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <label className="text-[11px] font-bold text-zinc-600 w-34">Material Name</label>
                                                <input type="text" placeholder="Enter Material Name" className="w-full py-[10px] px-[15px] border border-zinc-200 rounded text-xs outline-none focus:border-primary" />
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <label className="text-[11px] font-bold text-zinc-600 w-34">Material Qty</label>
                                                <div className="flex w-full">
                                                    <input
                                                        type="text"
                                                        placeholder="Qty"
                                                        className="w-full py-[10px] px-[15px] border border-zinc-200 rounded-l text-xs outline-none focus:border-primary"
                                                        value={form.materialQty}
                                                        onChange={(e) => setForm({ ...form, materialQty: e.target.value })}
                                                    />
                                                    <select
                                                        className="py-[10px] px-[15px] bg-[#1a5a96] text-white text-[10px] font-bold flex items-center justify-center rounded-r border-none outline-none cursor-pointer"
                                                        value={form.vehicleType} // Reusing field for unit if not defined or add a new one
                                                        onChange={(e) => setForm({ ...form, vehicleType: e.target.value })}
                                                    >
                                                        <option value="MT" className="bg-white text-zinc-800">MT</option>
                                                        <option value="KL" className="bg-white text-zinc-800">KL</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <label className="text-[11px] font-bold text-zinc-600 w-34">Type of Vehicle</label>
                                                <select className="w-full py-[10px] px-[15px] border border-zinc-200 rounded text-xs outline-none focus:border-primary bg-white">
                                                    <option>Select Vehicle Type</option>
                                                </select>
                                            </div>
                                            <button type="button" className="w-full py-3 bg-[#1a5a96] text-white text-[14px] font-bold rounded uppercase tracking-wider mt-2">
                                                Check Availability
                                            </button>
                                        </form>
                                    ) : (
                                        <form className="space-y-3">
                                            <div className="flex items-center gap-3">
                                                <label className="text-[11px] font-bold text-zinc-600 w-34">Type of Vehicle</label>
                                                <select className="w-full py-[10px] px-[15px] border border-zinc-200 rounded text-xs outline-none focus:border-primary bg-white cursor-pointer">
                                                    <option disabled>Select Vehicle Type</option>
                                                    <option>Open Truck</option>
                                                    <option>Container</option>
                                                    <option>Trailer</option>
                                                </select>
                                            </div>

                                            <div className="flex items-center gap-3">
                                                <label className="text-[11px] font-bold text-zinc-600 w-34">Vehicle Capacity</label>
                                                <div className="flex w-full">
                                                    <input
                                                        type="text"
                                                        placeholder="Capacity"
                                                        className="w-full py-[10px] px-[15px] border border-zinc-200 rounded-l text-xs outline-none focus:border-primary"
                                                    />
                                                    <select
                                                        className="py-[10px] px-[10px] bg-[#1a5a96] text-white text-[10px] font-bold flex items-center justify-center rounded-r border-none outline-none cursor-pointer"
                                                    >
                                                        <option value="MT" className="bg-white text-zinc-800">MT</option>
                                                        <option value="KL" className="bg-white text-zinc-800">KL</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3">
                                                <label className="text-[11px] font-bold text-zinc-600 w-34">From</label>
                                                <div className="flex w-full">
                                                    <input
                                                        type="text"
                                                        placeholder="Source Location"
                                                        className="w-full py-[10px] px-[15px] border border-zinc-200 rounded-l text-xs outline-none focus:border-primary"
                                                    />
                                                    <select
                                                        className="py-[10px] px-[10px] bg-zinc-100 border border-zinc-200 border-l-0 text-zinc-600 text-[10px] font-bold flex items-center justify-center rounded-r outline-none cursor-pointer min-w-[80px]"
                                                    >
                                                        <option disabled>State</option>
                                                        <option value="MH">MH</option>
                                                        <option value="DL">DL</option>
                                                        <option value="KA">KA</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3">
                                                <label className="text-[11px] font-bold text-zinc-600 w-34">To</label>
                                                <div className="flex w-full">
                                                    <input
                                                        type="text"
                                                        placeholder="Destination Location"
                                                        className="w-full py-[10px] px-[15px] border border-zinc-200 rounded-l text-xs outline-none focus:border-primary"
                                                    />
                                                    <select
                                                        className="py-[10px] px-[10px] bg-zinc-100 border border-zinc-200 border-l-0 text-zinc-600 text-[10px] font-bold flex items-center justify-center rounded-r outline-none cursor-pointer min-w-[80px]"
                                                    >
                                                        <option disabled>State</option>
                                                        <option value="MH">MH</option>
                                                        <option value="DL">DL</option>
                                                        <option value="KA">KA</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <button type="button" className="w-full py-3 bg-[#1a5a96] text-white text-[14px] font-bold rounded uppercase tracking-wider mt-2">
                                                Check Availability
                                            </button>
                                        </form>
                                    )}
                                </div>
                            </div>

                            {/* Carousel Area */}
                            <div className="flex-1 relative rounded-lg overflow-hidden min-h-[250px] shadow-sm bg-zinc-200">
                                <div
                                    className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${currentSlide === 0 ? 'opacity-100' : 'opacity-0'}`}
                                    style={{
                                        backgroundImage: `url('/assets/images/banner/1.jpg')`,
                                        backgroundBlendMode: 'overlay',
                                        backgroundColor: '#00000040'
                                    }}
                                >
                                    {/* Fallback pattern if image is missing */}
                                    <div className="w-full h-full bg-gradient-to-br from-primary/40 to-secondary/30 flex items-center justify-center p-8 text-white">
                                        <div className="text-center">
                                            <h2 className="text-2xl font-black mb-2 italic">LOGISARY</h2>
                                            <p className="text-xs font-bold uppercase tracking-widest opacity-80">Reliable Chemical Transport</p>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${currentSlide === 1 ? 'opacity-100' : 'opacity-0'}`}
                                    style={{
                                        backgroundImage: `url('/assets/images/banner/2.jpg')`,
                                        backgroundBlendMode: 'overlay',
                                        backgroundColor: '#00000040'
                                    }}
                                >
                                    <div className="w-full h-full bg-gradient-to-tr from-secondary/40 to-primary/30 flex items-center justify-center p-8 text-white">
                                        <div className="text-center">
                                            <h2 className="text-2xl font-black mb-2 italic">PAN INDIA</h2>
                                            <p className="text-xs font-bold uppercase tracking-widest opacity-80">Network across all major ports</p>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${currentSlide === 2 ? 'opacity-100' : 'opacity-0'}`}
                                    style={{
                                        backgroundImage: `url('/assets/images/banner/3.jpg')`,
                                        backgroundBlendMode: 'overlay',
                                        backgroundColor: '#00000040'
                                    }}
                                >
                                    <div className="w-full h-full bg-gradient-to-r from-primary/50 to-zinc-900/40 flex items-center justify-center p-8 text-white">
                                        <div className="text-center">
                                            <h2 className="text-2xl font-black mb-2 italic">SS TANKERS</h2>
                                            <p className="text-xs font-bold uppercase tracking-widest opacity-80">Specialized for bulk liquids</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Dots */}
                                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
                                    {[0, 1, 2].map(i => (
                                        <button
                                            key={i}
                                            onClick={() => setCurrentSlide(i)}
                                            className={`w-8 h-1.5 rounded-full transition-all duration-300 ${currentSlide === i ? 'bg-white w-12' : 'bg-white/40 hover:bg-white/60'}`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Top Right: Sidebar Area */}
                        <div className="w-full xl:w-[320px] flex flex-col gap-4">

                            {/* Public Tenders List */}
                            <div className="border border-zinc-200 rounded-lg bg-white shadow-sm flex flex-col overflow-hidden h-full">
                                <div className="py-2 px-4 border-b border-zinc-100 bg-white">
                                    <p className="text-[11px] font-semibold text-zinc-500 text-left uppercase tracking-widest">Public Tenders</p>
                                </div>
                                <div className="px-4 py-2 border-b border-zinc-50">
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="Search Tenders..."
                                            className="w-full py-[10px] px-[30px] bg-zinc-50 border border-zinc-200 rounded text-[10px] outline-none focus:border-primary"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                        />
                                        <Search size={12} className="absolute left-[10px] top-1/2 -translate-y-1/2 text-zinc-400" />
                                    </div>
                                </div>
                                <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4 custom-scrollbar max-h-[260px]">
                                    {[
                                        { id: '250002440' },
                                        { id: '250002441' },
                                        { id: '250002442' },
                                        { id: '250002443' }
                                    ].filter(t => t.id.includes(searchQuery)).map((tender, i) => (
                                        <div key={i} className="border-l-[3px] border-[#1a5a96] pl-3 text-left">
                                            <p className="text-[#c0392b] font-bold text-sm">{tender.id}</p>
                                            <p className="text-[10px] font-bold text-zinc-600 tracking-tight leading-tight capitalize">LAB INFRA WORKS - MEP & CASEWORK</p>
                                            <p className="text-[9px] text-zinc-400 mt-1">Due: 15-Jan-2026</p>
                                        </div>
                                    ))}
                                    {[
                                        { id: '250002440' },
                                        { id: '250002441' },
                                        { id: '250002442' },
                                        { id: '250002443' }
                                    ].filter(t => t.id.includes(searchQuery)).length === 0 && (
                                            <div className="text-center py-10 opacity-40 italic text-xs">No tenders found</div>
                                        )}
                                </div>
                                <div className="mt-auto p-4 bg-zinc-50 border-t border-zinc-100">
                                    <Link href="/tenders" className="text-[9px] font-bold text-zinc-500 hover:text-[#1a5a96] uppercase tracking-widest flex items-center justify-center gap-1">
                                        View All Tenders <ChevronRight size={12} />
                                    </Link>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </section>

            {/* 2. New Section: Loads & Vehicles Available Tables */}
            <section className="pt-10 pb-15" style={{ backgroundColor: '#f8f9fa' }}>
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                        {/* Loads Available Table */}
                        <div className="lg:col-span-4 bg-white border border-zinc-200 rounded-lg shadow-sm overflow-hidden flex flex-col">
                            <div className="py-3 px-4 border-b border-zinc-200 bg-white">
                                <h3 className="font-bold text-zinc-800 text-[16px]">Loads Available</h3>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-[14px] font-sans">
                                    <thead className="bg-[#f0f2f5] text-zinc-600 font-semibold border-b border-zinc-200">
                                        <tr>
                                            <th className="px-5 py-3">FROM</th>
                                            <th className="px-5 py-3">TO</th>
                                            <th className="px-5 py-3 text-right">CAPACITY</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-zinc-100">
                                        {(data.loads?.length > 0 ? data.loads : [
                                            { from: 'Mumbai', to: 'Chennai', cap: '25MT' },
                                            { from: 'Pune', to: 'Bangalore', cap: '20MT' },
                                            { from: 'Surat', to: 'Ahmedabad', cap: '15MT' },
                                            { from: 'Delhi', to: 'Lucknow', cap: '22MT' },
                                            { from: 'Kolkata', to: 'Patna', cap: '18MT' },
                                            { from: 'Indore', to: 'Jaipur', cap: '12MT' }
                                        ]).map((row: any, i: number) => (
                                            <tr key={i} className="hover:bg-zinc-50 transition-colors">
                                                <td className="px-5 py-3.5 font-semibold text-zinc-800 border-r border-zinc-100">{row.from}</td>
                                                <td className="px-5 py-3.5 font-semibold text-zinc-800 border-r border-zinc-100">{row.to}</td>
                                                <td className="px-5 py-3.5 font-bold text-secondary text-right">{row.cap || row.capacity}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="mt-auto p-4 bg-zinc-50 border-t border-zinc-100">
                                <Link href="/loads" className="text-[9px] font-bold text-zinc-500 hover:text-secondary uppercase tracking-widest flex items-center justify-center gap-1">
                                    View All Loads <ChevronRight size={12} />
                                </Link>
                            </div>
                            <div className="h-1.5 bg-[#1a5a96]"></div>
                        </div>

                        {/* Vehicles Available Table */}
                        <div className="lg:col-span-4 bg-white border border-zinc-200 rounded-lg shadow-sm overflow-hidden flex flex-col">
                            <div className="py-3 px-4 border-b border-zinc-200 bg-white">
                                <h3 className="font-bold text-zinc-800 text-[16px] tracking-wide">Vehicles Available</h3>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-[14px] font-sans">
                                    <thead className="bg-[#f0f2f5] text-zinc-600 font-semibold border-b border-zinc-200">
                                        <tr>
                                            <th className="px-5 py-3">FROM</th>
                                            <th className="px-5 py-3">TO</th>
                                            <th className="px-5 py-3 text-right">CAPACITY</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-zinc-100">
                                        {(data.vehicles?.length > 0 ? data.vehicles : [
                                            { from: 'Kolkata', to: 'Delhi', cap: '20MT' },
                                            { from: 'Hyderabad', to: 'Nagpur', cap: '25MT' },
                                            { from: 'Bangalore', to: 'Kochi', cap: '15MT' },
                                            { from: 'Ahmedabad', to: 'Rajkot', cap: '20MT' },
                                            { from: 'Chennai', to: 'Madurai', cap: '10MT' },
                                            { from: 'Gurgaon', to: 'Chandigarh', cap: '32MT' }
                                        ]).map((row: any, i: number) => (
                                            <tr key={i} className="hover:bg-zinc-50 transition-colors">
                                                <td className="px-5 py-3.5 font-semibold text-zinc-800 border-r border-zinc-100">{row.from}</td>
                                                <td className="px-5 py-3.5 font-semibold text-zinc-800 border-r border-zinc-100">{row.to}</td>
                                                <td className="px-5 py-3.5 font-bold text-primary text-right">{row.cap || row.capacity}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="mt-auto p-4 bg-zinc-50 border-t border-zinc-100">
                                <Link href="/vehicles" className="text-[9px] font-bold text-zinc-500 hover:text-primary uppercase tracking-widest flex items-center justify-center gap-1">
                                    View All Vehicles <ChevronRight size={12} />
                                </Link>
                            </div>
                            <div className="h-1.5 bg-[#1a5a96]"></div>
                        </div>

                        {/* Upcoming Events - Side Menu Style */}
                        <div className="lg:col-span-4 bg-white border border-zinc-200 rounded-lg shadow-sm overflow-hidden flex flex-col">
                            <div className="py-3 px-4 border-b border-zinc-200 bg-white">
                                <h3 className="font-bold text-zinc-800 text-[16px] tracking-widest leading-none capitalize flex items-center gap-2">
                                    <Calendar size={14} className="text-secondary" />
                                    Upcoming Events
                                </h3>
                            </div>
                            <div className="p-4 space-y-4">
                                <div className="border-l-2 border-secondary pl-4 py-1">
                                    <p className="text-xs font-bold text-zinc-800">Transport Expo 2026</p>
                                    <p className="text-[10px] text-zinc-500 mt-1 uppercase font-semibold">New Delhi • 15th-18th March</p>
                                    <Link href="#" className="text-[9px] font-bold text-secondary mt-2 inline-block uppercase hover:underline">Register Now</Link>
                                </div>
                                <div className="border-l-2 border-primary pl-4 py-1">
                                    <p className="text-xs font-bold text-zinc-800">Liquid Safety Webinar</p>
                                    <p className="text-[10px] text-zinc-500 mt-1 uppercase font-semibold">Online • 22nd March • 3PM</p>
                                    <Link href="#" className="text-[9px] font-bold text-primary mt-2 inline-block uppercase hover:underline">Join Webinar</Link>
                                </div>
                            </div>
                            <div className="mt-auto p-4 bg-zinc-50 border-t border-zinc-100">
                                <Link href="/events" className="text-[9px] font-bold text-zinc-500 hover:text-primary uppercase tracking-widest flex items-center justify-center gap-1">
                                    View All Events <ChevronRight size={12} />
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* 3. About Us Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col xl:flex-row items-center gap-12">

                        {/* Left Side: Images & Stats Grid */}
                        <div className="w-full xl:w-1/2">
                            <div className="grid grid-cols-2 gap-6 items-center">
                                {/* Column 1 */}
                                <div className="space-y-6 flex flex-col justify-end">
                                    <div className="relative group rounded-3xl overflow-hidden aspect-[4/5] bg-zinc-100 h-[330px]">
                                        <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src="/assets/img/about/ca-about3.1.png" alt="30 Years Experience" onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1586528116311-ad8ed7c663b0?auto=format&fit=crop&q=80" }} />
                                        <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 flex items-center justify-center p-6 text-center transition-all duration-500">
                                            <div className="text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                                <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center mx-auto mb-3 backdrop-blur-sm bg-white/10 group-hover:bg-[#d8202a] transition-colors">
                                                    <Truck size={20} />
                                                </div>
                                                <h3 className="text-4xl font-black mb-1 leading-none">30+</h3>
                                                <p className="text-[11px] font-bold uppercase tracking-widest text-primary-50">Years of Experience</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="relative group rounded-3xl overflow-hidden aspect-square bg-zinc-100 h-[186px]">
                                        <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src="/assets/img/about/ca-sm-about-3.2.png" alt="Successful Shipments" onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&q=80" }} />
                                        <div className="absolute inset-0 bg-secondary/80 opacity-0 group-hover:opacity-100 flex items-center justify-center p-6 text-center transition-all duration-500">
                                            <div className="text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                                <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center mx-auto mb-2 backdrop-blur-sm bg-white/10 group-hover:bg-white group-hover:text-secondary transition-colors">
                                                    <PackageCheck size={18} />
                                                </div>
                                                <h3 className="text-3xl font-black mb-1 leading-none">1000+</h3>
                                                <p className="text-[10px] font-bold uppercase tracking-widest text-secondary-50">Successful Shipments</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Column 2 */}
                                <div className="space-y-6 flex flex-col justify-start">
                                    <div className="relative group rounded-3xl overflow-hidden aspect-square bg-zinc-100 h-[186px]">
                                        <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src="/assets/img/about/ca-sm-about-3.2.png" alt="Satisfied Clients" onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1621252179027-94459d278660?auto=format&fit=crop&q=80" }} />
                                        <div className="absolute inset-0 bg-zinc-900/80 opacity-0 group-hover:opacity-100 flex items-center justify-center p-6 text-center transition-all duration-500">
                                            <div className="text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                                <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center mx-auto mb-2 backdrop-blur-sm bg-white/10 group-hover:bg-primary transition-colors">
                                                    <Users size={18} />
                                                </div>
                                                <h3 className="text-3xl font-black mb-1 leading-none">500+</h3>
                                                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-300">Satisfied Clients</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="relative group rounded-3xl overflow-hidden aspect-[4/5] bg-zinc-100 h-[330px]">
                                        <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src="/assets/img/about/ca-about-3.3.png" alt="Specialized Tankers" onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1541888048-0ca1a9ce6cd8?auto=format&fit=crop&q=80" }} />
                                        <div className="absolute inset-0 bg-[#1a5a96]/80 opacity-0 group-hover:opacity-100 flex items-center justify-center p-6 text-center transition-all duration-500">
                                            <div className="text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                                <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center mx-auto mb-3 backdrop-blur-sm bg-white/10 group-hover:bg-[#d8202a] transition-colors">
                                                    <Droplets size={20} />
                                                </div>
                                                <h3 className="text-4xl font-black mb-1 leading-none">2K+</h3>
                                                <p className="text-[11px] font-bold uppercase tracking-widest text-[#1a5a96]-50">Specialized Tankers</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Side: Content Area */}
                        <div className="w-full xl:w-1/2 space-y-6">

                            {/* Heading */}
                            <div>
                                <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest inline-block mb-4">About Us</span>
                                <h2 className="text-4xl lg:text-4xl font-bold text-zinc-900 leading-[1.15] capitalize mb-6">
                                    Your Trusted Partner in Bulk <br className="hidden lg:block" /> Liquid Transportation
                                </h2>
                                <p className="text-zinc-600 text-[16px] leading-relaxed">
                                    <strong className="text-zinc-800">R. K. Transportation Services Pvt. Ltd.</strong> company based in Mumbai, has been formed to initially transporting Liquid bulk materials in tankers, All over India.
                                </p>
                            </div>

                            {/* List Items */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
                                {[
                                    "Pan India Liquid Transportation",
                                    "Specialized SS Tanker Fleet",
                                    "Chemical & Petrochemical Expertise",
                                    "Customer Focused Logistics Solutions"
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-start gap-4 px-2 py-1 rounded-lg hover:bg-zinc-50 transition-colors border border-transparent hover:border-zinc-100 group">
                                        <div className="w-6 h-6 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-secondary group-hover:text-white transition-colors">
                                            <Check size={12} className="text-secondary group-hover:text-white" strokeWidth={3} />
                                        </div>
                                        <span className="font-bold text-zinc-800 text-[14px] leading-snug">{item}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Highlight Box */}
                            <div className="bg-[#f8f9fa] border-l-4 border-primary p-5 rounded-r-2xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full"></div>
                                <p className="text-zinc-700 italic text-[15px] leading-relaxed relative z-10">
                                    The company has been formed to provide other logistic service as well. Currently R. K. Transport Service, a transport company has been serving continuously for more than <span className="text-secondary font-bold">30 years</span> in the field of Bulk Liquid Transportation in SS Tanker.
                                </p>
                            </div>

                            {/* Action Button */}
                            <div className="pt-2">
                                <Link href="/about-us" className="inline-flex items-center gap-3 px-8 py-4 bg-[#1a5a96] text-white rounded-full font-bold uppercase tracking-widest text-xs hover:bg-primary transition shadow-xl shadow-primary/20 group">
                                    Read More
                                    <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                                        <ChevronRight size={14} />
                                    </div>
                                </Link>
                            </div>

                        </div>
                    </div>
                </div>
            </section>

            {/* 5. Service Section */}
            <section className="py-20 bg-[#f8f9fa]">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest inline-block mb-4">Our Service</span>
                        <h2 className="text-4xl lg:text-4xl font-bold text-zinc-900 leading-tight mb-6 capitalize">
                            Our Range of Logistics Services
                        </h2>
                        <p className="text-zinc-600 text-[16px] leading-relaxed">
                            Our state-of-the-art facilities and innovative technology support e-commerce<br className="hidden md:block" />
                            fulfillment and project cargo handling, providing you with tailored solutions.
                        </p>
                    </div>

                    {/* Expanding Gallery */}
                    <div className="flex flex-col lg:flex-row w-full lg:h-[370px] gap-4">
                        {[
                            {
                                title: "Lubricant & Additives",
                                img: "/assets/img/service/ca-expand-gallery3.1.png",
                                desc: "We provide safe, reliable, and efficient transportation solutions for lubricants and additives across India. Our specialized SS tankers are designed to handle sensitive lubricant materials while maintaining product integrity and quality."
                            },
                            {
                                title: "Hazard & Non-Hazard chemical",
                                img: "/assets/img/service/ca-expand-gallery3.2.png",
                                desc: "We offer secure and compliant transportation services for both hazardous and non-hazardous chemicals across India. Our fleet of specialized SS tankers and trained personnel ensure safe handling, strict regulatory compliance, and zero-contamination movement of chemical cargo."
                            },
                            {
                                title: "FMCG",
                                img: "/assets/img/service/ca-expand-gallery3.3.png",
                                desc: "We provide efficient and hygienic transportation solutions for FMCG liquid products across India. Our dedicated tankers ensure contamination-free handling while maintaining product quality throughout transit."
                            },
                            {
                                title: "Industrial Oil",
                                img: "/assets/img/service/ca-expand-gallery3.1.png",
                                desc: "We offer specialized transportation services for industrial oils, ensuring safe handling and secure movement across long distances. Our SS and customized tankers are suitable for various grades of industrial oils, maintaining consistency and preventing contamination."
                            }
                        ].map((item, index) => {
                            const isActive = activeService === index;
                            return (
                                <div
                                    key={index}
                                    onClick={() => setActiveService(index)}
                                    className={`relative rounded-xl overflow-hidden cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] flex-shrink-0 
                                        ${isActive ? 'lg:w-[480px] flex-[3] shadow-lg bg-[#1a5a96]' : 'flex-1 hover:opacity-95 bg-white'}`}
                                >
                                    {/* Inactive State: Image + Bottom Blue Bar */}
                                    <div className={`absolute inset-0 flex flex-col transition-opacity duration-300 ${isActive ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                                        <div className="flex-1 relative">
                                            <img
                                                src={item.img}
                                                alt={item.title}
                                                className="absolute inset-0 w-full h-full object-cover grayscale opacity-90 transition-transform duration-1000"
                                                onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&q=80" }}
                                            />
                                        </div>
                                    </div>

                                    {/* Active State: Solid Blue + Text */}
                                    <div className={`absolute inset-0 p-8 lg:p-12 flex flex-col justify-center overflow-auto custom-scrollbar transition-opacity duration-700 delay-100 ${isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                                        <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-6 text-white border border-white/20 shadow-inner">
                                            <Globe size={28} />
                                        </div>
                                        <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4 leading-tight tracking-wide">{item.title}</h2>
                                        <p className="text-white/90 text-[14px] leading-relaxed max-w-xl">{item.desc}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* 6. How It Works Section */}
            <section className="py-24 bg-[#104674] overflow-hidden relative">
                <div className="container mx-auto px-4 max-w-[1320px] relative z-10">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="bg-black/20 text-white px-5 py-1.5 rounded-full text-[12px] font-bold uppercase tracking-widest inline-block mb-4 border border-white/10 shadow-lg">How It Works</span>
                        <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
                            Efficient Working Process
                        </h2>
                        <p className="text-white/80 text-[16px] leading-relaxed">
                            Our working process is designed to deliver efficient, reliable, & tailored<br className="hidden md:block" />
                            logistics solutions. From the initial consultation to the final delivery,
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                title: "Post Your Transportation Request",
                                icon: <Truck size={24} />,
                                desc: "Shippers can easily post detailed transportation requests on our platform, specifying preferred tanker type and delivery timeline."
                            },
                            {
                                title: "Carriers Place Bids",
                                icon: <Users size={24} />,
                                desc: "Specialized equipment (insulated/jacketed tanks, steam coil tanks, ISO tanks, aluminum tanks, etc.) and Carrier ratings and past performance."
                            },
                            {
                                title: "Evaluate & Select the Best Bid",
                                icon: <ClipboardCheck size={24} />,
                                desc: "Sort and filter by price, delivery time, and carrier rating. Review carrier profiles and past performance."
                            },
                            {
                                title: "Secure & Track Your Shipment",
                                icon: <ShieldCheck size={24} />,
                                desc: "Material is transported safely with in-transit insurance options. Real-time tracking ensures visibility throughout the journey."
                            }
                        ].map((item, index) => (
                            <div key={index} className="p-10 rounded-xl bg-white hover:shadow-primary/20 transition-all duration-500 hover:-translate-y-2 flex flex-col items-start text-left min-h-[360px]">
                                <div className="w-14 h-14 bg-[#104674] rounded-full flex items-center justify-center text-white mb-8 shadow-lg">
                                    {item.icon}
                                </div>

                                <h4 className="text-[20px] font-bold text-[#104674] mb-6 leading-snug">
                                    <Link href="/how-it-works.php" className="hover:underline underline-offset-4 decoration-primary/30">
                                        {item.title}
                                    </Link>
                                </h4>

                                <p className="text-zinc-600 text-[15px] leading-relaxed">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 7. Testimonials */}
            <section className="py-24 bg-white overflow-hidden relative">
                <div className="container mx-auto px-4 max-w-[1320px]">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest inline-block mb-4">Our Testimonial</span>
                        <h2 className="text-4xl lg:text-4xl font-bold text-zinc-900 leading-tight mb-6 capitalize">Trusted by Industry Leaders</h2>
                        <p className="text-zinc-600 text-[16px] leading-relaxed">
                            Their testimonials highlight our commitment to overcoming logistical <br className="hidden md:block" />
                            challenges and delivering on our promises. Read on to discover.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                        {[
                            {
                                id: 0,
                                rating: 5,
                                quote: "Hear from the businesses we support and their journey with our logistics.",
                                text: "At RK Transportation, client satisfaction is at the heart of everything we do. We are proud to share the positive experiences of our clients, whose testimonials reflect our commitment to delivering exceptional transport and logistics solutions.",
                                user: "Muhammad Waseem",
                                role: "Co-Founder",
                                img: "/assets/img/testimonial/testimonial-2.1.png"
                            },
                            {
                                id: 1,
                                rating: 5,
                                quote: "Leading businesses share their success stories and why they rely on our logistics.",
                                text: "Whether it's seamless international shipping, efficient domestic transport, or specialized logistics services, our clients consistently praise our ability to meet and exceed their expectations. They highlight our innovative approach and dedicated service.",
                                user: "Shevon Daniel",
                                role: "Co-Founder",
                                img: "/assets/img/testimonial/ca-testi3.2.png"
                            },
                            {
                                id: 2,
                                rating: 5,
                                quote: "Read about how our tailored solutions have helped businesses achieve more.",
                                text: "Our clients' satisfaction is our top priority, and their feedback speaks volumes about our dedication to excellence. We take immense pride in the positive experiences shared by businesses across various industries who rely on our expertise.",
                                user: "Shevon Daniel",
                                role: "Co-Founder",
                                img: "/assets/img/testimonial/ca-testi3.1.png"
                            }
                        ].map((t) => (
                            <div key={t.id} className={`p-8 rounded-2xl border transition-all duration-500 hover:shadow-xl hover:border-primary/20 bg-white ${activeTestimonial === t.id ? 'border-primary/40 shadow-xl' : 'border-zinc-100'}`} onClick={() => setActiveTestimonial(t.id)}>
                                <div className="flex items-center justify-between mb-8">
                                    <div className="flex gap-1 text-amber-400">
                                        {[...Array(t.rating)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                                    </div>
                                    <span className="text-zinc-400 text-xs font-bold">(5) Rating</span>
                                </div>

                                <h4 className="text-xl font-bold text-zinc-900 mb-4 leading-snug">"{t.quote}"</h4>
                                <p className="text-zinc-500 text-sm leading-relaxed mb-8 italic line-clamp-4">"{t.text}"</p>

                                <div className="flex items-center gap-4 pt-6 border-t border-zinc-50">
                                    <div className="w-12 h-12 bg-zinc-100 rounded-full overflow-hidden border-2 border-primary/10">
                                        <img src={t.img} alt={t.user} className="w-full h-full object-cover" onError={(e) => { e.currentTarget.src = "https://ui-avatars.com/api/?name=" + t.user.replace(' ', '+'); }} />
                                    </div>
                                    <div>
                                        <h5 className="font-bold text-zinc-900 text-sm">{t.user}</h5>
                                        <p className="text-primary text-xs font-medium uppercase tracking-wider">{t.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-center gap-3">
                        {[0, 1, 2].map((i) => (
                            <button key={i} className={`w-3 h-3 rounded-full transition-all duration-300 ${activeTestimonial === i ? 'bg-primary w-8' : 'bg-primary/20 hover:bg-primary/40'}`} onClick={() => setActiveTestimonial(i)} />
                        ))}
                    </div>
                </div>
            </section>

            {/* 8. Contact Section */}
            <section className="py-24 bg-[#f8f9fa]">
                <div className="container mx-auto px-4 max-w-[1320px]">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest inline-block mb-4">Contact Us</span>
                        <h2 className="text-4xl lg:text-4xl font-bold text-zinc-900 leading-tight mb-6 capitalize">Trusted by Industry Leaders</h2>
                        <p className="text-zinc-600 text-[16px] leading-relaxed">
                            Gain insights into effective warehouse management strategies that<br className="hidden md:block" />
                            maximize space, improve accuracy, and boost productivity.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        {/* Left Side: Form */}
                        <div className="bg-white p-10 lg:p-14 rounded-2xl shadow-md border border-zinc-100">
                            <div className="mb-8">
                                <h4 className="text-2xl font-bold text-zinc-900 mb-4">Send Us A Message</h4>
                                <p className="text-zinc-500 text-[15px] leading-relaxed">
                                    As a fellow small business owner, we know the fulfillment that comes from running an own business. Contact our service at RK Transportation.
                                </p>
                            </div>
                            <form className="space-y-5">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <input type="text" placeholder="First Name" className="w-full p-4 bg-zinc-50/50 rounded-xl border border-zinc-200 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all" />
                                    <input type="text" placeholder="Last Name" className="w-full p-4 bg-zinc-50/50 rounded-xl border border-zinc-200 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all" />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <input type="tel" placeholder="Phone Number" className="w-full p-4 bg-zinc-50/50 rounded-xl border border-zinc-200 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all" />
                                    <input type="email" placeholder="Email Address" className="w-full p-4 bg-zinc-50/50 rounded-xl border border-zinc-200 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all" />
                                </div>
                                <div>
                                    <select className="w-full p-4 bg-zinc-50/50 rounded-xl border border-zinc-200 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all text-zinc-500 appearance-none cursor-pointer">
                                        <option value="">Service Type</option>
                                        <option value="1">Liquid Transportation</option>
                                        <option value="2">Containerized Cargo</option>
                                        <option value="3">Specialized Tankers</option>
                                        <option value="4">Hazardous Chemicals</option>
                                    </select>
                                </div>
                                <div>
                                    <textarea placeholder="Message" rows={4} className="w-full p-4 bg-zinc-50/50 rounded-xl border border-zinc-200 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all resize-none"></textarea>
                                </div>
                                <button type="submit" className="mt-4 inline-flex items-center gap-2 bg-[#1a5a96] hover:bg-primary text-white font-bold uppercase tracking-widest text-xs py-4 px-10 rounded-full transition-all group shadow-xl shadow-primary/20">
                                    Submit
                                    <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            </form>
                        </div>

                        {/* Right Side: Contact Details */}
                        <div className="space-y-10 lg:pl-10">
                            {/* Single Location Item */}
                            <div className="flex gap-6 items-start group">
                                <div className="w-20 h-20 rounded-full bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 shrink-0 border border-primary/10 shadow-sm">
                                    <MapPin size={32} strokeWidth={1.5} />
                                </div>
                                <div>
                                    <h4 className="text-[20px] font-bold text-zinc-900 mb-2">Address</h4>
                                    <p className="text-zinc-600 text-[16px] leading-relaxed">
                                        102, 1st Flr, Navnidhi Indl. Premises Society Ltd.,<br />
                                        A.D. Marg, Sewree(W), Mumbai - 400 015.
                                    </p>
                                </div>
                            </div>

                            {/* Single Location Item */}
                            <div className="flex gap-6 items-start group">
                                <div className="w-20 h-20 rounded-full bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 shrink-0 border border-primary/10 shadow-sm">
                                    <Phone size={32} strokeWidth={1.5} />
                                </div>
                                <div>
                                    <h4 className="text-[20px] font-bold text-zinc-900 mb-2">Phone</h4>
                                    <a href="tel:+91-22-224142646" className="text-zinc-600 text-[16px] leading-relaxed hover:text-primary transition-colors">
                                        +91-22-224142646
                                    </a>
                                </div>
                            </div>

                            {/* Single Location Item */}
                            <div className="flex gap-6 items-start group">
                                <div className="w-20 h-20 rounded-full bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 shrink-0 border border-primary/10 shadow-sm">
                                    <Mail size={32} strokeWidth={1.5} />
                                </div>
                                <div>
                                    <h4 className="text-[20px] font-bold text-zinc-900 mb-2">Email</h4>
                                    <a href="mailto:info@rktransport.in" className="text-zinc-600 text-[16px] leading-relaxed hover:text-primary transition-colors">
                                        info@rktransport.in
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

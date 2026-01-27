'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Search, Calendar, ChevronRight, Truck, Phone, Mail, MapPin, CheckCircle, Globe, Award, ShieldCheck, User, Facebook, Linkedin, Instagram, Twitter } from 'lucide-react';
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
        api.get('/setup/status')
            .then((res: any) => {
                if (res.installed === false) {
                    router.push('/install');
                } else {
                    fetchData();
                }
            })
            .catch(() => fetchData());
    }, [router]);

    const fetchData = async () => {
        try {
            const res = await api.get('/public/landing');
            setData(res);
        } catch (err: any) {
            console.error("Fetch data error:", err);
            // Verify if it's just loads endpoint failing or everything
            setError('Unable to load latest data from server.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-zinc-50 font-sans text-zinc-800">
            {/* Main Content Grid */}
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col lg:flex-row gap-6">

                    {/* Left Sidebar: Search & Advertisement */}
                    <div className="w-full lg:w-64 flex flex-col gap-6">
                        <div>
                            <h3 className="text-blue-900 font-bold uppercase text-xs mb-2 tracking-wider">Search</h3>
                            <div className="flex">
                                <input type="text" placeholder="search jobs..." className="w-full p-2 border border-zinc-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm" />
                                <button className="bg-blue-900 text-white p-2 rounded-r-md">
                                    <Search size={18} />
                                </button>
                            </div>
                        </div>
                        <div className="h-64 bg-zinc-200 rounded-md flex items-center justify-center text-zinc-400 text-sm font-bold border border-zinc-300">
                            ADVERTISEMENT
                        </div>
                    </div>

                    {/* Center Content: Quick Enquiry & Tables */}
                    <div className="flex-1 flex flex-col gap-6">

                        {/* Quick Enquiry Section */}
                        <div className="bg-white border border-zinc-200 rounded-lg shadow-sm p-6">
                            <h2 className="text-center text-lg font-bold text-zinc-900 mb-6 border-b pb-2">Quick Enquiry</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                                {/* Form Fields */}
                                <div className="space-y-4">
                                    <div className="grid grid-cols-3 items-center">
                                        <label className="text-sm font-semibold col-span-1">From</label>
                                        <input type="text" className="col-span-2 p-2 border border-zinc-300 rounded text-sm" />
                                    </div>
                                    <div className="grid grid-cols-3 items-center">
                                        <label className="text-sm font-semibold col-span-1">To</label>
                                        <input type="text" className="col-span-2 p-2 border border-zinc-300 rounded text-sm" />
                                    </div>
                                    <div className="grid grid-cols-3 items-center">
                                        <label className="text-sm font-semibold col-span-1">Material Name</label>
                                        <input type="text" className="col-span-2 p-2 border border-zinc-300 rounded text-sm" />
                                    </div>
                                    <div className="grid grid-cols-3 items-center">
                                        <label className="text-sm font-semibold col-span-1">Type of Vehicle</label>
                                        <select className="col-span-2 p-2 border border-zinc-300 rounded text-sm bg-white">
                                            <option>Select</option>
                                            <option>Tanker</option>
                                            <option>Container</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="grid grid-cols-3 items-center">
                                        <label className="text-sm font-semibold col-span-1">KL / MT</label>
                                        <input type="text" className="col-span-2 p-2 border border-zinc-300 rounded text-sm" />
                                    </div>
                                    <div className="grid grid-cols-3 items-center">
                                        <label className="text-sm font-semibold col-span-1">Loading Date</label>
                                        <input type="date" className="col-span-2 p-2 border border-zinc-300 rounded text-sm" />
                                    </div>
                                    <div className="grid grid-cols-3 items-center">
                                        <label className="text-sm font-semibold col-span-1 truncate">Material Class</label>
                                        <input type="text" className="col-span-2 p-2 border border-zinc-300 rounded text-sm" />
                                    </div>
                                    <div className="grid grid-cols-3 items-center">
                                        <label className="text-sm font-semibold col-span-1">Mobile No.</label>
                                        <input type="text" className="col-span-2 p-2 border border-zinc-300 rounded text-sm" />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 flex flex-col md:flex-row justify-between items-center gap-4">
                                <div className="flex rounded-md overflow-hidden border border-orange-500">
                                    <button className="px-8 py-2 bg-orange-500 text-white font-bold text-sm uppercase">Loads</button>
                                    <button className="px-8 py-2 bg-blue-900 text-white font-bold text-sm uppercase">Vehicles</button>
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => alert("Distance Calculator feature coming soon!")} className="px-6 py-2 border border-zinc-300 bg-zinc-50 text-sm font-bold text-zinc-700 rounded hover:bg-zinc-100">Check KM</button>
                                    <button onClick={() => alert("Enquiry submitted successfully! Our team will contact you shortly.")} className="px-6 py-2 bg-blue-900 text-white text-sm font-bold rounded hover:bg-blue-800">Save & Proceed</button>
                                </div>
                            </div>
                        </div>

                        {/* Tables Section */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Loads Available */}
                            <div className="bg-white border border-zinc-200 rounded-lg shadow-sm">
                                <h3 className="text-center font-bold py-3 border-b bg-zinc-50 text-zinc-800">Loads Available</h3>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-xs">
                                        <thead className="bg-zinc-100 text-zinc-600">
                                            <tr>
                                                <th className="p-2 text-left">From</th>
                                                <th className="p-2 text-left">To</th>
                                                <th className="p-2 text-left">Capacity</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-zinc-100">
                                            {loading ? (
                                                [1, 2, 3].map(i => (
                                                    <tr key={i} className="hover:bg-zinc-50">
                                                        <td className="p-2 font-medium italic text-zinc-400">Loading...</td>
                                                        <td className="p-2 text-zinc-600">-</td>
                                                        <td className="p-2 text-zinc-500">-</td>
                                                    </tr>
                                                ))
                                            ) : error ? (
                                                <tr>
                                                    <td colSpan={3} className="p-4 text-center text-red-500 text-xs font-bold">
                                                        {error}
                                                    </td>
                                                </tr>
                                            ) : data.loads.length > 0 ? (
                                                data.loads.map((job: any, i: number) => (
                                                    <tr key={i} className="hover:bg-zinc-50">
                                                        <td className="p-2 font-medium">{job.origin}</td>
                                                        <td className="p-2 text-zinc-600">{job.destination}</td>
                                                        <td className="p-2 text-zinc-500">{job.weight_volume}</td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan={3} className="p-4 text-center text-zinc-400 text-xs">No loads available currently.</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Vehicles Available */}
                            <div className="bg-white border border-zinc-200 rounded-lg shadow-sm">
                                <h3 className="text-center font-bold py-3 border-b bg-zinc-50 text-zinc-800">Vehicles Available</h3>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-xs">
                                        <thead className="bg-zinc-100 text-zinc-600">
                                            <tr>
                                                <th className="p-2 text-left">Carrier</th>
                                                <th className="p-2 text-left">Fleet</th>
                                                <th className="p-2 text-left">Services</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-zinc-100">
                                            {loading ? (
                                                [1, 2, 3].map(i => (
                                                    <tr key={i} className="hover:bg-zinc-50">
                                                        <td className="p-2 font-medium italic text-zinc-400">Loading...</td>
                                                        <td className="p-2 text-zinc-600">-</td>
                                                        <td className="p-2 text-zinc-500">-</td>
                                                    </tr>
                                                ))
                                            ) : data.vehicles.length > 0 ? (
                                                data.vehicles.map((v: any, i: number) => (
                                                    <tr key={i} className="hover:bg-zinc-50">
                                                        <td className="p-2 font-medium">{v.company_name}</td>
                                                        <td className="p-2 text-zinc-600">{v.fleet_size} Trucks</td>
                                                        <td className="p-2 text-zinc-500 truncate max-w-[100px]">{Array.isArray(v.service_types) ? v.service_types.join(', ') : 'Standard'}</td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan={3} className="p-4 text-center text-zinc-400 text-xs">No vehicles available currently.</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Right Sidebar: Dynamic Sections */}
                    <div className="w-full lg:w-72 flex flex-col gap-6">

                        {/* Public Tenders - Only show if data exists */}
                        {data.tenders && data.tenders.length > 0 && (
                            <div className="bg-white border border-zinc-200 rounded-lg shadow-sm p-4">
                                <h3 className="text-center font-bold text-zinc-800 mb-4 text-sm uppercase">Public Tenders</h3>
                                <div className="space-y-4">
                                    {data.tenders.map((tender: any, i: number) => (
                                        <div key={i} className="text-xs border-b border-zinc-100 pb-2 last:border-0">
                                            <p className="font-bold text-red-600 mb-1">TDR-{tender.id ? tender.id.substring(0, 6) : i}</p>
                                            <p className="font-semibold text-zinc-800 mb-1">{tender.title || 'General Tender'}</p>
                                            <p className="text-zinc-500 text-[10px] flex justify-between">
                                                <span>Due: {tender.due_date}</span>
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Upcoming Events - Only show if data exists */}
                        {data.events && data.events.length > 0 && (
                            <div className="bg-white border border-zinc-200 rounded-lg shadow-sm p-4">
                                <h3 className="font-bold text-blue-900 text-sm uppercase mb-3">Upcoming Events</h3>
                                <ul className="space-y-2 text-xs">
                                    {data.events.map((event: any, i: number) => (
                                        <li key={i} className="flex items-center gap-2">
                                            <Calendar className="text-red-500 w-4 h-4 flex-shrink-0" />
                                            <span className="font-medium">{event.title}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Tank Fabricators - Only show if data exists */}
                        {data.partners && data.partners.length > 0 && (
                            <div className="bg-white border border-zinc-200 rounded-lg shadow-sm p-4">
                                <h3 className="font-bold text-blue-900 text-sm uppercase mb-3">Partners / Fabricators</h3>
                                <div className="space-y-2 text-xs">
                                    {data.partners.map((p: any, i: number) => (
                                        <div key={i}>
                                            <p className="font-bold">{p.name}</p>
                                            <p className="text-zinc-500">{p.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* About Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-4">
                                <img src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=400&q=80" alt="Logistics 1" className="rounded-2xl shadow-lg w-full h-48 object-cover" />
                                <img src="https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=400&q=80" alt="Logistics 2" className="rounded-2xl shadow-lg w-full h-64 object-cover" />
                            </div>
                            <div className="space-y-4 pt-8">
                                <img src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=400&q=80" alt="Logistics 3" className="rounded-2xl shadow-lg w-full h-64 object-cover" />
                                <div className="bg-blue-900 rounded-2xl p-6 text-white flex flex-col justify-center items-center text-center">
                                    <Truck className="w-10 h-10 mb-2" />
                                    <span className="text-3xl font-bold">2K+</span>
                                    <span className="text-sm opacity-80">Specialized Tankers</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-bold uppercase">About Us</span>
                            <h2 className="text-4xl font-extrabold text-zinc-900 mt-4 mb-6 leading-tight">Your Trusted Partner In Bulk Liquid Transportation</h2>
                            <p className="text-zinc-600 mb-8 leading-relaxed">
                                R. K. Transportation Services Pvt. Ltd. company based in Mumbai, has been formed to initially transporting Liquid bulk materials in tankers, All over India.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                                {[
                                    'Pan India Liquid Transportation', 'Specialized SS Tanker Fleet',
                                    'Chemical & Petrochemical Expertise', 'Customer Focused Logistics Solutions'
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-2">
                                        <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                                        <span className="text-sm font-semibold text-zinc-700">{item}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="bg-zinc-50 p-6 rounded-xl border border-zinc-100 mb-8">
                                <p className="text-sm text-zinc-500 italic">
                                    "The company has been formed to provide other logistic service as well. Currently R. K. Transport Service has been serving continuously for more than 30 years."
                                </p>
                            </div>

                            <button className="bg-blue-900 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-800 transition-colors flex items-center gap-2">
                                Read More <ChevronRight size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="py-20 bg-zinc-50">
                <div className="container mx-auto px-4 max-w-6xl text-center mb-16">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-bold uppercase">Our Service</span>
                    <h2 className="text-4xl font-extrabold text-zinc-900 mt-4">Our Range Of Logistics Services</h2>
                    <p className="text-zinc-500 mt-4 max-w-2xl mx-auto">
                        Our state-of-the-art facilities and innovative technology support e-commerce fulfillment and project cargo handling, providing you with tailored solutions.
                    </p>
                </div>
                <div className="container mx-auto px-4 max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { title: 'FMCG', desc: 'Efficient and hygienic transportation for liquid products.', img: 'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=400&q=80' },
                        { title: 'Chemicals', desc: 'Safety-first transport for hazardous and non-hazardous chemicals.', img: 'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=400&q=80' },
                        { title: 'Petroleum', desc: 'Reliable fleet for bulk petroleum and fuel transport.', img: 'https://images.unsplash.com/photo-1574044158488-82db36c924bc?auto=format&fit=crop&w=400&q=80' }
                    ].map((service, i) => (
                        <div key={i} className="group relative rounded-2xl overflow-hidden aspect-[3/4] shadow-xl">
                            <img src={service.img} alt={service.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-blue-900/80 opacity-0 group-hover:opacity-90 transition-opacity duration-300 flex flex-col justify-center items-center p-8 text-center text-white">
                                <Globe className="w-12 h-12 mb-4" />
                                <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                                <p className="text-sm">{service.desc}</p>
                            </div>
                            {/* Default Overlay */}
                            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent group-hover:opacity-0 transition-opacity">
                                <h3 className="text-xl font-bold text-white">{service.title}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Process Section */}
            <section className="py-20 bg-blue-900 text-white">
                <div className="container mx-auto px-4 max-w-6xl text-center mb-16">
                    <span className="bg-blue-800 text-blue-200 px-3 py-1 rounded-full text-xs font-bold uppercase">How It Works</span>
                    <h2 className="text-4xl font-extrabold mt-4">Efficient Working Process</h2>
                    <p className="text-blue-100 mt-4 max-w-2xl mx-auto">
                        Designed to deliver efficient, reliable, & tailored logistics solutions. From consultation to final delivery.
                    </p>
                </div>
                <div className="container mx-auto px-4 max-w-6xl grid grid-cols-1 md:grid-cols-4 gap-6">
                    {[
                        { icon: <Truck />, title: 'Post Request', desc: 'Shippers post detailed transportation requests specifying tanker type and timeline.', active: false },
                        { icon: <ShieldCheck />, title: 'Carrier Bids', desc: 'Specialized carriers place competitive bids based on the requirements.', active: false },
                        { icon: <Award />, title: 'Select Best Bid', desc: 'Sort and filter by price and rating. Review profiles and select the best match.', active: true }, // Highlighted Step
                        { icon: <MapPin />, title: 'Track Shipment', desc: 'Real-time tracking ensures visibility throughout the journey.', active: false }
                    ].map((step, i) => (
                        <div key={i} className={`p-8 rounded-xl border ${step.active ? 'bg-red-600 border-red-600 text-white transform scale-105 shadow-2xl' : 'bg-white text-zinc-900 border-white'} transition-all`}>
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-6 ${step.active ? 'bg-white/20' : 'bg-blue-50 text-blue-900'}`}>
                                {step.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                            <p className={`text-sm leading-relaxed ${step.active ? 'text-red-100' : 'text-zinc-500'}`}>{step.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 max-w-6xl text-center mb-16">
                    <h2 className="text-4xl font-extrabold text-zinc-900">Trusted By Industry Leaders</h2>
                    <p className="text-zinc-500 mt-4">Their testimonials highlight our commitment to overcoming logistical challenges.</p>
                </div>
                <div className="container mx-auto px-4 max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-zinc-50 p-8 rounded-2xl border border-zinc-100">
                            <div className="flex gap-1 text-blue-900 mb-4">
                                {[1, 2, 3, 4, 5].map(s => <span key={s}>★</span>)}
                            </div>
                            <h4 className="font-bold text-lg mb-2">"Tailored solutions that helped us achieve."</h4>
                            <p className="text-sm text-zinc-500 mb-6 italic">
                                "Our clients' satisfaction is our top priority, and their feedback speaks volumes about our dedication to excellence."
                            </p>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-zinc-300 rounded-full"></div> {/* Avatar Placeholder */}
                                <div>
                                    <p className="font-bold text-sm">Shevon Daniel</p>
                                    <p className="text-xs text-zinc-500">Co-Founder</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-20 bg-zinc-50">
                <div className="container mx-auto px-4 max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Form */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-zinc-200">
                        <h3 className="text-2xl font-bold mb-2">Send Us A Message</h3>
                        <p className="text-zinc-500 text-sm mb-6">Contact our service team for any queries.</p>

                        <form className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-zinc-500 uppercase">First Name</label>
                                    <input type="text" className="w-full p-3 border border-zinc-200 rounded-lg text-sm outline-none focus:border-blue-500" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-zinc-500 uppercase">Last Name</label>
                                    <input type="text" className="w-full p-3 border border-zinc-200 rounded-lg text-sm outline-none focus:border-blue-500" />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-zinc-500 uppercase">Phone</label>
                                    <input type="text" className="w-full p-3 border border-zinc-200 rounded-lg text-sm outline-none focus:border-blue-500" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-zinc-500 uppercase">Email</label>
                                    <input type="email" className="w-full p-3 border border-zinc-200 rounded-lg text-sm outline-none focus:border-blue-500" />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-zinc-500 uppercase">Message</label>
                                <textarea rows={4} className="w-full p-3 border border-zinc-200 rounded-lg text-sm outline-none focus:border-blue-500"></textarea>
                            </div>
                            <button onClick={(e) => { e.preventDefault(); alert("Message sent! We will contact you soon."); }} className="bg-blue-900 text-white px-8 py-3 rounded-full font-bold w-full hover:bg-blue-800 transition-colors">
                                Submit
                            </button>
                        </form>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-zinc-200 flex items-start gap-4">
                            <div className="bg-blue-50 p-3 rounded-full text-blue-900"><MapPin /></div>
                            <div>
                                <h4 className="font-bold text-lg">Address</h4>
                                <p className="text-zinc-500 text-sm mt-1">102, 1st Flr, Navnidhi Indl. Premises Society Ltd., A.D. Marg, Sewree(W), Mumbai - 400 015.</p>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-zinc-200 flex items-start gap-4">
                            <div className="bg-blue-50 p-3 rounded-full text-blue-900"><Phone /></div>
                            <div>
                                <h4 className="font-bold text-lg">Phone</h4>
                                <p className="text-zinc-500 text-sm mt-1">+91-22-224142646</p>
                            </div>
                        </div>
                        <div className="bg-blue-900 p-6 rounded-xl shadow-sm border border-blue-900 flex items-start gap-4 text-white">
                            <div className="bg-white/20 p-3 rounded-full"><Mail /></div>
                            <div>
                                <h4 className="font-bold text-lg">Email</h4>
                                <p className="text-blue-100 text-sm mt-1">info@rktransport.in</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Blog Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="text-center mb-16">
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-bold uppercase">Our Blog</span>
                        <h2 className="text-4xl font-extrabold text-zinc-900 mt-4">Best Practices And Strategies</h2>
                        <p className="text-zinc-500 mt-4 max-w-2xl mx-auto">
                            Gain insights into effective warehouse management strategies that maximize space, improve accuracy, and boost productivity.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { date: 'March 21, 2024', title: 'Optimizing Last-Mile Delivery: Strategies For Success', img: 'https://images.unsplash.com/photo-1616432043562-3671ea2e5242?auto=format&fit=crop&w=400&q=80' },
                            { date: 'March 20, 2024', title: 'Handling Project Cargo: Expert Tips And Strategies', img: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=400&q=80' },
                            { date: 'March 18, 2024', title: 'The Importance Of Reliable Freight Forwarding Services', img: 'https://images.unsplash.com/photo-1605218427368-35b81a3dd648?auto=format&fit=crop&w=400&q=80' }
                        ].map((blog, i) => (
                            <div key={i} className="group cursor-pointer">
                                <div className="relative overflow-hidden rounded-2xl mb-4 h-64">
                                    <img src={blog.img} alt={blog.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                    <span className="absolute bottom-4 right-4 bg-zinc-900 text-white text-xs font-bold px-3 py-1 rounded-md">{blog.date}</span>
                                </div>
                                <div className="flex items-center gap-4 text-xs text-zinc-500 mb-3">
                                    <div className="flex items-center gap-1"><User size={14} /> Henry Nicolls</div>
                                    <div className="bg-zinc-100 px-2 py-0.5 rounded">Transport & Logistics</div>
                                </div>
                                <h3 className="text-xl font-bold text-zinc-900 mb-3 group-hover:text-blue-900 transition-colors leading-tight">{blog.title}</h3>
                                <p className="text-zinc-500 text-sm mb-4 line-clamp-2">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                </p>
                                <button className="text-zinc-900 font-bold text-sm flex items-center gap-1 hover:text-blue-900">
                                    Read More <ChevronRight size={16} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer Section */}

        </div>
    );
}

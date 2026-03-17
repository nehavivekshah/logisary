'use client';
import { useState } from 'react';
import Link from 'next/link';
import {
    ChevronRight,
    Search,
    MapPin,
    FileText,
    Star,
    Clock,
    X,
    ArrowRight,
    Map
} from 'lucide-react';

export default function OrdersPage() {
    const [activeModal, setActiveModal] = useState<string | null>(null);

    const closeModal = () => setActiveModal(null);

    return (
        <main className="font-sans text-zinc-800 bg-white min-h-screen">
            {/* 1. Breadcrumb Section */}
            <section className="relative bg-amber-50 py-20 overflow-hidden text-center">
                <div className="container mx-auto px-4 relative z-10">
                    <h2 className="text-4xl font-bold text-zinc-900 mb-4">Orders</h2>
                    <div className="flex items-center justify-center gap-2 text-sm font-semibold">
                        <Link href="/" className="text-zinc-500 hover:text-primary transition">Home</Link>
                        <ChevronRight size={14} className="text-zinc-400" />
                        <span className="text-primary">Orders</span>
                    </div>
                </div>
            </section>

            {/* 2. Main Content */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="flex justify-between items-center mb-6 px-2">
                        <h3 className="text-2xl font-bold text-[#104674]">My Orders</h3>
                    </div>

                    {/* Quick Stats Row */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 text-center">
                        <div className="bg-white p-4 rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.05)] border-l-[6px] border-l-blue-600 hover:-translate-y-1 transition-transform cursor-default">
                            <small className="text-zinc-500 font-bold block mb-1">TOTAL ORDERS</small>
                            <h3 className="text-3xl font-bold text-zinc-900">42</h3>
                        </div>
                        <div className="bg-white p-4 rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.05)] border-l-[6px] border-l-amber-400 hover:-translate-y-1 transition-transform cursor-default">
                            <small className="text-zinc-500 font-bold block mb-1">IN TRANSIT</small>
                            <h3 className="text-3xl font-bold text-zinc-900">08</h3>
                        </div>
                        <div className="bg-white p-4 rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.05)] border-l-[6px] border-l-emerald-500 hover:-translate-y-1 transition-transform cursor-default">
                            <small className="text-zinc-500 font-bold block mb-1">COMPLETED</small>
                            <h3 className="text-3xl font-bold text-zinc-900">32</h3>
                        </div>
                        <div className="bg-white p-4 rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.05)] border-l-[6px] border-l-red-500 hover:-translate-y-1 transition-transform cursor-default">
                            <small className="text-zinc-500 font-bold block mb-1">CANCELLED</small>
                            <h3 className="text-3xl font-bold text-zinc-900">02</h3>
                        </div>
                    </div>

                    {/* Filters Area */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-zinc-100 mb-8">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                            <div className="md:col-span-4 relative">
                                <Search className="absolute left-3 top-3 text-zinc-400" size={18} />
                                <input
                                    type="text"
                                    className="w-full pl-10 pr-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:border-primary transition-colors"
                                    placeholder="Search by Order ID or Carrier..."
                                />
                            </div>
                            <div className="md:col-span-3">
                                <select className="w-full px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:border-primary bg-white cursor-pointer">
                                    <option disabled selected>Status: All</option>
                                    <option>In Transit</option>
                                    <option>Delivered</option>
                                    <option>Pending</option>
                                </select>
                            </div>
                            <div className="md:col-span-3">
                                <input
                                    type="date"
                                    className="w-full px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:border-primary text-zinc-500"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <button className="w-full bg-[#104674] text-white font-bold py-2 rounded-lg hover:bg-[#0d365a] transition-colors">
                                    Filter
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Orders Table */}
                    <div className="bg-white rounded-xl shadow-sm border border-zinc-200 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-[#104674] text-white uppercase text-xs tracking-wider">
                                        <th className="p-4 font-semibold">Order ID</th>
                                        <th className="p-4 font-semibold">Date</th>
                                        <th className="p-4 font-semibold">Route</th>
                                        <th className="p-4 font-semibold">Carrier</th>
                                        <th className="p-4 font-semibold">Status</th>
                                        <th className="p-4 font-semibold">Cost</th>
                                        <th className="p-4 font-semibold text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm text-zinc-700 divide-y divide-zinc-100">
                                    {/* Row 1 */}
                                    <tr className="hover:bg-zinc-50 transition-colors">
                                        <td className="p-4 font-bold text-[#104674]">#ORD-9912</td>
                                        <td className="p-4">24-Sep-2025</td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-2">
                                                Mumbai <ArrowRight size={12} className="text-zinc-400" /> Chennai
                                            </div>
                                        </td>
                                        <td className="p-4 font-medium">Express Logi Corp</td>
                                        <td className="p-4">
                                            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-[11px] font-bold uppercase">In Transit</span>
                                        </td>
                                        <td className="p-4 font-bold">₹45,000</td>
                                        <td className="p-4 text-center">
                                            <div className="flex justify-center gap-2">
                                                <a href="https://www.google.com/maps" target="_blank" className="w-8 h-8 rounded-full bg-[#104674] text-white flex items-center justify-center hover:bg-[#0d365a] transition-colors" title="Track">
                                                    <MapPin size={14} />
                                                </a>
                                                <button onClick={() => setActiveModal('invoice')} className="w-8 h-8 rounded-full bg-zinc-500 text-white flex items-center justify-center hover:bg-zinc-600 transition-colors" title="Invoice">
                                                    <FileText size={14} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>

                                    {/* Row 2 */}
                                    <tr className="hover:bg-zinc-50 transition-colors">
                                        <td className="p-4 font-bold text-[#104674]">#ORD-9880</td>
                                        <td className="p-4">20-Sep-2025</td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-2">
                                                Pune <ArrowRight size={12} className="text-zinc-400" /> Delhi
                                            </div>
                                        </td>
                                        <td className="p-4 font-medium">Safe Fuels Ltd</td>
                                        <td className="p-4">
                                            <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-[11px] font-bold uppercase">Delivered</span>
                                        </td>
                                        <td className="p-4 font-bold">₹52,000</td>
                                        <td className="p-4 text-center">
                                            <div className="flex justify-center gap-2">
                                                <button onClick={() => setActiveModal('invoice')} className="w-8 h-8 rounded-full bg-zinc-500 text-white flex items-center justify-center hover:bg-zinc-600 transition-colors" title="Invoice">
                                                    <FileText size={14} />
                                                </button>
                                                <button onClick={() => setActiveModal('feedback')} className="w-8 h-8 rounded-full bg-amber-400 text-zinc-900 flex items-center justify-center hover:bg-amber-500 transition-colors" title="Feedback">
                                                    <Star size={14} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>

                                    {/* Row 3 */}
                                    <tr className="hover:bg-zinc-50 transition-colors">
                                        <td className="p-4 font-bold text-[#104674]">#ORD-9875</td>
                                        <td className="p-4">25-Sep-2025</td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-2">
                                                Kolkata <ArrowRight size={12} className="text-zinc-400" /> Nagpur
                                            </div>
                                        </td>
                                        <td className="p-4 font-medium">RK Transporters</td>
                                        <td className="p-4">
                                            <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-[11px] font-bold uppercase">Awaiting Loading</span>
                                        </td>
                                        <td className="p-4 font-bold">₹38,500</td>
                                        <td className="p-4 text-center">
                                            <div className="flex justify-center gap-2">
                                                <button onClick={() => setActiveModal('status')} className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center hover:bg-amber-200 transition-colors" title="Status Info">
                                                    <Clock size={14} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>

            {/* MODALS */}

            {/* Invoice Modal */}
            {activeModal === 'invoice' && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-900/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white w-full max-w-3xl rounded-xl shadow-2xl overflow-hidden scale-100 animate-in zoom-in-95 duration-200">
                        <div className="p-4 border-b border-zinc-100 flex justify-between items-center bg-zinc-50">
                            <h5 className="font-bold text-lg text-zinc-800">Order Invoice</h5>
                            <button onClick={closeModal} className="text-zinc-400 hover:text-zinc-600 transition-colors">
                                <X size={20} />
                            </button>
                        </div>
                        <div className="p-8">
                            <div className="text-center mb-8">
                                <h4 className="font-bold text-2xl text-[#104674]">LOGISARY TRANSPORTATION</h4>
                                <p className="text-sm text-zinc-500 mt-1">Invoice No: INV-2025-001 | Date: 24-Sep-2025</p>
                            </div>
                            <table className="w-full text-sm mb-8 border border-zinc-200">
                                <thead className="bg-zinc-50">
                                    <tr>
                                        <th className="p-3 text-left border-b border-zinc-200">Description</th>
                                        <th className="p-3 text-right border-b border-zinc-200">Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="p-3 border-b border-zinc-100">Base Freight Charges (24KL Tanker)</td>
                                        <td className="p-3 text-right border-b border-zinc-100">₹42,000</td>
                                    </tr>
                                    <tr>
                                        <td className="p-3 border-b border-zinc-100">Transit Insurance Fee</td>
                                        <td className="p-3 text-right border-b border-zinc-100">₹3,000</td>
                                    </tr>
                                    <tr className="bg-zinc-50 font-bold">
                                        <td className="p-3 text-zinc-900">Total Payable</td>
                                        <td className="p-3 text-right text-[#104674]">₹45,000</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="flex justify-end gap-3">
                                <button className="px-4 py-2 border border-zinc-300 text-zinc-700 font-semibold rounded hover:bg-zinc-50 transition text-sm flex items-center gap-2">
                                    Download PDF
                                </button>
                                <button className="px-4 py-2 bg-[#104674] text-white font-semibold rounded hover:bg-[#0d365a] transition text-sm">
                                    Print Invoice
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Feedback Modal */}
            {activeModal === 'feedback' && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-900/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white w-full max-w-md rounded-xl shadow-2xl overflow-hidden scale-100 animate-in zoom-in-95 duration-200">
                        <div className="p-4 bg-amber-400 text-zinc-900 flex justify-between items-center">
                            <h5 className="font-bold text-lg">Rate Carrier Performance</h5>
                            <button onClick={closeModal} className="text-zinc-800/60 hover:text-zinc-900 transition-colors">
                                <X size={20} />
                            </button>
                        </div>
                        <div className="p-6 text-center">
                            <p className="mb-4 text-zinc-700">How was your experience with <strong>Safe Fuels Ltd</strong>?</p>
                            <div className="flex justify-center gap-2 mb-6 text-amber-400">
                                <Star size={24} fill="currentColor" />
                                <Star size={24} fill="currentColor" />
                                <Star size={24} fill="currentColor" />
                                <Star size={24} fill="currentColor" />
                                <Star size={24} className="text-zinc-300" />
                            </div>
                            <textarea
                                className="w-full p-3 border border-zinc-200 rounded-lg mb-4 focus:border-amber-400 outline-none resize-none text-sm"
                                rows={3}
                                placeholder="Write a short review about the delivery..."
                            ></textarea>
                            <button className="w-full bg-zinc-900 text-white font-bold py-3 rounded-lg hover:bg-zinc-800 transition-colors">
                                Submit Feedback
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Status Modal */}
            {activeModal === 'status' && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-900/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white w-full max-w-sm rounded-xl shadow-2xl overflow-hidden scale-100 animate-in zoom-in-95 duration-200">
                        <div className="p-6 text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 text-amber-500 rounded-full mb-4">
                                <Clock size={32} />
                            </div>
                            <h5 className="text-xl font-bold text-zinc-900 mb-2">Awaiting Loading</h5>
                            <p className="text-zinc-500 text-sm mb-6 leading-relaxed">
                                The vehicle has arrived at the loading point. Loading is expected to start within <strong>2 hours</strong>.
                            </p>
                            <button onClick={closeModal} className="px-6 py-2 border border-zinc-200 bg-zinc-50 text-zinc-600 font-semibold rounded hover:bg-zinc-100 transition-colors">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </main>
    );
}

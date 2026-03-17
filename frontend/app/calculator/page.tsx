'use client';
import Link from 'next/link';
import { ChevronRight, Calculator } from 'lucide-react';
import { useState } from 'react';

export default function CalculatorPage() {
    // State for calculation result
    const [result, setResult] = useState<{ distance: number | null, time: number | null }>({ distance: null, time: null });
    const [formData, setFormData] = useState({
        from: '',
        to: '',
        vehicleType: 'Tanker SS',
        material: '',
        mlWt: '',
        loadingDate: '',
        hazardStatus: 'Non-Hazardous',
        loadingDetails: ''
    });

    const handleCalculate = () => {
        if (!formData.from || !formData.to) {
            alert("Please enter both Origin and Destination first.");
            return;
        }
        // Simulating calculation (Mock logic as per HTML example)
        // In real app, this would call an API
        const randomDistance = Math.floor(Math.random() * (500 - 50 + 1)) + 50;
        const estimatedTime = Math.round(randomDistance / 40); // Avg speed 40km/h

        setResult({
            distance: randomDistance,
            time: estimatedTime
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert("Enquiry Saved & Proceeding...");
        // Handle form submission logic here
    };

    return (
        <main className="font-sans text-zinc-800 bg-white">
            {/* 1. Breadcrumb Section */}
            <section className="relative bg-amber-50 py-20 overflow-hidden text-center">
                <div className="container mx-auto px-4 relative z-10">
                    <h2 className="text-4xl font-bold text-zinc-900 mb-4">KM Calculate</h2>
                    <div className="flex items-center justify-center gap-2 text-sm font-semibold">
                        <Link href="/" className="text-zinc-500 hover:text-primary transition">Home</Link>
                        <ChevronRight size={14} className="text-zinc-400" />
                        <span className="text-primary">KM Calculate</span>
                    </div>
                </div>
            </section>

            {/* 2. Calculator Form Section */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="bg-white rounded-[15px] shadow-[0_5px_20px_rgba(0,0,0,0.08)] p-8 border border-zinc-100">
                        {/* Header */}
                        <div className="flex flex-col md:flex-row justify-between items-center mb-8 pb-4 border-b border-zinc-100 gap-4">
                            <h4 className="text-xl font-bold flex items-center gap-2 text-zinc-900">
                                <Calculator className="text-primary" />
                                KM Calculation & Job Details
                            </h4>
                            <span className="bg-zinc-50 text-zinc-800 border border-zinc-200 px-3 py-1 rounded text-sm font-semibold">RK-TR-001</span>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="overflow-x-auto mb-8">
                                <table className="w-full text-sm min-w-[600px]">
                                    <thead>
                                        <tr>
                                            <th className="bg-[#104674] text-white p-3 text-center border border-[#0d365a] w-1/3">From (Origin)</th>
                                            <th className="bg-[#104674] text-white p-3 text-center border border-[#0d365a] w-1/3">To (Destination)</th>
                                            <th className="bg-[#104674] text-white p-3 text-center border border-[#0d365a] w-1/3">Types of Vehicle</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* Reference Row 1 */}
                                        <tr>
                                            <td className="border border-zinc-200 p-3">
                                                <input
                                                    type="text"
                                                    placeholder="e.g. Mumbai"
                                                    className="w-full p-2 border-b border-zinc-300 focus:border-[#104674] outline-none transition-colors"
                                                    required
                                                    value={formData.from}
                                                    onChange={(e) => setFormData({ ...formData, from: e.target.value })}
                                                />
                                            </td>
                                            <td className="border border-zinc-200 p-3">
                                                <input
                                                    type="text"
                                                    placeholder="e.g. Pune"
                                                    className="w-full p-2 border-b border-zinc-300 focus:border-[#104674] outline-none transition-colors"
                                                    required
                                                    value={formData.to}
                                                    onChange={(e) => setFormData({ ...formData, to: e.target.value })}
                                                />
                                            </td>
                                            <td className="border border-zinc-200 p-3">
                                                <select
                                                    className="w-full p-2 bg-zinc-50 border-0 outline-none cursor-pointer"
                                                    value={formData.vehicleType}
                                                    onChange={(e) => setFormData({ ...formData, vehicleType: e.target.value })}
                                                >
                                                    <option value="Tanker SS">Tanker (SS)</option>
                                                    <option value="Tanker MS">Tanker (MS)</option>
                                                    <option value="Open Truck">Open Truck</option>
                                                    <option value="Container">Container</option>
                                                </select>
                                            </td>
                                        </tr>
                                        {/* Material Name */}
                                        <tr>
                                            <td className="border border-zinc-200 p-3 font-bold bg-zinc-50">Material Name</td>
                                            <td colSpan={2} className="border border-zinc-200 p-3">
                                                <input
                                                    type="text"
                                                    placeholder="Enter material type (e.g. Chemicals)"
                                                    className="w-full p-2 border-0 outline-none"
                                                    value={formData.material}
                                                    onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                                                />
                                            </td>
                                        </tr>
                                        {/* Weight */}
                                        <tr>
                                            <td className="border border-zinc-200 p-3 font-bold bg-zinc-50">M.L. Wt (Tons/KL)</td>
                                            <td colSpan={2} className="border border-zinc-200 p-3">
                                                <input
                                                    type="number"
                                                    placeholder="0.00"
                                                    className="w-full p-2 border-0 outline-none"
                                                    value={formData.mlWt}
                                                    onChange={(e) => setFormData({ ...formData, mlWt: e.target.value })}
                                                />
                                            </td>
                                        </tr>
                                        {/* Date */}
                                        <tr>
                                            <td className="border border-zinc-200 p-3 font-bold bg-zinc-50">Loading Date</td>
                                            <td colSpan={2} className="border border-zinc-200 p-3">
                                                <input
                                                    type="date"
                                                    className="w-full p-2 border-0 outline-none text-zinc-500"
                                                    value={formData.loadingDate}
                                                    onChange={(e) => setFormData({ ...formData, loadingDate: e.target.value })}
                                                />
                                            </td>
                                        </tr>
                                        {/* Hazard Status */}
                                        <tr>
                                            <td className="border border-zinc-200 p-3 font-bold bg-zinc-50">Hazards / Non-Hazards</td>
                                            <td colSpan={2} className="border border-zinc-200 p-3">
                                                <div className="flex gap-6">
                                                    <div className="flex items-center gap-2">
                                                        <input
                                                            type="radio"
                                                            id="haz"
                                                            name="hazard_status"
                                                            value="Hazardous"
                                                            checked={formData.hazardStatus === 'Hazardous'}
                                                            onChange={(e) => setFormData({ ...formData, hazardStatus: e.target.value })}
                                                            className="cursor-pointer"
                                                        />
                                                        <label htmlFor="haz" className="cursor-pointer">Hazardous</label>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <input
                                                            type="radio"
                                                            id="non_haz"
                                                            name="hazard_status"
                                                            value="Non-Hazardous"
                                                            checked={formData.hazardStatus === 'Non-Hazardous'}
                                                            onChange={(e) => setFormData({ ...formData, hazardStatus: e.target.value })}
                                                            className="cursor-pointer"
                                                        />
                                                        <label htmlFor="non_haz" className="cursor-pointer">Non-Hazardous</label>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        {/* Details */}
                                        <tr>
                                            <td className="border border-zinc-200 p-3 font-bold bg-zinc-50">Loading Details</td>
                                            <td colSpan={2} className="border border-zinc-200 p-3">
                                                <textarea
                                                    rows={3}
                                                    placeholder="Enter extra details like loading point, person contact, etc."
                                                    className="w-full p-2 border-0 outline-none resize-none"
                                                    value={formData.loadingDetails}
                                                    onChange={(e) => setFormData({ ...formData, loadingDetails: e.target.value })}
                                                ></textarea>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            {/* Result Box */}
                            {result.distance !== null && (
                                <div className="bg-primary/5 border border-blue-100 rounded-lg p-6 mb-8 animate-in fade-in slide-in-from-top-4 duration-300">
                                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                                        <div>
                                            <h6 className="text-zinc-600 font-semibold mb-1">Estimated Distance:</h6>
                                            <h3 className="text-3xl font-bold text-[#104674]">{result.distance} KM</h3>
                                        </div>
                                        <div className="text-right">
                                            <small className="text-zinc-500 font-medium block">Estimated Trip Time:</small>
                                            <span className="font-bold text-zinc-900 text-lg">{result.time} Hours (Approx)</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Actions */}
                            <div className="flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={handleCalculate}
                                    className="px-6 py-3 border border-zinc-300 text-zinc-600 font-bold rounded hover:bg-zinc-50 transition"
                                >
                                    Check KM
                                </button>
                                <button
                                    type="submit"
                                    className="px-8 py-3 bg-[#104674] text-white font-bold rounded hover:bg-[#0d365a] transition shadow-lg"
                                >
                                    Save & Proceed
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </main>
    );
}

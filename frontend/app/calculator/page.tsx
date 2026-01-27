'use client';
import { useState } from 'react';
import { Map, Navigation } from 'lucide-react';

export default function CalculatorPage() {
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [distance, setDistance] = useState<number | null>(null);

    const calculateDistance = () => {
        // Mock calculation since we don't have Google Maps API key
        if (from && to) {
            setDistance(Math.floor(Math.random() * 1000) + 50); // Random distance 50-1050km
        }
    };

    return (
        <div className="min-h-screen bg-zinc-50 font-sans text-zinc-800">
            <div className="bg-blue-900 text-white py-12">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-3xl font-bold">KM Calculator</h1>
                    <p className="mt-2 text-blue-100">Calculate distance and estimated fuel costs.</p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-sm border border-zinc-200">
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-zinc-700 mb-1">Origin City</label>
                                <div className="relative">
                                    <Map className="absolute left-3 top-3 text-zinc-400" size={18} />
                                    <input
                                        type="text"
                                        value={from}
                                        onChange={(e) => setFrom(e.target.value)}
                                        className="w-full pl-10 p-2 border border-zinc-300 rounded focus:ring-1 focus:ring-blue-500 outline-none"
                                        placeholder="Mumbai"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-zinc-700 mb-1">Destination City</label>
                                <div className="relative">
                                    <Navigation className="absolute left-3 top-3 text-zinc-400" size={18} />
                                    <input
                                        type="text"
                                        value={to}
                                        onChange={(e) => setTo(e.target.value)}
                                        className="w-full pl-10 p-2 border border-zinc-300 rounded focus:ring-1 focus:ring-blue-500 outline-none"
                                        placeholder="Delhi"
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={calculateDistance}
                            className="w-full bg-blue-900 text-white font-bold py-3 rounded hover:bg-blue-800 transition-colors"
                        >
                            Calculate Distance
                        </button>

                        {distance !== null && (
                            <div className="mt-8 p-6 bg-zinc-50 rounded border border-zinc-200 text-center">
                                <div className="text-sm text-zinc-500 uppercase tracking-widest font-semibold mb-2">Estimated Distance</div>
                                <div className="text-4xl font-bold text-blue-900 mb-4">{distance} KM</div>
                                <p className="text-xs text-zinc-500">* This is an approximate distance calculated for road transport.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

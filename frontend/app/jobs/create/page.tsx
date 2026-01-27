'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/utils/api';
import { useAuth } from '@/context/AuthContext';

export default function CreateJobPage() {
    const { user, token } = useAuth();
    const router = useRouter();
    const [formData, setFormData] = useState({
        origin: '',
        destination: '',
        material_type: '',
        weight_volume: '',
        scheduled_date: '',
        description: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    if (!user || user.role !== 'SHIPPER') {
        return (
            <div className="p-8 text-center">
                <h2 className="text-xl font-bold text-red-600">Access Denied</h2>
                <p>Only Shippers can post jobs.</p>
            </div>
        );
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await api.post('/jobs', formData, token!);
            if (res.id) {
                router.push('/dashboard');
            } else {
                setError(res.message || 'Failed to create job');
            }
        } catch (err) {
            setError('An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-zinc-50 py-12 px-4">
            <div className="max-w-3xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-extrabold text-zinc-900">Post a Shipment</h1>
                    <p className="text-zinc-500 mt-2">Fill in the details below to broadcast your load to our network of verified carriers.</p>
                </div>

                <div className="bg-white rounded-2xl shadow-xl shadow-blue-900/5 border border-zinc-200 overflow-hidden">
                    <div className="bg-blue-900 p-6 text-white bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-repeat">
                        <h2 className="font-bold text-lg flex items-center gap-2">
                            Shipment Details
                        </h2>
                    </div>

                    <div className="p-8">
                        {error && <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm font-medium">{error}</div>}

                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
                                {/* Connector Line (Visual only for desktop) */}
                                <div className="hidden md:block absolute top-[2.4rem] left-[50%] -translate-x-1/2 w-8 h-[2px] bg-zinc-200"></div>

                                <div className="group">
                                    <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Origin Location</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-zinc-50 focus:bg-white focus:border-blue-900 focus:ring-1 focus:ring-blue-900 outline-none transition-all font-semibold"
                                        value={formData.origin}
                                        onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                                        placeholder="City, State"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Destination Location</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-zinc-50 focus:bg-white focus:border-blue-900 focus:ring-1 focus:ring-blue-900 outline-none transition-all font-semibold"
                                        value={formData.destination}
                                        onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                                        placeholder="City, State"
                                    />
                                </div>
                            </div>

                            <hr className="border-dashed border-zinc-200" />

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Material Type</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:border-blue-900 focus:ring-1 focus:ring-blue-900 outline-none transition-all text-sm"
                                        value={formData.material_type}
                                        onChange={(e) => setFormData({ ...formData, material_type: e.target.value })}
                                        placeholder="e.g. Chemicals"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Weight / Volume</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:border-blue-900 focus:ring-1 focus:ring-blue-900 outline-none transition-all text-sm"
                                        value={formData.weight_volume}
                                        onChange={(e) => setFormData({ ...formData, weight_volume: e.target.value })}
                                        placeholder="e.g. 20 Tons"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Scheduled Date</label>
                                    <input
                                        type="date"
                                        required
                                        className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:border-blue-900 focus:ring-1 focus:ring-blue-900 outline-none transition-all text-sm"
                                        value={formData.scheduled_date}
                                        onChange={(e) => setFormData({ ...formData, scheduled_date: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Additional Instructions</label>
                                <textarea
                                    className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:border-blue-900 focus:ring-1 focus:ring-blue-900 outline-none min-h-[120px] text-sm"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    placeholder="Enter any specific requirements, handling instructions, or contact details..."
                                />
                            </div>

                            <div className="pt-4">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-4 rounded-xl bg-blue-900 text-white font-bold text-lg hover:bg-blue-800 transition-all shadow-lg shadow-blue-900/20 disabled:opacity-70 flex items-center justify-center gap-2"
                                >
                                    {loading ? 'Processing...' : 'Post Shipment Now'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}


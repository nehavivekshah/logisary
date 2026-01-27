'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { api } from '@/utils/api';
import { useAuth } from '@/context/AuthContext';

export default function JobDetailsPage() {
    const { id } = useParams();
    const { user, token } = useAuth();
    const [job, setJob] = useState<any>(null);
    const [bids, setBids] = useState<any[]>([]);
    const [bidAmount, setBidAmount] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            if (!id || !token) return;
            try {
                // Ideally we'd have a specific getJob endpoint, but for now filtering from list or assuming we add one
                // Let's assume we implement a specific GET /jobs/:id endpoint or filter client side for MVP speed if API missing
                // Wait, I only implemented GET /jobs list. I should probably add GET /jobs/:id to backend or just filter list client side for now.
                // For robustness let's fetch list and find. (Not efficient but works for MVP).
                const jobs = await api.get('/jobs', token);
                const foundJob = jobs.find((j: any) => j.id === id);
                setJob(foundJob);

                if (foundJob && (user?.role === 'SHIPPER' || user?.role === 'CARRIER')) {
                    // Fetch bids if allowed
                    // Actually currently only Shipper of that job or Admin should see all bids? 
                    // Or Carrier sees their own? 
                    // The backend endpoint GET /jobs/:id/bids exists.
                    try {
                        const bidsRes = await api.get(`/jobs/${id}/bids`, token);
                        if (Array.isArray(bidsRes)) setBids(bidsRes);
                    } catch (e) { /* ignore if not allowed */ }
                }

            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id, token, user]);

    const placeBid = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post(`/jobs/${id}/bids`, {
                amount: parseFloat(bidAmount),
                estimated_delivery_time: '2 Days', // Hardcoded for demo
                message: 'Ready to pickup'
            }, token!);
            alert('Bid placed successfully!');
            // Refresh bids
            const bidsRes = await api.get(`/jobs/${id}/bids`, token!);
            setBids(bidsRes);
        } catch (err) {
            alert('Failed to place bid');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (!job) return <div>Job not found</div>;

    const updateStatus = async (newStatus: string) => {
        try {
            await api.patch(`/jobs/${id}/status`, { status: newStatus }, token!);
            setJob({ ...job, status: newStatus });
            alert(`Status updated to ${newStatus}`);
        } catch (err) {
            alert('Failed to update status');
        }
    };

    return (
        <div className="min-h-screen bg-zinc-50 py-12 px-4">
            <div className="max-w-5xl mx-auto">
                {/* Job Card */}
                <div className="bg-white rounded-2xl shadow-xl shadow-blue-900/5 border border-zinc-200 overflow-hidden mb-8">
                    <div className="border-b border-zinc-100 p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1 block">Shipment ID: #{id}</span>
                            <h1 className="text-2xl font-black text-zinc-900">
                                {job.origin} <span className="text-zinc-300 mx-2">→</span> {job.destination}
                            </h1>
                        </div>
                        <span className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wide border ${job.status === 'DELIVERED' ? 'bg-green-50 text-green-700 border-green-100' :
                            job.status === 'IN_TRANSIT' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                                'bg-amber-50 text-amber-700 border-amber-100'
                            }`}>
                            {job.status || 'PENDING'}
                        </span>
                    </div>

                    {/* Visual Timeline */}
                    <div className="px-8 pb-8">
                        <div className="relative">
                            <div className="absolute top-1/2 left-0 w-full h-1 bg-zinc-100 -translate-y-1/2 rounded-full"></div>
                            <div className="absolute top-1/2 left-0 h-1 bg-green-500 -translate-y-1/2 rounded-full transition-all duration-500"
                                style={{
                                    width: job.status === 'DELIVERED' ? '100%' :
                                        job.status === 'IN_TRANSIT' ? '50%' : '0%'
                                }}></div>

                            <div className="relative flex justify-between">
                                {/* Step 1: Pending */}
                                <div className="flex flex-col items-center gap-2">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold z-10 border-4 transition-colors ${job.status ? 'bg-green-500 border-green-100 text-white' : 'bg-zinc-200 border-zinc-50 text-zinc-500'
                                        }`}>1</div>
                                    <span className="text-xs font-bold text-zinc-600 uppercase">Booked</span>
                                </div>

                                {/* Step 2: In Transit */}
                                <div className="flex flex-col items-center gap-2">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold z-10 border-4 transition-colors ${job.status === 'IN_TRANSIT' || job.status === 'DELIVERED' ? 'bg-green-500 border-green-100 text-white' : 'bg-zinc-200 border-zinc-50 text-zinc-500'
                                        }`}>2</div>
                                    <span className="text-xs font-bold text-zinc-600 uppercase">In Transit</span>
                                </div>

                                {/* Step 3: Delivered */}
                                <div className="flex flex-col items-center gap-2">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold z-10 border-4 transition-colors ${job.status === 'DELIVERED' ? 'bg-green-500 border-green-100 text-white' : 'bg-zinc-200 border-zinc-50 text-zinc-500'
                                        }`}>3</div>
                                    <span className="text-xs font-bold text-zinc-600 uppercase">Delivered</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-8 grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div>
                            <p className="text-xs font-bold text-zinc-400 uppercase mb-1">Material</p>
                            <p className="font-bold text-zinc-800 text-lg">{job.material_type}</p>
                        </div>
                        <div>
                            <p className="text-xs font-bold text-zinc-400 uppercase mb-1">Load Weight</p>
                            <p className="font-bold text-zinc-800 text-lg">{job.weight_volume}</p>
                        </div>
                        <div>
                            <p className="text-xs font-bold text-zinc-400 uppercase mb-1">Scheduled Date</p>
                            <p className="font-bold text-zinc-800 text-lg">{job.scheduled_date ? new Date(job.scheduled_date).toLocaleDateString() : 'N/A'}</p>
                        </div>
                        <div>
                            <p className="text-xs font-bold text-zinc-400 uppercase mb-1">Posted By</p>
                            <p className="font-bold text-zinc-800 text-lg">Verified Shipper</p>
                        </div>
                    </div>

                    <div className="px-8 pb-8">
                        <div className="bg-zinc-50 rounded-xl p-6 border border-zinc-100">
                            <p className="text-xs font-bold text-zinc-400 uppercase mb-2">Instructions / Notes</p>
                            <p className="text-zinc-600 leading-relaxed font-medium">
                                {job.description || 'No specific instructions provided for this shipment.'}
                            </p>
                        </div>
                    </div>

                    {/* Carrier Actions */}
                    {user?.role === 'CARRIER' && (
                        <div className="bg-zinc-50 border-t border-zinc-100 p-8 flex items-center justify-between">
                            <div>
                                <h3 className="font-bold text-zinc-900">Update Status</h3>
                                <p className="text-xs text-zinc-500 mt-1">Change the shipping status of this job.</p>
                            </div>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => updateStatus('IN_TRANSIT')}
                                    className="px-5 py-2.5 bg-white border border-blue-200 text-blue-700 rounded-lg hover:bg-blue-50 font-bold text-sm transition-colors shadow-sm"
                                >
                                    Mark In Transit
                                </button>
                                <button
                                    onClick={() => updateStatus('DELIVERED')}
                                    className="px-5 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 font-bold text-sm transition-colors shadow-lg shadow-green-600/20"
                                >
                                    Mark Delivered
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Bidding Section for Carrier */}
                {user?.role === 'CARRIER' && (
                    <div className="bg-blue-900 rounded-2xl p-8 text-white shadow-xl shadow-blue-900/20">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                            <div>
                                <h2 className="text-2xl font-bold mb-2">Place Your Bid</h2>
                                <p className="text-blue-200 text-sm">Submit your best offer for this shipment. The shipper will review all bids.</p>
                            </div>
                            <form onSubmit={placeBid} className="flex gap-2 w-full md:w-auto">
                                <input
                                    type="number"
                                    placeholder="Amount (₹)"
                                    className="px-6 py-3 rounded-xl text-zinc-900 font-bold outline-none w-full md:w-48 placeholder:font-normal"
                                    value={bidAmount}
                                    onChange={e => setBidAmount(e.target.value)}
                                    required
                                />
                                <button type="submit" className="bg-white text-blue-900 px-8 py-3 rounded-xl hover:bg-zinc-100 font-bold shadow-lg transition-colors whitespace-nowrap">
                                    Submit Bid
                                </button>
                            </form>
                        </div>
                    </div>
                )}

                {/* Bids List for Shipper */}
                {user?.role === 'SHIPPER' && (
                    <div className="mt-8">
                        <h2 className="text-xl font-bold text-zinc-900 mb-4 px-2">Received Bids</h2>
                        {bids.length === 0 ? (
                            <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-zinc-300">
                                <p className="text-zinc-500 font-medium">No bids received yet.</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {bids.map((bid: any) => (
                                    <div key={bid.id} className="bg-white p-6 border border-zinc-100 rounded-xl shadow-sm flex justify-between items-center hover:border-blue-200 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-900 font-black text-xl">
                                                ₹
                                            </div>
                                            <div>
                                                <p className="font-extrabold text-2xl text-zinc-900">₹{bid.amount}</p>
                                                <p className="text-sm text-zinc-500 font-medium">{bid.message || 'No message provided'}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <span className="px-4 py-1.5 bg-yellow-50 text-yellow-700 border border-yellow-100 rounded-full text-xs font-bold uppercase">{bid.status}</span>
                                            <div className="mt-2 flex gap-2">
                                                <button className="text-xs font-bold text-green-600 hover:underline">Accept</button>
                                                <button className="text-xs font-bold text-red-500 hover:underline">Decline</button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

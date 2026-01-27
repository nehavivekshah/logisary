'use client';

import { useAuth } from '@/context/AuthContext';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/utils/api';

export default function DashboardPage() {
    const { user, token } = useAuth();
    const router = useRouter();
    const [stats, setStats] = useState({ activeJobs: 0, pendingBids: 0, myBids: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!token) {
            router.push('/auth/login');
            return;
        }

        const fetchStats = async () => {
            try {
                const response = await api.get('/users/stats', token);
                setStats(response);
            } catch (err) {
                console.error("Failed to fetch dashboard stats", err);
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchStats();
        }
    }, [token, router, user]);

    if (!user) return null;

    return (
        <div className="max-w-7xl mx-auto p-8 lg:p-12 min-h-screen">
            <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-4xl font-extrabold text-zinc-900 mb-2">Dashboard</h1>
                    <p className="text-zinc-500 text-lg">
                        Welcome back, <span className="font-bold text-blue-900">{user.full_name}</span>
                    </p>
                </div>
                <div className="flex gap-3">
                    <button className="bg-white border border-zinc-200 text-zinc-700 px-5 py-2.5 rounded-full font-bold text-sm hover:bg-zinc-50 transition-colors shadow-sm">
                        Export Report
                    </button>
                    <button className="bg-blue-900 text-white px-5 py-2.5 rounded-full font-bold text-sm hover:bg-blue-800 transition-colors shadow-lg shadow-blue-900/20">
                        Settings
                    </button>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                <div className="bg-white p-8 rounded-2xl border border-zinc-100 shadow-xl shadow-blue-900/5 hover:transform hover:scale-[1.02] transition-all duration-300">
                    <h3 className="text-zinc-500 font-bold text-sm uppercase tracking-wider mb-2">Active Jobs</h3>
                    <div className="flex items-baseline gap-2">
                        <p className="text-5xl font-black text-blue-900">{stats.activeJobs}</p>
                        <span className="text-sm font-bold text-green-500">Live</span>
                    </div>
                    <p className="text-sm text-zinc-400 mt-4 font-medium">Jobs currently in progress</p>
                </div>

                {user.role === 'SHIPPER' && (
                    <div className="bg-white p-8 rounded-2xl border border-zinc-100 shadow-xl shadow-blue-900/5 hover:transform hover:scale-[1.02] transition-all duration-300">
                        <h3 className="text-zinc-500 font-bold text-sm uppercase tracking-wider mb-2">Pending Bids</h3>
                        <div className="flex items-baseline gap-2">
                            <p className="text-5xl font-black text-blue-900">{stats.pendingBids}</p>
                            <span className="text-sm font-bold text-zinc-400">Review Now</span>
                        </div>
                        <p className="text-sm text-zinc-400 mt-4 font-medium">Bids waiting for approval</p>
                    </div>
                )}

                {user.role === 'CARRIER' && (
                    <div className="bg-white p-8 rounded-2xl border border-zinc-100 shadow-xl shadow-blue-900/5 hover:transform hover:scale-[1.02] transition-all duration-300">
                        <h3 className="text-zinc-500 font-bold text-sm uppercase tracking-wider mb-2">My Bids</h3>
                        <div className="flex items-baseline gap-2">
                            <p className="text-5xl font-black text-blue-900">{stats.myBids}</p>
                            <span className="text-sm font-bold text-green-500">Active</span>
                        </div>
                        <p className="text-sm text-zinc-400 mt-4 font-medium">Total bids placed</p>
                    </div>
                )}
            </div>

            <div>
                {user.role === 'SHIPPER' ? (
                    <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-3xl p-12 text-white relative overflow-hidden shadow-2xl shadow-blue-900/20">
                        {/* Abstract Shape */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16"></div>

                        <div className="relative z-10 max-w-2xl">
                            <h2 className="text-3xl font-extrabold mb-4">Ready to ship?</h2>
                            <p className="text-blue-100 text-lg mb-8 leading-relaxed">
                                Create a new transportation request instantly. Get competitive bids from our verified network of carriers and track your shipment in real-time.
                            </p>
                            <button
                                onClick={() => router.push('/jobs/create')}
                                className="bg-white text-blue-900 px-8 py-3.5 rounded-xl font-bold hover:bg-blue-50 transition-colors inline-flex items-center gap-2"
                            >
                                Post a New Shipment
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-3xl p-12 text-white relative overflow-hidden shadow-2xl shadow-blue-900/20">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16"></div>

                        <div className="relative z-10 max-w-2xl">
                            <h2 className="text-3xl font-extrabold mb-4">Find your next load</h2>
                            <p className="text-blue-100 text-lg mb-8 leading-relaxed">
                                Browse thousands of active shipment requests available in your preferred lanes. Place competitive bids and grow your business.
                            </p>
                            <button
                                onClick={() => router.push('/')}
                                className="bg-white text-blue-900 px-8 py-3.5 rounded-xl font-bold hover:bg-blue-50 transition-colors inline-flex items-center gap-2"
                            >
                                Browse Available Jobs
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

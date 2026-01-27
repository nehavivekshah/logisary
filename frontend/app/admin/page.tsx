'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/utils/api';
import { useRouter } from 'next/navigation';
import { Users, Package, TrendingUp, AlertCircle } from 'lucide-react';

export default function AdminDashboard() {
    const { user, token, isLoading } = useAuth();
    const router = useRouter();
    const [stats, setStats] = useState({ users: 0, jobs: 0, bids: 0 });

    useEffect(() => {
        if (!isLoading) {
            if (!user) {
                router.push('/auth/login');
                return;
            }
            if (user.role !== 'ADMIN') {
                router.push('/dashboard'); // Redirect non-admins
                return;
            }
        }

        // Fetch real stats from backend
        const fetchStats = async () => {
            if (!token) return;
            try {
                const response = await api.get('/admin/stats', token);
                setStats(response);
            } catch (e) {
                console.error(e);
            }
        };

        if (user?.role === 'ADMIN') {
            fetchStats();
        }
    }, [user, router, isLoading, token]);

    if (isLoading) return <div className="flex h-screen items-center justify-center">Loading...</div>;
    if (!user || user.role !== 'ADMIN') return null;

    return (
        <div className="min-h-screen bg-zinc-50 py-12 px-4 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
                    <div>
                        <h1 className="text-4xl font-extrabold text-zinc-900">Admin Control Center</h1>
                        <p className="text-zinc-500 mt-2">Monitor platform activity and system health.</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="bg-white border border-zinc-200 text-zinc-700 px-6 py-2.5 rounded-full font-bold text-sm hover:bg-zinc-50 transition-colors shadow-sm">
                            Generate Reports
                        </button>
                        <button className="bg-blue-900 text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-blue-800 transition-colors shadow-lg shadow-blue-900/20">
                            Global Settings
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                    {/* Stat Card 1 */}
                    <div className="bg-white p-6 rounded-2xl border border-zinc-100 shadow-xl shadow-blue-900/5 hover:-translate-y-1 transition-transform duration-300">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-blue-50 text-blue-700 rounded-xl">
                                <Users size={24} strokeWidth={2.5} />
                            </div>
                            <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">+12%</span>
                        </div>
                        <p className="text-sm font-bold text-zinc-400 uppercase tracking-wider">Total Users</p>
                        <p className="text-3xl font-black text-zinc-900 mt-1">{stats.users}</p>
                    </div>

                    {/* Stat Card 2 */}
                    <div className="bg-white p-6 rounded-2xl border border-zinc-100 shadow-xl shadow-blue-900/5 hover:-translate-y-1 transition-transform duration-300">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-indigo-50 text-indigo-700 rounded-xl">
                                <Package size={24} strokeWidth={2.5} />
                            </div>
                            <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">+5%</span>
                        </div>
                        <p className="text-sm font-bold text-zinc-400 uppercase tracking-wider">Total Jobs</p>
                        <p className="text-3xl font-black text-zinc-900 mt-1">{stats.jobs}</p>
                    </div>

                    {/* Stat Card 3 */}
                    <div className="bg-white p-6 rounded-2xl border border-zinc-100 shadow-xl shadow-blue-900/5 hover:-translate-y-1 transition-transform duration-300">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-amber-50 text-amber-700 rounded-xl">
                                <TrendingUp size={24} strokeWidth={2.5} />
                            </div>
                            <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">+24%</span>
                        </div>
                        <p className="text-sm font-bold text-zinc-400 uppercase tracking-wider">Total Bids</p>
                        <p className="text-3xl font-black text-zinc-900 mt-1">{stats.bids}</p>
                    </div>

                    {/* Stat Card 4 */}
                    <div className="bg-white p-6 rounded-2xl border border-zinc-100 shadow-xl shadow-blue-900/5 hover:-translate-y-1 transition-transform duration-300">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-red-50 text-red-700 rounded-xl">
                                <AlertCircle size={24} strokeWidth={2.5} />
                            </div>
                            <span className="text-xs font-bold text-zinc-400 bg-zinc-100 px-2 py-1 rounded-full">Action Req</span>
                        </div>
                        <p className="text-sm font-bold text-zinc-400 uppercase tracking-wider">Pending Issues</p>
                        <p className="text-3xl font-black text-zinc-900 mt-1">3</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-white rounded-2xl shadow-xl shadow-blue-900/5 border border-zinc-100 overflow-hidden">
                        <div className="p-6 border-b border-zinc-50 flex justify-between items-center">
                            <h2 className="text-lg font-bold text-zinc-900">Recent Activity</h2>
                            <button className="text-xs font-bold text-blue-700 hover:text-blue-800">View All</button>
                        </div>
                        <div className="p-2">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="flex items-center justify-between p-4 hover:bg-zinc-50 rounded-xl transition-colors group">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">
                                            JS
                                        </div>
                                        <div>
                                            <p className="font-bold text-zinc-900 text-sm group-hover:text-blue-900 transition-colors">New User Registration</p>
                                            <p className="text-xs text-zinc-500 font-medium">Shipper joined 2 mins ago</p>
                                        </div>
                                    </div>
                                    <span className="text-[10px] font-bold bg-blue-50 text-blue-700 px-2 py-1 rounded-full uppercase tracking-wider">New</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-xl shadow-blue-900/5 border border-zinc-100 overflow-hidden">
                        <div className="p-6 border-b border-zinc-50">
                            <h2 className="text-lg font-bold text-zinc-900">System Health</h2>
                        </div>
                        <div className="p-6 space-y-6">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                                    <span className="text-zinc-600 font-bold text-sm">Database Connection</span>
                                </div>
                                <span className="text-green-600 font-bold text-sm bg-green-50 px-3 py-1 rounded-full">Stable</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                                    <span className="text-zinc-600 font-bold text-sm">API Latency</span>
                                </div>
                                <span className="text-green-600 font-bold text-sm bg-green-50 px-3 py-1 rounded-full">45ms</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.6)]"></div>
                                    <span className="text-zinc-600 font-bold text-sm">Storage Usage</span>
                                </div>
                                <span className="text-yellow-600 font-bold text-sm bg-yellow-50 px-3 py-1 rounded-full">78%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

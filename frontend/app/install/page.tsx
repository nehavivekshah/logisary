'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/utils/api';

export default function InstallPage() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        dbHost: 'localhost',
        dbPort: '5432',
        dbName: 'rkportal',
        dbUser: 'postgres',
        dbPassword: '',
        adminEmail: '',
        adminPassword: '',
        adminName: ''
    });

    useEffect(() => {
        // Check if already installed
        api.get('/setup/status')
            .then((res: any) => {
                if (res.installed) {
                    router.push('/');
                }
            })
            .catch(() => {
                // Backend might not be reachable or setup route not ready, assume not installed
            });
    }, [router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setMessage('');

        try {
            const res = await api.post('/setup/install', formData);
            if (res.success) {
                setMessage('Installation successful! Redirecting to login...');
                setTimeout(() => {
                    router.push('/auth/login');
                }, 2000);
            } else {
                setError(res.message || 'Installation failed');
            }
        } catch (err: any) {
            setError(err.message || 'An error occurred during installation');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-zinc-50 flex items-center justify-center p-4">
            <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-blue-900 p-8 text-white text-center">
                    <h1 className="text-3xl font-extrabold mb-2">RK Portal Installer</h1>
                    <p className="text-blue-100">Setup your logistics platform in minutes</p>
                </div>

                <div className="p-8">
                    {message && (
                        <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 text-green-700 font-bold rounded">
                            {message}
                        </div>
                    )}
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 font-bold rounded">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-4">
                            <h3 className="text-lg font-bold text-zinc-900 border-b pb-2">Database Configuration</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-zinc-700 mb-1">Host</label>
                                    <input
                                        type="text"
                                        value={formData.dbHost}
                                        onChange={e => setFormData({ ...formData, dbHost: e.target.value })}
                                        className="w-full px-4 py-2 rounded-lg border border-zinc-200 focus:border-blue-900 outline-none"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-zinc-700 mb-1">Port</label>
                                    <input
                                        type="text"
                                        value={formData.dbPort}
                                        onChange={e => setFormData({ ...formData, dbPort: e.target.value })}
                                        className="w-full px-4 py-2 rounded-lg border border-zinc-200 focus:border-blue-900 outline-none"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-zinc-700 mb-1">Database Name</label>
                                    <input
                                        type="text"
                                        value={formData.dbName}
                                        onChange={e => setFormData({ ...formData, dbName: e.target.value })}
                                        className="w-full px-4 py-2 rounded-lg border border-zinc-200 focus:border-blue-900 outline-none"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-zinc-700 mb-1">User</label>
                                    <input
                                        type="text"
                                        value={formData.dbUser}
                                        onChange={e => setFormData({ ...formData, dbUser: e.target.value })}
                                        className="w-full px-4 py-2 rounded-lg border border-zinc-200 focus:border-blue-900 outline-none"
                                        required
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-bold text-zinc-700 mb-1">Password</label>
                                    <input
                                        type="password"
                                        value={formData.dbPassword}
                                        onChange={e => setFormData({ ...formData, dbPassword: e.target.value })}
                                        className="w-full px-4 py-2 rounded-lg border border-zinc-200 focus:border-blue-900 outline-none"
                                        placeholder="Database Password"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4 pt-4">
                            <h3 className="text-lg font-bold text-zinc-900 border-b pb-2">Admin Account</h3>
                            <div>
                                <label className="block text-sm font-bold text-zinc-700 mb-1">Full Name</label>
                                <input
                                    type="text"
                                    value={formData.adminName}
                                    onChange={e => setFormData({ ...formData, adminName: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg border border-zinc-200 focus:border-blue-900 outline-none"
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-zinc-700 mb-1">Email</label>
                                    <input
                                        type="email"
                                        value={formData.adminEmail}
                                        onChange={e => setFormData({ ...formData, adminEmail: e.target.value })}
                                        className="w-full px-4 py-2 rounded-lg border border-zinc-200 focus:border-blue-900 outline-none"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-zinc-700 mb-1">Password</label>
                                    <input
                                        type="password"
                                        value={formData.adminPassword}
                                        onChange={e => setFormData({ ...formData, adminPassword: e.target.value })}
                                        className="w-full px-4 py-2 rounded-lg border border-zinc-200 focus:border-blue-900 outline-none"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="pt-6">
                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full py-4 rounded-xl text-white font-bold text-lg shadow-lg transition-all ${loading ? 'bg-zinc-400 cursor-not-allowed' : 'bg-blue-900 hover:bg-blue-800 shadow-blue-900/20'}`}
                            >
                                {loading ? 'Installing...' : 'Run Install (PostgreSQL)'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

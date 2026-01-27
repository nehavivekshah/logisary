'use client';
import { useState } from 'react';
import { api } from '@/utils/api';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
    const router = useRouter();
    const [role, setRole] = useState<'SHIPPER' | 'CARRIER'>('SHIPPER');
    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        password: '',
        phone_number: '',
        company_name: '' // For carrier
    });
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await api.post('/auth/register', { ...formData, role });
            if (res.user) {
                router.push('/auth/login');
            } else {
                setError(res.message || 'Registration failed');
            }
        } catch (err) {
            setError('An error occurred');
        }
    };

    return (
        <div className="flex h-screen bg-zinc-50 overflow-hidden">
            <div className="hidden lg:block w-1/2 bg-blue-900 relative overflow-hidden">
                <div className="absolute inset-0 bg-blue-900/90 z-10"></div>
                <img src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80" className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-50" alt="Register Background" />
                <div className="relative z-20 flex flex-col justify-center h-full px-12 text-white">
                    <h2 className="text-4xl font-extrabold mb-6">Join the Network</h2>
                    <p className="text-blue-100 text-lg leading-relaxed">
                        Connect with top Shippers and Carriers across India. Create your account today to start bidding or posting jobs.
                    </p>
                </div>
            </div>

            <div className="w-full lg:w-1/2 p-8 lg:p-16 flex flex-col justify-center bg-white overflow-y-auto">
                <div className="max-w-md mx-auto w-full">
                    <h1 className="text-3xl font-bold mb-2 text-zinc-900">Create Account</h1>
                    <p className="text-zinc-500 mb-8">Join RK Portal as a Shipper or Carrier</p>

                    {error && <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm">{error}</div>}

                    <div className="flex bg-zinc-100 p-1 rounded-lg mb-8">
                        <button
                            type="button"
                            onClick={() => setRole('SHIPPER')}
                            className={`flex-1 py-2.5 text-sm font-bold rounded-md transition-all ${role === 'SHIPPER' ? 'bg-white text-blue-900 shadow-sm' : 'text-zinc-500 hover:text-zinc-900'}`}
                        >
                            I am a Shipper
                        </button>
                        <button
                            type="button"
                            onClick={() => setRole('CARRIER')}
                            className={`flex-1 py-2.5 text-sm font-bold rounded-md transition-all ${role === 'CARRIER' ? 'bg-white text-blue-900 shadow-sm' : 'text-zinc-500 hover:text-zinc-900'}`}
                        >
                            I am a Carrier
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-bold text-zinc-700 mb-2">Full Name</label>
                                <input
                                    type="text"
                                    value={formData.full_name}
                                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                                    className="w-full px-4 py-3 rounded-lg border border-zinc-200 focus:border-blue-900 focus:ring-1 focus:ring-blue-900 outline-none transition-all text-sm"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-zinc-700 mb-2">Phone</label>
                                <input
                                    type="tel"
                                    value={formData.phone_number}
                                    onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
                                    className="w-full px-4 py-3 rounded-lg border border-zinc-200 focus:border-blue-900 focus:ring-1 focus:ring-blue-900 outline-none transition-all text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-zinc-700 mb-2">Email Address</label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full px-4 py-3 rounded-lg border border-zinc-200 focus:border-blue-900 focus:ring-1 focus:ring-blue-900 outline-none transition-all text-sm"
                                required
                            />
                        </div>

                        {role === 'CARRIER' && (
                            <div>
                                <label className="block text-sm font-bold text-zinc-700 mb-2">Company Name</label>
                                <input
                                    type="text"
                                    value={formData.company_name}
                                    onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                                    className="w-full px-4 py-3 rounded-lg border border-zinc-200 focus:border-blue-900 focus:ring-1 focus:ring-blue-900 outline-none transition-all text-sm"
                                    required
                                />
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-bold text-zinc-700 mb-2">Password</label>
                            <input
                                type="password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                className="w-full px-4 py-3 rounded-lg border border-zinc-200 focus:border-blue-900 focus:ring-1 focus:ring-blue-900 outline-none transition-all text-sm"
                                required
                            />
                        </div>
                        <button type="submit" className="w-full py-3.5 rounded-lg bg-blue-900 text-white font-bold hover:bg-blue-800 transition-colors shadow-lg shadow-blue-900/20 mt-4">
                            Create Account
                        </button>
                    </form>
                    <div className="mt-8 text-center text-sm text-zinc-500">
                        Already have an account? <Link href="/auth/login" className="text-blue-900 font-bold hover:underline">Sign In</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

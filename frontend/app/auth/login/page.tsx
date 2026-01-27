'use client';
import { useState } from 'react';
import { api } from '@/utils/api';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

export default function LoginPage() {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await api.post('/auth/login', { email, password });
            if (res.token) {
                login(res.token, res.user);
            } else {
                setError(res.message || 'Login failed');
            }
        } catch (err) {
            setError('An error occurred');
        }
    };

    return (
        <div className="flex min-h-screen bg-zinc-50 overflow-hidden">
            <div className="hidden lg:block w-1/2 bg-blue-900 relative overflow-hidden">
                <div className="absolute inset-0 bg-blue-900/90 z-10"></div>
                <img src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80" className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-50" alt="Login Background" />
                <div className="relative z-20 flex flex-col justify-center h-full px-12 text-white">
                    <h2 className="text-4xl font-extrabold mb-6">Welcome Back to RK Portal</h2>
                    <p className="text-blue-100 text-lg leading-relaxed">
                        Manage your shipments, track vehicles, and grow your logistics business with our advanced platform.
                    </p>
                </div>
            </div>

            <div className="w-full lg:w-1/2 p-8 lg:p-16 flex flex-col justify-center bg-white">
                <div className="max-w-md mx-auto w-full">
                    <h1 className="text-3xl font-bold mb-2 text-zinc-900">Sign In</h1>
                    <p className="text-zinc-500 mb-8">Enter your credentials to access your account</p>

                    {error && <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm">{error}</div>}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-bold text-zinc-700 mb-2">Email Address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg border border-zinc-200 focus:border-blue-900 focus:ring-1 focus:ring-blue-900 outline-none transition-all text-sm"
                                placeholder="name@company.com"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-zinc-700 mb-2">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg border border-zinc-200 focus:border-blue-900 focus:ring-1 focus:ring-blue-900 outline-none transition-all text-sm"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                        <button type="submit" className="w-full py-3.5 rounded-lg bg-blue-900 text-white font-bold hover:bg-blue-800 transition-colors shadow-lg shadow-blue-900/20">
                            Sign In
                        </button>

                        <div className="pt-4 border-t border-zinc-100 grid grid-cols-2 gap-3">
                            <button
                                type="button"
                                onClick={() => login('dummy-token-admin', { id: 'admin-1', email: 'admin@rk.com', full_name: 'Admin User', role: 'ADMIN' })}
                                className="py-2.5 rounded-lg bg-zinc-800 text-white text-xs font-bold hover:bg-zinc-900 transition-colors"
                            >
                                Demo Admin
                            </button>
                            <button
                                type="button"
                                onClick={() => login('dummy-token-shipper', { id: 'shipper-1', email: 'shipper@rk.com', full_name: 'Demo Shipper', role: 'SHIPPER' })}
                                className="py-2.5 rounded-lg bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 transition-colors"
                            >
                                Demo Shipper
                            </button>
                        </div>
                    </form>
                    <div className="mt-8 text-center text-sm text-zinc-500">
                        Don't have an account? <Link href="/auth/register" className="text-blue-900 font-bold hover:underline">Create Account</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

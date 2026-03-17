'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
    Mail,
    Lock,
    Eye,
    EyeOff,
    ArrowRight
} from 'lucide-react';

export default function LoginPage() {
    const router = useRouter();
    const [role, setRole] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const togglePassword = () => setPasswordVisible(!passwordVisible);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API verification
        setTimeout(() => {
            setIsLoading(false);
            if (!role) {
                alert("Please select a login role.");
                return;
            }
            // Mock success and redirect
            alert(`Logged in as ${role}!`);
            router.push('/');
        }, 1500);
    };

    return (
        <main className="font-sans text-zinc-800 bg-zinc-50 min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden border border-zinc-100">
                <div className="flex flex-col md:flex-row">
                    {/* Illustration / Brand Side (Optional, kept simplistic here or can add image) */}
                    <div className="hidden md:flex md:w-5/12 bg-[#104674] items-center justify-center p-8 text-center">
                        <div className="text-white">
                            <h2 className="text-3xl font-bold mb-4">Welcome Back!</h2>
                            <p className="opacity-80">Log in to manage your shipments and track real-time updates.</p>
                        </div>
                    </div>

                    {/* Form Side */}
                    <div className="w-full md:w-7/12 p-8 md:p-12">
                        <h3 className="text-2xl font-bold text-center text-zinc-900 mb-8">Portal Login</h3>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Role Select */}
                            <div>
                                <select
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    className="w-full p-3 border border-zinc-200 rounded-lg outline-none focus:border-[#104674] focus:ring-1 focus:ring-[#104674] transition-all bg-white text-zinc-700 cursor-pointer appearance-none"
                                    required
                                >
                                    <option value="" disabled>Login As</option>
                                    <option value="shipper">Shipper</option>
                                    <option value="carrier">Carrier</option>
                                </select>
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-semibold text-zinc-600 mb-2">Email Address</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">
                                        <Mail size={18} />
                                    </span>
                                    <input
                                        type="email"
                                        className="w-full pl-10 pr-4 py-3 border border-zinc-200 rounded-lg outline-none focus:border-[#104674] focus:ring-1 focus:ring-[#104674] transition-all"
                                        placeholder="Enter Your Email Address"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div>
                                <label className="block text-sm font-semibold text-zinc-600 mb-2">Password</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">
                                        <Lock size={18} />
                                    </span>
                                    <input
                                        type={passwordVisible ? "text" : "password"}
                                        className="w-full pl-10 pr-12 py-3 border border-zinc-200 rounded-lg outline-none focus:border-[#104674] focus:ring-1 focus:ring-[#104674] transition-all"
                                        placeholder="Enter Your Password"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={togglePassword}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 transition-colors"
                                    >
                                        {passwordVisible ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>

                            {/* Remember & Forgot */}
                            <div className="flex justify-between items-center text-sm">
                                <label className="flex items-center gap-2 cursor-pointer text-zinc-600">
                                    <input type="checkbox" className="rounded text-[#104674] focus:ring-[#104674]" />
                                    Remember me
                                </label>
                                <Link href="/forgot-password" className="text-[#104674] hover:underline font-semibold">
                                    Forgot Password?
                                </Link>
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-[#104674] text-white font-bold py-3 rounded-lg hover:bg-[#0d365a] transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <span>Verifying...</span>
                                ) : (
                                    <>Login <ArrowRight size={18} /></>
                                )}
                            </button>
                        </form>

                        <div className="mt-8 text-center text-sm text-zinc-500">
                            <p>Don't have an account? <Link href="/register" className="text-[#104674] font-bold hover:underline">Register Here</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

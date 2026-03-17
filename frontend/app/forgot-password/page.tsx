'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, ArrowRight, CheckCircle } from 'lucide-react';

export default function ForgotPasswordPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSent, setIsSent] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API verification
        setTimeout(() => {
            setIsLoading(false);
            if (!email) {
                alert("Please enter your email address.");
                return;
            }
            // Mock success
            setIsSent(true);
        }, 1500);
    };

    return (
        <main className="font-sans text-zinc-800 bg-zinc-50 min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden border border-zinc-100">
                <div className="flex flex-col md:flex-row">
                    {/* Illustration / Brand Side */}
                    <div className="hidden md:flex md:w-5/12 bg-[#104674] items-center justify-center p-8 text-center">
                        <div className="text-white">
                            <h2 className="text-3xl font-bold mb-4">Reset Access</h2>
                            <p className="opacity-80">Enter your email to receive a password recovery link.</p>
                        </div>
                    </div>

                    {/* Form Side */}
                    <div className="w-full md:w-7/12 p-8 md:p-12">
                        {isSent ? (
                            <div className="text-center py-10">
                                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-in zoom-in spin-in-12 duration-500">
                                    <CheckCircle size={40} />
                                </div>
                                <h3 className="text-2xl font-bold text-zinc-900 mb-2">Check your inbox</h3>
                                <p className="text-zinc-500 mb-8 max-w-sm mx-auto">
                                    We have sent a password reset link to <span className="font-bold text-zinc-800">{email}</span>
                                </p>
                                <Link
                                    href="/login"
                                    className="inline-flex items-center gap-2 text-[#104674] font-bold hover:underline"
                                >
                                    Back to Login <ArrowRight size={16} />
                                </Link>
                            </div>
                        ) : (
                            <>
                                <h3 className="text-2xl font-bold text-center text-zinc-900 mb-8">Forgot Password</h3>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Email */}
                                    <div>
                                        <label className="block text-sm font-semibold text-zinc-600 mb-2">Email Address</label>
                                        <div className="relative">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">
                                                <Mail size={18} />
                                            </span>
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="w-full pl-10 pr-4 py-3 border border-zinc-200 rounded-lg outline-none focus:border-[#104674] focus:ring-1 focus:ring-[#104674] transition-all"
                                                placeholder="Enter Your Email Address"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Submit */}
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full bg-[#104674] text-white font-bold py-3 rounded-lg hover:bg-[#0d365a] transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        {isLoading ? (
                                            <span>Sending Link...</span>
                                        ) : (
                                            <>Send Reset Link <ArrowRight size={18} /></>
                                        )}
                                    </button>
                                </form>

                                <div className="mt-8 text-center text-sm text-zinc-500">
                                    <p>Remember your password? <Link href="/login" className="text-[#104674] font-bold hover:underline">Login Here</Link></p>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}

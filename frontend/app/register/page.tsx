'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';

export default function RegisterPage() {
    const router = useRouter();
    const [role, setRole] = useState('supplier');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API
        setTimeout(() => {
            setIsLoading(false);
            alert(`Account created successfully as ${role}! Redirecting to login...`);
            router.push('/login');
        }, 1500);
    };

    return (
        <main className="font-sans text-zinc-800 bg-zinc-50 min-h-screen flex items-center justify-center p-4 py-12">
            <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl overflow-hidden border border-zinc-100">
                <div className="flex flex-col md:flex-row">
                    {/* Brand Side - Optional Image/Gradient */}
                    <div className="hidden md:flex md:w-4/12 bg-[#104674] flex-col justify-center p-8 text-white relative overflow-hidden">
                        <div className="relative z-10">
                            <h2 className="text-3xl font-bold mb-4">Join Logisary</h2>
                            <p className="opacity-80 mb-8 leading-relaxed">
                                Connect with the largest network of trusted transporters and suppliers.
                            </p>
                            <ul className="space-y-3 opacity-90 text-sm">
                                <li className="flex items-center gap-2"><div className="w-2 h-2 bg-white rounded-full" /> Post & Bid on loads instantly</li>
                                <li className="flex items-center gap-2"><div className="w-2 h-2 bg-white rounded-full" /> Real-time tracking & updates</li>
                                <li className="flex items-center gap-2"><div className="w-2 h-2 bg-white rounded-full" /> Secure document management</li>
                            </ul>
                        </div>
                        {/* Circle Decorations */}
                        <div className="absolute -top-20 -left-20 w-60 h-60 bg-white/10 rounded-full blur-3xl pointer-events-none" />
                        <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-white/10 rounded-full blur-3xl pointer-events-none" />
                    </div>

                    {/* Registration Form */}
                    <div className="w-full md:w-8/12 p-8 md:p-12">
                        <h3 className="text-2xl font-bold text-zinc-900 mb-6">Create Your Account</h3>

                        <form onSubmit={handleSubmit}>
                            {/* Role Selection Tabs */}
                            <div className="bg-zinc-100 p-1 rounded-lg flex mb-8">
                                <button
                                    type="button"
                                    onClick={() => setRole('supplier')}
                                    className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${role === 'supplier' ? 'bg-white text-[#104674] shadow-sm' : 'text-zinc-500 hover:text-zinc-700'}`}
                                >
                                    I am a Supplier
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setRole('transporter')}
                                    className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${role === 'transporter' ? 'bg-white text-[#104674] shadow-sm' : 'text-zinc-500 hover:text-zinc-700'}`}
                                >
                                    I am a Transporter
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                {/* Basic Info */}
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-zinc-500 uppercase">Full Name</label>
                                    <input type="text" className="w-full p-3 border border-zinc-200 rounded-lg outline-none focus:border-[#104674] focus:ring-1 focus:ring-[#104674] transition-all" placeholder="Full Name" required />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-zinc-500 uppercase">Company Name</label>
                                    <input type="text" className="w-full p-3 border border-zinc-200 rounded-lg outline-none focus:border-[#104674] focus:ring-1 focus:ring-[#104674] transition-all" placeholder="Company Name" required />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-zinc-500 uppercase">Email Address</label>
                                    <input type="email" className="w-full p-3 border border-zinc-200 rounded-lg outline-none focus:border-[#104674] focus:ring-1 focus:ring-[#104674] transition-all" placeholder="Enter Your Email" required />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-zinc-500 uppercase">Phone Number</label>
                                    <input type="tel" className="w-full p-3 border border-zinc-200 rounded-lg outline-none focus:border-[#104674] focus:ring-1 focus:ring-[#104674] transition-all" placeholder="Enter Your Phone" required />
                                </div>
                            </div>

                            {/* Transporter Specific Field with Animation */}
                            {role === 'transporter' && (
                                <div className="mb-6 animate-in slide-in-from-top-2 duration-300">
                                    <div className="p-4 bg-primary/5 border border-blue-100 rounded-lg">
                                        <label className="text-xs font-bold text-primary uppercase block mb-1">DOT / MC Number</label>
                                        <input type="text" className="w-full p-3 border border-blue-200 rounded-lg outline-none focus:border-[#104674] focus:ring-1 focus:ring-[#104674] bg-white transition-all" placeholder="Enter DOT Number" />
                                        <small className="text-primary-light/80 text-xs mt-1 block">Required for transporter verification.</small>
                                    </div>
                                </div>
                            )}

                            {/* Passwords */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-zinc-500 uppercase">Password</label>
                                    <input type="password" className="w-full p-3 border border-zinc-200 rounded-lg outline-none focus:border-[#104674] focus:ring-1 focus:ring-[#104674] transition-all" placeholder="Create Password" required />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-zinc-500 uppercase">Confirm Password</label>
                                    <input type="password" className="w-full p-3 border border-zinc-200 rounded-lg outline-none focus:border-[#104674] focus:ring-1 focus:ring-[#104674] transition-all" placeholder="Confirm Password" required />
                                </div>
                            </div>

                            {/* Terms */}
                            <div className="mb-8">
                                <label className="flex items-center gap-2 cursor-pointer text-sm text-zinc-600">
                                    <input type="checkbox" className="rounded text-[#104674] focus:ring-[#104674]" required />
                                    <span>
                                        I agree to the <Link href="#" className="text-[#104674] font-bold hover:underline">Terms of Service</Link> and <Link href="#" className="text-[#104674] font-bold hover:underline">Privacy Policy</Link>
                                    </span>
                                </label>
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-[#104674] text-white font-bold py-3 rounded-lg hover:bg-[#0d365a] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                            >
                                {isLoading ? (
                                    <span>Creating Account...</span>
                                ) : (
                                    <>Create Account <ArrowRight size={18} /></>
                                )}
                            </button>
                        </form>

                        <div className="mt-8 text-center text-sm text-zinc-500">
                            <p>Already have an account? <Link href="/login" className="text-[#104674] font-bold hover:underline">Login</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

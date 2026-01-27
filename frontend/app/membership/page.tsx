'use client';
import { Check } from 'lucide-react';

export default function MembershipPage() {
    return (
        <div className="min-h-screen bg-zinc-50 font-sans text-zinc-800">
            <div className="bg-blue-900 text-white py-12">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-3xl font-bold">Membership Plans</h1>
                    <p className="mt-2 text-blue-100">Choose the plan that fits your business needs.</p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">

                    {/* Basic Plan */}
                    <div className="bg-white p-8 rounded-lg shadow-sm border border-zinc-200">
                        <h3 className="text-xl font-bold text-zinc-900 mb-2">Basic</h3>
                        <p className="text-zinc-500 text-sm mb-6">For small carriers and individual truck owners.</p>
                        <div className="text-4xl font-bold text-blue-900 mb-6">Free</div>
                        <ul className="space-y-3 mb-8 text-sm">
                            <li className="flex items-center gap-2"><Check size={16} className="text-green-500" /> View Public Loads</li>
                            <li className="flex items-center gap-2"><Check size={16} className="text-green-500" /> Limited Bidding (5/month)</li>
                            <li className="flex items-center gap-2"><Check size={16} className="text-green-500" /> Basic Support</li>
                        </ul>
                        <button className="w-full border border-blue-900 text-blue-900 font-bold py-2 rounded hover:bg-blue-50 transition-colors">Select Basic</button>
                    </div>

                    {/* Pro Plan */}
                    <div className="bg-white p-8 rounded-lg shadow-md border-2 border-blue-600 relative transform md:-translate-y-4">
                        <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl">POPULAR</div>
                        <h3 className="text-xl font-bold text-zinc-900 mb-2">Pro</h3>
                        <p className="text-zinc-500 text-sm mb-6">For growing fleet owners and logistics companies.</p>
                        <div className="text-4xl font-bold text-blue-900 mb-6">₹999<span className="text-sm text-zinc-500 font-normal">/mo</span></div>
                        <ul className="space-y-3 mb-8 text-sm">
                            <li className="flex items-center gap-2"><Check size={16} className="text-green-500" /> unlimited Bidding</li>
                            <li className="flex items-center gap-2"><Check size={16} className="text-green-500" /> Priority Support</li>
                            <li className="flex items-center gap-2"><Check size={16} className="text-green-500" /> Access to Premium Loads</li>
                            <li className="flex items-center gap-2"><Check size={16} className="text-green-500" /> Verified Badge</li>
                        </ul>
                        <button className="w-full bg-blue-900 text-white font-bold py-2 rounded hover:bg-blue-800 transition-colors">Select Pro</button>
                    </div>

                    {/* Enterprise Plan */}
                    <div className="bg-white p-8 rounded-lg shadow-sm border border-zinc-200">
                        <h3 className="text-xl font-bold text-zinc-900 mb-2">Enterprise</h3>
                        <p className="text-zinc-500 text-sm mb-6">For large scale operations and shippers.</p>
                        <div className="text-4xl font-bold text-blue-900 mb-6">Custom</div>
                        <ul className="space-y-3 mb-8 text-sm">
                            <li className="flex items-center gap-2"><Check size={16} className="text-green-500" /> API Integration</li>
                            <li className="flex items-center gap-2"><Check size={16} className="text-green-500" /> Dedicated Account Manager</li>
                            <li className="flex items-center gap-2"><Check size={16} className="text-green-500" /> Custom Reporting</li>
                        </ul>
                        <button className="w-full border border-blue-900 text-blue-900 font-bold py-2 rounded hover:bg-blue-50 transition-colors">Contact Sales</button>
                    </div>

                </div>
            </div>
        </div>
    );
}

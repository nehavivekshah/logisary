'use client';
import Link from 'next/link';
import {
    ChevronRight,
    FileText,
    Gavel,
    SearchCheck,
    ShieldCheck,
    ArrowRight
} from 'lucide-react';

export default function HowItWorksPage() {
    const steps = [
        {
            icon: FileText,
            title: "Post Your Transportation Request",
            desc: "Shippers can easily post detailed transportation requests on our platform, specifying tanker type and delivery timeline.",
            delay: "0ms"
        },
        {
            icon: Gavel,
            title: "Carriers Place Bids",
            desc: "Specialized equipment (insulated/jacketed tanks, steam coil tanks, ISO tanks, etc.) and Carrier ratings and past performance.",
            delay: "100ms"
        },
        {
            icon: SearchCheck,
            title: "Evaluate & Select the Best Bid",
            desc: "Sort and filter by price, delivery time, and carrier rating. Review carrier profiles and past performance.",
            delay: "200ms"
        },
        {
            icon: ShieldCheck,
            title: "Secure & Track Your Shipment",
            desc: "Material is transported safely with in-transit insurance options. Real-time tracking ensures visibility throughout the journey.",
            delay: "300ms"
        }
    ];

    return (
        <main className="font-sans text-zinc-800 bg-white min-h-screen">
            {/* 1. Breadcrumb Section */}
            <section className="relative bg-amber-50 py-20 overflow-hidden text-center">
                <div className="container mx-auto px-4 relative z-10">
                    <h2 className="text-4xl font-bold text-zinc-900 mb-4">How It Works</h2>
                    <div className="flex items-center justify-center gap-2 text-sm font-semibold">
                        <Link href="/" className="text-zinc-500 hover:text-primary transition">Home</Link>
                        <ChevronRight size={14} className="text-zinc-400" />
                        <span className="text-primary">How It Works</span>
                    </div>
                </div>
            </section>

            {/* 2. Process Section */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="text-center mb-16 max-w-2xl mx-auto">
                        <span className="inline-block py-1 px-4 rounded-full bg-[#104674] text-white font-bold text-sm mb-4">How It Works</span>
                        <h2 className="text-4xl font-bold text-zinc-900 mb-4">Efficient Working Process</h2>
                        <p className="text-zinc-500">Our working process is designed to deliver efficient, reliable, & tailored logistics solutions from initial consultation to final delivery.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {steps.map((step, index) => (
                            <div
                                key={index}
                                className="group relative bg-[#104674] rounded-lg p-8 text-center hover:bg-[#d8202a] transition-all duration-300 shadow-xl overflow-hidden"
                                style={{ animationDelay: step.delay }}
                            >
                                <div className="w-20 h-20 mx-auto bg-[#2f5a7e] rounded-full flex items-center justify-center mb-6 group-hover:bg-[#104674] transition-colors relative z-10">
                                    <step.icon size={32} className="text-white" />
                                </div>
                                <h4 className="text-xl font-bold text-white mb-4 leading-snug group-hover:text-white transition-colors relative z-10">
                                    <a href="#" className="hover:underline decoration-white/20 underline-offset-4">{step.title}</a>
                                </h4>
                                <p className="text-white/80 text-sm leading-relaxed mb-6 group-hover:text-white transition-colors relative z-10">
                                    {step.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}

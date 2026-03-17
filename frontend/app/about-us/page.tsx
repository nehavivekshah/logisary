'use client';
import Link from 'next/link';
import {
    ChevronRight,
    Check,
    ArrowRight,
    Twitter,
    Linkedin,
    Instagram,
    Facebook,
    Share2
} from 'lucide-react';

export default function AboutPage() {
    return (
        <main className="font-sans text-zinc-800 bg-white min-h-screen">
            {/* 1. Breadcrumb Section */}
            <section className="relative bg-amber-50 py-20 overflow-hidden text-center">
                <div className="container mx-auto px-4 relative z-10">
                    <h2 className="text-4xl font-bold text-zinc-900 mb-4">About Us</h2>
                    <div className="flex items-center justify-center gap-2 text-sm font-semibold">
                        <Link href="/" className="text-zinc-500 hover:text-blue-900 transition">Home</Link>
                        <ChevronRight size={14} className="text-zinc-400" />
                        <span className="text-blue-900">About Us</span>
                    </div>
                </div>
            </section>

            {/* 2. About Section */}
            <section className="py-24 bg-white overflow-hidden">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Image Grid */}
                        <div className="relative">
                            <div className="absolute top-10 -left-10 z-20 bg-[#104674] text-white p-6 rounded-lg shadow-xl hidden md:block">
                                <h3 className="text-3xl font-bold mb-1">25K+</h3>
                                <span className="text-sm opacity-90">Clients Positive Reviews</span>
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="rounded-2xl overflow-hidden shadow-lg h-64 md:h-80 bg-zinc-200 animate-in fade-in duration-700 slide-in-from-left-10">
                                    {/* Placeholder for a1.jpg */}
                                    <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: 'url("https://placehold.co/400x500/e2e8f0/1e293b?text=About+Image+1")' }}></div>
                                </div>
                                <div className="rounded-2xl overflow-hidden shadow-lg h-64 md:h-80 bg-zinc-200 mt-12 animate-in fade-in duration-700 slide-in-from-left-10 delay-200">
                                    {/* Placeholder for a2.jpg */}
                                    <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: 'url("https://placehold.co/400x500/e2e8f0/1e293b?text=About+Image+2")' }}></div>
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div>
                            <span className="inline-block py-1 px-4 rounded-full bg-blue-50 text-[#104674] font-bold text-sm mb-4">About Us</span>
                            <h2 className="text-4xl font-bold text-zinc-900 mb-6 leading-tight">Your Trusted Partner in Bulk Liquid Transportation</h2>
                            <p className="text-zinc-500 mb-8 leading-relaxed">
                                R. K. Transportation Services Pvt. Ltd. company based in Mumbai, has been formed to initially transporting Liquid bulk materials in tankers, All over India.
                            </p>

                            <div className="space-y-4 mb-8">
                                {[
                                    "Pan India Liquid Transportation",
                                    "Chemical & Petrochemical Expertise",
                                    "Specialized SS Tanker Fleet",
                                    "Customer Focused Logistics Solutions"
                                ].map((item, index) => (
                                    <div key={index} className="flex items-center gap-3">
                                        <div className="w-6 h-6 rounded-full bg-[#104674] flex items-center justify-center text-white shrink-0">
                                            <Check size={14} strokeWidth={3} />
                                        </div>
                                        <h4 className="font-bold text-zinc-800">{item}</h4>
                                    </div>
                                ))}
                            </div>

                            <div className="bg-amber-50 p-6 rounded-xl border-l-4 border-[#104674] mb-8">
                                <p className="text-zinc-600 text-sm">
                                    The company has been formed to provide other logistic service as well. Currently R. K. Transport Service has been serving continuously for more than 30 years in the field of Bulk Liquid Transportation in SS Tanker.
                                </p>
                            </div>

                            <Link href="/help" className="inline-flex items-center gap-2 bg-[#104674] text-white font-bold py-4 px-8 rounded-full hover:bg-[#0d365a] transition-all hover:gap-3">
                                Contact Us <ArrowRight size={18} />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Why Choose Us */}
            <section className="py-24 bg-amber-50">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Content */}
                        <div className="order-2 lg:order-1">
                            <span className="inline-block py-1 px-4 rounded-full bg-white text-[#104674] font-bold text-sm mb-4 shadow-sm">Why Choose Us</span>
                            <h2 className="text-4xl font-bold text-zinc-900 mb-6 leading-tight">Over 30 Years of Industry Expertise</h2>
                            <p className="text-zinc-500 mb-10 leading-relaxed">
                                Backed by more than three decades of proven experience in bulk liquid transportation, we have built a strong reputation for reliability, safety, and nationwide reach across India.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                                <div>
                                    <h4 className="text-xl font-bold text-zinc-900 mb-3">Customized & Versatile Fleet</h4>
                                    <p className="text-zinc-500 text-sm">Our fleet includes SS, Aluminum, Bullet, Capsule, and ISO tankers, with flexibility.</p>
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold text-zinc-900 mb-3">Nationwide Logistics Coverage</h4>
                                    <p className="text-zinc-500 text-sm">With a strong operational network across India, we ensure timely, secure, and efficient delivery.</p>
                                </div>
                            </div>

                            <Link href="/services" className="inline-flex items-center gap-2 bg-[#104674] text-white font-bold py-4 px-8 rounded-full hover:bg-[#0d365a] transition-all hover:gap-3">
                                Services <ArrowRight size={18} />
                            </Link>
                        </div>

                        {/* Image Stack */}
                        <div className="order-1 lg:order-2 relative h-[500px]">
                            <div className="absolute top-0 right-0 w-3/4 h-3/4 bg-zinc-200 rounded-2xl overflow-hidden shadow-lg z-10">
                                <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: 'url("https://placehold.co/600x400/e2e8f0/1e293b?text=Fleet+Image+1")' }}></div>
                            </div>
                            <div className="absolute bottom-0 left-0 w-3/4 h-3/4 bg-zinc-200 rounded-2xl overflow-hidden shadow-lg z-20 border-8 border-amber-50">
                                <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: 'url("https://placehold.co/600x400/e2e8f0/1e293b?text=Fleet+Image+2")' }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. Our Values */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Image */}
                        <div>
                            <div className="rounded-2xl overflow-hidden shadow-xl h-[500px] bg-zinc-100">
                                <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: 'url("https://placehold.co/600x800/e2e8f0/1e293b?text=Values+Image")' }}></div>
                            </div>
                        </div>

                        {/* Content */}
                        <div>
                            <span className="inline-block py-1 px-4 rounded-full bg-blue-50 text-[#104674] font-bold text-sm mb-4">Our Values</span>
                            <h2 className="text-4xl font-bold text-zinc-900 mb-6 leading-tight">Committed to Safety, Driven by Excellence</h2>
                            <p className="text-zinc-500 mb-10 leading-relaxed">
                                At R. K. Transportation Services Pvt. Ltd., our mission is to deliver safe, reliable, and efficient bulk liquid transportation while continuously expanding into integrated logistics solutions.
                            </p>

                            <div className="grid grid-cols-2 gap-6 mb-10">
                                <div className="bg-zinc-50 p-6 rounded-xl text-center hover:-translate-y-1 transition-transform">
                                    <h3 className="text-3xl font-bold text-[#104674] mb-2">100%</h3>
                                    <p className="text-zinc-600 font-bold text-sm">Safety & Compliance Focus</p>
                                </div>
                                <div className="bg-zinc-50 p-6 rounded-xl text-center hover:-translate-y-1 transition-transform">
                                    <h3 className="text-3xl font-bold text-[#104674] mb-2">30+</h3>
                                    <p className="text-zinc-600 font-bold text-sm">Years of Industry Experience</p>
                                </div>
                                <div className="bg-zinc-50 p-6 rounded-xl text-center hover:-translate-y-1 transition-transform">
                                    <h3 className="text-3xl font-bold text-[#104674] mb-2">199+</h3>
                                    <p className="text-zinc-600 font-bold text-sm">5 Star Reviews</p>
                                </div>
                                <div className="bg-zinc-50 p-6 rounded-xl text-center hover:-translate-y-1 transition-transform">
                                    <h3 className="text-3xl font-bold text-[#104674] mb-2">125+</h3>
                                    <p className="text-zinc-600 font-bold text-sm">Countries Covered</p>
                                </div>
                            </div>

                            <Link href="/help" className="inline-flex items-center gap-2 bg-[#104674] text-white font-bold py-4 px-8 rounded-full hover:bg-[#0d365a] transition-all hover:gap-3">
                                Contact Us <ArrowRight size={18} />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. Team Section */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="text-center mb-16 max-w-2xl mx-auto">
                        <span className="inline-block py-1 px-4 rounded-full bg-blue-50 text-[#104674] font-bold text-sm mb-4">Our Team</span>
                        <h2 className="text-4xl font-bold text-zinc-900 mb-4">The People Behind Our Success</h2>
                        <p className="text-zinc-500">Each member brings a wealth of knowledge and expertise, ensuring that we deliver top-notch logistics solutions.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { name: "Alex Fargusion", role: "Specialist", img: "https://placehold.co/300x350/e2e8f0/1e293b?text=Alex" },
                            { name: "Richad Stones", role: "CEO & Founder", img: "https://placehold.co/300x350/e2e8f0/1e293b?text=Richad" },
                            { name: "Pep Gurdiola", role: "Manager", img: "https://placehold.co/300x350/e2e8f0/1e293b?text=Pep" },
                            { name: "Alex Fargusion", role: "Coordinator", img: "https://placehold.co/300x350/e2e8f0/1e293b?text=Alex+2" },
                        ].map((member, i) => (
                            <div key={i} className="group relative">
                                <div className="overflow-hidden rounded-xl mb-4 relative z-10">
                                    <div className="w-full h-80 bg-zinc-100 bg-cover bg-center transition-transform duration-500 group-hover:scale-105" style={{ backgroundImage: `url("${member.img}")` }}></div>

                                    {/* Social Overlay */}
                                    <div className="absolute inset-x-0 bottom-4 flex justify-center gap-2 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                                        {[Twitter, Linkedin, Instagram, Facebook].map((Icon, j) => (
                                            <a key={j} href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#104674] hover:bg-[#104674] hover:text-white transition-colors shadow-m">
                                                <Icon size={18} />
                                            </a>
                                        ))}
                                    </div>
                                </div>
                                <div className="text-center bg-white p-4 rounded-xl border border-zinc-100 shadow-sm relative z-20 -mt-8 mx-4 group-hover:-translate-y-2 transition-transform duration-300">
                                    <h4 className="font-bold text-lg text-zinc-900">{member.name}</h4>
                                    <span className="text-zinc-500 text-sm font-semibold">{member.role}</span>
                                    <div className="absolute top-4 right-4 text-zinc-300">
                                        <Share2 size={16} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}

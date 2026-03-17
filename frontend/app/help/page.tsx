'use client';
import Link from 'next/link';
import {
    ChevronRight,
    MapPin,
    Phone,
    Mail,
    Send,
    ArrowRight
} from 'lucide-react';

export default function HelpPage() {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert("Message sent successfully!");
        // Handle form submission logic
    };

    return (
        <main className="font-sans text-zinc-800 bg-white min-h-screen">
            {/* 1. Breadcrumb Section */}
            <section className="relative bg-amber-50 py-20 overflow-hidden text-center">
                <div className="container mx-auto px-4 relative z-10">
                    <h2 className="text-4xl font-bold text-zinc-900 mb-4">Help 24 Hours</h2>
                    <div className="flex items-center justify-center gap-2 text-sm font-semibold">
                        <Link href="/" className="text-zinc-500 hover:text-primary transition">Home</Link>
                        <ChevronRight size={14} className="text-zinc-400" />
                        <span className="text-primary">Help 24 Hours</span>
                    </div>
                </div>
            </section>

            {/* 2. Contact Info Cards */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Address Card */}
                        <div className="bg-white p-8 rounded-xl shadow-[0_5px_20px_rgba(0,0,0,0.05)] text-center group hover:-translate-y-2 transition-transform duration-300 border border-zinc-100">
                            <div className="w-16 h-16 mx-auto bg-primary/5 rounded-full flex items-center justify-center mb-6 text-[#104674] group-hover:bg-[#104674] group-hover:text-white transition-colors">
                                <MapPin size={28} />
                            </div>
                            <h4 className="text-xl font-bold text-zinc-900 mb-4">Our Address</h4>
                            <p className="text-zinc-500 leading-relaxed text-sm px-4">
                                102, 1st Flr, Navnidhi Indl. Premises Society Ltd., A.D. Marg, Sewree(W), Mumbai - 400 015.
                            </p>
                        </div>

                        {/* Phone Card */}
                        <div className="bg-white p-8 rounded-xl shadow-[0_5px_20px_rgba(0,0,0,0.05)] text-center group hover:-translate-y-2 transition-transform duration-300 border border-zinc-100">
                            <div className="w-16 h-16 mx-auto bg-primary/5 rounded-full flex items-center justify-center mb-6 text-[#104674] group-hover:bg-[#104674] group-hover:text-white transition-colors">
                                <Phone size={28} />
                            </div>
                            <h4 className="text-xl font-bold text-zinc-900 mb-4">Contact Us</h4>
                            <a href="tel:+91-22-224142646" className="text-zinc-500 hover:text-[#104674] font-semibold text-lg transition-colors">
                                +91-22-224142646
                            </a>
                        </div>

                        {/* Email Card */}
                        <div className="bg-white p-8 rounded-xl shadow-[0_5px_20px_rgba(0,0,0,0.05)] text-center group hover:-translate-y-2 transition-transform duration-300 border border-zinc-100">
                            <div className="w-16 h-16 mx-auto bg-primary/5 rounded-full flex items-center justify-center mb-6 text-[#104674] group-hover:bg-[#104674] group-hover:text-white transition-colors">
                                <Mail size={28} />
                            </div>
                            <h4 className="text-xl font-bold text-zinc-900 mb-4">Email Us</h4>
                            <a href="mailto:info@rktransport.in" className="text-zinc-500 hover:text-[#104674] font-semibold text-lg transition-colors">
                                info@rktransport.in
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Map Section */}
            <div className="w-full h-[450px] bg-zinc-100">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2026.2318475481811!2d72.84966993873073!3d18.99875693164676!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7cf4ebd0bfcad%3A0x96384a33f88597c!2sR%20K%20Transport%20Service!5e1!3m2!1sen!2sin!4v1766482966038!5m2!1sen!2sin"
                    className="w-full h-full border-0"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>

            {/* 4. Contact Form Section */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="bg-amber-50 rounded-2xl p-8 md:p-12 text-center shadow-sm">
                        <h4 className="text-2xl font-bold text-zinc-900 mb-4">Send Us Message</h4>
                        <p className="text-zinc-500 mb-8 max-w-2xl mx-auto">
                            Your email address will not be published. Required fields are marked *
                        </p>

                        <form onSubmit={handleSubmit} className="text-left">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <input
                                    type="text"
                                    placeholder="First Name*"
                                    required
                                    className="w-full bg-white px-5 py-4 rounded-full border border-zinc-200 outline-none focus:border-[#104674] focus:ring-1 focus:ring-[#104674] transition-all"
                                />
                                <input
                                    type="text"
                                    placeholder="Last Name"
                                    className="w-full bg-white px-5 py-4 rounded-full border border-zinc-200 outline-none focus:border-[#104674] focus:ring-1 focus:ring-[#104674] transition-all"
                                />
                                <input
                                    type="email"
                                    placeholder="Email*"
                                    required
                                    className="w-full bg-white px-5 py-4 rounded-full border border-zinc-200 outline-none focus:border-[#104674] focus:ring-1 focus:ring-[#104674] transition-all"
                                />
                                <div className="relative">
                                    <select className="w-full bg-white px-5 py-4 rounded-full border border-zinc-200 outline-none focus:border-[#104674] focus:ring-1 focus:ring-[#104674] transition-all appearance-none cursor-pointer text-zinc-500">
                                        <option value="">Service Type</option>
                                        <option value="Lubricant & Additives">Lubricant & Additives</option>
                                        <option value="Hazard & Non-Hazard chemical">Hazard & Non-Hazard chemical</option>
                                        <option value="FMCG">FMCG</option>
                                        <option value="Industrial Oil">Industrial Oil</option>
                                    </select>
                                    <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400">
                                        <ChevronRight size={16} className="rotate-90" />
                                    </div>
                                </div>
                            </div>

                            <div className="mb-8">
                                <textarea
                                    placeholder="Message"
                                    rows={5}
                                    className="w-full bg-white px-5 py-4 rounded-2xl border border-zinc-200 outline-none focus:border-[#104674] focus:ring-1 focus:ring-[#104674] transition-all resize-none"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="bg-[#104674] text-white font-bold py-4 px-10 rounded-full hover:bg-[#0d365a] transition-all hover:gap-3 flex items-center gap-2 mx-auto"
                            >
                                Submit Now <ArrowRight size={18} />
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </main>
    );
}

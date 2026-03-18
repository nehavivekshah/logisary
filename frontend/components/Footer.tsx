'use client';
import Link from 'next/link';
import { Truck, Facebook, Linkedin, Instagram, Twitter, MapPin, Phone, Mail, ChevronRight } from 'lucide-react';

export default function Footer() {
    return (
        <div className="relative">
            {/* 10. Call to Action (CTA) */}
            <section className="relative z-10 bg-[#104674] overflow-hidden -mb-1">
                {/* Decorative Background Shape */}
                <div className="absolute top-0 right-0 h-full hidden lg:block opacity-20 pointer-events-none">
                    <img src="/assets/images/vector/footer-vec.png" alt="" className="h-full object-cover" />
                </div>

                <div className="container mx-auto px-4 max-w-[1320px] py-16 lg:py-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative z-20">
                        {/* CTA Text */}
                        <div>
                            <h2 className="text-3xl lg:text-4xl font-bold text-white leading-tight">
                                Join Us Today And Let Us Help You To Grow Your Business.
                            </h2>
                        </div>

                        {/* CTA Button */}
                        <div className="lg:text-right">
                            <Link href="/contact-us" className="inline-flex items-center gap-2 bg-white text-[#104674] hover:bg-zinc-100 font-bold uppercase tracking-widest text-[13px] py-4 px-10 rounded-full transition-all group shadow-xl">
                                Contact Us
                                <ChevronRight size={16} className="text-[#104674] group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
            {/* Main Footer */}
            <footer className="bg-white border-t border-zinc-100 pt-16 pb-8">
                <div className="container mx-auto px-4 max-w-[1320px] grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div className="space-y-6">
                        <div className="text-2xl font-black bg-gradient-to-r from-red-600 to-primary bg-clip-text text-transparent italic flex items-center">
                            LOGISARY <Truck className="inline-block ml-1 w-6 h-6 text-primary fill-current" />
                        </div>
                        <p className="text-zinc-500 text-sm leading-relaxed">
                            R. K. Transportation Services Pvt. Ltd. company based in Mumbai, has been formed to initially transporting Liquid bulk materials in tankers, All over India.
                        </p>
                        <div className="flex gap-4">
                            {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
                                <a key={i} href="#" className="w-10 h-10 bg-primary/5 rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors">
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold text-zinc-900 mb-6 text-lg">Quick Links</h4>
                        <ul className="space-y-4 text-sm text-zinc-500">
                            <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
                            <li><Link href="/about-us" className="hover:text-primary transition-colors">About Us</Link></li>
                            <li><Link href="/how-it-works" className="hover:text-primary transition-colors">How It Works</Link></li>
                            <li><Link href="/help" className="hover:text-primary transition-colors">Contact Us</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-zinc-900 mb-6 text-lg">Services</h4>
                        <ul className="space-y-4 text-sm text-zinc-500">
                            {['Lubricant & Additives', 'Hazard & Non-Hazard chemical', 'FMCG', 'Industrial Oil'].map(link => (
                                <li key={link}><Link href="/services" className="hover:text-primary transition-colors">{link}</Link></li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-zinc-900 mb-6 text-lg">Contact Us</h4>
                        <ul className="space-y-4 text-sm text-zinc-500">
                            <li className="flex items-start gap-3">
                                <MapPin className="flex-shrink-0 mt-1" size={18} />
                                <span>102, 1st Flr, Navnidhi Indl. Premises Society Ltd., A.D. Marg, Sewree(W), Mumbai - 400 015.</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone size={18} />
                                <span>+91-22-224142646</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail size={18} />
                                <span>info@rktransport.in</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="container mx-auto max-w-[1320px] px-4 border-t border-zinc-100 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-zinc-500">
                    <p>RK Transportation © 2026.</p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <Link href="/terms" className="hover:text-zinc-900">Terms & Conditions</Link>
                        <Link href="/privacy" className="hover:text-zinc-900">Privacy Policy</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}

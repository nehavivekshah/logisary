'use client';
import Link from 'next/link';
import { ChevronRight, Droplets, FlaskConical, ShoppingBasket, Factory } from 'lucide-react';
import { useState } from 'react';

export default function ServicesPage() {
    // State to manage active slide
    const [activeService, setActiveService] = useState(3); // Default active: Industrial Oil (index 3)

    const services = [
        {
            id: 0,
            title: "Lubricant & Additives",
            description: "We provide safe, reliable, and efficient transportation solutions for lubricants and additives across India. Our specialized SS tankers are designed to handle sensitive lubricant materials while maintaining product integrity and quality.",
            icon: <Droplets className="w-8 h-8 text-blue-900" />,
            // Using placeholder color/gradient instead of image
            bgClass: "bg-zinc-200"
        },
        {
            id: 1,
            title: "Hazard & Non-Hazard chemical",
            description: "We offer secure and compliant transportation services for both hazardous and non-hazardous chemicals across India. Our fleet of specialized SS tankers and trained personnel ensure safe handling, strict regulatory compliance, and zero-contamination movement of chemical cargo.",
            icon: <FlaskConical className="w-8 h-8 text-blue-900" />,
            bgClass: "bg-zinc-300"
        },
        {
            id: 2,
            title: "FMCG",
            description: "We provide efficient and hygienic transportation solutions for FMCG liquid products across India. Our dedicated tankers ensure contamination-free handling while maintaining product quality throughout transit.",
            icon: <ShoppingBasket className="w-8 h-8 text-blue-900" />,
            bgClass: "bg-zinc-400"
        },
        {
            id: 3,
            title: "Industrial Oil",
            description: "We offer specialized transportation services for industrial oils, ensuring safe handling and secure movement across long distances. Our SS and customized tankers are suitable for various grades of industrial oils, maintaining consistency and preventing contamination.",
            icon: <Factory className="w-8 h-8 text-blue-900" />,
            bgClass: "bg-blue-100"
        }
    ];

    return (
        <main className="font-sans text-zinc-800 bg-white">
            {/* 1. Breadcrumb Section */}
            <section className="relative bg-amber-50 py-20 overflow-hidden text-center">
                <div className="container mx-auto px-4 relative z-10">
                    <h2 className="text-4xl font-bold text-zinc-900 mb-4">Services</h2>
                    <div className="flex items-center justify-center gap-2 text-sm font-semibold">
                        <Link href="/" className="text-zinc-500 hover:text-blue-900 transition">Home</Link>
                        <ChevronRight size={14} className="text-zinc-400" />
                        <span className="text-blue-900">Services</span>
                    </div>
                </div>
            </section>

            {/* 2. Services Section */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="text-center mb-16 max-w-3xl mx-auto" data-aos="fade-up">
                        <span className="bg-blue-100 text-blue-900 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">Our Service</span>
                        <h2 className="text-4xl font-bold text-zinc-900 mt-6 mb-6">Our Range of Logistics Services</h2>
                        <p className="text-zinc-500 text-lg leading-relaxed">
                            Our state-of-the-art facilities and innovative technology support e-commerce fulfillment and project cargo handling, providing you with tailored solutions.
                        </p>
                    </div>

                    {/* Expand Gallery Implementation */}
                    <div className="flex flex-col lg:flex-row h-[600px] gap-4 w-full overflow-hidden">
                        {services.map((service) => (
                            <div
                                key={service.id}
                                onClick={() => setActiveService(service.id)}
                                className={`
                                    relative cursor-pointer transition-all duration-700 ease-in-out rounded-3xl overflow-hidden
                                    ${activeService === service.id ? 'lg:flex-[3] flex-[3]' : 'lg:flex-[0.5] flex-[0.5]'}
                                    ${service.bgClass}
                                    group
                                `}
                            >
                                {/* Background Image Placeholder - In real app replace bgClass with <img src="" /> */}
                                <div className={`absolute inset-0 bg-cover bg-center transition-transform duration-700 ${activeService === service.id ? 'scale-110' : 'scale-100'}`}>
                                    {/* Simulating image with colored div */}
                                    <div className="w-full h-full bg-gradient-to-br from-zinc-200 to-zinc-400 opacity-50"></div>
                                </div>

                                {/* Overlay Gradient */}
                                <div className={`absolute inset-0 bg-zinc-900/40 transition-opacity duration-300 ${activeService === service.id ? 'opacity-0' : 'opacity-60 group-hover:opacity-40'}`}></div>

                                {/* Content Box - Visible when active */}
                                <div className={`
                                    absolute bottom-8 left-8 right-8 bg-white/95 backdrop-blur-md p-8 rounded-2xl shadow-xl transition-all duration-500
                                    ${activeService === service.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}
                                `}>
                                    <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center mb-4 text-blue-900">
                                        {service.icon}
                                    </div>
                                    <h3 className="text-2xl font-bold text-zinc-900 mb-3">{service.title}</h3>
                                    <p className="text-zinc-600 text-sm leading-relaxed mb-0">
                                        {service.description}
                                    </p>
                                </div>

                                {/* Vertical Text - Visible when inactive */}
                                <div className={`
                                    absolute inset-0 flex items-center justify-center transition-opacity duration-300
                                    ${activeService === service.id ? 'opacity-0 pointer-events-none' : 'opacity-100'}
                                `}>
                                    <h3 className="text-2xl font-bold text-white whitespace-nowrap -rotate-90 tracking-widest uppercase drop-shadow-md">
                                        {service.title}
                                    </h3>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </section>
        </main>
    );
}

'use client';
import { useState } from 'react';
import Link from 'next/link';
import {
    ChevronRight,
    MapPin,
    Clock,
    Video,
    Info,
    X,
    Calendar
} from 'lucide-react';

export default function UpcomingEventsPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<string | null>(null);

    const openModal = (eventName: string) => {
        setSelectedEvent(eventName);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedEvent(null);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert(`Registration for ${selectedEvent} confirmed! Details sent to your email.`);
        closeModal();
    };

    const events = [
        {
            id: 1,
            title: "India Transport Expo 2026",
            badge: "Exhibition",
            badgeColor: "bg-blue-600",
            date: { day: "15", month: "Jan" },
            image: "bg-zinc-200", // Placeholder for actual image
            location: "Pragati Maidan, New Delhi",
            time: "10:00 AM - 06:00 PM",
            description: "The largest gathering for liquid logistics providers, tanker fabricators, and technology partners.",
            buttonText: "Register Now",
            type: "physical"
        },
        {
            id: 2,
            title: "Liquid Safety & Spillage Control",
            badge: "Online Webinar",
            badgeColor: "bg-red-600",
            date: { day: "22", month: "Jan" },
            image: "bg-zinc-300",
            location: "Zoom Meeting (Online)",
            time: "03:30 PM - 05:00 PM",
            description: "Learn the latest SOPs for handling hazardous chemicals and emergency spillage response techniques.",
            buttonText: "Join Webinar",
            type: "online"
        },
        {
            id: 3,
            title: "Logisary Founders Meetup",
            badge: "Networking",
            badgeColor: "bg-emerald-600",
            date: { day: "05", month: "Feb" },
            image: "bg-zinc-400",
            location: "BKC, Mumbai",
            time: "07:00 PM onwards",
            description: "An exclusive evening for Logisary members to network with transport company owners and shippers.",
            buttonText: "Request Invite",
            type: "physical"
        }
    ];

    return (
        <main className="font-sans text-zinc-800 bg-white min-h-screen">
            {/* 1. Breadcrumb Section */}
            <section className="relative bg-amber-50 py-20 overflow-hidden text-center">
                <div className="container mx-auto px-4 relative z-10">
                    <h2 className="text-4xl font-bold text-zinc-900 mb-4">Upcoming Events</h2>
                    <div className="flex items-center justify-center gap-2 text-sm font-semibold">
                        <Link href="/" className="text-zinc-500 hover:text-blue-900 transition">Home</Link>
                        <ChevronRight size={14} className="text-zinc-400" />
                        <span className="text-blue-900">Upcoming Events</span>
                    </div>
                </div>
            </section>

            {/* 2. Events Grid */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {events.map((event) => (
                            <div key={event.id} className="bg-white rounded-[15px] shadow-[0_0_1px_#000] hover:-translate-y-2 hover:shadow-xl transition-all duration-300 flex flex-col h-full overflow-hidden group">
                                {/* Image Area */}
                                <div className={`h-[180px] w-full ${event.image} bg-cover bg-center relative`}>
                                    <span className={`absolute top-4 left-4 ${event.badgeColor} text-white text-[11px] font-bold uppercase py-1 px-4 rounded-full`}>
                                        {event.badge}
                                    </span>
                                    {/* Date Box */}
                                    <div className="absolute -bottom-5 right-5 bg-white w-[60px] h-[60px] rounded-[10px] shadow-lg flex flex-col items-center justify-center text-[#104674] z-10">
                                        <span className="text-xl font-extrabold leading-none">{event.date.day}</span>
                                        <span className="text-[11px] font-bold uppercase mt-1">{event.date.month}</span>
                                    </div>
                                    <div className="w-full h-full flex items-center justify-center text-zinc-500 font-bold bg-zinc-100 uppercase tracking-widest">
                                        EVENT IMG
                                    </div>
                                </div>

                                {/* Content Area */}
                                <div className="p-6 pt-8 flex-grow flex flex-col">
                                    <h5 className="text-lg font-bold text-[#104674] mb-3">{event.title}</h5>

                                    <div className="space-y-2 mb-4 text-sm text-zinc-600">
                                        <div className="flex items-center gap-3">
                                            {event.type === 'online' ? <Video size={16} className="text-red-600" /> : <MapPin size={16} className="text-red-600" />}
                                            <span>{event.location}</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Clock size={16} className="text-red-600" />
                                            <span>{event.time}</span>
                                        </div>
                                    </div>

                                    <p className="text-sm text-zinc-500 leading-relaxed mb-6">
                                        {event.description}
                                    </p>

                                    <div className="mt-auto">
                                        <button
                                            onClick={() => openModal(event.title)}
                                            className="w-full rounded-full border border-[#104674] text-[#104674] hover:bg-[#104674] hover:text-white font-bold py-2 text-sm transition-colors"
                                        >
                                            {event.buttonText}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Registration Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-900/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white w-full max-w-md rounded-xl shadow-2xl overflow-hidden scale-100 animate-in zoom-in-95 duration-200">
                        <div className="p-6 bg-zinc-50 flex justify-between items-center border-b border-zinc-100">
                            <h5 className="font-bold text-lg text-[#104674]">Event Registration</h5>
                            <button onClick={closeModal} className="text-zinc-400 hover:text-zinc-600 transition-colors">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="p-6">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label className="block text-sm font-bold text-zinc-700 mb-2">Number of Attendees</label>
                                    <input
                                        type="number"
                                        min="1"
                                        defaultValue="1"
                                        className="w-full p-3 border border-zinc-200 rounded-lg focus:border-[#104674] outline-none"
                                    />
                                </div>

                                <div className="bg-blue-50 text-blue-800 p-3 rounded-lg text-xs flex gap-3 items-start mb-6">
                                    <Info size={16} className="shrink-0 mt-0.5" />
                                    <p>Registration details will be sent to your registered email address.</p>
                                </div>

                                <button type="submit" className="w-full bg-[#104674] text-white font-bold py-3 rounded-lg hover:bg-[#0d365a] transition-colors shadow-lg">
                                    Confirm My Seat
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}

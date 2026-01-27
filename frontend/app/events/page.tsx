'use client';
import { useState, useEffect } from 'react';
import { api } from '@/utils/api';
import { Calendar, MapPin, Clock } from 'lucide-react';

export default function EventsPage() {
    const [events, setEvents] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // We can reuse the landing page data or create a specific endpoint. 
        // For now, let's fetch from landing and filter, or use a new endpoint if available.
        // Actually, let's make a dedicated endpoint roughly, or just use /public/landing
        // But better to have dedicated. Use generic fetch for now or standard api.
        // Let's assume we add /events to public or just use landing.
        // Actually, I'll update public controller to have getEvents too.

        // For now, falling back to landing data to ensure it works without backend update if possible,
        // but cleaner to have /public/events. I'll add that to backend next.
        api.get('/public/landing')
            .then((res: any) => setServices(res.events || []))
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    const setServices = (data: any[]) => {
        setEvents(data);
    };

    return (
        <div className="min-h-screen bg-zinc-50 font-sans text-zinc-800">
            <div className="bg-blue-900 text-white py-12">
                <div className="container mx-auto px-4">
                    <h1 className="text-3xl font-bold">Upcoming Events</h1>
                    <p className="mt-2 text-blue-100">Join us at these industry leading events.</p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                {loading ? (
                    <div>Loading events...</div>
                ) : (
                    <div className="grid gap-6">
                        {events.length > 0 ? events.map((event, i) => (
                            <div key={i} className="bg-white p-6 rounded-lg shadow-sm border border-zinc-200 flex flex-col md:flex-row gap-6 items-start md:items-center">
                                <div className="bg-blue-50 p-4 rounded text-center min-w-[100px]">
                                    <div className="text-2xl font-bold text-blue-800">{new Date(event.date).getDate()}</div>
                                    <div className="text-sm font-semibold text-blue-600 uppercase">{new Date(event.date).toLocaleString('default', { month: 'short' })}</div>
                                    <div className="text-xs text-zinc-500">{new Date(event.date).getFullYear()}</div>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-zinc-900 mb-2">{event.title}</h3>
                                    <div className="flex flex-wrap gap-4 text-sm text-zinc-500 mb-2">
                                        <div className="flex items-center gap-1"><MapPin size={16} /> {event.location}</div>
                                        <div className="flex items-center gap-1"><Clock size={16} /> {new Date(event.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                                    </div>
                                    <p className="text-zinc-600">{event.description}</p>
                                </div>
                            </div>
                        )) : (
                            <div className="text-center py-12 text-zinc-500">
                                No upcoming events found.
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

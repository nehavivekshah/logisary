'use client';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-zinc-50 font-sans text-zinc-800">
            <div className="bg-blue-900 text-white py-12">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-3xl font-bold">Contact Us</h1>
                    <p className="mt-2 text-blue-100">We are here to help you.</p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <div className="grid md:grid-cols-2 gap-12">

                    {/* Contact Info */}
                    <div>
                        <h2 className="text-2xl font-bold text-zinc-900 mb-6">Get in Touch</h2>
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="bg-blue-50 p-3 rounded-full text-blue-900"><MapPin size={24} /></div>
                                <div>
                                    <h3 className="font-bold text-zinc-900">Our Office</h3>
                                    <p className="text-zinc-600">123 Logistics Park, Transport Nagar,<br />New Delhi, India - 110001</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="bg-blue-50 p-3 rounded-full text-blue-900"><Phone size={24} /></div>
                                <div>
                                    <h3 className="font-bold text-zinc-900">Phone</h3>
                                    <p className="text-zinc-600">+91 98765 43210</p>
                                    <p className="text-zinc-600">+91 11 2345 6789</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="bg-blue-50 p-3 rounded-full text-blue-900"><Mail size={24} /></div>
                                <div>
                                    <h3 className="font-bold text-zinc-900">Email</h3>
                                    <p className="text-zinc-600">support@rktransport.com</p>
                                    <p className="text-zinc-600">sales@rktransport.com</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white p-8 rounded-lg shadow-sm border border-zinc-200">
                        <h2 className="text-xl font-bold text-zinc-900 mb-6">Send us a Message</h2>
                        <form className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-zinc-700 mb-1">Name</label>
                                    <input type="text" className="w-full p-2 border border-zinc-300 rounded focus:ring-1 focus:ring-blue-500 outline-none" placeholder="John Doe" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-zinc-700 mb-1">Mobile</label>
                                    <input type="text" className="w-full p-2 border border-zinc-300 rounded focus:ring-1 focus:ring-blue-500 outline-none" placeholder="+91..." />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-zinc-700 mb-1">Email</label>
                                <input type="email" className="w-full p-2 border border-zinc-300 rounded focus:ring-1 focus:ring-blue-500 outline-none" placeholder="john@example.com" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-zinc-700 mb-1">Message</label>
                                <textarea className="w-full p-2 border border-zinc-300 rounded focus:ring-1 focus:ring-blue-500 outline-none h-32" placeholder="How can we help you?"></textarea>
                            </div>
                            <button type="button" onClick={() => alert('Message Sent!')} className="w-full bg-blue-900 text-white font-bold py-3 rounded hover:bg-blue-800 transition-colors">
                                Send Message
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
}

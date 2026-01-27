'use client';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { Truck } from 'lucide-react';

export default function Navbar() {
    const { user, logout } = useAuth();

    // Mockup Links
    const navLinks = [
        { name: 'My Enquiry', href: '/enquiry' },
        { name: 'Services', href: '/services' },
        { name: 'KM Calculate', href: '/calculator' },
        { name: 'Membership', href: '/membership' },
        { name: 'Orders', href: '/orders' },
        { name: 'Upcoming Events', href: '/events' },
        { name: 'Support', href: '/support' },
    ];

    return (
        <nav className="bg-white border-b border-zinc-200 py-4">
            <div className="container mx-auto px-4 flex items-center justify-between">
                {/* Logo Section */}
                <Link href="/" className="flex items-center gap-2">
                    <div className="text-3xl font-black bg-gradient-to-r from-red-600 to-blue-900 bg-clip-text text-transparent italic flex items-center">
                        LOGISARY <Truck className="inline-block ml-1 w-8 h-8 text-blue-900 fill-current" />
                    </div>
                </Link>

                {/* Center Navigation */}
                <div className="hidden lg:flex items-center gap-6">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-sm font-bold text-zinc-800 hover:text-blue-900 uppercase tracking-tight"
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Right Actions */}
                <div className="flex gap-3">
                    {user ? (
                        <>
                            <span className="hidden md:inline px-4 py-2 text-sm font-bold text-zinc-600">
                                {user.full_name?.split(' ')[0]}
                            </span>
                            {user.role === 'ADMIN' && (
                                <Link href="/admin" className="px-5 py-2 rounded-full bg-zinc-900 text-white font-bold text-sm hover:bg-zinc-700">
                                    Admin
                                </Link>
                            )}
                            <button onClick={logout} className="px-5 py-2 rounded-full bg-red-600 text-white font-bold text-sm hover:bg-red-700">
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link href="/auth/login" className="px-6 py-2 rounded-full bg-blue-900 text-white font-bold text-sm hover:bg-blue-800 flex items-center gap-1">
                                Login &gt;
                            </Link>
                            <Link href="/auth/register" className="px-6 py-2 rounded-full bg-blue-700 text-white font-bold text-sm hover:bg-blue-600 flex items-center gap-1">
                                New Registration &gt;
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}

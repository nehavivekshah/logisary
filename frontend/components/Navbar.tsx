'use client';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { ChevronRight } from 'lucide-react';

export default function Navbar() {
    const { user, logout } = useAuth();

    // Mockup Links
    const navLinks = [
        { name: 'My Enquiry', href: '/enquiry' },
        { name: 'Services', href: '/services' },
        { name: 'KM Calculate', href: '/calculator' },
        { name: 'Membership', href: '/membership' },
        { name: 'Orders', href: '/orders' },
        { name: 'Upcoming Events', href: '/upcomingevents' },
        { name: 'Help 24h', href: '/help' },
    ];

    return (
        <nav className="bg-white border-b border-zinc-200 py-4">
            <div className="container mx-auto px-4 flex items-center justify-between">
                {/* Logo Section */}
                <Link href="/" className="flex items-center gap-2">
                    <div className="text-3xl font-black bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent italic flex items-center">
                        <img src="/assets/logo.png" alt="Logo" className="w-55 h-12" />
                    </div>
                </Link>

                {/* Center Navigation */}
                <div className="hidden lg:flex items-center gap-6">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-sm font-bold text-zinc-500 hover:text-primary tracking-tight"
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
                                <Link href="/dashboard" className="px-5 py-2 rounded-full bg-zinc-900 text-white font-bold text-sm hover:bg-zinc-700">
                                    Dashboard
                                </Link>
                            )}
                            <button onClick={logout} className="px-5 py-2 rounded-full bg-secondary text-white font-bold text-sm hover:bg-secondary-dark">
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link href="/login" className="px-6 py-2 rounded-full bg-primary text-white text-base font-medium hover:bg-primary-dark flex items-center gap-1">
                                Login <ChevronRight size={15} />
                            </Link>
                            <Link href="/register" className="px-6 py-2 rounded-full bg-primary text-white text-base font-medium hover:bg-primary-dark flex items-center gap-1">
                                New Registration <ChevronRight size={15} />
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}

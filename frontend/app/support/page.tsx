'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function SupportPage() {
    const router = useRouter();

    useEffect(() => {
        router.push('/contact');
    }, [router]);

    return (
        <div className="flex h-screen items-center justify-center">Redirecting to Support...</div>
    );
}

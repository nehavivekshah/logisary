'use client';
import { useEffect } from 'react';
import { useSocket } from '../hooks/useSocket';
import { useAuth } from '../context/AuthContext';
// We'll use simple alerts for MVP, but a toast library (like react-hot-toast) would be better.
// For now, let's just console log and maybe window.alert if the user wants.

export default function NotificationListener() {
    const socket = useSocket();
    const { user } = useAuth();

    useEffect(() => {
        if (!socket || !user) return;

        const handleNewBid = (data: any) => {
            if (user.role === 'SHIPPER') {
                // In a real app, check if this bid is for MY job. 
                // For MVP/Demo, just show all to prove it works.
                alert(`New Bid! ${data.carrier_name} bid ₹${data.amount} on a job.`);
            }
        };

        const handleNewJob = (data: any) => {
            if (user.role === 'CARRIER') {
                alert(`New Load Available! From ${data.origin} to ${data.destination}`);
            }
        };

        socket.on('new_bid', handleNewBid);
        socket.on('new_job', handleNewJob);

        return () => {
            socket.off('new_bid', handleNewBid);
            socket.off('new_job', handleNewJob);
        };
    }, [socket, user]);

    return null; // This component handles side effects only
}

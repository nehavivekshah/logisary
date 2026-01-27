'use client';

import { useState, useEffect } from 'react';
import { api } from '@/utils/api';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

interface Job {
    id: string;
    origin: string;
    destination: string;
    material_type: string;
    scheduled_date: string;
    status: string;
}

export default function JobsPage() {
    const { token } = useAuth();
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const res = await api.get('/jobs', token!);
                if (Array.isArray(res)) {
                    setJobs(res);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (token) fetchJobs();
    }, [token]);

    if (loading) return <div className="p-8 text-center">Loading jobs...</div>;

    return (
        <div className="max-w-6xl mx-auto p-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">Available Shipments</h1>
                <Link href="/jobs/create" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                    Post Job
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {jobs.map((job) => (
                    <div key={job.id} className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 hover:shadow-lg transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${job.status === 'OPEN' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                                }`}>
                                {job.status}
                            </span>
                            <span className="text-sm text-zinc-500">{new Date(job.scheduled_date).toLocaleDateString()}</span>
                        </div>

                        <div className="mb-4">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                <span className="font-semibold text-zinc-900 dark:text-zinc-100">{job.origin}</span>
                            </div>
                            <div className="border-l-2 border-dashed border-zinc-300 dark:border-zinc-700 h-4 ml-[3px] my-1"></div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                <span className="font-semibold text-zinc-900 dark:text-zinc-100">{job.destination}</span>
                            </div>
                        </div>

                        <p className="text-sm text-zinc-500 mb-4">{job.material_type}</p>

                        <Link href={`/jobs/${job.id}`} className="block w-full text-center py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
                            View Details
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

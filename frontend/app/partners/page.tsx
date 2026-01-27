'use client';
import { useState, useEffect } from 'react';
import { api } from '@/utils/api';
import { Factory } from 'lucide-react';

export default function PartnersPage() {
    const [partners, setPartners] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Reuse landing page data logic or create generic endpoint fetch
        // Assuming we update backend to provide /public/partners later or generic query
        // For now using landing page endpoint as source of truth
        api.get('/public/landing')
            .then((res: any) => setPartners(res.partners || []))
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="min-h-screen bg-zinc-50 font-sans text-zinc-800">
            <div className="bg-blue-900 text-white py-12">
                <div className="container mx-auto px-4">
                    <h1 className="text-3xl font-bold">Our Partners</h1>
                    <p className="mt-2 text-blue-100">Trusted Fabricators and Strategic Partners.</p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                {loading ? (
                    <div>Loading partners...</div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {partners.length > 0 ? partners.map((p, i) => (
                            <div key={i} className="bg-white p-6 rounded-lg shadow-sm border border-zinc-200 flex items-start gap-4">
                                <div className="bg-orange-100 p-3 rounded-full text-orange-600">
                                    <Factory size={24} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-zinc-900">{p.name}</h3>
                                    <div className="text-xs font-semibold text-blue-600 uppercase mb-2">{p.type}</div>
                                    <p className="text-sm text-zinc-600">{p.description}</p>
                                    {p.contact_info && <p className="text-xs text-zinc-400 mt-2">{p.contact_info}</p>}
                                </div>
                            </div>
                        )) : (
                            <div className="col-span-3 text-center py-12 text-zinc-500">
                                No partners found.
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

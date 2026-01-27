'use client';
import { useState, useEffect } from 'react';
import { api } from '@/utils/api';
import { Droplets, FlaskConical, ShoppingBasket, Fuel, ArrowRight } from 'lucide-react';

export default function ServicesPage() {
    const [services, setServices] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/public/services')
            .then((res: any) => setServices(res))
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    const getIcon = (iconName: string) => {
        switch (iconName) {
            case 'Droplets': return <Droplets className="w-12 h-12 text-blue-600" />;
            case 'FlaskConical': return <FlaskConical className="w-12 h-12 text-blue-600" />;
            case 'ShoppingBasket': return <ShoppingBasket className="w-12 h-12 text-blue-600" />;
            case 'Fuel': return <Fuel className="w-12 h-12 text-blue-600" />;
            default: return <Droplets className="w-12 h-12 text-blue-600" />;
        }
    };

    return (
        <div className="min-h-screen bg-zinc-50 font-sans text-zinc-800">
            <div className="bg-blue-900 text-white py-12">
                <div className="container mx-auto px-4">
                    <h1 className="text-3xl font-bold">Our Services</h1>
                    <p className="mt-2 text-blue-100">Comprehensive logistics solutions for every industry.</p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                {loading ? (
                    <div className="text-center py-12">Loading services...</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.length > 0 ? services.map((service, i) => (
                            <div key={i} className="bg-white p-8 rounded-lg shadow-sm border border-zinc-200 hover:shadow-md transition-shadow">
                                <div className="mb-4 bg-blue-50 w-20 h-20 rounded-full flex items-center justify-center">
                                    {getIcon(service.icon)}
                                </div>
                                <h3 className="text-xl font-bold mb-2 text-blue-900">{service.title}</h3>
                                <div className="text-xs font-semibold text-blue-500 uppercase tracking-widest mb-4">{service.category}</div>
                                <p className="text-zinc-600 mb-6">{service.description}</p>
                                <button className="text-blue-900 font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all">
                                    Learn more <ArrowRight size={16} />
                                </button>
                            </div>
                        )) : (
                            <div className="col-span-3 text-center py-12 text-zinc-500">
                                No services found.
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

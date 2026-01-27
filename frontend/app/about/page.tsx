'use client';

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-zinc-50 font-sans text-zinc-800">
            <div className="bg-zinc-900 text-white py-16">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl font-bold mb-4">About RK Transport</h1>
                    <p className="text-lg text-zinc-300 max-w-2xl mx-auto">Connecting Shippers and Carriers with efficiency and trust since 2010.</p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-16">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-blue-900">Who We Are</h2>
                        <p className="text-zinc-700 leading-relaxed">
                            RK Transport is a premier logistics platform dedicated to simplifying the complex world of transportation bidding.
                            We specialize in liquid cargo, hazardous chemical transport, and industrial logistics, providing a transparent marketplace
                            where shippers can find reliable carriers and carriers can find high-value loads.
                        </p>
                        <p className="text-zinc-700 leading-relaxed">
                            Our mission is to digitize and optimize the supply chain for the Indian market, ensuring safety, compliance, and speed in every transaction.
                        </p>
                    </div>
                    <div className="bg-zinc-200 h-80 rounded-lg flex items-center justify-center text-zinc-400 font-bold">
                        [About Us Image Placeholder]
                    </div>
                </div>

                <div className="mt-20">
                    <h2 className="text-2xl font-bold text-center text-blue-900 mb-12">Why Choose Us?</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center p-6">
                            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-800 font-bold text-2xl">1</div>
                            <h3 className="font-bold text-lg mb-2">Verified Carriers</h3>
                            <p className="text-zinc-600 text-sm">Every partner is vetted for compliance and safety standards.</p>
                        </div>
                        <div className="text-center p-6">
                            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-800 font-bold text-2xl">2</div>
                            <h3 className="font-bold text-lg mb-2">Transparent Bidding</h3>
                            <p className="text-zinc-600 text-sm">Real-time competitive bidding ensures the best market rates.</p>
                        </div>
                        <div className="text-center p-6">
                            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-800 font-bold text-2xl">3</div>
                            <h3 className="font-bold text-lg mb-2">24/7 Support</h3>
                            <p className="text-zinc-600 text-sm">Dedicated logistics experts available to assist you anytime.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

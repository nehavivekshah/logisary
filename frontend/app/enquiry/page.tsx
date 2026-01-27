'use client';

export default function EnquiryPage() {
    return (
        <div className="min-h-screen bg-zinc-50 font-sans text-zinc-800">
            <div className="bg-blue-900 text-white py-12">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-3xl font-bold">Post an Enquiry</h1>
                    <p className="mt-2 text-blue-100">Tell us what you need and get quotes.</p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-sm border border-zinc-200">
                    <form className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-zinc-700 mb-1">Company Name</label>
                            <input type="text" className="w-full p-2 border border-zinc-300 rounded focus:ring-1 focus:ring-blue-500 outline-none" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-zinc-700 mb-1">Contact Person</label>
                                <input type="text" className="w-full p-2 border border-zinc-300 rounded focus:ring-1 focus:ring-blue-500 outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-zinc-700 mb-1">Phone / Mobile</label>
                                <input type="text" className="w-full p-2 border border-zinc-300 rounded focus:ring-1 focus:ring-blue-500 outline-none" />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-zinc-700 mb-1">Origin</label>
                                <input type="text" className="w-full p-2 border border-zinc-300 rounded focus:ring-1 focus:ring-blue-500 outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-zinc-700 mb-1">Destination</label>
                                <input type="text" className="w-full p-2 border border-zinc-300 rounded focus:ring-1 focus:ring-blue-500 outline-none" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-zinc-700 mb-1">Requirements</label>
                            <textarea className="w-full p-2 border border-zinc-300 rounded focus:ring-1 focus:ring-blue-500 outline-none h-32" placeholder="Describe your load, vehicle type needed, etc."></textarea>
                        </div>
                        <button type="button" onClick={() => alert('Enquiry Submitted!')} className="w-full bg-blue-900 text-white font-bold py-3 rounded hover:bg-blue-800 transition-colors">
                            Submit Enquiry
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

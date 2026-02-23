import React from 'react';
import { Download, FileText, Calendar } from 'lucide-react';

export default function Reports() {
    const downloadReport = (format) => {
        // In a real app, this would call the /reports API
        alert(`Downloading report in ${format} format...`);
    };

    return (
        <div className="space-y-6 animate-in fade-in flex-1">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-1">Weekly Reports</h1>
                <p className="text-slate-400">Generate and download comprehensive water quality summaries.</p>
            </div>

            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 pb-6 border-b border-slate-700">
                    <div>
                        <h2 className="text-xl font-semibold text-white">Latest Summary</h2>
                        <p className="text-sm text-slate-400 flex items-center mt-1">
                            <Calendar className="w-4 h-4 mr-2" />
                            Oct 1 - Oct 7, 2026
                        </p>
                    </div>
                    <div className="mt-4 sm:mt-0 flex space-x-3">
                        <button
                            onClick={() => downloadReport('PDF')}
                            className="flex items-center px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-lg text-sm font-medium transition-colors"
                        >
                            <Download className="w-4 h-4 mr-2" /> PDF
                        </button>
                        <button
                            onClick={() => downloadReport('CSV')}
                            className="flex items-center px-4 py-2 border border-slate-600 hover:bg-slate-700 text-slate-300 rounded-lg text-sm font-medium transition-colors"
                        >
                            <FileText className="w-4 h-4 mr-2" /> CSV
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
                    <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-700/50">
                        <p className="text-slate-400 text-sm mb-1">Avg pH Level</p>
                        <p className="text-2xl font-bold text-emerald-400">7.2</p>
                    </div>
                    <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-700/50">
                        <p className="text-slate-400 text-sm mb-1">Avg Turbidity</p>
                        <p className="text-2xl font-bold text-sky-400">1.4 NTU</p>
                    </div>
                    <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-700/50">
                        <p className="text-slate-400 text-sm mb-1">Total Anomalies</p>
                        <p className="text-2xl font-bold text-amber-400">2</p>
                    </div>
                    <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-700/50">
                        <p className="text-slate-400 text-sm mb-1">System Uptime</p>
                        <p className="text-2xl font-bold text-slate-200">99.9%</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

import React from 'react';

export default function MetricCard({ title, value, unit, icon: Icon, status = 'normal', colorClass }) {
    const getStatusColor = () => {
        switch (status) {
            case 'danger': return 'text-red-400 bg-red-500/10 border-red-500/20';
            case 'warning': return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
            default: return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
        }
    };

    return (
        <div className={`p-6 rounded-2xl bg-slate-800 border border-slate-700 hover:bg-slate-800/80 transition-all duration-300 relative overflow-hidden group`}>
            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${colorClass} opacity-10 rounded-full blur-2xl -mr-10 -mt-10 transition-transform group-hover:scale-110`}></div>
            <div className="flex items-center justify-between mb-4 relative z-10">
                <h3 className="text-sm font-medium text-slate-400">{title}</h3>
                <div className={`p-2 rounded-lg ${getStatusColor()}`}>
                    <Icon className="h-5 w-5" />
                </div>
            </div>
            <div className="flex items-end space-x-2 relative z-10">
                <span className="text-3xl font-bold text-white tracking-tight">{value}</span>
                <span className="text-sm text-slate-400 pb-1">{unit}</span>
            </div>
        </div>
    );
}

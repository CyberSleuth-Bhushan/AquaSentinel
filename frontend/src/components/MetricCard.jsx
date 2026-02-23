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
        <div className={`p-6 rounded-[2rem] bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 hover:bg-slate-800/60 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:border-slate-600/50 transition-all duration-500 relative overflow-hidden group shadow-lg`}>
            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${colorClass} opacity-20 rounded-full blur-[40px] -mr-10 -mt-10 transition-all duration-500 group-hover:scale-150 group-hover:opacity-30 mix-blend-screen`}></div>
            <div className="flex items-center justify-between mb-4 relative z-10">
                <h3 className="text-sm font-semibold tracking-wider text-slate-400 uppercase">{title}</h3>
                <div className={`p-2.5 rounded-xl backdrop-blur-md shadow-inner ${getStatusColor()} group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="h-5 w-5 drop-shadow-md" />
                </div>
            </div>
            <div className="flex items-end space-x-2 relative z-10">
                <span className="text-3xl font-bold text-white tracking-tight">{value}</span>
                <span className="text-sm text-slate-400 pb-1">{unit}</span>
            </div>
        </div>
    );
}

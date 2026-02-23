import React from 'react';

export default function HealthGauge({ score, status }) {
    const getColors = () => {
        if (score >= 80) return { stroke: '#10b981', gradient: 'from-emerald-500 to-emerald-400' };
        if (score >= 50) return { stroke: '#f59e0b', gradient: 'from-amber-500 to-amber-400' };
        return { stroke: '#ef4444', gradient: 'from-red-500 to-red-400' };
    };

    const colors = getColors();
    const radius = 60;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (score / 100) * circumference;

    return (
        <div className="relative flex flex-col items-center justify-center p-8 bg-slate-800 rounded-2xl border border-slate-700 shadow-xl overflow-hidden group">
            <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-5 group-hover:opacity-10 transition-opacity`}></div>
            <div className="relative w-48 h-48 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                    <circle
                        cx="96"
                        cy="96"
                        r={radius}
                        className="stroke-slate-700"
                        strokeWidth="12"
                        fill="transparent"
                    />
                    <circle
                        cx="96"
                        cy="96"
                        r={radius}
                        stroke={colors.stroke}
                        strokeWidth="12"
                        fill="transparent"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        className="transition-all duration-1000 ease-out"
                    />
                </svg>
                <div className="absolute flex flex-col items-center justify-center">
                    <span className="text-5xl font-extrabold text-white tracking-tighter">{score}</span>
                    <span className="text-sm font-medium text-slate-400 mt-1 uppercase tracking-widest">{status}</span>
                </div>
            </div>
            <h2 className="mt-6 text-lg font-semibold text-slate-200">Overall Water Health</h2>
        </div>
    );
}

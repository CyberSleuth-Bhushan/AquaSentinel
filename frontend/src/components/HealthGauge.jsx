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
        <div className="relative flex flex-col items-center justify-center p-8 bg-slate-900/40 backdrop-blur-xl rounded-[2rem] border border-slate-700/50 shadow-[0_8px_32px_0_rgba(31,38,135,0.2)] overflow-hidden group hover:bg-slate-800/50 transition-colors duration-500 w-full">
            <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-700 mix-blend-screen`}></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-white opacity-[0.02] rounded-full blur-2xl group-hover:opacity-[0.04] transition-opacity"></div>

            <div className="relative w-52 h-52 flex items-center justify-center transform group-hover:scale-105 transition-transform duration-500">
                <svg className="w-full h-full transform -rotate-90 drop-shadow-2xl">
                    <circle
                        cx="104"
                        cy="104"
                        r={radius}
                        className="stroke-slate-800"
                        strokeWidth="14"
                        fill="transparent"
                    />
                    <circle
                        cx="104"
                        cy="104"
                        r={radius}
                        stroke={colors.stroke}
                        strokeWidth="14"
                        fill="transparent"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        className="transition-all duration-1500 ease-out drop-shadow-[0_0_8px_currentColor]"
                    />
                </svg>
                <div className="absolute flex flex-col items-center justify-center">
                    <span className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-300 tracking-tighter drop-shadow-sm">{score}</span>
                    <span className={`text-xs font-bold mt-1 tracking-[0.2em] uppercase`} style={{ color: colors.stroke }}>
                        {status}
                    </span>
                </div>
            </div>

            <div className="mt-8 text-center relative z-10 bg-slate-800/50 px-6 py-2 rounded-xl border border-slate-700/50 backdrop-blur-md">
                <h2 className="text-sm font-semibold text-slate-300 tracking-wide uppercase">Overall Water Health</h2>
            </div>
        </div>
    );
}

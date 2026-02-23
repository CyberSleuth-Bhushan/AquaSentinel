import React from 'react';
import { Droplet, AlertTriangle, ShieldCheck, Clock } from 'lucide-react';
import MetricCard from '../components/MetricCard';

export default function TankInsights() {
    const tankData = {
        cleaningRecommended: false,
        daysSinceCleaning: 45,
        stagnationHours: 12.5,
        waterLevel: 75,
        qualityScore: 88
    };

    return (
        <div className="space-y-6 animate-in fade-in flex-1">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-1">Tank Insights</h1>
                <p className="text-slate-400">Deep dive into your storage tank's health and maintenance needs.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <MetricCard
                    title="Water Level"
                    value={`${tankData.waterLevel}`}
                    unit="%"
                    icon={Droplet}
                    colorClass="from-blue-500 to-sky-600"
                />
                <MetricCard
                    title="Stagnation Time"
                    value={tankData.stagnationHours}
                    unit="hrs"
                    icon={Clock}
                    colorClass="from-amber-500 to-orange-600"
                    status={tankData.stagnationHours > 24 ? 'warning' : 'normal'}
                />
                <MetricCard
                    title="Quality Score"
                    value={tankData.qualityScore}
                    unit="/ 100"
                    icon={ShieldCheck}
                    colorClass="from-emerald-500 to-teal-600"
                />
                <MetricCard
                    title="Last Cleaned"
                    value={tankData.daysSinceCleaning}
                    unit="days ago"
                    icon={AlertTriangle}
                    colorClass="from-slate-500 to-slate-600"
                />
            </div>

            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 mt-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl -mr-10 -mt-10"></div>
                <h2 className="text-xl font-semibold text-white mb-4 relative z-10">Maintenance Status</h2>

                {tankData.cleaningRecommended ? (
                    <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-xl flex items-start space-x-4 relative z-10">
                        <div className="p-2 bg-amber-500/20 rounded-lg text-amber-500 mt-1">
                            <AlertTriangle className="h-6 w-6" />
                        </div>
                        <div>
                            <h3 className="text-lg font-medium text-amber-400">Cleaning Recommended</h3>
                            <p className="text-amber-200/80 mt-1 text-sm">
                                It has been {tankData.daysSinceCleaning} days since your last tank cleaning. Mineral deposits and biofilm may start forming. We recommend scheduling a cleaning soon.
                            </p>
                            <button className="mt-4 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-sm font-medium transition-colors">
                                Schedule Cleaning
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl flex items-start space-x-4 relative z-10">
                        <div className="p-2 bg-emerald-500/20 rounded-lg text-emerald-500 mt-1">
                            <ShieldCheck className="h-6 w-6" />
                        </div>
                        <div>
                            <h3 className="text-lg font-medium text-emerald-400">Tank Condition Optimal</h3>
                            <p className="text-emerald-200/80 mt-1 text-sm">
                                Your tank is currently in good condition. The water quality score is high and it has been {tankData.daysSinceCleaning} days since the last cleaning. Standard recommendation is cleaning every 180 days.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

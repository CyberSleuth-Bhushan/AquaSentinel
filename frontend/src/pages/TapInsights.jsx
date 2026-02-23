import React from 'react';
import { Activity, ShieldCheck, Waves } from 'lucide-react';
import MetricCard from '../components/MetricCard';

export default function TapInsights() {
    const tapData = {
        contaminationRisk: 'Low',
        flowAnomalies: 0,
        supplyPressure: 'Normal',
        avgTurbidity: 1.2
    };

    return (
        <div className="space-y-6 animate-in fade-in flex-1">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-1">Tap Insights</h1>
                <p className="text-slate-400">Monitor the points of consumption directly.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <MetricCard
                    title="Contamination Risk"
                    value={tapData.contaminationRisk}
                    unit=""
                    icon={ShieldCheck}
                    colorClass="from-emerald-500 to-teal-600"
                />
                <MetricCard
                    title="Flow Anomalies"
                    value={tapData.flowAnomalies}
                    unit="Past 24h"
                    icon={Activity}
                    colorClass="from-slate-500 to-slate-600"
                />
                <MetricCard
                    title="Supply Pressure"
                    value={tapData.supplyPressure}
                    unit=""
                    icon={Waves}
                    colorClass="from-blue-500 to-sky-600"
                />
                <MetricCard
                    title="Avg Turbidity"
                    value={tapData.avgTurbidity}
                    unit="NTU"
                    icon={Waves}
                    colorClass="from-indigo-500 to-purple-600"
                />
            </div>

            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 mt-8 relative overflow-hidden">
                <h2 className="text-xl font-semibold text-white mb-4 relative z-10">Consumption Analytics</h2>
                <div className="text-slate-400">
                    Charts and flow-based analytics are being developed. Check back soon for detailed insights on your water usage patterns.
                </div>
            </div>
        </div>
    );
}

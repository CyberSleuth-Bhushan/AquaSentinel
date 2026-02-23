import React, { useState } from 'react';
import { AlertCircle, AlertTriangle, CheckCircle, Info } from 'lucide-react';

export default function Alerts() {
    const [alerts, setAlerts] = useState([
        { id: 1, severity: 'high', message: 'Turbidity Spike Detected. Water scored 40/100.', timestamp: '10 mins ago', acknowledged: false },
        { id: 2, severity: 'medium', message: 'Stagnation approaching 24 hours in main tank.', timestamp: '2 hours ago', acknowledged: false },
        { id: 3, severity: 'low', message: 'Monthly Maintenance recommended soon.', timestamp: '1 day ago', acknowledged: true }
    ]);

    const acknowledgeAlert = (id) => {
        setAlerts(alerts.map(a => a.id === id ? { ...a, acknowledged: true } : a));
    };

    const getSeverityStyle = (severity) => {
        switch (severity) {
            case 'high': return { bg: 'bg-red-500/10', border: 'border-red-500/20', icon: AlertCircle, color: 'text-red-500', title: 'text-red-400' };
            case 'medium': return { bg: 'bg-amber-500/10', border: 'border-amber-500/20', icon: AlertTriangle, color: 'text-amber-500', title: 'text-amber-400' };
            default: return { bg: 'bg-sky-500/10', border: 'border-sky-500/20', icon: Info, color: 'text-sky-500', title: 'text-sky-400' };
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in flex-1">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-1">System Alerts</h1>
                <p className="text-slate-400">Review critical warnings and notifications regarding water quality.</p>
            </div>

            <div className="space-y-4">
                {alerts.length === 0 ? (
                    <div className="p-8 text-center text-slate-400 bg-slate-800 rounded-2xl border border-slate-700">
                        <CheckCircle className="mx-auto h-12 w-12 text-emerald-500 mb-4" />
                        <p className="text-lg font-medium text-slate-200">All Clear</p>
                        <p>No active alerts. Water quality is optimal.</p>
                    </div>
                ) : (
                    alerts.map(alert => {
                        const style = getSeverityStyle(alert.severity);
                        const Icon = style.icon;
                        return (
                            <div
                                key={alert.id}
                                className={`flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-6 rounded-2xl border ${alert.acknowledged ? 'bg-slate-800 border-slate-700 opacity-60' : `${style.bg} ${style.border}`} transition-all`}
                            >
                                <div className="flex items-start space-x-4 mb-4 sm:mb-0">
                                    <div className={`p-2 rounded-lg ${alert.acknowledged ? 'bg-slate-700 text-slate-400' : `bg-slate-800 ${style.color}`}`}>
                                        <Icon className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className={`text-lg font-medium ${alert.acknowledged ? 'text-slate-300' : style.title} capitalize`}>
                                            {alert.severity} Priority Alert
                                        </h3>
                                        <p className={`mt-1 ${alert.acknowledged ? 'text-slate-400' : 'text-slate-200'}`}>{alert.message}</p>
                                        <p className="text-xs text-slate-500 mt-2">{alert.timestamp}</p>
                                    </div>
                                </div>

                                {!alert.acknowledged && (
                                    <button
                                        onClick={() => acknowledgeAlert(alert.id)}
                                        className="w-full sm:w-auto px-4 py-2 border border-slate-600 hover:bg-slate-700 text-slate-300 rounded-lg text-sm font-medium transition-colors whitespace-nowrap"
                                    >
                                        Acknowledge
                                    </button>
                                )}
                                {alert.acknowledged && (
                                    <span className="w-full sm:w-auto px-4 py-2 text-center text-slate-500 text-sm font-medium flex items-center justify-center sm:justify-start">
                                        <CheckCircle className="w-4 h-4 mr-2" /> Resolved
                                    </span>
                                )}
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}

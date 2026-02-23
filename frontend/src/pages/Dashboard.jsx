import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import MetricCard from '../components/MetricCard';
import HealthGauge from '../components/HealthGauge';
import { Droplet, Activity, Thermometer, Waves } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Dashboard() {
    const { currentUser } = useAuth();
    const [data, setData] = useState(null);
    const [history, setHistory] = useState([]);

    // Mock Data Fetching (Replace with Firebase/Backend)
    useEffect(() => {
        // Simulate initial data load
        const mockData = {
            score: 85,
            status: 'Safe',
            metrics: {
                pH: 7.2,
                turbidity: 1.5,
                tds: 210,
                temperature: 24.5,
                flow_rate: 1.2
            }
        };

        // Simulate history for chart
        const mockHistory = Array.from({ length: 24 }).map((_, i) => ({
            time: `${i}:00`,
            ph: 7.0 + Math.random() * 0.5,
            tds: 200 + Math.random() * 20,
            turbidity: 1.0 + Math.random()
        }));

        setData(mockData);
        setHistory(mockHistory);
    }, []);

    if (!data) return <div className="flex h-full items-center justify-center text-slate-400">Loading data...</div>;

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-1">Overview Dashboard</h1>
                    <p className="text-slate-400">Welcome back, monitoring your water systems in real-time.</p>
                </div>
                <div className="text-sm px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>System Online</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Health Gauge taking up 1 col */}
                <div className="lg:col-span-1 h-full flex">
                    <HealthGauge score={data.score} status={data.status} />
                </div>

                {/* Metrics taking up 3 cols */}
                <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <MetricCard
                        title="pH Level"
                        value={data.metrics.pH.toFixed(1)}
                        unit="pH"
                        icon={Activity}
                        status={data.metrics.pH > 6.5 && data.metrics.pH < 8.5 ? 'normal' : 'warning'}
                        colorClass="from-sky-500 to-blue-600"
                    />
                    <MetricCard
                        title="Turbidity"
                        value={data.metrics.turbidity.toFixed(1)}
                        unit="NTU"
                        icon={Waves}
                        status={data.metrics.turbidity < 5 ? 'normal' : 'danger'}
                        colorClass="from-indigo-500 to-purple-600"
                    />
                    <MetricCard
                        title="TDS Level"
                        value={data.metrics.tds}
                        unit="ppm"
                        icon={Droplet}
                        status={data.metrics.tds < 500 ? 'normal' : 'warning'}
                        colorClass="from-emerald-500 to-teal-600"
                    />
                    <MetricCard
                        title="Temperature"
                        value={data.metrics.temperature.toFixed(1)}
                        unit="°C"
                        icon={Thermometer}
                        status="normal"
                        colorClass="from-orange-500 to-amber-600"
                    />
                </div>
            </div>

            {/* Charting Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                <div className="bg-slate-800 border border-slate-700 p-6 rounded-2xl w-full">
                    <h3 className="text-lg font-medium text-slate-200 mb-6">24hr Trend: pH & Turbidity</h3>
                    <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={history} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                                <XAxis dataKey="time" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis yAxisId="left" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis yAxisId="right" orientation="right" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '0.5rem' }}
                                    itemStyle={{ color: '#f1f5f9' }}
                                />
                                <Line yAxisId="left" type="monotone" dataKey="ph" stroke="#0ea5e9" strokeWidth={2} dot={false} activeDot={{ r: 6 }} name="pH" />
                                <Line yAxisId="right" type="monotone" dataKey="turbidity" stroke="#8b5cf6" strokeWidth={2} dot={false} activeDot={{ r: 6 }} name="Turbidity" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-slate-800 border border-slate-700 p-6 rounded-2xl w-full">
                    <h3 className="text-lg font-medium text-slate-200 mb-6">24hr Trend: TDS Level</h3>
                    <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={history} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                                <XAxis dataKey="time" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '0.5rem' }}
                                />
                                <Line type="monotone" dataKey="tds" stroke="#10b981" strokeWidth={2} dot={false} activeDot={{ r: 6 }} name="TDS (ppm)" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}

import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import MetricCard from '../components/MetricCard';
import HealthGauge from '../components/HealthGauge';
import ChatAssistant from '../components/ChatAssistant';
import ServiceLocator from '../components/ServiceLocator';
import { Droplet, Activity, Thermometer, Waves, AlertTriangle, MapPin, Phone, Wrench, X, Lock, ShieldAlert, Cpu } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Dashboard() {
   const { currentUser } = useAuth();
   const [data, setData] = useState(null);
   const [history, setHistory] = useState([]);
   const [showComplaintForm, setShowComplaintForm] = useState(false);
   const [complaintSubmitted, setComplaintSubmitted] = useState(false);
   const [systemState, setSystemState] = useState({ valve: 'OPEN', forensic_report: null });
   const [simulating, setSimulating] = useState(false);

   const handleSimulation = async (scenario) => {
      setSimulating(true);
      setTimeout(() => {
         if (scenario === 'rust') {
            setData({
               score: 28, status: 'Unsafe',
               metrics: { pH: 6.2, turbidity: 78.5, tds: 750, temperature: 23.5, flow_rate: 2.0 }
            });
            setSystemState({
               valve: 'QUARANTINED',
               forensic_report: "FORENSIC ANALYSIS: Sensor signature heavily correlates with sudden-onset pipe oxidization and heavy metal leach (Rust). Massive turbidity spike (78.5 NTU) combined with lowered pH (6.2) strongly suggests municipal supply line failure or localized infrastructure degradation. Quarantine active to prevent household contamination."
            });
         } else if (scenario === 'chemical') {
            setData({
               score: 12, status: 'Unsafe',
               metrics: { pH: 3.8, turbidity: 3.0, tds: 1450, temperature: 26.0, flow_rate: 6.0 }
            });
            setSystemState({
               valve: 'QUARANTINED',
               forensic_report: "FORENSIC ANALYSIS: Extreme acidic pH drop (3.8) alongside massive TDS surge (1450 ppm) precisely matches the signature of an industrial chemical contaminant or bleach leach. Automatic quarantine engaged instantly to prevent toxic exposure."
            });
         } else {
            setData({
               score: 95, status: 'Safe',
               metrics: { pH: 7.2, turbidity: 0.3, tds: 210, temperature: 21.0, flow_rate: 12.0 }
            });
            setSystemState({ valve: 'OPEN', forensic_report: null });
         }
         setSimulating(false);
      }, 500);
   };

   // Mock Data Fetching (Replace with Firebase/Backend)
   useEffect(() => {
      // Simulate initial data load
      const mockData = {
         score: 45, // Set deliberately low to demonstrate the new Service Agent feature
         status: 'Unsafe',
         metrics: {
            pH: 8.8,
            turbidity: 6.5,
            tds: 550,
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
         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-6 gap-4">
            <div>
               <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 mb-2 tracking-tight">Overview Dashboard</h1>
               <p className="text-slate-400 font-medium">Welcome back, monitoring your water systems in real-time.</p>
            </div>

            {/* Hackathon Sandbox Panel */}
            <div className="bg-slate-900/60 border border-slate-700/50 p-2 rounded-xl backdrop-blur-md shadow-lg flex flex-col items-end w-full sm:w-auto">
               <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 mr-1 flex items-center"><Cpu className="w-3 h-3 mr-1" /> Threat Simulation Sandbox</span>
               <div className="flex flex-wrap gap-2 justify-end w-full">
                  <button onClick={() => handleSimulation('rust')} disabled={simulating} className="px-3 py-1.5 bg-amber-500/20 text-amber-500 border border-amber-500/50 rounded-lg hover:bg-amber-500/30 text-xs font-bold transition-all hover:scale-105 active:scale-95 shadow-[0_0_10px_rgba(245,158,11,0.2)] disabled:opacity-50">INJECT: PIPE RUST</button>
                  <button onClick={() => handleSimulation('chemical')} disabled={simulating} className="px-3 py-1.5 bg-purple-500/20 text-purple-400 border border-purple-500/50 rounded-lg hover:bg-purple-500/30 text-xs font-bold transition-all hover:scale-105 active:scale-95 shadow-[0_0_10px_rgba(168,85,247,0.2)] disabled:opacity-50">INJECT: CHEMICAL LEAK</button>
                  <button onClick={() => handleSimulation('reset')} disabled={simulating} className="px-3 py-1.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 rounded-lg hover:bg-emerald-500/30 text-xs font-bold transition-all hover:scale-105 active:scale-95 shadow-[0_0_10px_rgba(16,185,129,0.2)] disabled:opacity-50">SYSTEM RESET</button>
               </div>
            </div>
         </div>

         {/* Quarantine Visualizer Banner */}
         {systemState.valve === 'QUARANTINED' && (
            <div className="bg-red-950/80 border-2 border-red-500 animate-pulse rounded-2xl p-6 shadow-[0_0_50px_rgba(239,68,68,0.4)] relative overflow-hidden flex flex-col md:flex-row items-center justify-between z-20 backdrop-blur-3xl">
               <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagonal-striped-brick.png')] opacity-10 mix-blend-overlay"></div>
               <div className="flex items-center space-x-6 relative z-10 w-full md:w-auto mb-6 md:mb-0">
                  <div className="bg-red-600 p-4 rounded-full shadow-[0_0_20px_rgba(239,68,68,1)]">
                     <Lock className="w-10 h-10 text-white" />
                  </div>
                  <div>
                     <h2 className="text-3xl font-black text-white tracking-widest uppercase mb-1 drop-shadow-md">System Quarantined</h2>
                     <p className="text-red-200 font-medium tracking-wide flex items-center"><ShieldAlert className="w-4 h-4 mr-2" /> Main water valve automatically shut off.</p>
                  </div>
               </div>

               {systemState.forensic_report && (
                  <div className="bg-black/40 border border-red-500/30 p-4 rounded-xl max-w-2xl w-full relative z-10 font-mono text-sm leading-relaxed text-red-300 shadow-inner">
                     <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 to-transparent"></div>
                     <span className="text-white font-bold block mb-2 underline decoration-red-500 underline-offset-4">GEMINI AI FORENSIC REPORT:</span>
                     <span className="animate-in fade-in slide-in-from-left-4 duration-1000">{systemState.forensic_report}</span>
                  </div>
               )}
            </div>
         )}

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

         {/* Service Agents & Action Block - Shows when status is not Safe */}
         {data.status !== 'Safe' && (
            <div className="bg-gradient-to-br from-red-500/10 to-rose-900/10 border border-red-500/30 rounded-[2rem] p-8 mt-8 animate-in slide-in-from-bottom-5 backdrop-blur-xl shadow-[0_8px_32px_rgba(239,68,68,0.15)] relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/10 rounded-full blur-[80px] -mr-20 -mt-20 pointer-events-none mix-blend-screen"></div>
               <div className="flex flex-col md:flex-row items-start space-y-6 md:space-y-0 md:space-x-6 relative z-10">
                  <div className="p-4 bg-red-500/20 rounded-2xl text-red-400 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] border border-red-500/20">
                     <AlertTriangle className="h-10 w-10 drop-shadow-md animate-pulse" />
                  </div>
                  <div className="flex-1 w-full">
                     <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-rose-300 mb-2">Water Abnormality Detected</h2>
                     <p className="text-red-200/70 mb-8 font-medium">Your water health score is critically low. We recommend immediate servicing of your tank and filtration systems.</p>

                     <ServiceLocator
                        issueType={systemState.forensic_report?.includes('Rust') ? 'rust_leak' : systemState.forensic_report?.includes('Chemical') ? 'chemical_toxins' : 'general_maintenance'}
                        onClose={() => { }}
                     />

                     <div className="flex justify-start border-t border-red-500/20 pt-6 mt-6">
                        <button
                           onClick={() => setShowComplaintForm(true)}
                           className="flex flex-1 sm:flex-none justify-center items-center px-8 py-3.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:shadow-[0_0_25px_rgba(220,38,38,0.6)] transform hover:-translate-y-0.5 border border-red-400/30 uppercase tracking-wide text-sm"
                        >
                           <Wrench className="w-5 h-5 mr-3" /> Report Issue to Grid
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         )}

         {/* Complaint Form Modal */}
         {showComplaintForm && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
               <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 w-full max-w-lg shadow-2xl relative">
                  <button
                     onClick={() => { setShowComplaintForm(false); setComplaintSubmitted(false); }}
                     className="absolute top-4 right-4 text-slate-400 hover:text-white"
                  >
                     <X className="w-6 h-6" />
                  </button>

                  <h2 className="text-2xl font-bold text-white mb-2">Raise a Complaint</h2>
                  <p className="text-slate-400 mb-6">Submit a ticket to the service grid to dispatch an agent to your location.</p>

                  {complaintSubmitted ? (
                     <div className="text-center py-8">
                        <div className="mx-auto w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mb-4">
                           <Wrench className="w-8 h-8 text-emerald-400" />
                        </div>
                        <h3 className="text-xl font-medium text-white">Complaint Submitted Successfully!</h3>
                        <p className="text-slate-400 mt-2">A service agent will contact you shortly and dispatch to your given pincode.</p>
                        <button
                           onClick={() => { setShowComplaintForm(false); setComplaintSubmitted(false); }}
                           className="mt-6 px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg"
                        >
                           Close Window
                        </button>
                     </div>
                  ) : (
                     <form onSubmit={(e) => { e.preventDefault(); setComplaintSubmitted(true); }} className="space-y-4">
                        <div>
                           <label className="block text-sm font-medium text-slate-300 mb-1">Issue Description</label>
                           <textarea
                              required
                              rows="3"
                              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-red-500"
                              placeholder="Describe the problem (e.g., cloudy water, low pressure...)"
                           ></textarea>
                        </div>
                        <div>
                           <label className="block text-sm font-medium text-slate-300 mb-1">Device ID or Location</label>
                           <input
                              type="text"
                              defaultValue="Tank Alpha (esp32_home_tank_01)"
                              disabled
                              className="w-full px-3 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-400"
                           />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                           <div>
                              <label className="block text-sm font-medium text-slate-300 mb-1">Contact Phone</label>
                              <input
                                 type="tel"
                                 required
                                 className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-red-500"
                                 placeholder="+91 "
                              />
                           </div>
                           <div>
                              <label className="block text-sm font-medium text-slate-300 mb-1">Pincode</label>
                              <input
                                 type="text"
                                 required
                                 className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-red-500"
                                 placeholder="e.g. 440001"
                              />
                           </div>
                        </div>
                        <button
                           type="submit"
                           className="w-full mt-4 py-3 bg-red-600 hover:bg-red-500 text-white rounded-lg font-medium transition-colors"
                        >
                           Submit Complaint
                        </button>
                     </form>
                  )}
               </div>
            </div>
         )}

         {/* Charting Section */}
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
            <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 p-6 rounded-[2rem] w-full shadow-lg relative overflow-hidden group hover:border-slate-600/50 transition-colors duration-500">
               <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/5 rounded-full blur-[60px] pointer-events-none transition-opacity duration-500 group-hover:opacity-100 opacity-50"></div>
               <h3 className="text-lg font-bold text-slate-200 mb-8 border-b border-white/5 pb-4 tracking-wide flex items-center">
                  <span className="w-1.5 h-6 bg-sky-400 rounded-sm mr-3"></span>24hr Trend: pH & Turbidity
               </h3>
               <div className="h-72 w-full relative z-10">
                  <ResponsiveContainer width="100%" height="100%">
                     <LineChart data={history} margin={{ top: 5, right: 20, bottom: 5, left: -20 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} vertical={false} />
                        <XAxis dataKey="time" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} dy={10} />
                        <YAxis yAxisId="left" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} dx={-10} />
                        <YAxis yAxisId="right" orientation="right" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} dx={10} />
                        <Tooltip
                           contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', backdropFilter: 'blur(8px)', border: '1px solid rgba(51, 65, 85, 0.5)', borderRadius: '1rem', color: '#f8fafc', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)' }}
                           itemStyle={{ color: '#f1f5f9', fontWeight: 500 }}
                        />
                        <Line yAxisId="left" type="monotone" dataKey="ph" stroke="#0ea5e9" strokeWidth={3} dot={false} activeDot={{ r: 6, strokeWidth: 0, fill: '#0ea5e9', className: 'drop-shadow-lg' }} name="pH" />
                        <Line yAxisId="right" type="monotone" dataKey="turbidity" stroke="#8b5cf6" strokeWidth={3} dot={false} activeDot={{ r: 6, strokeWidth: 0, fill: '#8b5cf6', className: 'drop-shadow-lg' }} name="Turbidity" />
                     </LineChart>
                  </ResponsiveContainer>
               </div>
            </div>

            <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 p-6 rounded-[2rem] w-full shadow-lg relative overflow-hidden group hover:border-slate-600/50 transition-colors duration-500">
               <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-[60px] pointer-events-none transition-opacity duration-500 group-hover:opacity-100 opacity-50"></div>
               <h3 className="text-lg font-bold text-slate-200 mb-8 border-b border-white/5 pb-4 tracking-wide flex items-center">
                  <span className="w-1.5 h-6 bg-emerald-400 rounded-sm mr-3"></span>24hr Trend: TDS Level
               </h3>
               <div className="h-72 w-full relative z-10">
                  <ResponsiveContainer width="100%" height="100%">
                     <LineChart data={history} margin={{ top: 5, right: 20, bottom: 5, left: -20 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} vertical={false} />
                        <XAxis dataKey="time" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} dy={10} />
                        <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} dx={-10} />
                        <Tooltip
                           contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', backdropFilter: 'blur(8px)', border: '1px solid rgba(51, 65, 85, 0.5)', borderRadius: '1rem', color: '#f8fafc', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)' }}
                           itemStyle={{ color: '#10b981', fontWeight: 500 }}
                        />
                        <Line type="monotone" dataKey="tds" stroke="#10b981" strokeWidth={3} dot={false} activeDot={{ r: 6, strokeWidth: 0, fill: '#10b981', className: 'drop-shadow-lg' }} name="TDS (ppm)" />
                     </LineChart>
                  </ResponsiveContainer>
               </div>
            </div>
         </div>

         {/* AI Assistant Chat Widget */}
         <ChatAssistant contextData={data} />

      </div>
   );
}

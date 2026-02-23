import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import MetricCard from '../components/MetricCard';
import HealthGauge from '../components/HealthGauge';
import ChatAssistant from '../components/ChatAssistant';
import { Droplet, Activity, Thermometer, Waves, AlertTriangle, MapPin, Phone, Wrench, X } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Dashboard() {
   const { currentUser } = useAuth();
   const [data, setData] = useState(null);
   const [history, setHistory] = useState([]);
   const [showComplaintForm, setShowComplaintForm] = useState(false);
   const [complaintSubmitted, setComplaintSubmitted] = useState(false);

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

         {/* Service Agents & Action Block - Shows when status is not Safe */}
         {data.status !== 'Safe' && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 mt-6 animate-in slide-in-from-bottom-2">
               <div className="flex items-start space-x-4">
                  <div className="p-3 bg-red-500/20 rounded-xl text-red-500">
                     <AlertTriangle className="h-8 w-8" />
                  </div>
                  <div className="flex-1">
                     <h2 className="text-xl font-bold text-red-400 mb-2">Water Abnormality Detected</h2>
                     <p className="text-red-200/80 mb-6">Your water health score is critically low. We recommend immediate servicing of your tank and filtration systems.</p>

                     <h3 className="text-lg font-semibold text-slate-200 mb-4 border-b border-red-500/20 pb-2">Nearby Service Agents</h3>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="bg-slate-800/80 border border-slate-700 p-4 rounded-xl flex flex-col sm:flex-row justify-between sm:items-center hover:bg-slate-800 transition-colors gap-4">
                           <div>
                              <p className="font-medium text-slate-200 text-lg">AquaPure Solutions</p>
                              <div className="flex items-center text-sm text-slate-400 mt-1">
                                 <MapPin className="w-4 h-4 mr-1" /> 12 Sector - 4, Nagpur (440001)
                              </div>
                           </div>
                           <button className="flex items-center justify-center px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors whitespace-nowrap">
                              <Phone className="w-4 h-4 mr-2" /> Contact
                           </button>
                        </div>
                        <div className="bg-slate-800/80 border border-slate-700 p-4 rounded-xl flex flex-col sm:flex-row justify-between sm:items-center hover:bg-slate-800 transition-colors gap-4">
                           <div>
                              <p className="font-medium text-slate-200 text-lg">ClearWater Mechanics</p>
                              <div className="flex items-center text-sm text-slate-400 mt-1">
                                 <MapPin className="w-4 h-4 mr-1" /> 84 Layout, Nagpur (440022)
                              </div>
                           </div>
                           <button className="flex items-center justify-center px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors whitespace-nowrap">
                              <Phone className="w-4 h-4 mr-2" /> Contact
                           </button>
                        </div>
                     </div>

                     <div className="flex justify-start border-t border-red-500/20 pt-6">
                        <button
                           onClick={() => setShowComplaintForm(true)}
                           className="flex flex-1 sm:flex-none justify-center items-center px-6 py-3 bg-red-600 hover:bg-red-500 text-white font-medium rounded-xl transition-all shadow-lg shadow-red-500/20"
                        >
                           <Wrench className="w-5 h-5 mr-2" /> Report Issue / Request Maintenance
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

         {/* AI Assistant Chat Widget */}
         <ChatAssistant contextData={data} />

      </div>
   );
}

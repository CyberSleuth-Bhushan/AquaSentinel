import React, { useState, useEffect } from 'react';
import { MapPin, Wrench, Phone, Navigation, Clock, Star, AlertTriangle } from 'lucide-react';
import axios from 'axios';

export default function ServiceLocator({ issueType, onClose }) {
    const [providers, setProviders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [location, setLocation] = useState(null);

    useEffect(() => {
        // 1. Get User Location
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const lat = position.coords.latitude;
                    const lng = position.coords.longitude;
                    setLocation({ lat, lng });

                    // 2. Fetch nearby services from our new API
                    try {
                        const token = localStorage.getItem('api_key') || 'hackathon_demo_key';
                        const res = await axios.post(
                            'http://localhost:8000/services/nearby',
                            { lat, lng, issue_type: issueType },
                            { headers: { 'X-API-Key': token } }
                        );
                        setProviders(res.data);
                        setLoading(false);
                    } catch (err) {
                        setError("Failed to fetch nearby professionals.");
                        setLoading(false);
                    }
                },
                (err) => {
                    setError("Location access denied. Cannot find nearby services.");
                    setLoading(false);
                }
            );
        } else {
            setError("Geolocation is not supported by your browser.");
            setLoading(false);
        }
    }, [issueType]);

    return (
        <div className="bg-slate-900 border border-sky-500/30 rounded-2xl p-6 shadow-2xl relative animate-in slide-in-from-bottom-4">
            <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors">
                <span className="sr-only">Close</span>
                &times;
            </button>
            <div className="flex items-center space-x-3 mb-6 border-b border-slate-700/50 pb-4">
                <div className="p-3 bg-sky-500/20 rounded-xl">
                    <MapPin className="w-6 h-6 text-sky-400" />
                </div>
                <div>
                    <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-blue-500">
                        Local Emergency Services
                    </h3>
                    <p className="text-sm text-slate-400">Finding professionals for: <span className="text-sky-400 font-medium">{issueType?.replace('_', ' ')}</span></p>
                </div>
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-12">
                    <div className="w-12 h-12 border-4 border-sky-500/30 border-t-sky-500 rounded-full animate-spin mb-4"></div>
                    <p className="text-slate-400 animate-pulse">Scanning area via GPS...</p>
                </div>
            ) : error ? (
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-start space-x-3">
                    <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                    <p className="text-sm text-red-200">{error}</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {providers.map((person) => (
                        <div key={person.id} className="bg-slate-800/50 border border-slate-700 hover:border-sky-500/50 transition-colors rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group">
                            <div className="flex items-start space-x-4">
                                <div className="p-3 bg-slate-700 rounded-full group-hover:bg-sky-500/20 transition-colors">
                                    <Wrench className="w-6 h-6 text-slate-300 group-hover:text-sky-400" />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold text-lg">{person.name}</h4>
                                    <p className="text-sky-400 text-sm font-medium mb-1">{person.profession}</p>
                                    <div className="flex items-center space-x-3 text-xs text-slate-400">
                                        <span className="flex items-center"><Star className="w-3.5 h-3.5 text-yellow-500 mr-1 fill-yellow-500" /> {person.rating}</span>
                                        <span className="flex items-center"><Navigation className="w-3.5 h-3.5 mr-1" /> {person.distance_km}</span>
                                        <span className="flex items-center"><Clock className="w-3.5 h-3.5 mr-1" /> {person.estimated_arrival_mins} mins away</span>
                                    </div>
                                </div>
                            </div>
                            <button onClick={() => window.open(`tel:${person.phone}`)} className="w-full sm:w-auto flex items-center justify-center px-4 py-2.5 bg-emerald-500/10 hover:bg-emerald-500 border border-emerald-500/20 hover:border-emerald-500 text-emerald-400 hover:text-white rounded-lg font-medium transition-all duration-300">
                                <Phone className="w-4 h-4 mr-2" />
                                Call Now
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

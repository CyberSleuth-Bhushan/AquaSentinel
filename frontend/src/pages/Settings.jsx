import React, { useState, useEffect } from 'react';
import { Settings as SettingsIcon, Bell, Shield, Smartphone, Plus, Trash2, Edit2, X, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { ref, onValue, set, remove, push } from 'firebase/database';

export default function Settings() {
    const [activeTab, setActiveTab] = useState('notifications');
    const { currentUser } = useAuth();

    // Device Management State
    const [devices, setDevices] = useState([]);
    const [showAddDevice, setShowAddDevice] = useState(false);
    const [newDeviceName, setNewDeviceName] = useState('');
    const [newDeviceId, setNewDeviceId] = useState('');
    const [editingDeviceId, setEditingDeviceId] = useState(null);
    const [editDeviceName, setEditDeviceName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    useEffect(() => {
        if (currentUser) {
            const phoneRef = ref(db, `users/${currentUser.uid}/phoneNumber`);
            const unsubPhone = onValue(phoneRef, (snapshot) => {
                setPhoneNumber(snapshot.val() || '');
            });

            const devicesRef = ref(db, `users/${currentUser.uid}/devices`);
            const unsubscribe = onValue(devicesRef, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    const devList = Object.keys(data).map(key => ({
                        dbKey: key, // The push ID in firebase
                        ...data[key]
                    }));
                    setDevices(devList);
                } else {
                    setDevices([]);
                }
            });
            return () => {
                unsubscribe();
                unsubPhone();
            };
        }
    }, [currentUser]);

    const handleAddDevice = async (e) => {
        e.preventDefault();
        if (!newDeviceName || !newDeviceId) return;

        try {
            const devicesRef = ref(db, `users/${currentUser.uid}/devices`);
            const newDeviceRef = push(devicesRef);
            await set(newDeviceRef, {
                id: newDeviceId,
                name: newDeviceName,
                status: 'Online',
                addedAt: new Date().toISOString()
            });
            // Also initialize system state in public devices list
            await set(ref(db, `devices/${newDeviceId}/system_state`), {
                valve: 'OPEN',
                forensic_report: null
            });
            await set(ref(db, `devices/${newDeviceId}/owner_uid`), currentUser.uid);

            setShowAddDevice(false);
            setNewDeviceName('');
            setNewDeviceId('');
        } catch (err) {
            console.error(err);
        }
    };

    const handleDeleteDevice = async (dbKey) => {
        if (window.confirm('Are you sure you want to delete this device?')) {
            await remove(ref(db, `users/${currentUser.uid}/devices/${dbKey}`));
        }
    };

    const startEditing = (dev) => {
        setEditingDeviceId(dev.dbKey);
        setEditDeviceName(dev.name);
    };

    const saveEditDevice = async (dbKey) => {
        if (!editDeviceName) return;
        await set(ref(db, `users/${currentUser.uid}/devices/${dbKey}/name`), editDeviceName);
        setEditingDeviceId(null);
        setEditDeviceName('');
    };

    const handleSavePhoneNumber = async () => {
        if (currentUser) {
            try {
                await set(ref(db, `users/${currentUser.uid}/phoneNumber`), phoneNumber);
                alert("Phone number saved successfully!");
            } catch (err) {
                console.error("Failed to save phone number", err);
                alert("Failed to save phone number.");
            }
        }
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case 'security':
                return (
                    <div className="space-y-6 animate-in fade-in">
                        <h2 className="text-xl font-semibold text-white mb-6">Security Settings</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1">Current Password</label>
                                <input type="password" placeholder="••••••••" className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700/50 rounded-xl text-white focus:outline-none focus:border-sky-500 transition-colors" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1">New Password</label>
                                <input type="password" placeholder="••••••••" className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700/50 rounded-xl text-white focus:outline-none focus:border-sky-500 transition-colors" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1">Confirm New Password</label>
                                <input type="password" placeholder="••••••••" className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700/50 rounded-xl text-white focus:outline-none focus:border-sky-500 transition-colors" />
                            </div>
                        </div>
                        <div className="mt-8 pt-6 border-t border-slate-700/50">
                            <button className="px-6 py-2.5 bg-sky-600 hover:bg-sky-500 text-white rounded-xl font-medium transition-colors shadow-lg shadow-sky-500/20">
                                Update Password
                            </button>
                        </div>
                    </div>
                );
            case 'device':
                return (
                    <div className="space-y-6 animate-in fade-in">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-semibold text-white">Device Management</h2>
                            <button
                                onClick={() => setShowAddDevice(!showAddDevice)}
                                className={`flex items-center px-4 py-2 ${showAddDevice ? 'bg-red-500/10 text-red-400 border-red-500/20' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'} rounded-lg text-sm font-medium transition-colors border`}
                            >
                                {showAddDevice ? <><X className="w-4 h-4 mr-2" /> Cancel</> : <><Plus className="w-4 h-4 mr-2" /> Add Device</>}
                            </button>
                        </div>

                        {showAddDevice && (
                            <form onSubmit={handleAddDevice} className="bg-slate-900/80 border border-slate-700 p-5 rounded-xl mb-6 space-y-4 animate-in slide-in-from-top-4">
                                <h3 className="text-white font-medium mb-2 border-b border-slate-700/50 pb-2">Register New Monitor</h3>
                                <div>
                                    <label className="block text-xs font-medium text-slate-400 mb-1">Friendly Name</label>
                                    <input required value={newDeviceName} onChange={(e) => setNewDeviceName(e.target.value)} type="text" placeholder="e.g. Kitchen Tap, Main Tank" className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-sky-500 transition-colors text-sm" />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-slate-400 mb-1">Hardware ID (ESP32 Mac/Serial)</label>
                                    <input required value={newDeviceId} onChange={(e) => setNewDeviceId(e.target.value)} type="text" placeholder="e.g. esp32_home_tank_01" className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-sky-500 transition-colors text-sm" />
                                </div>
                                <button type="submit" className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-sm font-medium transition-colors shadow-lg shadow-emerald-500/20">
                                    Register Device
                                </button>
                            </form>
                        )}

                        <div className="space-y-4">
                            {devices.length === 0 ? (
                                <div className="text-center py-10 bg-slate-900/30 rounded-xl border border-slate-800">
                                    <Smartphone className="w-10 h-10 text-slate-600 mx-auto mb-3" />
                                    <p className="text-slate-400 font-medium">No devices registered yet.</p>
                                    <p className="text-sm text-slate-500 mt-1">Click 'Add Device' to link your ESP32 hardware.</p>
                                </div>
                            ) : (
                                devices.map(dev => (
                                    <div key={dev.dbKey} className="flex items-center justify-between p-4 bg-slate-900/50 border border-slate-700/50 rounded-xl hover:bg-slate-800/50 transition-colors group">
                                        <div className="flex items-center space-x-4">
                                            <div className="p-2 bg-sky-500/20 text-sky-400 rounded-lg shadow-inner">
                                                <Smartphone className="w-5 h-5" />
                                            </div>
                                            <div>
                                                {editingDeviceId === dev.dbKey ? (
                                                    <input
                                                        autoFocus
                                                        value={editDeviceName}
                                                        onChange={(e) => setEditDeviceName(e.target.value)}
                                                        className="bg-slate-950 border border-sky-500 text-white px-2 py-0.5 rounded text-sm outline-none"
                                                    />
                                                ) : (
                                                    <h3 className="text-white font-medium">{dev.name}</h3>
                                                )}
                                                <p className="text-sm text-slate-400">ID: {dev.id}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2 sm:space-x-4">
                                            <span className={`hidden sm:inline-block px-2.5 py-1 ${dev.status === 'Online' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-slate-800/80 text-slate-400 border-slate-700/50'} rounded text-xs font-medium border`}>
                                                {dev.status || 'Offline'}
                                            </span>

                                            {editingDeviceId === dev.dbKey ? (
                                                <button onClick={() => saveEditDevice(dev.dbKey)} className="text-emerald-400 hover:text-emerald-300 transition-colors p-2 bg-emerald-500/10 rounded-lg">
                                                    <Check className="w-4 h-4" />
                                                </button>
                                            ) : (
                                                <button onClick={() => startEditing(dev)} className="text-slate-500 hover:text-sky-400 transition-colors p-2 hidden group-hover:block border border-slate-600/50 bg-slate-800/50 rounded-lg">
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                            )}

                                            <button onClick={() => handleDeleteDevice(dev.dbKey)} className="text-slate-500 hover:text-red-400 transition-colors p-2 border border-slate-600/50 bg-slate-800/50 rounded-lg">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                );
            case 'general':
                return (
                    <div className="space-y-6 animate-in fade-in">
                        <h2 className="text-xl font-semibold text-white mb-6">General Preferences</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1">Timezone</label>
                                <select className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700/50 rounded-xl text-white focus:outline-none focus:border-sky-500 appearance-none transition-colors">
                                    <option>Asia/Kolkata (IST)</option>
                                    <option>America/New_York (EST)</option>
                                    <option>Europe/London (GMT)</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1">Date Format</label>
                                <select className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700/50 rounded-xl text-white focus:outline-none focus:border-sky-500 appearance-none transition-colors">
                                    <option>DD/MM/YYYY</option>
                                    <option>MM/DD/YYYY</option>
                                    <option>YYYY-MM-DD</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1">Language</label>
                                <select className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700/50 rounded-xl text-white focus:outline-none focus:border-sky-500 appearance-none transition-colors">
                                    <option>English</option>
                                    <option>Hindi</option>
                                </select>
                            </div>
                        </div>
                        <div className="mt-8 pt-6 border-t border-slate-700/50">
                            <button className="px-6 py-2.5 bg-sky-600 hover:bg-sky-500 text-white rounded-xl font-medium transition-colors shadow-lg shadow-sky-500/20">
                                Save Preferences
                            </button>
                        </div>
                    </div>
                );
            case 'notifications':
            default:
                return (
                    <div className="space-y-6 animate-in fade-in">
                        <h2 className="text-xl font-semibold text-white mb-6">Notification Preferences</h2>

                        <div className="space-y-4 mb-8">
                            <div className="bg-slate-900/50 p-5 rounded-xl border border-slate-700/50">
                                <label className="block text-sm font-medium text-slate-300 mb-3">Mobile Number for SMS Alerts</label>
                                <div className="flex gap-4">
                                    <input
                                        type="tel"
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                        placeholder="+1234567890"
                                        className="flex-1 px-4 py-2 bg-slate-900/80 border border-slate-700/50 rounded-xl text-white focus:outline-none focus:border-sky-500 transition-colors"
                                    />
                                    <button
                                        onClick={handleSavePhoneNumber}
                                        className="px-6 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-xl font-medium transition-colors shadow-lg shadow-sky-500/20"
                                    >
                                        Save
                                    </button>
                                </div>
                                <p className="text-sm text-slate-400 mt-2">Include country code (e.g. +1). This number will receive urgent water quality and anomaly alerts uniquely for your devices.</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between pb-4 border-b border-slate-700/50 flex-wrap gap-4 group hover:bg-slate-800/20 p-2 rounded-xl transition-colors">
                                <div>
                                    <h3 className="text-slate-200 font-medium">Critical Alerts (SMS)</h3>
                                    <p className="text-sm text-slate-400">Receive an SMS when health score drops below 50</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" className="sr-only peer" defaultChecked />
                                    <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sky-500 shadow-inner"></div>
                                </label>
                            </div>

                            <div className="flex items-center justify-between pb-4 border-b border-slate-700/50 flex-wrap gap-4 group hover:bg-slate-800/20 p-2 rounded-xl transition-colors">
                                <div>
                                    <h3 className="text-slate-200 font-medium">Push Notifications</h3>
                                    <p className="text-sm text-slate-400">Receive standard web push notifications for warnings</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" className="sr-only peer" defaultChecked />
                                    <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sky-500 shadow-inner"></div>
                                </label>
                            </div>

                            <div className="flex items-center justify-between pb-4 border-b border-slate-700/50 flex-wrap gap-4 group hover:bg-slate-800/20 p-2 rounded-xl transition-colors">
                                <div>
                                    <h3 className="text-slate-200 font-medium">Weekly Reports</h3>
                                    <p className="text-sm text-slate-400">Receive automated summary emails every Monday</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" className="sr-only peer" />
                                    <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sky-500 shadow-inner"></div>
                                </label>
                            </div>
                        </div>

                        <div className="mt-8 pt-6">
                            <button className="px-6 py-2.5 bg-sky-600 hover:bg-sky-500 text-white rounded-xl font-medium transition-colors shadow-lg shadow-sky-500/20">
                                Save Changes
                            </button>
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in flex-1 max-w-5xl">
            <div className="mb-8">
                <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 mb-2 tracking-tight">Preferences</h1>
                <p className="text-slate-400 font-medium">Manage your system thresholds and notification settings.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Navigation Menu */}
                <div className="col-span-1 space-y-2">
                    <button
                        onClick={() => setActiveTab('notifications')}
                        className={`w-full flex items-center p-3 rounded-xl transition-all duration-300 ${activeTab === 'notifications' ? 'bg-gradient-to-r from-sky-500/20 to-blue-600/10 text-sky-400 font-medium shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] border border-sky-500/20' : 'text-slate-400 hover:bg-slate-800/80 hover:text-slate-200 border border-transparent'}`}
                    >
                        <Bell className="w-5 h-5 mr-3" /> Notifications
                    </button>
                    <button
                        onClick={() => setActiveTab('security')}
                        className={`w-full flex items-center p-3 rounded-xl transition-all duration-300 ${activeTab === 'security' ? 'bg-gradient-to-r from-sky-500/20 to-blue-600/10 text-sky-400 font-medium shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] border border-sky-500/20' : 'text-slate-400 hover:bg-slate-800/80 hover:text-slate-200 border border-transparent'}`}
                    >
                        <Shield className="w-5 h-5 mr-3" /> Security
                    </button>
                    <button
                        onClick={() => setActiveTab('device')}
                        className={`w-full flex items-center p-3 rounded-xl transition-all duration-300 ${activeTab === 'device' ? 'bg-gradient-to-r from-sky-500/20 to-blue-600/10 text-sky-400 font-medium shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] border border-sky-500/20' : 'text-slate-400 hover:bg-slate-800/80 hover:text-slate-200 border border-transparent'}`}
                    >
                        <Smartphone className="w-5 h-5 mr-3" /> Device Management
                    </button>
                    <button
                        onClick={() => setActiveTab('general')}
                        className={`w-full flex items-center p-3 rounded-xl transition-all duration-300 ${activeTab === 'general' ? 'bg-gradient-to-r from-sky-500/20 to-blue-600/10 text-sky-400 font-medium shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] border border-sky-500/20' : 'text-slate-400 hover:bg-slate-800/80 hover:text-slate-200 border border-transparent'}`}
                    >
                        <SettingsIcon className="w-5 h-5 mr-3" /> General
                    </button>
                </div>

                {/* Settings Content */}
                <div className="col-span-1 md:col-span-3 bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 p-8 rounded-[2rem] shadow-lg relative overflow-hidden h-fit">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/5 rounded-full blur-[60px] pointer-events-none"></div>
                    <div className="relative z-10 w-full animate-in fade-in zoom-in-95 duration-300">
                        {renderTabContent()}
                    </div>
                </div>
            </div>
        </div>
    );
}

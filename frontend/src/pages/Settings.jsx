import React, { useState } from 'react';
import { Settings as SettingsIcon, Bell, Shield, Smartphone, Plus, Trash2 } from 'lucide-react';

export default function Settings() {
    const [activeTab, setActiveTab] = useState('notifications');

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
                            <button className="flex items-center px-4 py-2 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 rounded-lg text-sm font-medium transition-colors border border-emerald-500/20">
                                <Plus className="w-4 h-4 mr-2" /> Add Device
                            </button>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-slate-900/50 border border-slate-700/50 rounded-xl hover:bg-slate-800/50 transition-colors">
                                <div className="flex items-center space-x-4">
                                    <div className="p-2 bg-sky-500/20 text-sky-400 rounded-lg shadow-inner">
                                        <Smartphone className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-medium">Main Tank Monitor</h3>
                                        <p className="text-sm text-slate-400">ID: esp32_home_tank_01</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 rounded text-xs font-medium border border-emerald-500/20">Online</span>
                                    <button className="text-slate-500 hover:text-red-400 transition-colors p-2">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-slate-900/50 border border-slate-700/50 rounded-xl hover:bg-slate-800/50 transition-colors">
                                <div className="flex items-center space-x-4">
                                    <div className="p-2 bg-slate-800/80 text-slate-400 rounded-lg shadow-inner">
                                        <Smartphone className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-medium">Kitchen Tap Sensor</h3>
                                        <p className="text-sm text-slate-400">ID: esp32_kitchen_tap_02</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <span className="px-2.5 py-1 bg-slate-800/80 text-slate-400 rounded text-xs font-medium border border-slate-700/50">Offline</span>
                                    <button className="text-slate-500 hover:text-red-400 transition-colors p-2">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
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

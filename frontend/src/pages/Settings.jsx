import React from 'react';
import { Settings as SettingsIcon, Bell, Shield, Smartphone } from 'lucide-react';

export default function Settings() {
    return (
        <div className="space-y-6 animate-in fade-in flex-1 max-w-4xl">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-1">Preferences</h1>
                <p className="text-slate-400">Manage your system thresholds and notification settings.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Navigation Menu */}
                <div className="col-span-1 space-y-2">
                    <button className="w-full flex items-center p-3 rounded-lg bg-sky-500/10 text-sky-400 font-medium">
                        <Bell className="w-5 h-5 mr-3" /> Notifications
                    </button>
                    <button className="w-full flex items-center p-3 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-slate-200">
                        <Shield className="w-5 h-5 mr-3" /> Security
                    </button>
                    <button className="w-full flex items-center p-3 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-slate-200">
                        <Smartphone className="w-5 h-5 mr-3" /> Device Management
                    </button>
                    <button className="w-full flex items-center p-3 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-slate-200">
                        <SettingsIcon className="w-5 h-5 mr-3" /> General
                    </button>
                </div>

                {/* Settings Content */}
                <div className="col-span-1 md:col-span-2 space-y-6 bg-slate-800 border border-slate-700 p-6 rounded-2xl">
                    <h2 className="text-xl font-semibold text-white mb-6">Notification Preferences</h2>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between pb-4 border-b border-slate-700 flex-wrap gap-4">
                            <div>
                                <h3 className="text-slate-200 font-medium">Critical Alerts (SMS)</h3>
                                <p className="text-sm text-slate-400">Receive an SMS when health score drops below 50</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" defaultChecked />
                                <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sky-500"></div>
                            </label>
                        </div>

                        <div className="flex items-center justify-between pb-4 border-b border-slate-700 flex-wrap gap-4">
                            <div>
                                <h3 className="text-slate-200 font-medium">Push Notifications</h3>
                                <p className="text-sm text-slate-400">Receive standard web push notifications for warnings</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" defaultChecked />
                                <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sky-500"></div>
                            </label>
                        </div>

                        <div className="flex items-center justify-between pb-4 border-b border-slate-700 flex-wrap gap-4">
                            <div>
                                <h3 className="text-slate-200 font-medium">Weekly Reports</h3>
                                <p className="text-sm text-slate-400">Receive automated summary emails every Monday</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" />
                                <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sky-500"></div>
                            </label>
                        </div>
                    </div>

                    <div className="mt-8 pt-6">
                        <button className="px-6 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-lg font-medium transition-colors">
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

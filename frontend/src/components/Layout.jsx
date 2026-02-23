import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Droplet, Bell, FileText, Settings, LogOut, Activity } from 'lucide-react';

export default function Layout() {
    const { currentUser, logout, userData } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (e) {
            console.error(e);
        }
    };

    const navItems = [
        { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
        { name: 'Tank Insights', path: '/tank', icon: Droplet },
        { name: 'Tap Insights', path: '/tap', icon: Activity },
        { name: 'Alerts', path: '/alerts', icon: Bell },
        { name: 'Reports', path: '/reports', icon: FileText },
        { name: 'Settings', path: '/settings', icon: Settings },
    ];

    return (
        <div className="flex h-screen bg-slate-950 text-slate-100 font-sans overflow-hidden selection:bg-sky-500/30">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-900/80 backdrop-blur-2xl border-r border-slate-800 flex flex-col transition-all duration-300 relative z-20 shadow-2xl">
                <div className="p-6 flex items-center space-x-3">
                    <div className="p-0.5 bg-gradient-to-br from-sky-400 to-blue-600 rounded-xl shadow-lg shadow-sky-500/20 w-10 h-10 shrink-0 overflow-hidden">
                        <img src="/logo.jpeg" alt="BlueVector Logo" className="w-full h-full object-cover rounded-[10px]" />
                    </div>
                    <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 tracking-tight">
                        BlueVector
                    </h1>
                </div>

                <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto custom-scrollbar">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname.startsWith(item.path);
                        return (
                            <Link
                                key={item.name}
                                to={item.path}
                                className={`group flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 relative overflow-hidden ${isActive
                                    ? 'bg-gradient-to-r from-sky-500/20 to-blue-600/10 text-white font-medium shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] border border-sky-500/20'
                                    : 'text-slate-400 hover:bg-slate-800/80 hover:text-slate-200 border border-transparent'
                                    }`}
                            >
                                {isActive && (
                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-sky-400 rounded-r-md shadow-[0_0_10px_rgba(56,189,248,0.5)]"></div>
                                )}
                                <Icon className={`h-5 w-5 transition-transform group-hover:scale-110 duration-300 ${isActive ? 'text-sky-400' : 'text-slate-400 group-hover:text-slate-300'}`} />
                                <span className="tracking-wide text-sm">{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-slate-800">
                    <div className="flex items-center space-x-3 mb-4 px-2 p-2 rounded-xl border border-slate-700/30 bg-slate-800/50 backdrop-blur-sm">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center text-sm font-bold text-sky-400 shadow-inner border border-slate-600">
                            {currentUser?.email?.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-slate-200 truncate">{currentUser?.email}</p>
                            <p className="text-xs text-sky-400/80 font-medium capitalize">{userData?.role || 'User'}</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl text-slate-400 hover:bg-red-500/10 hover:text-red-400 border border-transparent hover:border-red-500/20 transition-all duration-300 group"
                    >
                        <LogOut className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                        <span className="text-sm font-medium">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content Area with subtle Grid Background */}
            <main className="flex-1 overflow-y-auto relative bg-slate-950">
                <div className="absolute inset-0 bg-[url('https://res.cloudinary.com/dz209s6jk/image/upload/v1614264620/Backgrounds/Grid_v1.png')] opacity-[0.03] pointer-events-none mix-blend-overlay"></div>
                <div className="max-w-7xl mx-auto p-4 sm:p-8 relative z-10">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}

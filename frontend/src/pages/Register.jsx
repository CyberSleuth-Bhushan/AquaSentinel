import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { Droplet } from 'lucide-react';

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { signup } = useAuth();
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        if (password !== confirmPassword) {
            return setError('Passwords do not match');
        }

        try {
            setError('');
            setLoading(true);
            await signup(email, password, 'household');
            navigate('/dashboard');
        } catch (err) {
            setError('Failed to create an account.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 bg-[url('https://images.unsplash.com/photo-1548292857-e92c6cc7ff11?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center bg-blend-overlay relative overflow-hidden">
            {/* Animated Background Orbs */}
            <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-sky-500/30 rounded-full mix-blend-screen filter blur-[100px] animate-pulse"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full mix-blend-screen filter blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>

            <div className="max-w-md w-full space-y-8 bg-slate-900/40 p-10 rounded-[2rem] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] backdrop-blur-xl border border-white/10 relative z-10 transition-transform hover:scale-[1.01] duration-500">
                <div>
                    <div className="flex justify-center flex-col items-center">
                        <div className="bg-gradient-to-br from-sky-400 to-blue-600 p-4 rounded-2xl mb-6 shadow-lg shadow-sky-500/30 transform transition-transform hover:rotate-12 duration-300">
                            <Droplet className="h-10 w-10 text-white" />
                        </div>
                        <h2 className="text-center text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">Join BlueVector</h2>
                        <p className="mt-3 text-center text-sm text-sky-200/70 font-medium tracking-wide">
                            Secure your water quality today
                        </p>
                    </div>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl text-sm backdrop-blur-md flex items-center shadow-lg shadow-red-500/10 animate-in fade-in slide-in-from-top-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-400 mr-2 animate-pulse"></div>
                        {error}
                    </div>
                )}

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-xl space-y-5">
                        <div className="relative group">
                            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 ml-1 group-focus-within:text-sky-400 transition-colors">Email address</label>
                            <input
                                type="email"
                                required
                                className="appearance-none rounded-xl relative block w-full px-4 py-3 border border-slate-700/50 bg-slate-900/50 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent focus:bg-slate-800/80 transition-all sm:text-sm backdrop-blur-sm shadow-inner"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="relative group">
                            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 ml-1 group-focus-within:text-sky-400 transition-colors">Password</label>
                            <input
                                type="password"
                                required
                                className="appearance-none rounded-xl relative block w-full px-4 py-3 border border-slate-700/50 bg-slate-900/50 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent focus:bg-slate-800/80 transition-all sm:text-sm backdrop-blur-sm shadow-inner"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="relative group">
                            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 ml-1 group-focus-within:text-sky-400 transition-colors">Confirm Password</label>
                            <input
                                type="password"
                                required
                                className="appearance-none rounded-xl relative block w-full px-4 py-3 border border-slate-700/50 bg-slate-900/50 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent focus:bg-slate-800/80 transition-all sm:text-sm backdrop-blur-sm shadow-inner"
                                placeholder="••••••••"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="pt-2">
                        <button
                            disabled={loading}
                            type="submit"
                            className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 focus:ring-offset-slate-900 shadow-lg shadow-sky-500/25 transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0"
                        >
                            {loading ? (
                                <span className="flex items-center">
                                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin mr-2"></div>
                                    Creating Account...
                                </span>
                            ) : "Sign Up"}
                        </button>
                    </div>
                </form>

                <div className="text-center mt-4">
                    <p className="text-sm text-slate-400">
                        Already have an account? <Link to="/login" className="font-medium text-sky-400 hover:text-sky-300">Sign in</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

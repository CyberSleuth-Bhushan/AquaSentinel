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
        <div className="min-h-screen flex items-center justify-center bg-slate-900 py-12 px-4 sm:px-6 lg:px-8 bg-[url('https://images.unsplash.com/photo-1548292857-e92c6cc7ff11?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center bg-blend-overlay">
            <div className="max-w-md w-full space-y-8 bg-slate-800/90 p-8 rounded-2xl shadow-2xl backdrop-blur-md border border-slate-700">
                <div>
                    <div className="flex justify-center flex-col items-center">
                        <div className="bg-sky-500/20 p-4 rounded-full mb-4">
                            <Droplet className="h-12 w-12 text-sky-400" />
                        </div>
                        <h2 className="text-center text-3xl font-extrabold text-white">Join AquaGuard</h2>
                        <p className="mt-2 text-center text-sm text-slate-400">
                            Secure your water quality today
                        </p>
                    </div>
                </div>

                {error && <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg text-sm">{error}</div>}

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1">Email address</label>
                            <input
                                type="email"
                                required
                                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-slate-600 bg-slate-700/50 text-white placeholder-slate-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1">Password</label>
                            <input
                                type="password"
                                required
                                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-slate-600 bg-slate-700/50 text-white placeholder-slate-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm"
                                placeholder="********"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1">Confirm Password</label>
                            <input
                                type="password"
                                required
                                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-slate-600 bg-slate-700/50 text-white placeholder-slate-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm"
                                placeholder="********"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            disabled={loading}
                            type="submit"
                            className="group relative w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-sky-600 hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-colors disabled:opacity-50"
                        >
                            Sign Up
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

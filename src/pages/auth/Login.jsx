import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn, GraduationCap } from 'lucide-react';
import { Button, Input, Card } from '../../components/UI';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const Login = () => {
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('student');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        // Simple simulation
        const userData = {
            id: Date.now(),
            name: email.split('@')[0].replace('.', ' '),
            email,
            role
        };

        login(userData);
        toast.success(`Logged in as ${role}`);
        navigate(`/${role}/dashboard`);
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="flex justify-center mb-8">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                            <GraduationCap size={32} />
                        </div>
                        <h1 className="text-2xl font-bold text-slate-900">Placement Portal</h1>
                    </div>
                </div>

                <Card title="Login to your account" subtitle="Enter your credentials to access the portal">
                    <form onSubmit={handleLogin} className="space-y-4">
                        <Input
                            label="Email Address"
                            type="email"
                            placeholder="name@university.edu"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <Input
                            label="Password"
                            type="password"
                            placeholder="••••••••"
                            required
                        />

                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-slate-700">Login Role</label>
                            <select
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                            >
                                <option value="student">Student</option>
                                <option value="admin">Admin</option>
                                <option value="employer">Employer</option>
                                <option value="officer">Placement Officer</option>
                            </select>
                        </div>

                        <Button type="submit" className="w-full py-3">
                            Sign In
                        </Button>
                    </form>

                    <p className="mt-6 text-center text-sm text-slate-500">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-primary-600 font-semibold hover:underline">
                            Register here
                        </Link>
                    </p>
                </Card>
            </div>
        </div>
    );
};

export default Login;

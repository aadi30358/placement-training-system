import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn, GraduationCap, Eye, EyeOff, User, Mail, Lock, ChevronRight } from 'lucide-react';
import { Button } from '../../components/UI';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
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
        <div className="min-h-screen bg-[#0f0f0f] flex overflow-hidden">
            {/* Left Section: Login Form */}
            <div className="w-full lg:w-[450px] xl:w-[550px] flex flex-col justify-center px-8 sm:px-12 xl:px-20 z-10 bg-[#0f0f0f]">
                <div className="mb-10">
                    <div className="flex items-center gap-2 mb-8">
                        <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-primary-900/20 text-xl font-bold">
                            P
                        </div>
                        <span className="text-xl font-black text-white tracking-tight">PTS PORTAL</span>
                    </div>

                    <h1 className="text-3xl font-bold text-white mb-2">Login</h1>
                    <p className="text-slate-400 text-sm">Enter your campus credentials to access the portal</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-1.5 focus-within:transform focus-within:translate-x-1 transition-transform">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">Login Role</label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                            <select
                                className="w-full pl-10 pr-4 py-3 bg-[#1a1a1a] border border-slate-800 rounded-xl text-white outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all appearance-none"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                            >
                                <option value="student">Student Portal</option>
                                <option value="admin">Administrator</option>
                                <option value="employer">Recruitment Partner</option>
                                <option value="officer">Placement Officer</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-1.5 focus-within:transform focus-within:translate-x-1 transition-transform">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">Campus Email</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                            <input
                                type="email"
                                placeholder="name@university.edu"
                                className="w-full pl-10 pr-4 py-3 bg-[#1a1a1a] border border-slate-800 rounded-xl text-white outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5 focus-within:transform focus-within:translate-x-1 transition-transform">
                        <div className="flex justify-between items-center px-1">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Password</label>
                            <button type="button" className="text-xs font-bold text-primary-500 hover:text-primary-400">Forgot Password?</button>
                        </div>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                className="w-full pl-10 pr-12 py-3 bg-[#1a1a1a] border border-slate-800 rounded-xl text-white outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    <Button type="submit" className="w-full py-3.5 mt-4 group shadow-lg shadow-primary-900/20">
                        <div className="flex items-center justify-center gap-2">
                            <span>Login to Dashboard</span>
                            <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </div>
                    </Button>
                </form>

                <div className="mt-12 text-center lg:text-left">
                    <p className="text-slate-500 text-sm">
                        Don't have a campus account?{' '}
                        <Link to="/register" className="text-white font-bold hover:text-primary-400 ml-1 transition-colors">
                            Sign up now
                        </Link>
                    </p>
                </div>
            </div>

            {/* Right Section: Visual Banner */}
            <div className="hidden lg:flex flex-1 bg-primary-600 relative overflow-hidden items-center justify-center p-20">
                {/* Background Shapes */}
                <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary-500 rounded-full blur-[100px] opacity-50 capitalize"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-indigo-500 rounded-full blur-[100px] opacity-30"></div>

                <div className="relative z-10 w-full max-w-2xl text-white">
                    <div className="space-y-6 mb-12">
                        <h2 className="text-6xl font-black leading-tight tracking-tighter">
                            Welcome to <br />
                            <span className="text-primary-200 uppercase">the portal</span>
                        </h2>
                        <p className="text-primary-100 text-lg max-w-md font-medium">
                            Join thousands of students and recruiters already using our platform for campus placements.
                        </p>
                    </div>

                    {/* Illustration Placeholder/Image */}
                    <div className="relative">
                        <img
                            src="/login_illustration_purple.png"
                            alt="Student Placement Illustration"
                            className="w-full h-auto drop-shadow-2xl animate-float"
                            onError={(e) => {
                                e.target.src = 'https://img.freepik.com/free-vector/job-interview-concept-illustration_114360-1677.jpg';
                                e.target.className = 'w-full h-auto drop-shadow-2xl rounded-3xl';
                            }}
                        />
                    </div>
                </div>

                {/* Glassmorphism Badge */}
                <div className="absolute bottom-12 right-12 bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl flex items-center gap-4 shadow-2xl">
                    <div className="flex -space-x-3">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className={`w-8 h-8 rounded-full border-2 border-primary-600 bg-primary-${i}00 flex items-center justify-center text-[10px] font-bold`}>
                                U{i}
                            </div>
                        ))}
                    </div>
                    <div>
                        <p className="text-white text-xs font-black uppercase tracking-widest">Active Now</p>
                        <p className="text-primary-200 text-[10px]">Over 1,200+ students online</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;

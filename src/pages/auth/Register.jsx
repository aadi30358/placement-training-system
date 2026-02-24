import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus, GraduationCap, Building2, User } from 'lucide-react';
import { Button, Input, Card } from '../../components/UI';
import toast from 'react-hot-toast';

const Register = () => {
    const [role, setRole] = useState('student');
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        toast.success('Registration successful! Please login.');
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 py-12">
            <div className="w-full max-w-md">
                <div className="flex justify-center mb-8">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                            <GraduationCap size={32} />
                        </div>
                        <h1 className="text-2xl font-bold text-slate-900">Placement Portal</h1>
                    </div>
                </div>

                <Card title="Create an account" subtitle="Join the university placement network">
                    <div className="flex gap-2 mb-6">
                        <button
                            onClick={() => setRole('student')}
                            className={`flex-1 flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all ${role === 'student'
                                    ? 'border-primary-600 bg-primary-50 text-primary-600'
                                    : 'border-slate-100 hover:border-slate-200 text-slate-500'
                                }`}
                        >
                            <User size={24} />
                            <span className="text-xs font-bold uppercase">Student</span>
                        </button>
                        <button
                            onClick={() => setRole('employer')}
                            className={`flex-1 flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all ${role === 'employer'
                                    ? 'border-primary-600 bg-primary-50 text-primary-600'
                                    : 'border-slate-100 hover:border-slate-200 text-slate-500'
                                }`}
                        >
                            <Building2 size={24} />
                            <span className="text-xs font-bold uppercase">Employer</span>
                        </button>
                    </div>

                    <form onSubmit={handleRegister} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <Input label="First Name" placeholder="John" required />
                            <Input label="Last Name" placeholder="Doe" required />
                        </div>
                        <Input label="Email Address" type="email" placeholder="john@example.com" required />
                        {role === 'student' ? (
                            <Input label="Roll Number" placeholder="20CS001" required />
                        ) : (
                            <Input label="Company Name" placeholder="Acme Inc." required />
                        )}
                        <Input label="Password" type="password" placeholder="••••••••" required />
                        <Input label="Confirm Password" type="password" placeholder="••••••••" required />

                        <Button type="submit" className="w-full py-3 mt-2">
                            Create Account
                        </Button>
                    </form>

                    <p className="mt-6 text-center text-sm text-slate-500">
                        Already have an account?{' '}
                        <Link to="/login" className="text-primary-600 font-semibold hover:underline">
                            Sign In
                        </Link>
                    </p>
                </Card>
            </div>
        </div>
    );
};

export default Register;

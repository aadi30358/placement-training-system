import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, LogIn, GraduationCap, Shield, Building2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { GoogleLogin } from '@react-oauth/google';
import toast from 'react-hot-toast';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [role, setRole] = useState('student');
    const [loading, setLoading] = useState(false);
    const { login, loginWithGoogle } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const userData = await login({ email, password, role });
            toast.success(`Welcome back, ${userData.name || userData.role}!`);
            navigate(`/${userData.role}/dashboard`);
        } catch (err) {
            const errorMessage = typeof err.response?.data === 'string'
                ? err.response.data
                : (err.response?.data?.message || err.message || 'Invalid credentials or role.');
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSuccess = async (credentialResponse) => {
        try {
            const userData = await loginWithGoogle(credentialResponse.credential, role);
            toast.success(`Logged in with Google as ${userData.role}`);
            navigate(`/${userData.role === 'admin' ? 'admin' : userData.role}/dashboard`);
        } catch (err) {
            const msg = typeof err.response?.data === 'string' ? err.response.data : err.message;
            toast.error(`Google Login failed: ${msg}`);
        }
    };

    const roleOptions = [
        { value: 'student', label: 'Student', icon: GraduationCap },
        { value: 'officer', label: 'Placement Officer', icon: Shield },
        { value: 'employer', label: 'Employer / Recruiter', icon: Building2 },
    ];

    return (
        <div className="login-page">
            {/* Left Panel — Login Form */}
            <div className="login-left">

                {/* Institutional Header */}
                <div className="login-header">
                    <div className="login-logo">
                        <GraduationCap size={28} />
                    </div>
                    <div>
                        <p className="login-institute-name">Placement Training System</p>
                        <p className="login-institute-sub">Campus Recruitment Portal</p>
                    </div>
                </div>

                {/* Divider */}
                <div className="login-divider" />

                {/* Form Card */}
                <div className="login-card">
                    <h1 className="login-title">Student &amp; Staff Login</h1>
                    <p className="login-subtitle">Sign in with your official institutional credentials</p>

                    <form onSubmit={handleLogin} className="login-form">

                        {/* Role Selector */}
                        <div className="form-group">
                            <label className="form-label">Login As</label>
                            <div className="role-tabs">
                                {roleOptions.map(({ value, label }) => (
                                    <button
                                        key={value}
                                        type="button"
                                        className={`role-tab ${role === value ? 'role-tab-active' : ''}`}
                                        onClick={() => setRole(value)}
                                    >
                                        {label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Email */}
                        <div className="form-group">
                            <label className="form-label" htmlFor="email">Email Address</label>
                            <div className="input-wrapper">
                                <Mail className="input-icon" size={17} />
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="yourname@institution.edu"
                                    className="form-input"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="form-group">
                            <div className="form-label-row">
                                <label className="form-label" htmlFor="password">Password</label>
                                <button 
                                    type="button" 
                                    className="forgot-link"
                                    onClick={() => navigate('/forgot-password')}
                                >
                                    Forgot Password?
                                </button>
                            </div>
                            <div className="input-wrapper">
                                <Lock className="input-icon" size={17} />
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Enter your password"
                                    className="form-input"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button
                                    type="button"
                                    className="input-eye"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                                </button>
                            </div>
                        </div>

                        {/* Submit */}
                        <button type="submit" className="submit-btn" disabled={loading}>
                            {loading ? (
                                <span className="btn-spinner" />
                            ) : (
                                <>
                                    <LogIn size={18} />
                                    <span>Sign In to Portal</span>
                                </>
                            )}
                        </button>
                    </form>

                    <div className="flex items-center gap-4 my-6">
                        <div className="flex-1 h-px bg-slate-100"></div>
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Or continue with</span>
                        <div className="flex-1 h-px bg-slate-100"></div>
                    </div>

                    <div className="flex justify-center flex-col items-center gap-2">
                        <GoogleLogin
                            onSuccess={handleGoogleSuccess}
                            onError={(err) => { 
                                console.error(err);
                                toast.error("Google Login Blocked or Failed. Check pop-ups!");
                            }}
                            use_fedcm_for_prompt={true}
                            theme="outline"
                            size="large"
                            text="signin_with"
                            shape="pill"
                            width="100%"
                        />
                    </div>

                    <p className="login-register-text" style={{ marginTop: '20px' }}>
                        New user?{' '}
                        <Link to="/register" className="login-register-link">
                            Create an account
                        </Link>
                    </p>
                </div>

                {/* Footer */}
                <p className="login-footer">
                    &copy; {new Date().getFullYear()} Placement Training System &bull; All rights reserved
                </p>
            </div>

            {/* Right Panel — Illustration */}
            <div className="login-right">
                <div className="login-right-inner">
                    <div className="login-right-badge">
                        <GraduationCap size={20} />
                        <span>Placement Training System</span>
                    </div>
                    <h2 className="login-right-title">
                        Your Career<br />Starts Here
                    </h2>
                    <p className="login-right-sub">
                        Connect with top recruiters, track your applications, and find your dream job — all in one place.
                    </p>
                    <img
                        src="/login-hero.png"
                        alt="Campus Placement Illustration"
                        className="login-illustration"
                        onError={(e) => { e.target.style.display = 'none'; }}
                    />
                    <div className="login-stats">
                        <div className="stat-item">
                            <span className="stat-number">1,200+</span>
                            <span className="stat-label">Students</span>
                        </div>
                        <div className="stat-divider" />
                        <div className="stat-item">
                            <span className="stat-number">300+</span>
                            <span className="stat-label">Recruiters</span>
                        </div>
                        <div className="stat-divider" />
                        <div className="stat-item">
                            <span className="stat-number">85%</span>
                            <span className="stat-label">Placement Rate</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus, GraduationCap, Building2, User } from 'lucide-react';
import { Button, Input, Card } from '../../components/UI';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const Register = () => {
    const [role, setRole] = useState('student');
    const navigate = useNavigate();
    const { register: authRegister } = useAuth();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        rollNumber: '',
        companyName: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            return toast.error("Passwords do not match");
        }
        setLoading(true);
        try {
            const userData = {
                name: `${formData.firstName} ${formData.lastName}`,
                email: formData.email,
                password: formData.password,
                role: role,
                roll: role === 'student' ? formData.rollNumber : undefined,
                company: role === 'employer' ? formData.companyName : null,
                isProfileComplete: false,
                isNewUser: true
            };
            await authRegister(userData);
            toast.success('Registration successful! Please log in.');
            navigate('/login');
        } catch (err) {
            console.error("Registration Error: ", err);
            const errorMsg = err.response?.data?.message || 
                             (typeof err.response?.data === 'string' ? err.response.data : null) || 
                             err.message || 
                             "Registration failed.";
            toast.error(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <div className="login-left">
                <div className="login-header">
                    <div className="login-logo">
                        <GraduationCap size={28} />
                    </div>
                    <div>
                        <p className="login-institute-name">Placement Training System</p>
                        <p className="login-institute-sub">Create New Account</p>
                    </div>
                </div>

                <div className="login-divider" />

                <div className="login-card">
                    <h1 className="login-title">Join the Portal</h1>
                    <p className="login-subtitle">Start your professional journey today</p>

                    <form onSubmit={handleRegister} className="login-form">
                        <div className="form-group">
                            <label className="form-label">I am a...</label>
                            <div className="role-tabs">
                                {['student', 'officer', 'employer'].map(r => (
                                    <button
                                        key={r}
                                        type="button"
                                        className={`role-tab ${role === r ? 'role-tab-active' : ''}`}
                                        onClick={() => setRole(r)}
                                    >
                                        {r.charAt(0).toUpperCase() + r.slice(1)}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <Input
                                label="First Name"
                                name="firstName"
                                placeholder="John"
                                required
                                value={formData.firstName}
                                onChange={handleChange}
                            />
                            <Input
                                label="Last Name"
                                name="lastName"
                                placeholder="Doe"
                                required
                                value={formData.lastName}
                                onChange={handleChange}
                            />
                        </div>

                        <Input
                            label="Email Address"
                            type="email"
                            name="email"
                            placeholder="john@example.com"
                            required
                            value={formData.email}
                            onChange={handleChange}
                        />

                        {role === 'student' && (
                            <Input
                                label="Roll Number"
                                name="rollNumber"
                                placeholder="20CS001"
                                required
                                value={formData.rollNumber}
                                onChange={handleChange}
                            />
                        )}

                        {role === 'employer' && (
                            <Input
                                label="Company Name"
                                name="companyName"
                                placeholder="Acme Inc."
                                required
                                value={formData.companyName}
                                onChange={handleChange}
                            />
                        )}

                        <div className="grid grid-cols-2 gap-4">
                            <Input
                                label="Password"
                                type="password"
                                name="password"
                                placeholder="••••••••"
                                required
                                value={formData.password}
                                onChange={handleChange}
                            />
                            <Input
                                label="Confirm"
                                type="password"
                                name="confirmPassword"
                                placeholder="••••••••"
                                required
                                value={formData.confirmPassword}
                                onChange={handleChange}
                            />
                        </div>

                        <button type="submit" className="submit-btn" disabled={loading}>
                            {loading ? <span className="btn-spinner" /> : "Create Account"}
                        </button>
                    </form>

                    <p className="login-register-text">
                        Already have an account?{' '}
                        <Link to="/login" className="login-register-link">Sign In</Link>
                    </p>
                </div>
            </div>

            <div className="login-right">
                <div className="login-right-inner">
                    <h2 className="login-right-title">Unlock Your Potential.</h2>
                    <p className="login-right-sub">Join thousands of students and hundreds of employers already on the platform.</p>
                </div>
            </div>
        </div>
    );
};

export default Register;

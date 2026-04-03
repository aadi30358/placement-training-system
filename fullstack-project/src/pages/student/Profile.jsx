import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin, GraduationCap, Briefcase, FileCode, Upload, Save, Plus, X, Globe, ExternalLink, AlertCircle } from 'lucide-react';
import { Card, Button, Input } from '../../components/UI';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const Profile = () => {
    const { user, updateProfile } = useAuth();
    const [loading, setLoading] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        name: user?.name || '',
        phone: user?.phone || '',
        dob: user?.dob || '',
        secondaryEmail: user?.secondaryEmail || '',
        dept: user?.dept || 'CSE',
        year: user?.year || '4',
        cgpa: user?.cgpa || '',
        class10: user?.class10 || '',
        class12: user?.class12 || '',
        skills: user?.skills || ['React', 'Node.js', 'Python'],
        resumeUrl: user?.resumeUrl || 'resume_v2.pdf',
        portfolioUrl: user?.portfolioUrl || ''
    });

    const [newSkill, setNewSkill] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleAddSkill = (e) => {
        e.preventDefault();
        if (newSkill && !formData.skills.includes(newSkill)) {
            setFormData(prev => ({
                ...prev,
                skills: [...prev.skills, newSkill]
            }));
            setNewSkill('');
        }
    };

    const handleRemoveSkill = (skillToRemove) => {
        setFormData(prev => ({
            ...prev,
            skills: prev.skills.filter(s => s !== skillToRemove)
        }));
    };

    const handleFileUpload = () => {
        // Simulation
        toast.promise(
            new Promise((resolve) => setTimeout(resolve, 1500)),
            {
                loading: 'Uploading resume...',
                success: 'Resume uploaded successfully!',
                error: 'Upload failed',
            }
        ).then(() => {
            setFormData(prev => ({ ...prev, resumeUrl: 'resume_updated.pdf' }));
        });
    };

    const handleSave = (e) => {
        if (e) e.preventDefault();
        setLoading(true);

        setTimeout(() => {
            updateProfile(formData);
            setLoading(false);
            toast.success('Profile updated successfully!');
        }, 800);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            {!user?.isProfileComplete && (
                <div className="bg-primary-50 border border-primary-200 rounded-2xl p-6 flex items-start gap-4 shadow-sm animate-pulse-subtle">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 shrink-0">
                        <AlertCircle size={24} />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-slate-900">Finish Setting Up Your Profile</h3>
                        <p className="text-slate-600">Please complete all sections below to verify your account and start applying for placements.</p>
                    </div>
                </div>
            )}

            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">My Profile</h1>
                    <p className="text-slate-500">Update your information and manage your resume.</p>
                </div>
                <Button className="flex items-center gap-2 shadow-lg shadow-primary-200" onClick={handleSave} disabled={loading}>
                    <Save size={18} />
                    <span>{loading ? 'Saving...' : 'Save Changes'}</span>
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-6">
                    <Card className="text-center">
                        <div className="relative inline-block mb-4">
                            <div className="w-24 h-24 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mx-auto border-4 border-white shadow-sm overflow-hidden">
                                <User size={48} />
                            </div>
                            <button className="absolute bottom-0 right-0 p-1.5 bg-white border border-slate-200 rounded-full text-slate-500 shadow-sm hover:text-primary-600">
                                <Upload size={14} />
                            </button>
                        </div>
                        <h2 className="text-xl font-bold text-slate-900">{formData.name}</h2>
                        <p className="text-slate-500 text-sm font-medium">{user?.roll || 'Not Set'} • {formData.dept}</p>
                        <div className="mt-4 pt-4 border-t border-slate-100 flex justify-around">
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">CGPA</p>
                                <p className="font-bold text-slate-900">{formData.cgpa || 'N/A'}</p>
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Year</p>
                                <p className="font-bold text-slate-900">{formData.year}th</p>
                            </div>
                        </div>
                    </Card>

                    <Card title="Resume">
                        <div
                            className="p-4 bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl text-center group hover:border-primary-300 transition-all cursor-pointer overflow-hidden"
                            onClick={handleFileUpload}
                        >
                            <FileCode className="mx-auto text-slate-300 mb-2 group-hover:text-primary-400 transition-colors" size={32} />
                            <p className="text-sm font-semibold text-slate-700 truncate px-2">{formData.resumeUrl}</p>
                            <p className="text-xs text-slate-400">Click to upload new version</p>
                        </div>
                        <Button variant="secondary" className="w-full mt-4 text-xs font-bold" onClick={handleFileUpload}>Replace File</Button>
                    </Card>

                    <Card title="Professional Links">
                        <div className="space-y-4">
                            <div>
                                <label className="text-xs font-bold text-slate-400 uppercase mb-2 block tracking-wider text-[10px]">Portfolio / Personal Website</label>
                                <div className="relative">
                                    <Globe size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                    <input
                                        type="url"
                                        name="portfolioUrl"
                                        placeholder="https://yourportfolio.com"
                                        className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                                        value={formData.portfolioUrl}
                                        onChange={handleChange}
                                    />
                                </div>
                                {formData.portfolioUrl && (
                                    <a
                                        href={formData.portfolioUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[10px] text-primary-600 flex items-center gap-1 mt-2 hover:underline font-bold"
                                    >
                                        <ExternalLink size={10} /> Visit Portfolio
                                    </a>
                                )}
                            </div>
                        </div>
                    </Card>
                </div>

                <div className="md:col-span-2 space-y-6">
                    <Card title="Personal Information">
                        <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Input
                                label="Full Name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter your full name"
                            />
                            <Input
                                label="Email Address"
                                value={user?.email || 'N/A'}
                                disabled
                            />
                            <Input
                                label="Phone Number"
                                name="phone"
                                placeholder="+91 98765 43210"
                                value={formData.phone}
                                onChange={handleChange}
                            />
                            <Input
                                label="Date of Birth"
                                name="dob"
                                type="date"
                                value={formData.dob}
                                onChange={handleChange}
                            />
                            <div className="sm:col-span-2">
                                <Input
                                    label="Secondary Email"
                                    name="secondaryEmail"
                                    placeholder="personal@example.com"
                                    value={formData.secondaryEmail}
                                    onChange={handleChange}
                                />
                            </div>
                        </form>
                    </Card>

                    <Card title="Academic Details">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="block text-sm font-medium text-slate-700">Department</label>
                                <select
                                    name="dept"
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none transition-all text-sm"
                                    value={formData.dept}
                                    onChange={handleChange}
                                >
                                    <option value="CSE">CSE</option>
                                    <option value="ECE">ECE</option>
                                    <option value="EEE">EEE</option>
                                    <option value="MECH">MECH</option>
                                    <option value="CIVIL">CIVIL</option>
                                    <option value="IT">IT</option>
                                </select>
                            </div>
                            <div className="space-y-1">
                                <label className="block text-sm font-medium text-slate-700">Current Year</label>
                                <select
                                    name="year"
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none transition-all text-sm"
                                    value={formData.year}
                                    onChange={handleChange}
                                >
                                    <option value="1">1st Year</option>
                                    <option value="2">2nd Year</option>
                                    <option value="3">3rd Year</option>
                                    <option value="4">4th Year</option>
                                </select>
                            </div>
                            <Input
                                label="CGPA (Overall)"
                                name="cgpa"
                                type="number"
                                step="0.01"
                                placeholder="8.50"
                                value={formData.cgpa}
                                onChange={handleChange}
                            />
                            <Input label="Backlogs" defaultValue="0" disabled />
                            <Input
                                label="Class X %"
                                name="class10"
                                placeholder="95.0"
                                value={formData.class10}
                                onChange={handleChange}
                            />
                            <Input
                                label="Class XII %"
                                name="class12"
                                placeholder="92.4"
                                value={formData.class12}
                                onChange={handleChange}
                            />
                        </div>
                    </Card>

                    <Card title="Skills & Interests">
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-slate-700 mb-2 block">Technical Skills</label>
                                <div className="flex flex-wrap gap-2">
                                    {formData.skills.map(skill => (
                                        <span key={skill} className="px-3 py-1 bg-primary-50 text-primary-600 rounded-full text-sm font-bold border border-primary-100 flex items-center gap-2">
                                            {skill}
                                            <button
                                                className="text-primary-300 hover:text-primary-600"
                                                onClick={() => handleRemoveSkill(skill)}
                                            >
                                                <X size={14} />
                                            </button>
                                        </span>
                                    ))}
                                </div>
                                <form onSubmit={handleAddSkill} className="mt-4 flex gap-2">
                                    <input
                                        type="text"
                                        placeholder="Add a skill (e.g. AWS)"
                                        className="flex-1 px-3 py-1.5 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                                        value={newSkill}
                                        onChange={(e) => setNewSkill(e.target.value)}
                                    />
                                    <Button type="submit" size="sm" variant="secondary" className="flex items-center gap-1">
                                        <Plus size={16} /> Add
                                    </Button>
                                </form>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Profile;

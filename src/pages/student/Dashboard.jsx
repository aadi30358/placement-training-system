import React, { useMemo } from 'react';
import { Briefcase, CheckCircle2, Clock, ArrowRight, Star } from 'lucide-react';
import { Card, Button } from '../../components/UI';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const StudentDashboard = () => {
    const { jobs, getStudentApplications } = useData();
    const { user } = useAuth();
    const navigate = useNavigate();

    const appliedJobs = useMemo(() => {
        return getStudentApplications(user?.id);
    }, [user, getStudentApplications]);

    const stats = useMemo(() => {
        return {
            applied: appliedJobs.length,
            shortlisted: appliedJobs.filter(a => a.status === 'Shortlisted').length,
            offers: appliedJobs.filter(a => a.status === 'Selected').length,
        };
    }, [appliedJobs]);

    const recommendedJobs = useMemo(() => {
        // Simple recommendation logic: jobs matching user skills or random if no skills
        if (!user?.skills || user.skills.length === 0) return jobs.slice(0, 2);

        return jobs
            .filter(job =>
                !appliedJobs.find(app => app.jobId === job.id) &&
                (user.skills.some(skill => job.title.toLowerCase().includes(skill.toLowerCase())) ||
                    user.dept === job.eligibility.split(' ')[0])
            )
            .slice(0, 2);
    }, [jobs, user, appliedJobs]);

    const profileCompletion = useMemo(() => {
        const fields = ['phone', 'dob', 'skills', 'resumeUrl', 'class10', 'class12'];
        const completed = fields.filter(f => !!user?.[f]).length;
        return Math.round((completed / fields.length) * 100);
    }, [user]);

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Welcome Back, {user?.name?.split(' ')[0]}!</h1>
                    <p className="text-slate-500">Track your applications and discover new opportunities.</p>
                </div>
                <div className="flex items-center gap-4 bg-white p-2 rounded-xl border border-slate-100 shadow-sm">
                    <div className="flex -space-x-2">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200" />
                        ))}
                    </div>
                    <span className="text-sm font-medium text-slate-600">45 new jobs posted this week</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <Card title="Quick Stats">
                        <div className="grid grid-cols-3 gap-4">
                            <div className="p-4 bg-blue-50 rounded-xl">
                                <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">Applied</p>
                                <p className="text-2xl font-bold text-blue-900">{stats.applied}</p>
                            </div>
                            <div className="p-4 bg-emerald-50 rounded-xl">
                                <p className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-1">Shortlisted</p>
                                <p className="text-2xl font-bold text-emerald-900">{stats.shortlisted}</p>
                            </div>
                            <div className="p-4 bg-purple-50 rounded-xl">
                                <p className="text-xs font-bold text-purple-600 uppercase tracking-wider mb-1">Offers</p>
                                <p className="text-2xl font-bold text-purple-900">{stats.offers}</p>
                            </div>
                        </div>
                    </Card>

                    <Card title="Recent Applications">
                        <div className="space-y-4">
                            {appliedJobs.length > 0 ? appliedJobs.slice(0, 5).map((app) => (
                                <div key={app.id} className="flex items-center justify-between p-4 rounded-xl border border-slate-50 hover:bg-slate-50 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-white rounded-lg border border-slate-200 flex items-center justify-center">
                                            <Briefcase className="text-slate-400" size={24} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-900">{app.job?.title || 'Unknown Role'}</h4>
                                            <p className="text-sm text-slate-500">{app.job?.company || 'Unknown Company'} • Applied on {app.appliedDate}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${app.status === 'Selected' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                                                app.status === 'Shortlisted' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                                                    app.status === 'Rejected' ? 'bg-red-50 text-red-700 border-red-100' :
                                                        'bg-slate-50 text-slate-700 border-slate-100'
                                            }`}>
                                            {app.status}
                                        </span>
                                        <button className="text-slate-400 hover:text-slate-600" onClick={() => navigate('/student/jobs')}><ArrowRight size={20} /></button>
                                    </div>
                                </div>
                            )) : (
                                <div className="text-center py-8">
                                    <p className="text-slate-400">No applications yet. Start exploring!</p>
                                    <Button variant="secondary" className="mt-4" onClick={() => navigate('/student/jobs')}>Browse Jobs</Button>
                                </div>
                            )}
                        </div>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card title="Recommended for You">
                        <div className="space-y-4">
                            {recommendedJobs.map((job) => (
                                <div key={job.id} className="p-4 rounded-xl border border-slate-100 hover:border-primary-100 hover:bg-primary-50/30 transition-all group">
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className="font-bold text-slate-900 group-hover:text-primary-600 transition-colors">{job.title}</h4>
                                    </div>
                                    <p className="text-sm text-slate-600 mb-4">{job.company} • {job.location}</p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-bold text-slate-500 uppercase">{job.salary}</span>
                                        <Button size="sm" variant="secondary" onClick={() => navigate('/student/jobs')}>View</Button>
                                    </div>
                                </div>
                            ))}
                            <Button variant="secondary" className="w-full text-sm" onClick={() => navigate('/student/jobs')}>See all recommendations</Button>
                        </div>
                    </Card>

                    <Card title="Profile Progress" className="bg-primary-600 text-white border-none shadow-primary-200">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-primary-100 text-sm font-medium">Strength: {profileCompletion}%</p>
                            <span className="text-xs bg-primary-500 px-2 py-0.5 rounded-full">Good</span>
                        </div>
                        <div className="w-full h-2 bg-primary-700 rounded-full mb-4 overflow-hidden">
                            <div className="h-full bg-white rounded-full transition-all duration-500" style={{ width: `${profileCompletion}%` }} />
                        </div>
                        <p className="text-primary-50 text-xs mb-6">Complete your profile to get matched with 3x more companies.</p>
                        <Button
                            className="w-full bg-white text-primary-600 hover:bg-primary-50"
                            onClick={() => navigate('/student/profile')}
                        >
                            {profileCompletion === 100 ? 'View Profile' : 'Complete Profile'}
                        </Button>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default StudentDashboard;

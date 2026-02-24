import React, { useState } from 'react';
import { Plus, Search, Filter, Briefcase, Users, CheckCircle2, XCircle, Clock, ExternalLink } from 'lucide-react';
import { Card, Button, Input } from '../../components/UI';
import { JOBS, APPLICATIONS, STUDENTS } from '../../data/mockData';

const EmployerDashboard = () => {
    const postedJobs = JOBS.filter(j => j.company === 'Google'); // Simulation
    const totalApplicants = APPLICATIONS.filter(app => postedJobs.some(j => j.id === app.jobId));

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Employer Console</h1>
                    <p className="text-slate-500">Manage your job postings and review campus talent.</p>
                </div>
                <Button className="flex items-center gap-2">
                    <Plus size={18} />
                    <span>Post New Job</span>
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-primary-600 text-white border-none">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-white/20 rounded-lg">
                            <Briefcase size={24} />
                        </div>
                    </div>
                    <p className="text-primary-100 text-sm font-medium uppercase tracking-wider">Active Job Posts</p>
                    <p className="text-3xl font-bold mt-1">{postedJobs.length}</p>
                </Card>
                <Card>
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                            <Users size={24} />
                        </div>
                    </div>
                    <p className="text-slate-500 text-sm font-medium uppercase tracking-wider">Total Applicants</p>
                    <p className="text-3xl font-bold text-slate-900 mt-1">{totalApplicants.length}</p>
                </Card>
                <Card>
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg">
                            <CheckCircle2 size={24} />
                        </div>
                    </div>
                    <p className="text-slate-500 text-sm font-medium uppercase tracking-wider">Shortlisted</p>
                    <p className="text-3xl font-bold text-slate-900 mt-1">1</p>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card title="Active Jobs" subtitle="Overview of your current job listings">
                    <div className="space-y-4">
                        {postedJobs.map(job => (
                            <div key={job.id} className="flex items-center justify-between p-4 rounded-xl border border-slate-50 hover:bg-slate-50 transition-colors">
                                <div>
                                    <h4 className="font-bold text-slate-900">{job.title}</h4>
                                    <p className="text-sm text-slate-500">{job.location} • {job.type}</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="text-right">
                                        <p className="text-sm font-bold text-slate-900">12</p>
                                        <p className="text-[10px] text-slate-400 font-bold uppercase">Applicants</p>
                                    </div>
                                    <button className="p-2 text-slate-400 hover:text-primary-600 transition-all">
                                        <ExternalLink size={18} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                <Card title="Recent Activity" subtitle="Latest applications received">
                    <div className="space-y-4 text-center py-8">
                        <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-2">
                            <Clock className="text-slate-300" size={24} />
                        </div>
                        <p className="text-sm text-slate-500">Real-time activity feed will appear here as students apply.</p>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default EmployerDashboard;

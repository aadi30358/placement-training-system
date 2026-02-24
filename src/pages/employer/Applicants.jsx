import React, { useState } from 'react';
import { Search, Filter, ExternalLink, CheckCircle2, XCircle, Clock, Download } from 'lucide-react';
import { Card, Button } from '../../components/UI';
import { APPLICATIONS, STUDENTS, JOBS } from '../../data/mockData';
import toast from 'react-hot-toast';

const ApplicantManagement = () => {
    const [apps, setApps] = useState(APPLICATIONS.map(app => ({
        ...app,
        student: STUDENTS.find(s => s.id === app.studentId),
        job: JOBS.find(j => j.id === app.jobId)
    })));

    const handleStatusChange = (id, newStatus) => {
        setApps(prev => prev.map(app => app.id === id ? { ...app, status: newStatus } : app));
        toast.success(`Applicant status updated to ${newStatus}`);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Applicant Tracking</h1>
                    <p className="text-slate-500">Review and manage candidates for your open positions.</p>
                </div>
                <Button variant="secondary" className="flex items-center gap-2">
                    <Download size={18} />
                    <span>Export List</span>
                </Button>
            </div>

            <Card>
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search by student name or job title..."
                            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                        />
                    </div>
                    <Button variant="secondary" className="flex items-center gap-2">
                        <Filter size={18} />
                        <span>Filter</span>
                    </Button>
                </div>

                <div className="w-full overflow-x-auto rounded-xl border border-slate-100">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-slate-50 border-b border-slate-100">
                            <tr>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Candidate</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Applied Role</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Applied Date</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 bg-white">
                            {apps.map((app) => (
                                <tr key={app.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 bg-slate-100 rounded-lg border border-slate-200 flex items-center justify-center font-bold text-slate-600">
                                                {app.student.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-900 leading-tight">{app.student.name}</p>
                                                <p className="text-xs text-slate-500">{app.student.dept} • {app.student.cgpa} CGPA</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-sm font-medium text-slate-700">{app.job.title}</p>
                                        <p className="text-[10px] text-slate-400 font-bold uppercase">{app.job.type}</p>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-500">{app.appliedDate}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${app.status === 'Selected' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                                                app.status === 'Shortlisted' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                                                    app.status === 'Rejected' ? 'bg-red-50 text-red-700 border-red-100' :
                                                        'bg-slate-50 text-slate-700 border-slate-100'
                                            }`}>
                                            {app.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <select
                                            className="text-xs font-bold text-slate-600 bg-slate-50 border border-slate-200 rounded px-2 py-1 outline-none hover:border-primary-300 transition-all"
                                            value={app.status}
                                            onChange={(e) => handleStatusChange(app.id, e.target.value)}
                                        >
                                            <option value="Pending">Update Status</option>
                                            <option value="Shortlisted">Shortlist</option>
                                            <option value="Rejected">Reject</option>
                                            <option value="Selected">Select</option>
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

export default ApplicantManagement;

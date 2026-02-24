import React, { useState } from 'react';
import { Filter, Search, Download, FileText, CheckCircle2, ChevronDown, Calendar, Building2 } from 'lucide-react';
import { Card, Button, Input } from '../../components/UI';
import { STUDENTS } from '../../data/mockData';
import toast from 'react-hot-toast';

const PlacementRecords = () => {
    const [filterDept, setFilterDept] = useState('All');
    const [filterYear, setFilterYear] = useState('All');

    const handleDownload = () => {
        toast.success('Downloading placement records (excel)...');
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Placement Records</h1>
                    <p className="text-slate-500">Comprehensive database of student placements across departments.</p>
                </div>
                <Button onClick={handleDownload} className="flex items-center gap-2">
                    <Download size={18} />
                    <span>Export Records</span>
                </Button>
            </div>

            <Card>
                <div className="flex flex-wrap gap-4 mb-6">
                    <div className="flex-1 min-w-[200px] relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search student or company..."
                            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                        />
                    </div>
                    <div className="flex gap-2">
                        <select
                            className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary-500"
                            value={filterDept}
                            onChange={(e) => setFilterDept(e.target.value)}
                        >
                            <option value="All">All Departments</option>
                            <option value="CSE">CSE</option>
                            <option value="ECE">ECE</option>
                            <option value="EEE">EEE</option>
                        </select>
                        <select
                            className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary-500"
                            value={filterYear}
                            onChange={(e) => setFilterYear(e.target.value)}
                        >
                            <option value="All">All Years</option>
                            <option value="2024">2024</option>
                            <option value="2025">2025</option>
                            <option value="2026">2026</option>
                        </select>
                    </div>
                </div>

                <div className="w-full overflow-x-auto rounded-xl border border-slate-100">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-slate-50 border-b border-slate-100">
                            <tr>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Student</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Dept</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Batch</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Placement Status</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Company</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Package</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 bg-white">
                            {STUDENTS.map((student) => (
                                <tr key={student.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-slate-900">{student.name}</td>
                                    <td className="px-6 py-4 text-slate-600">{student.dept}</td>
                                    <td className="px-6 py-4 text-slate-600">2022-2026</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${student.status === 'Placed' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'
                                            }`}>
                                            {student.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-slate-700 font-semibold">{student.company || '—'}</td>
                                    <td className="px-6 py-4 text-slate-600">$12 LPA</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

export default PlacementRecords;

import React from 'react';
import { Users, Building2, Briefcase, GraduationCap, TrendingUp, ArrowUpRight } from 'lucide-react';
import { Card } from '../../components/UI';
import { STATS } from '../../data/mockData';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    AreaChart, Area, PieChart, Pie, Cell
} from 'recharts';

const data = [
    { name: 'CSE', placed: 120, total: 150 },
    { name: 'ECE', placed: 80, total: 120 },
    { name: 'EEE', placed: 40, total: 90 },
    { name: 'MECH', placed: 60, total: 110 },
    { name: 'CIVIL', placed: 30, total: 80 },
];

const StatCard = ({ title, value, icon: Icon, color, trend }) => (
    <Card className="flex flex-col">
        <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-xl ${color} bg-opacity-10`}>
                <Icon className={color.replace('bg-', 'text-')} size={24} />
            </div>
            {trend && (
                <span className="flex items-center text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                    <ArrowUpRight size={12} className="mr-1" />
                    {trend}
                </span>
            )}
        </div>
        <h3 className="text-slate-500 text-sm font-medium">{title}</h3>
        <p className="text-2xl font-bold text-slate-900 mt-1">{value}</p>
    </Card>
);

const AdminDashboard = () => {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Placement Overview</h1>
                <p className="text-slate-500">Welcome back, Admin. Here's what's happening today.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Students" value={STATS.totalStudents} icon={Users} color="bg-blue-600" trend="+12%" />
                <StatCard title="Active Companies" value={STATS.activeCompanies} icon={Building2} color="bg-purple-600" trend="+5%" />
                <StatCard title="Open Job Roles" value={STATS.openJobs} icon={Briefcase} color="bg-orange-600" trend="+18%" />
                <StatCard title="Placed Students" value={STATS.placedStudents} icon={GraduationCap} color="bg-emerald-600" trend="+24%" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card title="Placement by Department" subtitle="Number of students placed vs total eligible">
                    <div className="h-80 w-full mt-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    cursor={{ fill: '#f8fafc' }}
                                />
                                <Bar dataKey="placed" fill="#0ea5e9" radius={[4, 4, 0, 0]} barSize={32} />
                                <Bar dataKey="total" fill="#e2e8f0" radius={[4, 4, 0, 0]} barSize={32} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                <Card title="Activity Trend" subtitle="Applications and interviews over the last 6 months">
                    <div className="h-80 w-full mt-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="colorPlaced" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                <Area type="monotone" dataKey="placed" stroke="#0ea5e9" strokeWidth={3} fillOpacity={1} fill="url(#colorPlaced)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default AdminDashboard;

import React from 'react';
import {
    Users,
    Building2,
    Briefcase,
    CheckCircle2,
    TrendingUp,
    ArrowUpRight
} from 'lucide-react';
import { Card } from '../../components/UI';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell
} from 'recharts';

const StatCard = ({ title, value, icon: Icon, trend, color }) => (
    <Card className="relative overflow-hidden group">
        <div className="flex items-center justify-between">
            <div>
                <p className="text-sm font-medium text-slate-500">{title}</p>
                <h3 className="text-2xl font-bold text-slate-900 mt-1">{value}</h3>
                <div className="flex items-center gap-1 mt-2 text-emerald-600">
                    <TrendingUp size={14} />
                    <span className="text-xs font-bold">{trend}</span>
                </div>
            </div>
            <div className={`p-3 rounded-xl bg-${color}-50 text-${color}-600 group-hover:scale-110 transition-transform`}>
                <Icon size={24} />
            </div>
        </div>
    </Card>
);

const OfficerDashboard = () => {
    const data = [
        { name: 'CSE', placed: 45, total: 60 },
        { name: 'ECE', placed: 32, total: 55 },
        { name: 'EEE', placed: 28, total: 45 },
        { name: 'MECH', placed: 20, total: 50 },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Officer Dashboard</h1>
                    <p className="text-slate-500">Monitor academic placement progress and company engagement.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Students" value="450" icon={Users} trend="+12% from last batch" color="primary" />
                <StatCard title="Active Companies" value="24" icon={Building2} trend="4 new this week" color="emerald" />
                <StatCard title="Open Jobs" value="12" icon={Briefcase} trend="3 closing soon" color="amber" />
                <StatCard title="Total Placed" value="125" icon={CheckCircle2} trend="+18% since last month" color="indigo" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card title="Placement by Department">
                    <div className="h-[300px] w-full mt-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                                <Tooltip
                                    cursor={{ fill: '#f8fafc' }}
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                                />
                                <Bar dataKey="placed" name="Placed Students" radius={[4, 4, 0, 0]} barSize={40}>
                                    {data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={['#0284c7', '#0ea5e9', '#38bdf8', '#7dd3fc'][index % 4]} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                <Card title="Upcoming Drives">
                    <div className="space-y-4 mt-2">
                        {[
                            { company: 'Google', date: 'Oct 24, 2024', role: 'Software Engineer' },
                            { company: 'Microsoft', date: 'Oct 28, 2024', role: 'Product Manager' },
                            { company: 'Amazon', date: 'Nov 02, 2024', role: 'Solutions Architect' },
                            { company: 'Meta', date: 'Nov 10, 2024', role: 'Data Scientist' },
                        ].map((drive, idx) => (
                            <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-white rounded-lg border border-slate-200 flex items-center justify-center font-bold text-slate-700">
                                        {drive.company[0]}
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-slate-900">{drive.company}</h4>
                                        <p className="text-xs text-slate-500">{drive.role}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs font-bold text-slate-900">{drive.date}</p>
                                    <button className="text-xs font-semibold text-primary-600 hover:underline flex items-center gap-0.5">
                                        View Details <ArrowUpRight size={12} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default OfficerDashboard;

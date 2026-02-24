import React from 'react';
import { FileText, Download, TrendingUp, Users, CheckCircle2, AlertCircle, Calendar } from 'lucide-react';
import { Card, Button } from '../../components/UI';
import toast from 'react-hot-toast';

const ReportCard = ({ title, description, icon: Icon, type }) => (
    <div className="p-6 bg-white border border-slate-100 rounded-xl hover:shadow-md transition-all group">
        <div className="flex items-start justify-between mb-4">
            <div className={`p-3 rounded-lg ${type === 'stat' ? 'bg-primary-50 text-primary-600' : 'bg-slate-50 text-slate-600'}`}>
                <Icon size={24} />
            </div>
            <button
                onClick={() => toast.success(`Generating ${title}...`)}
                className="text-slate-400 hover:text-primary-600 transition-all"
            >
                <Download size={20} />
            </button>
        </div>
        <h3 className="text-lg font-bold text-slate-900 mb-1">{title}</h3>
        <p className="text-sm text-slate-500 mb-6">{description}</p>
        <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
            <Calendar size={14} />
            <span>Last generated: 2 days ago</span>
        </div>
    </div>
);

const Reports = () => {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Placement Reports</h1>
                <p className="text-slate-500">Generate and download analytical reports for stakeholders.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <ReportCard
                    title="Consolidated Placement Report"
                    description="Summary of placements across all departments with package details."
                    icon={FileText}
                    type="stat"
                />
                <ReportCard
                    title="Company Wise Selection"
                    description="Detailed breakdown of number of students selected per company."
                    icon={TrendingUp}
                    type="stat"
                />
                <ReportCard
                    title="Department Performance"
                    description="Comparison of placement percentages across different departments."
                    icon={Users}
                    type="stat"
                />
                <ReportCard
                    title="Eligibility vs Selections"
                    description="Analysis of eligible students vs actual placements achieved."
                    icon={CheckCircle2}
                />
                <ReportCard
                    title="Pending Applications"
                    description="List of students with pending applications and their stages."
                    icon={AlertCircle}
                />
            </div>

            <Card title="Custom Report Builder" className="bg-slate-900 text-white border-none">
                <div className="flex flex-col md:flex-row items-center gap-6 py-4">
                    <div className="flex-1">
                        <h4 className="text-lg font-bold mb-1">Need a specialized report?</h4>
                        <p className="text-slate-400 text-sm">Select metrics, departments, and date ranges to build your own report.</p>
                    </div>
                    <Button className="bg-primary-600 hover:bg-primary-500 border-none px-8">Launch Builder</Button>
                </div>
            </Card>
        </div>
    );
};

export default Reports;

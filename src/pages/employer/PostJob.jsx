import React, { useState } from 'react';
import { Plus, Briefcase, FileText, CheckCircle2, Info, Save } from 'lucide-react';
import { Card, Button, Input } from '../../components/UI';
import toast from 'react-hot-toast';

const PostJob = () => {
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            toast.success('Job posted successfully! Redirecting to dashboard...');
        }, 1500);
    };

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Create Job Posting</h1>
                <p className="text-slate-500">Provide clear details to attract the right candidates.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <Card title="Basic Information">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                            <Input label="Job Title" placeholder="e.g. Senior Frontend Developer" required />
                        </div>
                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-slate-700">Job Type</label>
                            <select className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none transition-all">
                                <option>Full-time</option>
                                <option>Internship</option>
                                <option>Part-time</option>
                                <option>Contract</option>
                            </select>
                        </div>
                        <Input label="Location" placeholder="e.g. Remote or City, State" required />
                        <Input label="Annual Package (CTC)" placeholder="e.g. $100,000" required />
                        <Input label="Application Deadline" type="date" required />
                    </div>
                </Card>

                <Card title="Requirements & Details">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Job Description</label>
                            <textarea
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none transition-all h-32"
                                placeholder="Describe the role, responsibilities, and team..."
                                required
                            ></textarea>
                        </div>
                        <Input label="Eligibility Criteria" placeholder="e.g. CGPA > 8.0, No backlogs" />
                        <Input label="Skills Required" placeholder="e.g. React, TypeScript, GraphQL" />
                    </div>
                </Card>

                <div className="flex items-center justify-end gap-3">
                    <Button variant="secondary" type="button">Discard Draft</Button>
                    <Button type="submit" className="px-8" disabled={loading}>
                        {loading ? 'Posting...' : 'Publish Job'}
                    </Button>
                </div>
            </form>

            <Card className="bg-blue-50 border-blue-100 flex gap-4 p-4">
                <div className="text-blue-600">
                    <Info size={24} />
                </div>
                <div>
                    <h4 className="text-sm font-bold text-blue-900">Hiring Tip</h4>
                    <p className="text-sm text-blue-700">Be specific about the salary range and tech stack to reduce irrelevant applications by up to 40%.</p>
                </div>
            </Card>
        </div>
    );
};

export default PostJob;

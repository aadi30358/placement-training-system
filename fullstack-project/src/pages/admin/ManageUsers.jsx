import React, { useState } from 'react';
import { Search, Filter, Plus, Edit2, Trash2, MoreVertical, CheckCircle2, XCircle, Clock } from 'lucide-react';
import { Button, Input, Card } from '../../components/UI';
import { useData } from '../../context/DataContext';
import toast from 'react-hot-toast';

const Table = ({ headers, children }) => (
    <div className="w-full overflow-x-auto rounded-xl border border-slate-100 shadow-sm">
        <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                    {headers.map((header, i) => (
                        <th key={i} className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            {header}
                        </th>
                    ))}
                    <th className="px-6 py-4"></th>
                </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
                {children}
            </tbody>
        </table>
    </div>
);

const UserManagement = () => {
    const { students, deleteStudent, updateStudent } = useData();
    const [searchTerm, setSearchTerm] = useState('');

    const filteredStudents = students.filter(s =>
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.roll.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this student?')) {
            deleteStudent(id);
            toast.success('Student record deleted');
        }
    };

    const handleEdit = (student) => {
        const newName = prompt('Enter new name:', student.name);
        if (newName) {
            updateStudent(student.id, { name: newName });
            toast.success('Profile updated');
        }
    };

    const getStatusBadge = (status) => {
        const styles = {
            'Placed': 'bg-emerald-50 text-emerald-700 border-emerald-100',
            'Not Placed': 'bg-slate-50 text-slate-700 border-slate-100',
            'Pending': 'bg-amber-50 text-amber-700 border-amber-100',
        };
        return (
            <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${styles[status]}`}>
                {status}
            </span>
        );
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">User Management</h1>
                    <p className="text-slate-500">Manage student profiles, roles, and records.</p>
                </div>
                <Button className="flex items-center gap-2">
                    <Plus size={18} />
                    <span>Add New User</span>
                </Button>
            </div>

            <Card>
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search by name or roll number..."
                            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2">
                        <Button variant="secondary" className="flex items-center gap-2">
                            <Filter size={18} />
                            <span>Filter</span>
                        </Button>
                    </div>
                </div>

                <Table headers={['Student Name', 'Roll Number', 'Dept', 'CGPA', 'Status', 'Company']}>
                    {filteredStudents.map((student) => (
                        <tr key={student.id} className="hover:bg-slate-50 transition-colors group">
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center font-bold text-xs uppercase">
                                        {student.name.charAt(0)}
                                    </div>
                                    <span className="font-medium text-slate-900">{student.name}</span>
                                </div>
                            </td>
                            <td className="px-6 py-4 text-slate-600">{student.roll}</td>
                            <td className="px-6 py-4">
                                <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-xs font-bold uppercase">{student.dept}</span>
                            </td>
                            <td className="px-6 py-4 font-semibold text-slate-700">{student.cgpa}</td>
                            <td className="px-6 py-4">{getStatusBadge(student.status)}</td>
                            <td className="px-6 py-4 text-slate-600">{student.company || '—'}</td>
                            <td className="px-6 py-4 text-right">
                                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => handleEdit(student)} className="p-1 text-slate-400 hover:text-primary-600 transition-all"><Edit2 size={16} /></button>
                                    <button onClick={() => handleDelete(student.id)} className="p-1 text-slate-400 hover:text-red-600 transition-all"><Trash2 size={16} /></button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </Table>

                {filteredStudents.length === 0 && (
                    <div className="py-12 text-center">
                        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-dashed border-slate-300">
                            <Clock className="text-slate-300" size={32} />
                        </div>
                        <p className="text-slate-500 font-medium">No results found matching your search</p>
                    </div>
                )}
            </Card>
        </div>
    );
};

export default UserManagement;

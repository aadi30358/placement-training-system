import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard,
    Users,
    Briefcase,
    FileText,
    Settings,
    LogOut,
    GraduationCap,
    Building2,
    Bell,
    User
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const SidebarItem = ({ to, icon: Icon, label }) => (
    <NavLink
        to={to}
        className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive
                ? 'bg-primary-50 text-primary-600 font-semibold'
                : 'text-slate-600 hover:bg-slate-50'
            }`
        }
    >
        <Icon size={20} />
        <span>{label}</span>
    </NavLink>
);

export const Sidebar = ({ role }) => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const menuItems = {
        admin: [
            { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
            { to: '/admin/users', icon: Users, label: 'Manage Users' },
        ],
        student: [
            { to: '/student/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
            { to: '/student/jobs', icon: Briefcase, label: 'Browse Jobs' },
            { to: '/student/applications', icon: FileText, label: 'My Applications' },
        ],
        employer: [
            { to: '/employer/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
            { to: '/employer/jobs', icon: Briefcase, label: 'Posted Jobs' },
        ],
        officer: [
            { to: '/officer/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
            { to: '/officer/records', icon: FileText, label: 'Placement Records' },
            { to: '/officer/reports', icon: Bell, label: 'Reports' },
        ],
    };

    return (
        <aside className="w-64 h-screen fixed left-0 top-0 bg-white border-r border-slate-100 flex flex-col p-4 z-20">
            <div className="flex items-center gap-3 px-4 mb-8">
                <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center text-white">
                    <GraduationCap size={24} />
                </div>
                <span className="text-xl font-bold text-slate-900 tracking-tight">PTS</span>
            </div>

            <nav className="flex-1 space-y-1">
                {menuItems[role]?.map((item) => (
                    <SidebarItem key={item.to} {...item} />
                ))}
            </nav>

            <div className="pt-4 border-t border-slate-100 space-y-1">
                <SidebarItem to="/settings" icon={Settings} label="Settings" />
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-red-50 hover:text-red-600 transition-all"
                >
                    <LogOut size={20} />
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
};

export const Navbar = ({ role }) => {
    const { user } = useAuth();

    return (
        <header className="h-16 fixed top-0 right-0 left-64 bg-white/80 backdrop-blur-md border-b border-slate-100 flex items-center justify-between px-8 z-10">
            <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-slate-500 capitalize">{role} Central</span>
            </div>

            <div className="flex items-center gap-4">
                <button className="p-2 text-slate-400 hover:bg-slate-50 rounded-full relative transition-all">
                    <Bell size={20} />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                </button>

                <div className="flex items-center gap-3 pl-4 border-l border-slate-100">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-semibold text-slate-900 leading-tight">{user?.name || 'Guest User'}</p>
                        <span className="text-xs text-slate-500 uppercase font-medium">{role}</span>
                    </div>
                    <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 overflow-hidden border border-slate-200">
                        <User size={24} />
                    </div>
                </div>
            </div>
        </header>
    );
};

import React, { useState } from 'react';
import { NavLink, useNavigate, useLocation, Navigate, Outlet } from 'react-router-dom';
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
import { useData } from '../context/DataContext';

const SidebarItem = ({ to, icon: Icon, label }) => (
    <NavLink
        to={to}
        className={({ isActive }) =>
            `flex items-center gap-3 px-5 py-3.5 rounded-xl transition-all font-bold text-sm ${isActive
                ? 'bg-primary-50 text-primary-600 shadow-sm shadow-primary-100/50'
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
            }`
        }
    >
        <Icon size={18} />
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
            { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Overview' },
            { to: '/admin/users', icon: Users, label: 'Campus Users' },
            { to: '/admin/profile', icon: User, label: 'My Admin Profile' },
        ],
        student: [
            { to: '/student/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
            { to: '/student/jobs', icon: Briefcase, label: 'Job Board' },
            { to: '/student/applications', icon: FileText, label: 'My Track' },
            { to: '/student/profile', icon: User, label: 'Placement CV' },
        ],
        employer: [
            { to: '/employer/dashboard', icon: LayoutDashboard, label: 'Stats' },
            { to: '/employer/jobs', icon: Briefcase, label: 'Hiring Posts' },
            { to: '/employer/applicants', icon: Users, label: 'Talent Pool' },
            { to: '/employer/profile', icon: User, label: 'Company Hub' },
        ],
        officer: [
            { to: '/officer/dashboard', icon: LayoutDashboard, label: 'Insights' },
            { to: '/officer/records', icon: FileText, label: 'Student Data' },
            { to: '/officer/reports', icon: Bell, label: 'Placement Pulse' },
            { to: '/officer/profile', icon: User, label: 'Officer Desk' },
        ],
    };

    return (
        <aside className="w-64 h-screen fixed left-0 top-0 bg-white border-r border-slate-100 flex flex-col p-6 z-20">
            <div className="flex items-center gap-3 mb-10 px-2">
                <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary-200">
                    <GraduationCap size={24} />
                </div>
                <div className="flex flex-col">
                    <span className="text-xl font-black text-slate-900 tracking-tighter leading-none">Job Finder</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Campus Edition</span>
                </div>
            </div>

            <nav className="flex-1 space-y-2">
                {menuItems[role]?.map((item) => (
                    <SidebarItem key={item.to} {...item} />
                ))}
            </nav>

            <div className="pt-6 border-t border-slate-100 space-y-2">
                <SidebarItem to="/settings" icon={Settings} label="Global Settings" />
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:bg-red-50 hover:text-red-600 transition-all font-bold text-sm"
                >
                    <LogOut size={18} />
                    <span>Exit Portal</span>
                </button>
            </div>
        </aside>
    );
};

export const Navbar = ({ role }) => {
    const { user } = useAuth();
    const { notifications, markNotificationAsRead } = useData();
    const [showNotifs, setShowNotifs] = useState(false);

    const userNotifs = notifications.filter(n => n.userId === user?.id);
    const unreadCount = userNotifs.filter(n => !n.read).length;

    return (
        <header className="h-20 fixed top-0 right-0 left-64 bg-white/90 backdrop-blur-xl border-b border-slate-100 flex items-center justify-between px-10 z-10">
            <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-primary-50 text-primary-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-primary-100 italic">
                    {role} Level
                </span>
            </div>

            <div className="flex items-center gap-6">
                <div className="relative">
                    <button
                        className="p-2.5 text-slate-400 hover:bg-slate-50 rounded-xl relative transition-all border border-transparent hover:border-slate-100"
                        onClick={() => setShowNotifs(!showNotifs)}
                    >
                        <Bell size={20} />
                        {unreadCount > 0 && (
                            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-primary-600 rounded-full border-2 border-white"></span>
                        )}
                    </button>

                    {showNotifs && (
                        <div className="absolute right-0 mt-3 w-80 bg-white border border-slate-100 rounded-2xl shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                            <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-50">
                                <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight">Notifications</h4>
                                <span className="text-[10px] font-black text-primary-600 whitespace-nowrap">{unreadCount} New</span>
                            </div>
                            <div className="max-h-64 overflow-y-auto space-y-2 scrollbar-none">
                                {userNotifs.length > 0 ? userNotifs.map(n => (
                                    <div
                                        key={n.id}
                                        className={`p-3 rounded-xl border transition-all cursor-pointer ${n.read ? 'bg-white border-slate-50 opacity-60' : 'bg-primary-50/30 border-primary-50'}`}
                                        onClick={() => {
                                            markNotificationAsRead(n.id);
                                            setShowNotifs(false);
                                        }}
                                    >
                                        <p className="text-xs font-bold text-slate-800 leading-snug">{n.message}</p>
                                        <p className="text-[9px] text-slate-400 mt-1 font-medium">{new Date(n.date).toLocaleTimeString()}</p>
                                    </div>
                                )) : (
                                    <p className="text-center py-6 text-slate-400 text-xs font-medium italic">All caught up!</p>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-4 pl-6 border-l border-slate-100">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-black text-slate-900 leading-tight tracking-tight">{user?.name || 'Academic User'}</p>
                        <span className="text-[10px] text-primary-600 uppercase font-black tracking-widest leading-none">{role}</span>
                    </div>
                    <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-600 overflow-hidden border-2 border-white shadow-sm ring-1 ring-slate-100">
                        <User size={26} />
                    </div>
                </div>
            </div>
        </header>
    );
};

export const Layout = ({ allowedRoles = [] }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) return null;

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} />;
    }

    if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
        return <Navigate to="/unauthorized" />;
    }

    const isInternal = location.pathname.includes('/student/') ||
        location.pathname.includes('/admin/') ||
        location.pathname.includes('/employer/') ||
        location.pathname.includes('/officer/') ||
        location.pathname === '/settings';

    if (isInternal) {
        return (
            <div className="flex bg-slate-50">
                <Sidebar role={user.role} />
                <div className="flex-1 flex flex-col pl-64">
                    <Navbar role={user.role} />
                    <main className="flex-1 p-8 mt-20">
                        <Outlet />
                    </main>
                </div>
            </div>
        );
    }

    return <Outlet />;
};

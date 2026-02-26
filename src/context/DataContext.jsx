import React, { createContext, useContext, useState, useEffect } from 'react';
import { JOBS as INITIAL_JOBS, APPLICATIONS as INITIAL_APPLICATIONS, STUDENTS as INITIAL_STUDENTS } from '../data/mockData';
import { useAuth } from './AuthContext';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const { user } = useAuth();

    const [jobs, setJobs] = useState(() => {
        const savedJobs = localStorage.getItem('pts_jobs');
        return savedJobs ? JSON.parse(savedJobs) : INITIAL_JOBS;
    });

    const [applications, setApplications] = useState(() => {
        const savedApps = localStorage.getItem('pts_applications');
        return savedApps ? JSON.parse(savedApps) : INITIAL_APPLICATIONS;
    });

    const [notifications, setNotifications] = useState(() => {
        const savedNotifications = localStorage.getItem('pts_notifications');
        return savedNotifications ? JSON.parse(savedNotifications) : [];
    });

    useEffect(() => {
        localStorage.setItem('pts_notifications', JSON.stringify(notifications));
    }, [notifications]);

    const addNotification = (userId, message, type = 'info') => {
        const newNotif = {
            id: Date.now(),
            userId,
            message,
            type,
            date: new Date().toISOString(),
            read: false
        };
        setNotifications(prev => [newNotif, ...prev]);
    };

    const markNotificationAsRead = (notifId) => {
        setNotifications(prev => prev.map(n => n.id === notifId ? { ...n, read: true } : n));
    };

    const applyForJob = (jobId) => {
        if (!user) return false;

        const job = jobs.find(j => j.id === jobId);
        if (!job) return false;

        // Prevent duplicate applications
        const alreadyApplied = applications.find(
            app => app.jobId === jobId && app.studentId === user.id
        );

        if (alreadyApplied) return false;

        const newApplication = {
            id: Date.now(),
            jobId,
            studentId: user.id,
            status: 'Applied',
            appliedDate: new Date().toISOString().split('T')[0]
        };

        setApplications(prev => [newApplication, ...prev]);

        // Notify the officer or just a general system log (simulated)
        addNotification(user.id, `You applied for ${job.title} at ${job.company}`, 'success');

        return true;
    };

    const [students, setStudents] = useState(() => {
        const savedStudents = localStorage.getItem('pts_students');
        return savedStudents ? JSON.parse(savedStudents) : INITIAL_STUDENTS;
    });

    const [employers, setEmployers] = useState(() => {
        const savedEmployers = localStorage.getItem('pts_employers');
        return savedEmployers ? JSON.parse(savedEmployers) : [
            { id: 'emp1', name: 'HR Manager', company: 'Google', email: 'hr@google.com', industry: 'Tech', location: 'Mountain View' },
            { id: 'emp2', name: 'Recruiter', company: 'Amazon', email: 'recruitment@amazon.com', industry: 'E-commerce', location: 'Seattle' }
        ];
    });

    const [officers, setOfficers] = useState(() => {
        const savedOfficers = localStorage.getItem('pts_officers');
        return savedOfficers ? JSON.parse(savedOfficers) : [
            { id: 'off1', name: 'Dr. John Doe', depts: ['CSE', 'ECE'], email: 'john@college.edu', role: 'Chief Officer' }
        ];
    });

    useEffect(() => {
        localStorage.setItem('pts_students', JSON.stringify(students));
    }, [students]);

    useEffect(() => {
        localStorage.setItem('pts_employers', JSON.stringify(employers));
    }, [employers]);

    useEffect(() => {
        localStorage.setItem('pts_officers', JSON.stringify(officers));
    }, [officers]);

    const getStudentApplications = (studentId) => {
        return applications
            .filter(app => app.studentId === studentId)
            .map(app => ({
                ...app,
                job: jobs.find(j => j.id === app.jobId)
            }));
    };

    const addJob = (jobData) => {
        const newJob = {
            ...jobData,
            id: Date.now(),
            postedAt: jobData.postedAt || new Date().toISOString()
        };
        setJobs(prev => [newJob, ...prev]);
        addNotification(user?.id, `New job opportunity posted: ${newJob.title}`, 'success');
        return true;
    };

    const updateJob = (jobId, data) => {
        setJobs(prev => prev.map(j => j.id === jobId ? { ...j, ...data } : j));
    };

    const deleteJob = (jobId) => {
        setJobs(prev => prev.filter(j => j.id !== jobId));
        // Also cleanup applications for this job
        setApplications(prev => prev.filter(app => app.jobId !== jobId));
    };

    const updateApplicationStatus = (appId, newStatus) => {
        setApplications(prev => prev.map(app => {
            if (app.id === appId) {
                const job = jobs.find(j => j.id === app.jobId);
                addNotification(app.studentId, `Your application for ${job?.title} status changed to ${newStatus}`, 'info');
                return { ...app, status: newStatus };
            }
            return app;
        }));
    };

    const addStudent = (data) => {
        const newStudent = {
            ...data,
            id: data.id || Date.now(),
            status: data.status || 'Pending',
            joinedDate: new Date().toISOString().split('T')[0]
        };
        setStudents(prev => [newStudent, ...prev]);
        return newStudent;
    };

    const deleteStudent = (id) => setStudents(prev => prev.filter(s => s.id !== id));
    const updateStudent = (id, data) => setStudents(prev => prev.map(s => s.id === id ? { ...s, ...data } : s));

    const addEmployer = (data) => {
        const newEmp = { ...data, id: Date.now() };
        setEmployers(prev => [newEmp, ...prev]);
        return newEmp;
    };
    const deleteEmployer = (id) => setEmployers(prev => prev.filter(e => e.id !== id));
    const updateEmployer = (id, data) => setEmployers(prev => prev.map(e => e.id === id ? { ...e, ...data } : e));

    const addOfficer = (data) => {
        const newOff = { ...data, id: Date.now() };
        setOfficers(prev => [newOff, ...prev]);
        return newOff;
    };
    const deleteOfficer = (id) => setOfficers(prev => prev.filter(o => o.id !== id));
    const updateOfficer = (id, data) => setOfficers(prev => prev.map(o => o.id === id ? { ...o, ...data } : o));

    const withdrawApplication = (appId) => {
        const app = applications.find(a => a.id === appId);
        if (app) {
            const job = jobs.find(j => j.id === app.jobId);
            setApplications(prev => prev.filter(a => a.id !== appId));
            addNotification(app.studentId, `You withdrew your application for ${job?.title}`, 'info');
            return true;
        }
        return false;
    };

    const value = {
        jobs,
        applications,
        students,
        employers,
        officers,
        notifications,
        applyForJob,
        withdrawApplication,
        getStudentApplications,
        addJob,
        updateJob,
        deleteJob,
        updateApplicationStatus,
        updateStudent,
        deleteStudent,
        addStudent,
        addEmployer,
        deleteEmployer,
        updateEmployer,
        addOfficer,
        deleteOfficer,
        updateOfficer,
        addNotification,
        markNotificationAsRead,
        setJobs,
        setApplications,
        setStudents,
        setEmployers,
        setOfficers
    };

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
};

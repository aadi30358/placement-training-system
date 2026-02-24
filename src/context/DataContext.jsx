import React, { createContext, useContext, useState, useEffect } from 'react';
import { JOBS as INITIAL_JOBS, APPLICATIONS as INITIAL_APPLICATIONS } from '../data/mockData';
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

    useEffect(() => {
        localStorage.setItem('pts_jobs', JSON.stringify(jobs));
    }, [jobs]);

    useEffect(() => {
        localStorage.setItem('pts_applications', JSON.stringify(applications));
    }, [applications]);

    const applyForJob = (jobId) => {
        if (!user) return false;

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
        return true;
    };

    const getStudentApplications = (studentId) => {
        return applications
            .filter(app => app.studentId === studentId)
            .map(app => ({
                ...app,
                job: jobs.find(j => j.id === app.jobId)
            }));
    };

    const value = {
        jobs,
        applications,
        applyForJob,
        getStudentApplications,
        setJobs,
        setApplications
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

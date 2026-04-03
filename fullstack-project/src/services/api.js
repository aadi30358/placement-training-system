import axios from 'axios';

const api = axios.create({
    baseURL: 'https://placeholder-api.example.com',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getJobs = () => api.get('/jobs');
export const getApplications = () => api.get('/applications');
export const updateApplicationStatus = (id, status) => api.patch(`/applications/${id}`, { status });

export default api;

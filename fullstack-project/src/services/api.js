import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getJobs = () => api.get('/jobs');
export const getApplications = () => api.get('/applications');
export const updateApplicationStatus = (id, status) => api.patch(`/applications/${id}`, { status });

export default api;

// src/pages/MyTasks.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MyTasks = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('No token found. Please log in.');
                }
                const res = await axios.get('http://localhost:5000/api/tasks', {
                    headers: { 'x-auth-token': token },
                });
                setTasks(res.data);
            } catch (err) {
                console.error(err);
                setError('Failed to fetch tasks.');
            } finally {
                setLoading(false);
            }
        };

        fetchTasks();
    }, []);

    if (loading) {
        return <div className="text-center p-10">Loading tasks...</div>;
    }

    if (error) {
        return <div className="text-center p-10 text-red-500">{error}</div>;
    }

    return (
        <div className="p-4 md:p-6 text-slate-900 dark:text-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-8">My Tasks</h1>
            <div className="space-y-4">
                {tasks.length > 0 ? (
                    tasks.map(task => (
                        <div key={task._id} className="bg-white dark:bg-slate-700 p-4 rounded-lg shadow-md flex justify-between items-center">
                            <div>
                                <h3 className="text-lg font-semibold">{task.title}</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{task.description}</p>
                            </div>
                            <span 
                                className={`px-3 py-1 text-sm font-medium rounded-full ${
                                    task.status === 'To Do' ? 'bg-gray-200 text-gray-800' :
                                    task.status === 'In Progress' ? 'bg-blue-200 text-blue-800' :
                                    'bg-green-200 text-green-800'
                                }`}
                            >
                                {task.status}
                            </span>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500">You have no tasks yet.</p>
                )}
            </div>
        </div>
    );
};

export default MyTasks;
// src/pages/Dashboard.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios'; // For making API calls
import { DndContext, closestCorners } from '@dnd-kit/core';
import Column from '../components/Column';
import AddTaskModal from '../components/AddTaskModal';

// This component no longer needs setTasks from App.js, but it's good to keep it for optimistic UI updates
const Dashboard = () => {
  // 1. State for tasks, loading, and errors
  const [tasks, setTasks] = useState({
    todo: [],
    inProgress: [],
    done: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 2. useEffect to fetch tasks from the backend when the component mounts
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found. Please log in.');
        }

        // Replace with your actual API endpoint for fetching tasks
        const res = await axios.get('http://localhost:5000/api/tasks', {
          headers: { 'x-auth-token': token },
        });

        // Assuming the API returns an array of tasks, we need to categorize them
        const categorizedTasks = { todo: [], inProgress: [], done: [] };
        res.data.forEach(task => {
          if (categorizedTasks[task.status]) {
            categorizedTasks[task.status].push(task);
          }
        });
        
        setTasks(categorizedTasks);
      } catch (err) {
        setError('Failed to fetch tasks. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []); // The empty dependency array means this runs once on mount

  // Your logic for modal and drag-and-drop remains the same
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addingToColumn, setAddingToColumn] = useState(null);

  const openModal = (columnId) => {
    setAddingToColumn(columnId);
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

  const handleAddTask = async (newTask, columnId) => {
    // Here you would also make an API call to save the new task
    // For now, we'll just update the local state (optimistic update)
    setTasks(prevTasks => ({
      ...prevTasks,
      [columnId]: [...prevTasks[columnId], { ...newTask, status: columnId }],
    }));
  };
  
  const handleDragEnd = (event) => { /* ... your existing logic ... */ };

  // 3. Render loading or error states
  if (loading) {
    return <div className="text-center p-10">Loading tasks...</div>;
  }
  if (error) {
    return <div className="text-center p-10 text-red-500">{error}</div>;
  }

  // 4. Main component return
  return (
    <div className="p-4 md:p-6 text-slate-900 dark:text-white">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold">Project Dashboard</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Welcome back! Let's get things done today. 😊
        </p>
      </div>

      <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries({
            todo: "To Do ✏️",
            inProgress: "In Progress 🚀",
            done: "Done ✅",
          }).map(([columnId, title]) => (
            <Column
              key={columnId}
              id={columnId}
              title={title}
              tasks={tasks[columnId]}
              onAddTaskClick={openModal}
            />
          ))}
        </div>
      </DndContext>
      
      <AddTaskModal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        onAddTask={handleAddTask}
        columnId={addingToColumn}
      />
    </div>
  );
};

export default Dashboard;
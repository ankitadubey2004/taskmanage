import React, { useState } from 'react';
import { DndContext, closestCorners } from '@dnd-kit/core';
import Column from '../components/Column';

const Dashboard = () => {
  // Mock data for initial tasks
  const initialTasks = {
    todo: [
      { id: '1', title: 'Setup project repository', description: 'Initialize git and push to GitHub.', priority: 'High', deadline: '2025-09-25' },
      { id: '2', title: 'Design the database schema', description: 'Plan the tables for users and tasks.', priority: 'Medium', deadline: '2025-09-26' },
    ],
    inProgress: [
      { id: '3', title: 'Develop login UI', description: 'Create the login form component.', priority: 'High', deadline: '2025-09-24' },
    ],
    done: [
      { id: '4', title: 'Create React App', description: 'Setup the initial frontend boilerplate.', priority: 'Low', deadline: '2025-09-23' },
    ],
  };

  const [tasks, setTasks] = useState(initialTasks);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    let sourceColumn, destinationColumn;
    let draggedTask;

    // Find the source column and the dragged task
    Object.keys(tasks).forEach(columnId => {
      const column = tasks[columnId];
      const taskIndex = column.findIndex(task => task.id === activeId);
      if (taskIndex !== -1) {
        sourceColumn = columnId;
        draggedTask = column[taskIndex];
      }
    });

    // Find the destination column
    Object.keys(tasks).forEach(columnId => {
      const column = tasks[columnId];
      if (columnId === overId || column.some(task => task.id === overId)) {
        destinationColumn = columnId;
      }
    });
    
    if (!sourceColumn || !destinationColumn) return;

    setTasks(prevTasks => {
      const newTasks = { ...prevTasks };
      
      const sourceTasks = [...newTasks[sourceColumn]];
      const taskIndex = sourceTasks.findIndex(task => task.id === activeId);
      sourceTasks.splice(taskIndex, 1);
      newTasks[sourceColumn] = sourceTasks;

      const destTasks = [...newTasks[destinationColumn]];
      const overTaskIndex = destTasks.findIndex(task => task.id === overId);
      
      if (overTaskIndex !== -1) {
        destTasks.splice(overTaskIndex, 0, draggedTask);
      } else {
        destTasks.push(draggedTask);
      }
      newTasks[destinationColumn] = destTasks;

      return newTasks;
    });
  };

  // --- UPDATED PART IS BELOW ---
  return (
    // The main div is now simplified and theme-aware
    <div className="text-slate-900 dark:text-white">
      <h1 className="text-4xl font-bold mb-8">Project Dashboard</h1>
      <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
        {/* The flex container is now responsive */}
        <div className="flex flex-col md:flex-row gap-8">
          <Column id="todo" title="To Do" tasks={tasks.todo} />
          <Column id="inProgress" title="In Progress" tasks={tasks.inProgress} />
          <Column id="done" title="Done" tasks={tasks.done} />
        </div>
      </DndContext>
    </div>
  );
};

export default Dashboard;
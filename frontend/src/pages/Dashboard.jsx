import React from 'react';
import { DndContext, closestCorners } from '@dnd-kit/core';
import Column from '../components/Column';

// The component now accepts props: `tasks` and `setTasks`
const Dashboard = ({ tasks, setTasks }) => {

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
    
    if (!sourceColumn || !destinationColumn || !draggedTask) return;

    // Use the `setTasks` function passed from the parent
    setTasks(prevTasks => {
      const newTasks = { ...prevTasks };
      
      // Remove task from the source column
      const sourceTasks = [...newTasks[sourceColumn]];
      const taskIndex = sourceTasks.findIndex(task => task.id === activeId);
      sourceTasks.splice(taskIndex, 1);
      newTasks[sourceColumn] = sourceTasks;

      // Add task to the destination column
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

  return (
    <div className="text-slate-900 dark:text-white">
      <h1 className="text-4xl font-bold mb-8">Project Dashboard</h1>
      <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
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
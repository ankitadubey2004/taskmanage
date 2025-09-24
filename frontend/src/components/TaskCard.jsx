import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const TaskCard = ({ task }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    // A slightly more visible opacity for dragging
    opacity: isDragging ? 0.7 : 1,
  };

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'High': return 'bg-red-500';
      case 'Medium': return 'bg-yellow-500';
      case 'Low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      // UPDATED: Now has light and dark background colors
      className="bg-white dark:bg-slate-700 p-4 rounded-lg shadow-md mb-4 cursor-grab active:cursor-grabbing"
    >
      {/* UPDATED: Text colors change with the theme */}
      <h3 className="font-bold text-lg text-slate-800 dark:text-white">{task.title}</h3>
      <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">{task.description}</p>
      <div className="mt-4 flex justify-between items-center">
        <span className="text-xs text-gray-500 dark:text-gray-400">{task.deadline}</span>
        <span className={`px-2 py-1 text-xs font-bold rounded-full text-white ${getPriorityClass(task.priority)}`}>
          {task.priority}
        </span>
      </div>
    </div>
  );
};

export default TaskCard;
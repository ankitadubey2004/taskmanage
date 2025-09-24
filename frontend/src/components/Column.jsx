// src/components/Column.jsx

import React from 'react';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useDroppable } from '@dnd-kit/core';
import TaskCard from './TaskCard';
import { PlusCircleIcon } from '@heroicons/react/24/outline';

// EDITED: Accept the onAddTaskClick prop
const Column = ({ id, title, tasks, onAddTaskClick }) => {
  const { setNodeRef, isOver } = useDroppable({ id });

  const droppableStyle = {
    backgroundColor: isOver ? 'rgba(59, 130, 246, 0.1)' : undefined, // Light blue with opacity
    transition: 'background-color 0.2s ease-in-out',
  };

  return (
    <div className="w-full bg-slate-100 dark:bg-slate-800/50 rounded-xl shadow-sm flex flex-col flex-shrink-0">
      <div className="flex justify-between items-center p-4 border-b border-slate-200 dark:border-slate-700">
        <h2 className="text-lg font-semibold text-slate-700 dark:text-slate-200">{title}</h2>
        <span className="bg-slate-200 dark:bg-slate-700 text-sm font-medium px-2.5 py-1 rounded-full">
          {tasks.length}
        </span>
      </div>

      <div
        ref={setNodeRef}
        style={droppableStyle}
        className="p-4 space-y-4 overflow-y-auto min-h-[200px] flex-grow"
      >
        <SortableContext items={tasks.map(task => task.id)} strategy={verticalListSortingStrategy}>
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </SortableContext>
      </div>

      <div className="p-4 border-t border-slate-200 dark:border-slate-700">
        {/* EDITED: Button now opens the modal */}
        <button
          onClick={() => onAddTaskClick(id)}
          className="flex items-center justify-center w-full gap-2 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 p-2 rounded-lg transition-colors"
        >
          <PlusCircleIcon className="w-5 h-5" />
          <span>Add Task</span>
        </button>
      </div>
    </div>
  );
};

export default Column;
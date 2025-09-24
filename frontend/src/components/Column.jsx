import React from 'react';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import TaskCard from './TaskCard';

const Column = ({ id, title, tasks }) => {
  return (
    // UPDATED: Now has light and dark background colors
    <div className="w-full md:w-80 bg-slate-200 dark:bg-slate-800 rounded-lg shadow-lg flex-shrink-0">
      {/* UPDATED: Text color is inherited and border changes with theme */}
      <h2 className="text-xl font-bold p-4 border-b border-slate-300 dark:border-slate-700">{title}</h2>
      <div className="p-4 min-h-[200px]">
        <SortableContext items={tasks.map(task => task.id)} strategy={verticalListSortingStrategy}>
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </SortableContext>
      </div>
    </div>
  );
};

export default Column;
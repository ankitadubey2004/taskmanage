import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const TaskCard = ({ task, onDelete }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: String(task._id) }); // ✅ force id as string

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.7 : 1,
  };

  const getPriorityClass = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-500";
      case "Medium":
        return "bg-yellow-500";
      case "Low":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-white dark:bg-slate-700 p-4 rounded-lg shadow-md mb-4 cursor-grab active:cursor-grabbing"
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="font-bold text-lg text-slate-800 dark:text-white">
            {task.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
            {task.description}
          </p>
        </div>

        <button
          onClick={() => onDelete(task._id)}
          className="p-1 text-red-500 hover:bg-red-100 dark:hover:bg-red-900 rounded-full transition-colors"
          aria-label="Delete task"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-9H8a2 2 0 00-2 2v2a2 2 0 002 2h8a2 2 0 002-2v-2a2 2 0 00-2-2z"
            />
          </svg>
        </button>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {task.deadline}
        </span>
        <span
          className={`px-2 py-1 text-xs font-bold rounded-full text-white ${getPriorityClass(
            task.priority
          )}`}
        >
          {task.priority}
        </span>
      </div>
    </div>
  );
};

export default TaskCard;

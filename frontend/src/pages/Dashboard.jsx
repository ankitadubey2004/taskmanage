import React, { useState, useEffect } from "react";
import axios from "axios";
import { DndContext, closestCorners } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import Column from "../components/Column";
import AddTaskModal from "../components/AddTaskModal.jsx";

const API_BASE = import.meta.env.VITE_API_URL;

const Dashboard = () => {
  const [tasks, setTasks] = useState({ "To Do": [], "In Progress": [], Completed: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addingToColumn, setAddingToColumn] = useState(null);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found. Please log in.");

      const res = await axios.get(`${API_BASE}/api/tasks`, { headers: { "x-auth-token": token } });

      const categorizedTasks = { "To Do": [], "In Progress": [], Completed: [] };
      res.data.forEach((task) => {
        if (categorizedTasks[task.status]) categorizedTasks[task.status].push(task);
      });

      setTasks(categorizedTasks);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch tasks. Ensure you are logged in and the server is running.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const openModal = (columnId) => {
    setAddingToColumn(columnId);
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

  const handleAddTask = async (newTask, columnId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found. Please log in.");

      const taskWithStatus = { ...newTask, status: columnId };
      const res = await axios.post(`${API_BASE}/api/tasks`, taskWithStatus, { headers: { "x-auth-token": token } });


      setTasks((prev) => ({
        ...prev,
        [columnId]: [...prev[columnId], res.data],
      }));

      closeModal();
    } catch (err) {
      console.error(err);
      setError("Failed to add task.");
    }
  };

  // src/pages/Dashboard.jsx

  const handleDeleteTask = async (columnId, taskId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    // Optimistically remove the task from the UI
    setTasks((prev) => ({
      ...prev,
      [columnId]: prev[columnId].filter((t) => t._id !== taskId),
    }));

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Authentication failed. Please log in again.");
        return;
      }

      await axios.delete(`${API_BASE}/api/tasks/${taskId}`, { headers: { "x-auth-token": token } });

      console.log("Task deleted successfully!"); // Success message
    } catch (err) {
      console.error("Failed to delete task:", err.response ? err.response.data : err.message);
      setError("Failed to delete task. Reverting changes.");
      // Revert the UI by re-fetching all tasks
      fetchTasks();
    }
  };
  // In src/pages/Dashboard.jsx

  // In src/pages/Dashboard.jsx

  const handleDragEnd = async ({ active, over }) => {
    // Add this crucial check to ensure the drag operation was valid
    // It prevents the function from running on a simple click.

    if (!active || !over || active.id === over.id) {
      return;
    }

    const taskId = active.id;
    const targetColumnId = over.id; // This is now a plain string like 'To Do'

    // Find the original column and the task object
    let sourceColumnId = null;
    let taskToMove = null;

    for (const column in tasks) {
      const foundTask = tasks[column].find((t) => String(t._id) === String(taskId));
      if (foundTask) {
        sourceColumnId = column;
        taskToMove = foundTask;
        break;
      }
    }

    // If we can't find the task or its source column, exit
    if (!taskToMove || !sourceColumnId) {
      return;
    }

    // Case 1: The task is dropped in the same column (for sorting)
    // This logic is currently not implemented in the provided code,
    // but it would go here if you wanted to reorder tasks within a column.
    if (sourceColumnId === targetColumnId) {
      // For now, we'll just return as there's no sorting logic in place.
      return;
    } else {
      // Case 2: The task is dropped in a different column (for status change)
      const originalTasksState = { ...tasks };

      // Optimistically update the UI to make the change feel instant
      setTasks((prev) => {
        const newTasks = {
          ...prev
        };
        // Remove the task from the source column
        newTasks[sourceColumnId] = newTasks[sourceColumnId].filter((t) => t._id !== taskId);
        // Ensure the target array exists
        if (!Array.isArray(newTasks[targetColumnId])) {
          newTasks[targetColumnId] = [];
        }
        // Add the task to the target column with the new status
        newTasks[targetColumnId] = [...newTasks[targetColumnId], {
          ...taskToMove,
          status: targetColumnId
        }];
        return newTasks;
      });

      try {
        const token = localStorage.getItem("token");
        // Make the API call to update the task's status in the database
        await axios.put(`${API_BASE}/api/tasks/${taskId}`, { status: targetColumnId }, { headers: { "x-auth-token": token } });

      } catch (err) {
        console.error("Failed to update task status:", err);
        // Revert the UI if the API call fails
        setError("Failed to update task status. Reverting changes.");
        setTasks(originalTasksState);
      }
    }
  };
  if (loading) return <div className="text-center p-10">Loading tasks...</div>;

  return (
    <div className="p-4 md:p-6 text-slate-900 dark:text-white">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold">Project Dashboard</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Welcome back! Let's get things done today. 😊
        </p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-600 rounded-lg">{error}</div>
      )}

      <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries({ "To Do": "To Do ✏️", "In Progress": "In Progress 🚀", Completed: "Done ✅" }).map(
            ([columnId, title]) => (
              <Column
                key={columnId}
                id={columnId}
                title={title}
                tasks={tasks[columnId]}
                onAddTaskClick={openModal}
                onDeleteTask={(columnId, taskId) => handleDeleteTask(columnId, taskId)} // 👈 This maps correctly
              />
            )
          )}
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
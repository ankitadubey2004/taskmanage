import React, { useState, useEffect } from "react";
import axios from "axios";
import { DndContext, closestCorners } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import Column from "../components/Column";
import AddTaskModal from "../components/AddTaskModal.jsx";

const Dashboard = () => {
  const [tasks, setTasks] = useState({
    "To Do": [],
    "In Progress": [],
    Completed: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addingToColumn, setAddingToColumn] = useState(null);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found. Please log in.");

      const res = await axios.get("http://localhost:5000/api/tasks", {
        headers: { "x-auth-token": token },
      });

      const categorizedTasks = { "To Do": [], "In Progress": [], Completed: [] };
      res.data.forEach((task) => {
        if (categorizedTasks[task.status]) {
          categorizedTasks[task.status].push(task);
        }
      });

      setTasks(categorizedTasks);
    } catch (err) {
      console.error(err);
      setError(
        "Failed to fetch tasks. Please ensure you are logged in and the server is running."
      );
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
      const res = await axios.post(
        "http://localhost:5000/api/tasks",
        taskWithStatus,
        { headers: { "x-auth-token": token } }
      );

      const savedTask = res.data;
      setTasks((prev) => ({
        ...prev,
        [columnId]: [...prev[columnId], savedTask],
      }));

      closeModal();
    } catch (err) {
      console.error(err);
      setError("Failed to add task.");
    }
  };

  const handleDeleteTask = async (columnId, taskId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found. Please log in.");

      await axios.delete(`http://localhost:5000/api/tasks/${taskId}`, {
        headers: { "x-auth-token": token },
      });

      setTasks((prev) => ({
        ...prev,
        [columnId]: prev[columnId].filter((t) => t._id !== taskId),
      }));
    } catch (err) {
      console.error(err);
      setError("Failed to delete task.");
    }
  };

  const handleDragEnd = async ({ active, over }) => {
  if (!over) return;

  const activeId = active.id; // dragged task _id
  const overId = over.id;     // could be taskId OR columnId

  // Find which column the active task came from
  let sourceColumnId = null;
  for (const [colId, colTasks] of Object.entries(tasks)) {
    if (colTasks.find(task => task._id === activeId)) {
      sourceColumnId = colId;
      break;
    }
  }
  if (!sourceColumnId) {
    console.error("Task not found in source column.", activeId);
    return;
  }

  // CASE 1: Dropped on another column (empty space)
  if (["To Do", "In Progress", "Completed"].includes(overId)) {
    if (sourceColumnId !== overId) {
      const taskToMove = tasks[sourceColumnId].find(t => t._id === activeId);

      // Optimistically update state
      setTasks(prev => {
        const newTasks = { ...prev };
        newTasks[sourceColumnId] = newTasks[sourceColumnId].filter(t => t._id !== activeId);
        newTasks[overId] = [...newTasks[overId], taskToMove];
        return newTasks;
      });

      try {
        const token = localStorage.getItem("token");
        await axios.put(
          `http://localhost:5000/api/tasks/${activeId}`,
          { status: overId },
          { headers: { "x-auth-token": token } }
        );
      } catch (err) {
        console.error("Failed to update task status:", err);
        fetchTasks();
      }
    }
    return;
  }

  // CASE 2: Reordering inside the same column (dropped on another task)
  const targetColumnId = sourceColumnId;
  const oldIndex = tasks[targetColumnId].findIndex(t => t._id === activeId);
  const newIndex = tasks[targetColumnId].findIndex(t => t._id === overId);

  if (oldIndex !== -1 && newIndex !== -1) {
    setTasks(prev => ({
      ...prev,
      [targetColumnId]: arrayMove(prev[targetColumnId], oldIndex, newIndex),
    }));
  }
};

  if (loading) {
    return <div className="text-center p-10">Loading tasks...</div>;
  }

  return (
    <div className="p-4 md:p-6 text-slate-900 dark:text-white">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold">Project Dashboard</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Welcome back! Let&apos;s get things done today. 😊
        </p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-600 rounded-lg">
          {error}
        </div>
      )}

      <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries({
            "To Do": "To Do ✏️",
            "In Progress": "In Progress 🚀",
            Completed: "Done ✅",
          }).map(([columnId, title]) => (
            <Column
              key={columnId}
              id={columnId}
              title={title}
              tasks={tasks[columnId]}
              onAddTaskClick={openModal}
              onDeleteTask={(taskId) => handleDeleteTask(columnId, taskId)}
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

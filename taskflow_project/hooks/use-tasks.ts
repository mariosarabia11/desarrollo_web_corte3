"use client";

import { useEffect, useMemo, useState } from "react";
import { createId } from "@/lib/utils";
import type { Task, TaskStatus } from "@/types/task";

const STORAGE_KEY = "taskflow.tasks.v1";

type Filter = "all" | TaskStatus;

const initialTasks: Task[] = [
  {
    id: "demo-1",
    title: "Revisar actividades del dia",
    description: "Organizar las tareas principales antes de iniciar la jornada.",
    status: "pending",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "demo-2",
    title: "Entregar avance del proyecto",
    description: "Validar documentacion, repositorio y despliegue.",
    status: "completed",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setTasks(JSON.parse(stored) as Task[]);
      } else {
        setTasks(initialTasks);
      }
    } catch {
      setTasks(initialTasks);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (isLoaded) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    }
  }, [tasks, isLoaded]);

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesFilter = filter === "all" || task.status === filter;
      const text = `${task.title} ${task.description}`.toLowerCase();
      const matchesQuery = text.includes(query.toLowerCase().trim());
      return matchesFilter && matchesQuery;
    });
  }, [tasks, filter, query]);

  const stats = useMemo(() => {
    const completed = tasks.filter((task) => task.status === "completed").length;
    const pending = tasks.length - completed;
    const progress = tasks.length === 0 ? 0 : Math.round((completed / tasks.length) * 100);
    return { total: tasks.length, completed, pending, progress };
  }, [tasks]);

  function addTask(title: string, description: string) {
    const now = new Date().toISOString();
    const task: Task = {
      id: createId(),
      title: title.trim(),
      description: description.trim(),
      status: "pending",
      createdAt: now,
      updatedAt: now
    };

    setTasks((current) => [task, ...current]);
  }

  function updateTask(id: string, title: string, description: string) {
    setTasks((current) =>
      current.map((task) =>
        task.id === id
          ? {
              ...task,
              title: title.trim(),
              description: description.trim(),
              updatedAt: new Date().toISOString()
            }
          : task
      )
    );
  }

  function deleteTask(id: string) {
    setTasks((current) => current.filter((task) => task.id !== id));
  }

  function toggleTask(id: string) {
    setTasks((current) =>
      current.map((task) =>
        task.id === id
          ? {
              ...task,
              status: task.status === "completed" ? "pending" : "completed",
              updatedAt: new Date().toISOString()
            }
          : task
      )
    );
  }

  function clearCompleted() {
    setTasks((current) => current.filter((task) => task.status !== "completed"));
  }

  return {
    tasks,
    filteredTasks,
    stats,
    filter,
    setFilter,
    query,
    setQuery,
    addTask,
    updateTask,
    deleteTask,
    toggleTask,
    clearCompleted
  };
}

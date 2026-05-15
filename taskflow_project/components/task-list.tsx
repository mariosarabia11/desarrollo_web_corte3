"use client";

import { TaskItem } from "@/components/task-item";
import type { Task } from "@/types/task";

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, title: string, description: string) => void;
}

export function TaskList({ tasks, onToggle, onDelete, onUpdate }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <section className="empty-state">
        <h3>No hay tareas para mostrar</h3>
        <p>Crea una nueva tarea o cambia los filtros de busqueda.</p>
      </section>
    );
  }

  return (
    <section className="task-list" aria-label="Lista de tareas">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </section>
  );
}

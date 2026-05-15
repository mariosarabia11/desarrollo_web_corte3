"use client";

import { FormEvent, useState } from "react";
import { formatDate } from "@/lib/utils";
import type { Task } from "@/types/task";

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, title: string, description: string) => void;
}

export function TaskItem({ task, onToggle, onDelete, onUpdate }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  function handleUpdate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!title.trim()) return;

    onUpdate(task.id, title, description);
    setIsEditing(false);
  }

  if (isEditing) {
    return (
      <article className="task-card editing">
        <form onSubmit={handleUpdate} className="edit-form">
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            maxLength={80}
            required
          />
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            rows={3}
            maxLength={240}
          />
          <div className="actions">
            <button type="submit">Guardar</button>
            <button type="button" className="secondary" onClick={() => setIsEditing(false)}>
              Cancelar
            </button>
          </div>
        </form>
      </article>
    );
  }

  return (
    <article className={`task-card ${task.status === "completed" ? "completed" : ""}`}>
      <div className="task-main">
        <button
          type="button"
          className="status-button"
          aria-label="Cambiar estado de tarea"
          onClick={() => onToggle(task.id)}
        >
          {task.status === "completed" ? "✓" : ""}
        </button>
        <div>
          <h3>{task.title}</h3>
          {task.description && <p>{task.description}</p>}
          <span>Actualizada: {formatDate(task.updatedAt)}</span>
        </div>
      </div>

      <div className="actions">
        <button type="button" className="secondary" onClick={() => setIsEditing(true)}>
          Editar
        </button>
        <button type="button" className="danger" onClick={() => onDelete(task.id)}>
          Eliminar
        </button>
      </div>
    </article>
  );
}

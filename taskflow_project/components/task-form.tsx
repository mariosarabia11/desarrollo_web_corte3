"use client";

import { FormEvent, useState } from "react";

interface TaskFormProps {
  onSubmit: (title: string, description: string) => void;
}

export function TaskForm({ onSubmit }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!title.trim()) return;

    onSubmit(title, description);
    setTitle("");
    setDescription("");
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <label>
        Titulo de la tarea
        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Ej: Preparar entrega del proyecto"
          maxLength={80}
          required
        />
      </label>

      <label>
        Descripcion
        <textarea
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Agrega detalles, fecha limite o notas importantes"
          maxLength={240}
          rows={4}
        />
      </label>

      <button type="submit">Crear tarea</button>
    </form>
  );
}

"use client";

import { TaskForm } from "@/components/task-form";
import { TaskList } from "@/components/task-list";
import { useTasks } from "@/hooks/use-tasks";

export default function Home() {
  const {
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
  } = useTasks();

  return (
    <main>
      <section className="hero">
        <div>
          <p className="eyebrow">Aplicacion de gestion de tareas</p>
          <h1>TaskFlow</h1>
          <p>
            Organiza, administra y da seguimiento a tus actividades diarias desde una interfaz simple,
            rapida y adaptable a cualquier dispositivo.
          </p>
        </div>
        <div className="progress-card">
          <span>Progreso</span>
          <strong>{stats.progress}%</strong>
          <div className="progress-track" aria-label={`Progreso ${stats.progress}%`}>
            <div style={{ width: `${stats.progress}%` }} />
          </div>
        </div>
      </section>

      <section className="dashboard">
        <article className="panel form-panel">
          <h2>Nueva tarea</h2>
          <TaskForm onSubmit={addTask} />
        </article>

        <article className="panel list-panel">
          <div className="list-header">
            <div>
              <h2>Mis tareas</h2>
              <p>
                {stats.total} total · {stats.pending} pendientes · {stats.completed} completadas
              </p>
            </div>
            <button type="button" className="secondary" onClick={clearCompleted} disabled={stats.completed === 0}>
              Limpiar completadas
            </button>
          </div>

          <div className="toolbar">
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar tarea por titulo o descripcion"
              aria-label="Buscar tareas"
            />
            <select
              value={filter}
              onChange={(event) => setFilter(event.target.value as "all" | "pending" | "completed")}
              aria-label="Filtrar tareas"
            >
              <option value="all">Todas</option>
              <option value="pending">Pendientes</option>
              <option value="completed">Completadas</option>
            </select>
          </div>

          <TaskList tasks={filteredTasks} onToggle={toggleTask} onDelete={deleteTask} onUpdate={updateTask} />
        </article>
      </section>
    </main>
  );
}

# TaskFlow

TaskFlow es una aplicacion web para la gestion de tareas. Permite crear, listar, editar, eliminar, buscar, filtrar y marcar tareas como completadas. La persistencia se realiza en el navegador mediante `localStorage`, por lo que las tareas se conservan entre sesiones del mismo dispositivo.

## Funcionalidades

- Crear tareas con titulo y descripcion.
- Listar tareas en una interfaz responsiva.
- Editar tareas existentes.
- Eliminar tareas que ya no se necesitan.
- Marcar tareas como pendientes o completadas.
- Filtrar por todas, pendientes o completadas.
- Buscar tareas por titulo o descripcion.
- Visualizar porcentaje de progreso.

## Tecnologias

- Next.js
- React
- TypeScript
- CSS responsivo
- Persistencia local con `localStorage`

## Instalacion local

```bash
npm install
npm run dev
```

Despues abre `http://localhost:3000` en el navegador.

## Despliegue en Vercel

1. Sube este proyecto a un repositorio publico de GitHub.
2. Entra a Vercel con tu cuenta.
3. Selecciona **New Project**.
4. Importa el repositorio de GitHub.
5. Usa el framework preset **Next.js**.
6. Haz clic en **Deploy**.
7. Copia la URL publica generada por Vercel y agregala al documento PDF de entrega.

## URLs para el documento

- Repositorio de GitHub: `https://github.com/TU_USUARIO/taskflow`
- Proyecto desplegado: URL generada por Vercel despues del despliegue.

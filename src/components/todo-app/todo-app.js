import React from "react";

import "./todo-app.css";

import Footer from "../footer";
import NewTaskForm from "../new-task-form";
import TaskList from "../task-list";

const TodoApp = () => {
  const tasks = [
    { id: 0, description: "Completed task", isCompleted: true, isEditing: false},
    { id: 1, description: "Editing task", isCompleted: false, isEditing: true},
    { id: 2, description: "Active task", isCompleted: false, isEditing: false},
  ];

  return (
    <section className="todo-app">
      <header className="header">
        <h1 className="todo-app__header">todos</h1>
        <NewTaskForm />
      </header>
      <section className="todo-app__main">
        <TaskList tasks={tasks} />
        <Footer />
      </section>
    </section>
  )
};

export default TodoApp;

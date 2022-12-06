import React from "react";
import ReactDOM from "react-dom/client";

import Footer from "./components/footer";
import NewTaskForm from "./components/new-task-form";
import TaskList from "./components/task-list";

const App = () => {
  const tasks = [
    { id: 0, description: "Completed task", isCompleted: true, isEditing: false},
    { id: 1, description: "Editing task", isCompleted: false, isEditing: true},
    { id: 2, description: "Active task", isCompleted: false, isEditing: false},
  ];

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm />
      </header>
      <section className="main">
        <TaskList tasks={tasks} />
        <Footer />
      </section>
    </section>
  )
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

import React from "react";

import "./todo-app.css";

import Footer from "../footer";
import NewTaskForm from "../new-task-form";
import TaskList from "../task-list";

export default class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [
        { id: 0, description: "Completed task", isCompleted: true, isEditing: false},
        { id: 1, description: "Editing task", isCompleted: false, isEditing: true},
        { id: 2, description: "Active task", isCompleted: false, isEditing: false},
        { id: 3, description: "Active task", isCompleted: false, isEditing: false},
        { id: 4, description: "Active task", isCompleted: true, isEditing: false},
        { id: 5, description: "Active task", isCompleted: false, isEditing: false},
      ]
    };
  }

  render() {
    return (
      <section className="todo-app">
        <header className="header">
          <h1 className="todo-app__header">todos</h1>
          <NewTaskForm />
        </header>
        <section className="todo-app__main">
          <TaskList tasks={this.state.tasks} onDelete={this.onDeleteHandler} />
          <Footer />
        </section>
      </section>
    )
  }

  onDeleteHandler = taskId => {
    this.setState((state) => {
      const deletingIndex = state.tasks.findIndex(task => task.id === taskId);
      return deletingIndex === -1 ? {tasks: [...state.tasks.slice()]} : {
        tasks: [
          ...state.tasks.slice(0, deletingIndex), 
          ...state.tasks.slice(deletingIndex + 1)
        ]
      };
    })
  }
};


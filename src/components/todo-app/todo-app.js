import React from "react";

import "./todo-app.css";

import Footer from "../footer";
import NewTaskForm from "../new-task-form";
import TaskList from "../task-list";
import TaskFilter from "../task-filter";

export default class TodoApp extends React.Component {
  idCounter = 10;

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
      ],
      newTask: { id: this.idCounter, description: "", isCompleted: false, isEditing: false},
      filter: TaskFilter.STATE_ALL,
    };
  }

  render() {
    let filteredTasks = this.state.tasks;
    if (this.state.filter === TaskFilter.STATE_ACTIVE) {
      filteredTasks = this.state.tasks.filter(task => task.isCompleted === false);
    } else if(this.state.filter === TaskFilter.STATE_COMPLETED) {
      filteredTasks = this.state.tasks.filter(task => task.isCompleted === true);
    }

    return (
      <section className="todo-app">
        <header className="header">
          <h1 className="todo-app__header">todos</h1>
          <NewTaskForm onChange={this.onNewTaskFormInput} onKeyDown={this.onNewTaskKeyDown} value={this.state.newTask.description}/>
        </header>
        <section className="todo-app__main">
          <TaskList tasks={filteredTasks} onDelete={this.onDeleteHandler} onToggleComplete={this.onToggleCompleteTask} />
          <Footer filter={this.state.filter} onFilterSwitch={this.onFilterSwitch}/>
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
    });
  }

  onToggleCompleteTask = taskId => {
    this.setState((state) => {
      let tasksCopy = JSON.parse(JSON.stringify(state.tasks));
      let toggledTask = tasksCopy.find(task => task.id === taskId);
      toggledTask.isCompleted = !toggledTask.isCompleted;

      return {tasks: tasksCopy};
    });
  }

  onNewTaskFormInput = e => {
    this.setState((state) => {
      let newTaskCopy = JSON.parse(JSON.stringify(state.newTask));
      newTaskCopy.description = e.target.value;

      return {newTask: newTaskCopy};
    });
  }

  onNewTaskKeyDown = e => {
    if (e.keyCode !== 13) { // Enter
      return;
    }

    this.setState((state) => {
      let tasksCopy = JSON.parse(JSON.stringify(state.tasks));
      let newTaskCopy = JSON.parse(JSON.stringify(state.newTask));
      tasksCopy.push(newTaskCopy);

      return {
        tasks: tasksCopy,
        newTask: { id: ++this.idCounter, description: "", isCompleted: false, isEditing: false},
      }
    });
  }

  onFilterSwitch = newFilterState => {
    this.setState((state) => {
      return {filter: newFilterState};
    });
  }
};


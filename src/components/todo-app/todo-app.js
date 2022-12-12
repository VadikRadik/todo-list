import React from 'react'

import './todo-app.css'

import Footer from '../footer'
import NewTaskForm from '../new-task-form'
import TaskList from '../task-list'
import TaskFilter from '../task-filter'

export default class TodoApp extends React.Component {
  idCounter = 10

  constructor(props) {
    super(props)
    this.state = {
      tasks: [
        { id: 0, description: 'Completed test task', isCompleted: true, isEditing: false, createdTs: 1670608222740 },
        {
          id: 1,
          description: 'Press enter to finish editing',
          isCompleted: false,
          isEditing: true,
          createdTs: 1670608222740,
        },
        { id: 2, description: 'Active test task 1', isCompleted: false, isEditing: false, createdTs: 1670608222740 },
        { id: 3, description: 'Active test task 2', isCompleted: false, isEditing: false, createdTs: 1670608222740 },
        { id: 4, description: 'Active test task 3', isCompleted: true, isEditing: false, createdTs: 1670608222740 },
        { id: 5, description: 'Active test task 4', isCompleted: false, isEditing: false, createdTs: 1670608222740 },
      ],
      newTask: { id: this.idCounter, description: '', isCompleted: false, isEditing: false, createdTs: 1670608222740 },
      filter: TaskFilter.STATE_ALL,
      activeCount: 4,
    }
  }

  render() {
    let filteredTasks = this.state.tasks
    if (this.state.filter === TaskFilter.STATE_ACTIVE) {
      filteredTasks = this.state.tasks.filter((task) => task.isCompleted === false)
    } else if (this.state.filter === TaskFilter.STATE_COMPLETED) {
      filteredTasks = this.state.tasks.filter((task) => task.isCompleted === true)
    }

    return (
      <section className="todo-app">
        <header className="header">
          <h1 className="todo-app__header">todos</h1>
          <NewTaskForm
            onChange={this.onNewTaskFormInput}
            onKeyDown={this.onNewTaskKeyDown}
            value={this.state.newTask.description}
          />
        </header>
        <section className="todo-app__main">
          <TaskList
            tasks={filteredTasks}
            onDelete={this.onDeleteHandler}
            onToggleComplete={this.onToggleCompleteTask}
            onEditTaskInput={this.onEditTaskInput}
            onEditOn={this.onEditOn}
            onEditOff={this.onEditOff}
          />
          <Footer
            filter={this.state.filter}
            onFilterSwitch={this.onFilterSwitch}
            onClearCompletedClicked={this.onClearCompletedClicked}
            activeCount={this.state.activeCount}
          />
        </section>
      </section>
    )
  }

  onDeleteHandler = (taskId) => {
    this.setState((state) => {
      const deletingIndex = state.tasks.findIndex((task) => task.id === taskId)
      let newTasksList =
        deletingIndex === -1
          ? [...state.tasks.slice()]
          : [...state.tasks.slice(0, deletingIndex), ...state.tasks.slice(deletingIndex + 1)]

      return {
        tasks: newTasksList,
        activeCount: this.countActiveTasks(newTasksList),
      }
    })
  }

  onToggleCompleteTask = (taskId) => {
    this.setState((state) => {
      let tasksCopy = JSON.parse(JSON.stringify(state.tasks))
      let toggledTask = tasksCopy.find((task) => task.id === taskId)
      toggledTask.isCompleted = !toggledTask.isCompleted

      return {
        tasks: tasksCopy,
        activeCount: this.countActiveTasks(tasksCopy),
      }
    })
  }

  onNewTaskFormInput = (e) => {
    this.setState((state) => {
      let newTaskCopy = JSON.parse(JSON.stringify(state.newTask))
      newTaskCopy.description = e.target.value

      return { newTask: newTaskCopy }
    })
  }

  onNewTaskKeyDown = (e) => {
    // Enter
    if (e.keyCode !== 13) {
      return
    }

    this.setState((state) => {
      let tasksCopy = JSON.parse(JSON.stringify(state.tasks))
      let newTaskCopy = JSON.parse(JSON.stringify(state.newTask))
      newTaskCopy.createdTs = Date.now()
      tasksCopy.push(newTaskCopy)

      return {
        tasks: tasksCopy,
        newTask: { id: ++this.idCounter, description: '', isCompleted: false, isEditing: false, createdTs: Date.now() },
        activeCount: this.countActiveTasks(tasksCopy),
      }
    })
  }

  onEditTaskInput = (taskId, e) => {
    this.setState((state) => {
      let tasksCopy = JSON.parse(JSON.stringify(state.tasks))
      let editingTask = tasksCopy.find((task) => task.id === taskId)
      editingTask.description = e.target.value

      return { tasks: tasksCopy }
    })
  }

  onEditOn = (taskId) => {
    this.setState((state) => {
      let tasksCopy = JSON.parse(JSON.stringify(state.tasks))
      let editingTask = tasksCopy.find((task) => task.id === taskId)
      if (editingTask.isCompleted === false) {
        editingTask.isEditing = true
      }

      return { tasks: tasksCopy }
    })
  }

  onEditOff = (taskId, e) => {
    // Enter
    if (e.keyCode !== 13) {
      return
    }

    this.setState((state) => {
      let tasksCopy = JSON.parse(JSON.stringify(state.tasks))
      let editingTask = tasksCopy.find((task) => task.id === taskId)
      editingTask.isEditing = false

      return { tasks: tasksCopy }
    })
  }

  onFilterSwitch = (newFilterState) => {
    this.setState({
      filter: newFilterState,
    })
  }

  onClearCompletedClicked = () => {
    this.setState((state) => {
      let tasksCopy = JSON.parse(JSON.stringify(state.tasks))
      tasksCopy = tasksCopy.filter((task) => task.isCompleted === false)
      return { tasks: tasksCopy }
    })
  }

  countActiveTasks = (tasksList) => {
    return tasksList.reduce((acc, task) => {
      acc += !task.isCompleted ? 1 : 0
      return acc
    }, 0)
  }
}

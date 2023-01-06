import React from 'react'

import './todo-app.css'

import Footer from '../footer'
import NewTaskForm from '../new-task-form'
import TaskList from '../task-list'
import { TaskFilterStates } from '../task-filter/task-filter'

export default class TodoApp extends React.Component {
  newTaskTemplate = {
    description: '',
    isCompleted: false,
    isEditing: false,
    createdTs: 1670608222740,
    timerElapsedSec: 30,
    isTimerRun: false,
    timerLastToggleTs: null,
    elapsedFieldMin: '',
    elapsedFieldSec: '',
  }

  constructor(props) {
    super(props)
    this.state = {
      tasks: [
        {
          id: 0,
          description: 'Task 0',
          isCompleted: true,
          isEditing: false,
          createdTs: 1670608222740,
          timerElapsedSec: 602,
          isTimerRun: false,
          timerLastToggleTs: null,
        },
        {
          id: 1,
          description: 'Press enter to finish editing',
          isCompleted: false,
          isEditing: true,
          createdTs: 1670608222740,
          timerElapsedSec: 30,
          isTimerRun: false,
          timerLastToggleTs: null,
        },
        {
          id: 2,
          description: 'Task 2 stopped',
          isCompleted: false,
          isEditing: false,
          createdTs: 1670608222740,
          timerElapsedSec: 42,
          isTimerRun: false,
          timerLastToggleTs: null,
        },
        {
          id: 3,
          description: 'Task 3 runned',
          isCompleted: false,
          isEditing: false,
          createdTs: 1670608222740,
          timerElapsedSec: 30,
          isTimerRun: true,
          timerLastToggleTs: 1670608222740,
        },
      ],
      newTask: this.newTaskTemplate,
      filter: TaskFilterStates.STATE_ALL,
      activeCount: 2,
      idCounter: 10,
    }
  }

  componentDidMount() {
    window.addEventListener('storage', () => this.setState(JSON.parse(window.localStorage.getItem('all_tasks_state'))))
  }

  componentDidUpdate() {
    window.localStorage.setItem('all_tasks_state', JSON.stringify(this.state))
  }

  render() {
    let filteredTasks = this.state.tasks
    if (this.state.filter === TaskFilterStates.STATE_ACTIVE) {
      filteredTasks = this.state.tasks.filter((task) => task.isCompleted === false)
    } else if (this.state.filter === TaskFilterStates.STATE_COMPLETED) {
      filteredTasks = this.state.tasks.filter((task) => task.isCompleted === true)
    }

    return (
      <section className="todo-app">
        <header className="header">
          <h1 className="todo-app__header">todos</h1>
          <NewTaskForm
            onChangeDescription={this.onNewTaskFormInput}
            onKeyDown={this.onNewTaskKeyDown}
            description={this.state.newTask.description}
            elapsedMin={this.state.newTask.elapsedFieldMin}
            onChangeMin={this.onChangeMin}
            elapsedSec={this.state.newTask.elapsedFieldSec}
            onChangeSec={this.onChangeSec}
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
            onTimerStart={this.onTimerStart}
            onTimerStop={this.onTimerStop}
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

  onChangeMin = (e) => {
    // only integer positive numbers or empty string
    if (!/^\d+$/.test(e.target.value) && e.target.value !== '') {
      return
    }

    this.setState((state) => {
      let newTaskCopy = JSON.parse(JSON.stringify(state.newTask))
      newTaskCopy.elapsedFieldMin = e.target.value

      return { newTask: newTaskCopy }
    })
  }

  onChangeSec = (e) => {
    // only integer positive numbers less than 59 or empty string
    if (!/^\d{0,2}$/.test(e.target.value)) {
      return
    }
    if (Number(e.target.value) > 59) {
      return
    }

    this.setState((state) => {
      let newTaskCopy = JSON.parse(JSON.stringify(state.newTask))
      newTaskCopy.elapsedFieldSec = e.target.value

      return { newTask: newTaskCopy }
    })
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

  // creating task
  onNewTaskKeyDown = (e) => {
    // Enter
    if (e.keyCode !== 13) {
      return
    }

    this.setState((state) => {
      let tasksCopy = JSON.parse(JSON.stringify(state.tasks))
      let newTaskCopy = JSON.parse(JSON.stringify(state.newTask))
      newTaskCopy.createdTs = Date.now()
      newTaskCopy.timerElapsedSec = Number(newTaskCopy.elapsedFieldMin) * 60 + Number(newTaskCopy.elapsedFieldSec)
      delete newTaskCopy.elapsedFieldMin
      delete newTaskCopy.elapsedFieldSec
      newTaskCopy.id = state.idCounter
      tasksCopy.push(newTaskCopy)

      return {
        tasks: tasksCopy,
        newTask: this.newTaskTemplate,
        activeCount: this.countActiveTasks(tasksCopy),
        idCounter: ++state.idCounter,
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

  onTimerStart = (taskId) => {
    this.setState((state) => {
      let tasksCopy = JSON.parse(JSON.stringify(state.tasks))
      let startedTask = tasksCopy.find((task) => task.id === taskId)
      startedTask.isTimerRun = true
      startedTask.timerLastToggleTs = Date.now()

      return { tasks: tasksCopy }
    })
  }

  onTimerStop = (taskId) => {
    this.setState((state) => {
      let tasksCopy = JSON.parse(JSON.stringify(state.tasks))
      let stoppedTask = tasksCopy.find((task) => task.id === taskId)
      stoppedTask.isTimerRun = false
      stoppedTask.timerElapsedSec += Math.round((Date.now() - stoppedTask.timerLastToggleTs) / 1000)
      stoppedTask.timerLastToggleTs = Date.now()

      return { tasks: tasksCopy }
    })
  }
}

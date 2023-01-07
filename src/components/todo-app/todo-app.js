import React, { useEffect, useState } from 'react'

import './todo-app.css'

import Footer from '../footer'
import NewTaskForm from '../new-task-form'
import TaskList from '../task-list'
import { TaskFilterStates } from '../task-filter/task-filter'

const newTaskTemplate = {
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

const countActiveTasks = (tasksList) => {
  return tasksList.reduce((acc, task) => {
    acc += !task.isCompleted ? 1 : 0
    return acc
  }, 0)
}

const TodoApp = () => {
  const [state, setState] = useState({
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
    newTask: newTaskTemplate,
    filter: TaskFilterStates.STATE_ALL,
    activeCount: 2,
    idCounter: 10,
  })

  const storageListener = () => setState(JSON.parse(window.localStorage.getItem('all_tasks_state')))

  useEffect(() => {
    window.addEventListener('storage', storageListener)
    return () => window.removeEventListener('storage', storageListener)
  }, [])

  useEffect(() => {
    window.localStorage.setItem('all_tasks_state', JSON.stringify(state))
  }, [state])

  let filteredTasks = state.tasks
  if (state.filter === TaskFilterStates.STATE_ACTIVE) {
    filteredTasks = state.tasks.filter((task) => task.isCompleted === false)
  } else if (state.filter === TaskFilterStates.STATE_COMPLETED) {
    filteredTasks = state.tasks.filter((task) => task.isCompleted === true)
  }

  const onChangeMin = (e) => {
    // only integer positive numbers or empty string
    if (!/^\d+$/.test(e.target.value) && e.target.value !== '') {
      return
    }

    setState((state) => {
      let newTaskCopy = JSON.parse(JSON.stringify(state.newTask))
      newTaskCopy.elapsedFieldMin = e.target.value

      return { ...state, newTask: newTaskCopy }
    })
  }

  const onChangeSec = (e) => {
    // only integer positive numbers less than 60 or empty string
    if (!/^\d{0,2}$/.test(e.target.value)) {
      return
    }
    if (Number(e.target.value) > 59) {
      return
    }

    setState((state) => {
      let newTaskCopy = JSON.parse(JSON.stringify(state.newTask))
      newTaskCopy.elapsedFieldSec = e.target.value

      return { ...state, newTask: newTaskCopy }
    })
  }

  const onDeleteHandler = (taskId) => {
    setState((state) => {
      const deletingIndex = state.tasks.findIndex((task) => task.id === taskId)
      let newTasksList =
        deletingIndex === -1
          ? [...state.tasks.slice()]
          : [...state.tasks.slice(0, deletingIndex), ...state.tasks.slice(deletingIndex + 1)]

      return {
        ...state,
        tasks: newTasksList,
        activeCount: countActiveTasks(newTasksList),
      }
    })
  }

  const onToggleCompleteTask = (taskId) => {
    setState((state) => {
      let tasksCopy = JSON.parse(JSON.stringify(state.tasks))
      let toggledTask = tasksCopy.find((task) => task.id === taskId)
      toggledTask.isCompleted = !toggledTask.isCompleted

      return {
        ...state,
        tasks: tasksCopy,
        activeCount: countActiveTasks(tasksCopy),
      }
    })
  }

  const onNewTaskFormInput = (e) => {
    setState((state) => {
      let newTaskCopy = JSON.parse(JSON.stringify(state.newTask))
      newTaskCopy.description = e.target.value

      return { ...state, newTask: newTaskCopy }
    })
  }

  // creating task
  const onNewTaskKeyDown = (e) => {
    // Enter
    if (e.keyCode !== 13) {
      return
    }

    setState((state) => {
      let tasksCopy = JSON.parse(JSON.stringify(state.tasks))
      let newTaskCopy = JSON.parse(JSON.stringify(state.newTask))
      newTaskCopy.createdTs = Date.now()
      newTaskCopy.timerElapsedSec = Number(newTaskCopy.elapsedFieldMin) * 60 + Number(newTaskCopy.elapsedFieldSec)
      delete newTaskCopy.elapsedFieldMin
      delete newTaskCopy.elapsedFieldSec
      newTaskCopy.id = state.idCounter
      tasksCopy.push(newTaskCopy)

      return {
        ...state,
        tasks: tasksCopy,
        newTask: newTaskTemplate,
        activeCount: countActiveTasks(tasksCopy),
        idCounter: ++state.idCounter,
      }
    })
  }

  const onEditTaskInput = (taskId, e) => {
    setState((state) => {
      let tasksCopy = JSON.parse(JSON.stringify(state.tasks))
      let editingTask = tasksCopy.find((task) => task.id === taskId)
      editingTask.description = e.target.value

      return { ...state, tasks: tasksCopy }
    })
  }

  const onEditOn = (taskId) => {
    setState((state) => {
      let tasksCopy = JSON.parse(JSON.stringify(state.tasks))
      let editingTask = tasksCopy.find((task) => task.id === taskId)
      if (editingTask.isCompleted === false) {
        editingTask.isEditing = true
      }

      return { ...state, tasks: tasksCopy }
    })
  }

  const onEditOff = (taskId, e) => {
    // Enter
    if (e.keyCode !== 13) {
      return
    }

    setState((state) => {
      let tasksCopy = JSON.parse(JSON.stringify(state.tasks))
      let editingTask = tasksCopy.find((task) => task.id === taskId)
      editingTask.isEditing = false

      return { ...state, tasks: tasksCopy }
    })
  }

  const onFilterSwitch = (newFilterState) => {
    setState((state) => {
      return { ...state, filter: newFilterState }
    })
  }

  const onClearCompletedClicked = () => {
    setState((state) => {
      let tasksCopy = JSON.parse(JSON.stringify(state.tasks))
      tasksCopy = tasksCopy.filter((task) => task.isCompleted === false)
      return { ...state, tasks: tasksCopy }
    })
  }

  const onTimerStart = (taskId) => {
    setState((state) => {
      let tasksCopy = JSON.parse(JSON.stringify(state.tasks))
      let startedTask = tasksCopy.find((task) => task.id === taskId)
      startedTask.isTimerRun = true
      startedTask.timerLastToggleTs = Date.now()

      return { ...state, tasks: tasksCopy }
    })
  }

  const onTimerStop = (taskId) => {
    setState((state) => {
      let tasksCopy = JSON.parse(JSON.stringify(state.tasks))
      let stoppedTask = tasksCopy.find((task) => task.id === taskId)
      stoppedTask.isTimerRun = false
      stoppedTask.timerElapsedSec += Math.round((Date.now() - stoppedTask.timerLastToggleTs) / 1000)
      stoppedTask.timerLastToggleTs = Date.now()

      return { ...state, tasks: tasksCopy }
    })
  }

  return (
    <section className="todo-app">
      <header className="header">
        <h1 className="todo-app__header">todos</h1>
        <NewTaskForm
          onChangeDescription={onNewTaskFormInput}
          onKeyDown={onNewTaskKeyDown}
          description={state.newTask.description}
          elapsedMin={state.newTask.elapsedFieldMin}
          onChangeMin={onChangeMin}
          elapsedSec={state.newTask.elapsedFieldSec}
          onChangeSec={onChangeSec}
        />
      </header>
      <section className="todo-app__main">
        <TaskList
          tasks={filteredTasks}
          onDelete={onDeleteHandler}
          onToggleComplete={onToggleCompleteTask}
          onEditTaskInput={onEditTaskInput}
          onEditOn={onEditOn}
          onEditOff={onEditOff}
          onTimerStart={onTimerStart}
          onTimerStop={onTimerStop}
        />
        <Footer
          filter={state.filter}
          onFilterSwitch={onFilterSwitch}
          onClearCompletedClicked={onClearCompletedClicked}
          activeCount={state.activeCount}
        />
      </section>
    </section>
  )
}

export default TodoApp

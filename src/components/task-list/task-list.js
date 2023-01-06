import React from 'react'

import Task from '../task'

import './task-list.css'

const TaskList = (props) => {
  const { tasks, onDelete, onToggleComplete, onEditTaskInput, onEditOn, onEditOff, onTimerStart, onTimerStop } = props

  const taskItems = tasks.map((task) => (
    <Task
      key={task.id}
      task={task}
      onDelete={() => onDelete(task.id)}
      onToggleComplete={() => onToggleComplete(task.id)}
      onEditTaskInput={onEditTaskInput}
      onEditOn={() => onEditOn(task.id)}
      onEditOff={onEditOff}
      onTimerStart={() => onTimerStart(task.id)}
      onTimerStop={() => onTimerStop(task.id)}
    />
  ))

  return <ul className="task-list">{taskItems}</ul>
}

export default TaskList

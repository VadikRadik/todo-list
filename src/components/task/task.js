import React, { useState, useEffect, useCallback } from 'react'
import { formatDistanceToNow } from 'date-fns'
import classNames from 'classnames'

import './task.css'

const formatSec = (seconds) => {
  let hours = null
  let minutes = Math.trunc(seconds / 60)
  const sec = seconds % 60
  if (minutes > 59) {
    hours = Math.trunc(minutes / 60)
    minutes %= 60
  }
  return `${hours ? hours + ':' : ''}${minutes < 10 ? '0' + minutes : minutes}:${sec < 10 ? '0' + sec : sec}`
}

const calcTotalSec = (isTimerRun, timerLastToggleTs, timerElapsedSec) => {
  if (isTimerRun) {
    return Math.round((Date.now() - timerLastToggleTs) / 1000) + timerElapsedSec
  } else {
    return timerElapsedSec
  }
}

const startTimer = (isTimerRun, timerLastToggleTs, timerElapsedSec, setTotalSec, setTimerId, timerId) => {
  if (timerId === null) {
    const newTimerId = setInterval(() => {
      setTotalSec(calcTotalSec(isTimerRun, timerLastToggleTs, timerElapsedSec))
    }, 1000)
    setTimerId(newTimerId)
  }
}

const stopTimerHandler = (props, setTimerId, timerId) => {
  if (timerId !== null && !props.task.isCompleted) {
    stopTimer(setTimerId, timerId)
    props.onTimerStop()
  }
}

const stopTimer = (setTimerId, timerId) => {
  if (timerId !== null) {
    clearInterval(timerId)
    setTimerId(null)
  }
}

const Task = (props) => {
  const [totalSec, setTotalSec] = useState(
    calcTotalSec(props.task.isTimerRun, props.task.timerLastToggleTs, props.task.timerElapsedSec)
  )
  const [timerId, setTimerId] = useState(null)

  const startTimerCallback = useCallback(() => {
    startTimer(
      props.task.isTimerRun,
      props.task.timerLastToggleTs,
      props.task.timerElapsedSec,
      setTotalSec,
      setTimerId,
      timerId
    )
  }, [props.task.isTimerRun, timerId])

  useEffect(() => {
    if (props.task.isTimerRun) {
      startTimerCallback()
    }
    return () => stopTimer(setTimerId, timerId)
  }, [startTimerCallback, props.task.isTimerRun])

  const { id, ...taskProps } = props.task

  let taskClass = classNames({ task: !taskProps.isEditing }, { 'task--editing': taskProps.isEditing })
  let viewClass = classNames({ task__view: !taskProps.isEditing }, { 'task__view--editing': taskProps.isEditing })
  let descriptionClass = classNames('task__description', { 'task__description--completed': taskProps.isCompleted })

  let editingInput = null
  if (taskProps.isEditing) {
    editingInput = (
      <input
        type="text"
        className="todo-app__input task__edit"
        onChange={(e) => props.onEditTaskInput(id, e)}
        value={taskProps.description}
        onKeyDown={(e) => props.onEditOff(id, e)}
      />
    )
  }

  return (
    <li className={taskClass}>
      <div className={viewClass}>
        <input
          className="todo-app__input task__toggle"
          type="checkbox"
          checked={taskProps.isCompleted}
          onChange={props.onToggleComplete}
        />
        <label className="task__label" htmlFor={'descr ' + id}>
          <span
            id={'descr ' + id}
            className={descriptionClass}
            onClick={() => {
              props.onToggleComplete()
              stopTimerHandler(props, setTimerId, timerId)
            }}
          >
            {taskProps.description}
          </span>
          <span className="task__created-ago">
            <button
              className="task__icon task__icon-play todo-app__button"
              onClick={() => {
                if (!props.task.isTimerRun && !props.task.isCompleted) {
                  props.onTimerStart()
                }
              }}
            ></button>
            <button
              className="task__icon task__icon-pause todo-app__button"
              onClick={() => stopTimerHandler(props, setTimerId, timerId)}
            ></button>
            <span className="task__timer-value">{formatSec(totalSec)}</span>
          </span>
          <span className="task__created-ago">
            {formatDistanceToNow(new Date(taskProps.createdTs), { addSuffix: true })}
          </span>
        </label>
        <button className="task__icon task__icon-edit todo-app__button" onClick={props.onEditOn}></button>
        <button className="task__icon task__icon-destroy todo-app__button" onClick={props.onDelete}></button>
      </div>
      {editingInput}
    </li>
  )
}

export default Task

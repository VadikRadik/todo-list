import React from 'react'
import { formatDistanceToNow } from 'date-fns'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import './task.css'

export default class Task extends React.Component {
  static defaultProps = {
    onDelete: () => {},
    onToggleComplete: () => {},
    onEditTaskInput: () => {},
    onEditOn: () => {},
    onEditOff: () => {},
    onTimerStart: () => {},
    onTimerStop: () => {},
  }

  static propTypes = {
    onDelete: PropTypes.func,
    onToggleComplete: PropTypes.func,
    onEditTaskInput: PropTypes.func,
    onEditOn: PropTypes.func,
    onEditOff: PropTypes.func,
    onTimerStart: PropTypes.func,
    onTimerStop: PropTypes.func,
    task: PropTypes.shape({
      id: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
      isCompleted: PropTypes.bool.isRequired,
      isEditing: PropTypes.bool.isRequired,
      createdTs: PropTypes.number.isRequired,
      timerElapsedSec: PropTypes.number.isRequired,
      isTimerRun: PropTypes.bool.isRequired,
      timerLastToggleTs: PropTypes.number,
    }).isRequired,
  }

  //timerId = null

  constructor(props) {
    super(props)
    this.state = {
      totalSec: props.task.isTimerRun ? this.calcTotalSec() : props.task.timerElapsedSec,
      timerId: null,
    }
  }

  componentDidMount() {
    this.setState(() => ({
      totalSec: this.calcTotalSec(),
    }))
    if (this.props.task.isTimerRun) {
      this.startTimer()
    }
  }

  componentWillUnmount() {
    this.stopTimer()
  }

  startTimer = () => {
    if (this.state.timerId === null) {
      const timerId = setInterval(() => {
        this.setState(() => ({
          totalSec: this.calcTotalSec(),
        }))
      }, 1000)
      this.setState(() => ({ timerId: timerId }))
    }
  }

  stopTimer = () => {
    console.log('timer stopped' + this.state.timerId)
    if (this.state.timerId !== null) {
      console.log('!!!!!!!d' + this.state.timerId)
      clearInterval(this.state.timerId)
      this.setState(() => ({ timerId: null }))
    }
  }

  calcTotalSec = () => {
    if (!this.props.task.isTimerRun) {
      return this.props.task.timerElapsedSec
    } else {
      return Math.round((Date.now() - this.props.task.timerLastToggleTs) / 1000) + this.props.task.timerElapsedSec
    }
  }

  formatSec = (seconds) => {
    let hours = null
    let minutes = Math.trunc(seconds / 60)
    const sec = seconds % 60
    if (minutes > 59) {
      hours = Math.trunc(minutes / 60)
      minutes %= 60
    }
    return `${hours ? hours + ':' : ''}${minutes < 10 ? '0' + minutes : minutes}:${sec < 10 ? '0' + sec : sec}`
  }

  render() {
    const { id, ...taskProps } = this.props.task

    let taskClass = classNames({ task: !taskProps.isEditing }, { 'task--editing': taskProps.isEditing })
    let viewClass = classNames({ task__view: !taskProps.isEditing }, { 'task__view--editing': taskProps.isEditing })
    let descriptionClass = classNames('task__description', { 'task__description--completed': taskProps.isCompleted })

    let editingInput = null
    if (taskProps.isEditing) {
      editingInput = (
        <input
          type="text"
          className="todo-app__input task__edit"
          onChange={(e) => this.props.onEditTaskInput(id, e)}
          value={taskProps.description}
          onKeyDown={(e) => this.props.onEditOff(id, e)}
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
            onChange={this.props.onToggleComplete}
          />
          <label className="task__label" htmlFor={'descr ' + id}>
            <span id={'descr ' + id} className={descriptionClass} onClick={this.props.onToggleComplete}>
              {taskProps.description}
            </span>
            <span className="task__created-ago">
              <button
                className="task__icon task__icon-play todo-app__button"
                onClick={() => {
                  console.log('button start clicked')
                  if (!this.props.task.isTimerRun && !this.props.task.isCompleted) {
                    this.startTimer()
                    this.props.onTimerStart()
                  }
                }}
              ></button>
              <button
                className="task__icon task__icon-pause todo-app__button"
                onClick={() => {
                  if (this.props.task.isTimerRun && !this.props.task.isCompleted) {
                    this.stopTimer()
                    this.props.onTimerStop()
                  }
                }}
              ></button>
              <span className="task__timer-value">{this.formatSec(this.state.totalSec)}</span>
            </span>
            <span className="task__created-ago">
              {formatDistanceToNow(new Date(taskProps.createdTs), { addSuffix: true })}
            </span>
          </label>
          <button className="task__icon task__icon-edit todo-app__button" onClick={this.props.onEditOn}></button>
          <button className="task__icon task__icon-destroy todo-app__button" onClick={this.props.onDelete}></button>
        </div>
        {editingInput}
      </li>
    )
  }
}

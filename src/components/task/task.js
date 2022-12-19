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
  }

  static propTypes = {
    onDelete: PropTypes.func,
    onToggleComplete: PropTypes.func,
    onEditTaskInput: PropTypes.func,
    onEditOn: PropTypes.func,
    onEditOff: PropTypes.func,
    task: PropTypes.shape({
      id: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
      isCompleted: PropTypes.bool.isRequired,
      isEditing: PropTypes.bool.isRequired,
      createdTs: PropTypes.number.isRequired,
    }).isRequired,
  }

  render() {
    const { id, ...taskProps } = this.props.task

    // eslint-disable-next-line prettier/prettier
    let taskClass = classNames({ task: !taskProps.isEditing }, { 'task--editing': taskProps.isEditing })
    // eslint-disable-next-line prettier/prettier
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
          <label className="task__label" onClick={this.props.onToggleComplete}>
            <span className={descriptionClass}>{taskProps.description}</span>
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

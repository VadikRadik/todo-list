import React from 'react'
import PropTypes from 'prop-types'

import './new-task-form.css'

export default class NewTaskForm extends React.Component {
  static defaultProps = {
    onChange: () => {},
    onKeyDown: () => {},
    onChangeMin: () => {},
    onChangeSec: () => {},
  }

  static propTypes = {
    onChangeDescription: PropTypes.func,
    onKeyDown: PropTypes.func,
    description: PropTypes.string.isRequired,
    elapsedMin: PropTypes.string,
    elapsedSec: PropTypes.string,
  }

  render() {
    return (
      <form className="new-todo-form">
        <input
          className="todo-app__input new-todo-form__new-task"
          placeholder="Task"
          autoFocus
          onChange={this.props.onChangeDescription}
          onKeyDown={this.props.onKeyDown}
          value={this.props.description}
        />
        <input
          className="todo-app__input new-todo-form__timer"
          placeholder="Min"
          autoFocus
          value={this.props.elapsedMin}
          onChange={this.props.onChangeMin}
        />
        <input
          className="todo-app__input new-todo-form__timer"
          placeholder="Sec"
          autoFocus
          value={this.props.elapsedSec}
          onChange={this.props.onChangeSec}
        />
      </form>
    )
  }
}

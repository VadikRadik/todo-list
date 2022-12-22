import React from 'react'
import PropTypes from 'prop-types'

import './new-task-form.css'

export default class NewTaskForm extends React.Component {
  static defaultProps = {
    onChange: () => {},
    onKeyDown: () => {},
  }

  static propTypes = {
    onChange: PropTypes.func,
    onKeyDown: PropTypes.func,
    value: PropTypes.string.isRequired,
  }

  render() {
    return (
      <form className="new-todo-form">
        <input
          className="todo-app__input new-todo-form__new-task"
          placeholder="Task"
          autoFocus
          onChange={this.props.onChange}
          onKeyDown={this.props.onKeyDown}
          value={this.props.value}
        />
        <input className="todo-app__input new-todo-form__timer" placeholder="Min" autoFocus />
        <input className="todo-app__input new-todo-form__timer" placeholder="Sec" autoFocus />
      </form>
    )
  }
}

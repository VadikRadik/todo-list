import React from 'react'

import './new-task-form.css'

const NewTaskForm = (props) => {
  return (
    <form className="new-todo-form">
      <input
        className="todo-app__input new-todo-form__new-task"
        placeholder="Task"
        autoFocus
        onChange={props.onChangeDescription}
        onKeyDown={props.onKeyDown}
        value={props.description}
      />
      <input
        className="todo-app__input new-todo-form__timer"
        placeholder="Min"
        autoFocus
        value={props.elapsedMin}
        onChange={props.onChangeMin}
      />
      <input
        className="todo-app__input new-todo-form__timer"
        placeholder="Sec"
        autoFocus
        value={props.elapsedSec}
        onChange={props.onChangeSec}
      />
    </form>
  )
}

export default NewTaskForm

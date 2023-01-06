import React from 'react'

import TaskFilter from '../task-filter'

import './footer.css'

const Footer = (props) => {
  return (
    <footer className="footer">
      <span className="footer__todo-count">{props.activeCount} items left</span>
      <TaskFilter filter={props.filter} onFilterSwitch={props.onFilterSwitch} />
      <button className="todo-app__button footer__clear-completed" onClick={props.onClearCompletedClicked}>
        Clear completed
      </button>
    </footer>
  )
}

export default Footer

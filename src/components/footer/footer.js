import React from "react";
import TaskFilter from "../task-filter"
import "./footer.css";

const Footer = () => {
    return (
        <footer className="footer">
            <span className="footer__todo-count">1 items left</span>
            <TaskFilter />
            <button className="todo-app__button footer__clear-completed">Clear completed</button>
        </footer>
    );
}

export default Footer;

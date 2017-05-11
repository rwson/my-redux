import React, { Component } from "react";
import { PropTypes } from "prop-types";
import classname from "classname";
import autobind from "autobind-decorator";
import { v4 } from "node-uuid";

import { connect } from "./react-redux";

class TodoItem extends Component {
    static propTypes = {
        todos: PropTypes.array,
        deleteTodo: PropTypes.func,
        toggleTodo: PropTypes.func
    }

    constructor(props) {
        super(props);
    }

    @autobind
    _destroyTodo(index) {
        this.props.deleteTodo(index);
    }

    @autobind
    _toggleTodo(index) {
        this.props.toggleTodo(index);
    }

    _renderItems(todos) {
        if(!todos.length) {
            return null;
        }
        return todos.map((todo, index) => {
            return (
                <li 
                    key={v4()}
                    className={
                    classname({
                        completed: todo.complete
                    })
                }>
                    <div className="view">
                        <input className="toggle" type="checkbox" readOnly checked={todo.complete} />
                        <label onClick={this._toggleTodo.bind(this, index)}>{ todo.title }</label>
                        <button className="destroy" onClick={this._destroyTodo.bind(this, index)}></button>
                    </div>
                </li>
            );
        });
    }

    render() {
        return (
            <ul className="todo-list">
                { this._renderItems(this.props.todos) }
            </ul>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        todos: state.todos
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteTodo: (index) => {
            dispatch({
                type: "DELETE_TODO",
                index
            });
        },
        toggleTodo: (index) => {
            dispatch({
                type: "TOGGLE_TODO",
                index
            });
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoItem);

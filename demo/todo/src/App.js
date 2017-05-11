import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { Provider } from "./react-redux";

import Header from "./Header";
import TodoItem from "./TodoItem";
import Footer from "./Footer";

import "todomvc-app-css/index.css";

function createStore(reducer) {
    let state = null
    const listeners = []
    const subscribe = (listener) => listeners.push(listener)
    const getState = () => state
    const dispatch = (action) => {
        state = reducer(state, action)
        listeners.forEach((listener) => listener())
    }
    dispatch({})
    return { getState, dispatch, subscribe }
}

const todoReducer = (state, action) => {
    if (!state) {
        return {
            todos: [],
            total: 0,
            left: 0
        };
    }
    switch (action.type) {
        case "ADD_DOTO":
            state.todos.push(action.todo);
            return { 
                ...state,
                todos: state.todos,
                total: state.todos.length,
                left: state.todos.filter((todo) => !todo.complete).length
            };
        case "DELETE_TODO":
            state.todos.splice(action.index, 1);
            return { 
                ...state,
                todos: state.todos,
                total: state.todos.length,
                left: state.todos.filter((todo) => !todo.complete).length
            };
        case "TOGGLE_TODO":
            let { todos } = state,
                { index } = action;
            todos[index].complete = !todos[index].complete;
            return {
                ...state,
                todos: state.todos,
                total: state.todos.length,
                left: state.todos.filter((todo) => !todo.complete).length
            };
        case "CLEAR_COMPLETED":
            state.todos = state.todos.filter((todo) => !todo.complete)
            return {
                ...state,
                todos: state.todos,
                total: state.todos.length,
                left: state.todos.filter((todo) => !todo.complete).length
            };
        default:
            return state;
    }
}

const store = createStore(todoReducer);

class App extends Component {
    render() {
        return ( 
            <Provider store={store}>
                <div className = "App">
                    <section className="todoapp">
                        <Header />
                        <section className="main">
                            <TodoItem />
                        </section>
                        <Footer />
                    </section>
                </div>
            </Provider>
        );
    }
}

export default App;

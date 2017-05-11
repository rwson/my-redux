import React, { Component } from "react";
import { PropTypes } from "prop-types";
import autobind from "autobind-decorator";

import { connect } from "./react-redux";

class Header extends Component {
    static propTypes = {
        addTodo: PropTypes.func
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { title } = this.refs;
        title.addEventListener("keyup", this._handleKeyUp);
    }

    componentWillUnMount() {
        const { title } = this.refs;
        title.removeEventListener("keyup", this._handleKeyUp);
    }

    @autobind
    _handleKeyUp(e) {
        const { target, keyCode } = e;
        let { value } = target;
        value = value.trim();
        if (keyCode === 13) {
            if (!value) {
                alert("请输入代办事项标题!");
                return;
            }
            this.props.addTodo({
                id: Math.random().toString(16) + Date.now(),
                title: value,
                complete: false
            });
            target.value = "";
        }
    }

    render() {
        return (
            <header className="header">
                <h1>todos</h1>
                <input className="new-todo" placeholder="请输入代办事项标题" ref="title" autoFocus />
            </header>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addTodo: (todo) => {
            dispatch({
                type: "ADD_DOTO",
                todo
            });
        }
    };
};

export default connect(null, mapDispatchToProps)(Header);

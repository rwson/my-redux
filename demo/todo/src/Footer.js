import React, { Component } from "react";
import { PropTypes } from "prop-types";
import autobind from "autobind-decorator";

import { connect } from "./react-redux";

class Footer extends Component {
    static propTypes = {
        total: PropTypes.number,
        left: PropTypes.number,
        clearCompleted: PropTypes.func
    }

    constructor(props) {
        super(props);
    }

    @autobind
    _handleClear(e) {
        this.props.clearCompleted();
    }

    render() {
        const { total, left } = this.props;
        if (total === 0) {
            return null;
        }
        return (
            <footer className="footer">
                <span className="todo-count">剩余<strong>{ left }</strong>项, 共<strong>{ total }</strong>项</span>
                <button className="clear-completed" onClick={this._handleClear}>清除已完成的</button>
            </footer>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        total: state.total,
        left: state.left,
        total: state.total
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        clearCompleted: (todo) => {
            dispatch({
                type: "CLEAR_COMPLETED"
            });
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Footer);

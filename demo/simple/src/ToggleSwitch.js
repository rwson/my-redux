import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { connect } from "./react-redux";

class ToggleSwitch extends Component {

    static propTypes = {
        themeColor: PropTypes.string
    }

    constructor(props) {
        super(props);
    }

    _handleChange(color) {
        if (this.props.onSwitchColor) {
            this.props.onSwitchColor(color);
        }
    }

    render() {
    	const { themeColor } = this.props;
        return (
			<div>
		        <button 
		        style={{
		        	color: themeColor
		        }}
		        onClick={this._handleChange.bind(this, "red")}
		        >Red</button>
		        <button 
		        style={{
		        	color: themeColor
		        }}
		        onClick={this._handleChange.bind(this, "blue")}
		        >Blue</button>
		    </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        themeColor: state.themeColor
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSwitchColor: (color) => {
            dispatch({
                type: "CHANGE_COLOR",
                themeColor: color
            });
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ToggleSwitch);

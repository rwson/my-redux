import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { connect } from "./react-redux";

import ToggleSwitch from "./ToggleSwitch";

class Content extends Component {
    static propTypes = {
        themeColor: PropTypes.string
    }

    constructor(props) {
        super(props);
    }

    render() {
    	const { themeColor } = this.props;
        return (
    		<div>
    	        <p style={{
    	        	color: themeColor
    	        }}>My Redux Content</p>
    	        <ToggleSwitch />
    	    </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        themeColor: state.themeColor
    };
}

export default connect(mapStateToProps)(Content);

import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { connect } from "./react-redux";

class Header extends Component {
    static propTypes = {
        themeColor: PropTypes.string
    }

    constructor(props) {
        super(props);
    }

    render() {
    	const { themeColor } = this.props;
        return (
            <h1 style={{
            	color: themeColor
            }}>My Redux</h1>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        themeColor: state.themeColor
    }
}

export default connect(mapStateToProps)(Header);

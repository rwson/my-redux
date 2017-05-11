import React, { Component } from "react";
import { PropTypes } from "prop-types";

export const connect = (mapStateToProps, mapDispatchToProps) => (WrappedComponent) => {
    class Connect extends Component {
        static contextTypes = {
            store: PropTypes.object
        }

        constructor(props) {
        	super(props);
        	this.state = { 
        		allProps: {}
        	};
        }

		componentWillMount () {
		    const { store } = this.context;
		    this._updateProps();
		    store.subscribe(() => this._updateProps());
	    }

	    _updateProps() {
	    	const { store } = this.context;
	    	let stateProps = typeof mapStateToProps === "function" ? mapStateToProps(store.getState(), this.props) : {};
	    	let dispatchProps = typeof mapDispatchToProps === "function" ? mapDispatchToProps(store.dispatch, this.props) : {};
	    	this.setState({
	    		allProps: {
	    			...stateProps,
	    			...dispatchProps,
	    			...this.props
	    		}
	    	});
	    }

        render() {
            let { allProps } = this.state;
            return (
            	<WrappedComponent {...allProps }/>
        	);
        }
    }

    return Connect
};

export class Provider extends Component {
	static propTypes = {
		children: PropTypes.any,
		store: PropTypes.object
	}

	static childContextTypes = {
		store: PropTypes.object
	}

	getChildContext() {
		console.log(this.props.store);
		return {
			store: this.props.store
		};
	}

	render() {
		return (
			<div>
				{ this.props.children }
			</div>
		);
	}
}

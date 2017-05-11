import React, { Component } from "react";
import { PropTypes } from "prop-types";

/**
 * 仿照react-redux中的connect方法
	class Comp extends Component {
		constructor() {
			super();
		}

		render() {
			<div>
				{ this.props.text }
				<button>change</button>
			</div>
		}
	}
 
  const mapStateToProps = (state) => {
  		return {
  			text: state.text
  			...
  		};
  }
 
  const mapDispatchToProps = (dispatch) => {
  		return {
  			changeText: dispatch({
  				type: "CHANGE_TEXT"
  			})
  			...
  		};
  }
 
  export connect(mapStateToProps, mapDispatchToProps)(Comp);
 */
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

/**
 * 仿照react-redux中的Provider组件
 *
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

	const changeTextReducer = (state, action) => {
 		switch (action.type) {
 			case "CHANGE_TEXT":
 				return {
 					...state,
 					text: Math.random().toString(16)
 				};
 		}
 	};
  
  	const store = createStore(changeTextReducer);
 
	class App extends Component {
	    render() {
	        return ( 
	            <Provider store={store}>
	                <div className = "App">
	                    <Header />
	                    <Content />
	                </div>
	            </Provider>
	        );
	    }
	} 
 */
export class Provider extends Component {
	static propTypes = {
		children: PropTypes.any,
		store: PropTypes.object
	}

	static childContextTypes = {
		store: PropTypes.object
	}

	getChildContext() {
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

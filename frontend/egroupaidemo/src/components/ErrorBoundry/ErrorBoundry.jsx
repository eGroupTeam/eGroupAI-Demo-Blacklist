import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ErrorBoundry extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired
  };

  state = {
    error: null,
    errorInfo: null
  };

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo
    });
  }

  render() {
    const { error, errorInfo } = this.state;
    const { children } = this.props;
    if (error) {
      return (
        <div>
          <h2>{'Oh-no! Something went wrong'}</h2>
          <p className="red">{error && error.toString()}</p>
          <div>{'Component Stack Error Details: '}</div>
          <p className="red">{errorInfo.componentStack}</p>
        </div>
      );
    }
    return children;
  }
}

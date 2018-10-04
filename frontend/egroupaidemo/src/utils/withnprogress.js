import React, { Component } from 'react';
import nprogress from 'nprogress';

import './nprogress.css';

export default function withnprogress(WrappedComponent) {
  return class Wrapper extends Component {
    componentWillMount() {
      nprogress.start();
    }

    componentDidMount() {
      nprogress.done();
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
}

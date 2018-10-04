import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Menu } from 'semantic-ui-react';

export default class TopMenu extends Component {
  static propTypes = {
    leftMenuWidth: PropTypes.number
  };
  static defaultProps = {
    leftMenuWidth: 0
  };
  render() {
    const { leftMenuWidth } = this.props;
    return (
      <Menu fixed="top" size="huge" style={{ paddingLeft: leftMenuWidth }} />
    );
  }
}

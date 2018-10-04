import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Message } from 'semantic-ui-react';

const StyledSnackbar = styled.div`
  position: fixed;
  bottom: ${props =>
    props.anchorOrigin.vertical === 'bottom' ? '24px' : 'auto'};
  top: ${props => (props.anchorOrigin.vertical === 'top' ? '24px' : 'auto')};
  right: ${props =>
    props.anchorOrigin.horizontal === 'right' ? '24px' : 'auto'};
  left: ${props =>
    props.anchorOrigin.horizontal === 'left' ? '24px' : 'auto'};
`;

export default class Snackbar extends Component {
  static propTypes = {
    anchorOrigin: PropTypes.object
  };

  static defaultProps = {
    anchorOrigin: { vertical: 'bottom', horizontal: 'right' }
  };

  state = { visible: true };

  handleDismiss = () => {
    this.setState({ visible: false });
  };

  render() {
    if (this.state.visible) {
      const { anchorOrigin, ...rest } = this.props;
      return (
        <StyledSnackbar anchorOrigin={anchorOrigin}>
          <Message onDismiss={this.handleDismiss} {...rest} />
        </StyledSnackbar>
      );
    }
    return null;
  }
}

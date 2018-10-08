import React, { Component } from 'react'
import { compose } from 'redux';
import PropTypes from 'prop-types'
import {
  Button,
  Icon,
} from 'semantic-ui-react';

import Content from 'components/Content';
import EngineSettings from 'components/EngineSettings';
import { withControlStreaming } from 'utils';

class Welcome extends Component {
  static propTypes = {
    threshold: PropTypes.number.isRequired,
    resolution: PropTypes.string.isRequired,
    cam: PropTypes.number.isRequired,
    minimumFaceSize: PropTypes.number.isRequired,
    isHideMainWindow: PropTypes.bool.isRequired,
    threads: PropTypes.number.isRequired,
    isStarted: PropTypes.bool.isRequired,

    openWebSocket: PropTypes.func.isRequired,
    closeWebSocket: PropTypes.func.isRequired,
  }

  render() {
    const { isStarted, closeWebSocket, openWebSocket } = this.props
    return (
      <Content>
        {isStarted ? (
          <Button icon labelPosition="left" onClick={() => {
            closeWebSocket()
          }}>
            <Icon name="stop" />
            停止
          </Button>
        ) : (
          <Button icon labelPosition="left" onClick={() => {
            openWebSocket()
          }}>
            <Icon name="play" />
            啟動
          </Button>
        )}
        <EngineSettings />
      </Content>
    )
  }
}

export default compose(withControlStreaming)(Welcome);
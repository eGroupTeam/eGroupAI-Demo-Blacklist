import React, { Component } from 'react'
import { compose } from 'redux';
import PropTypes from 'prop-types'
import {
  Button,
  Icon,
} from 'semantic-ui-react';

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

    objectUrl: PropTypes.string,
    getUserMediaError: PropTypes.string,
    openWebSocket: PropTypes.func.isRequired,
    closeWebSocket: PropTypes.func.isRequired,
    openWebCam: PropTypes.func.isRequired,
    closeWebCam: PropTypes.func.isRequired,
  }

  render() {
    const { isStarted, closeWebSocket, openWebSocket, openWebCam, closeWebCam, getUserMediaError, objectUrl } = this.props
    return (
      <div>
        {isStarted ? (
          <Button icon labelPosition="left" onClick={() => {
            closeWebSocket()
            closeWebCam()
          }}>
            <Icon name="stop" />
            停止
          </Button>
        ) : (
          <Button icon labelPosition="left" onClick={() => {
            openWebSocket()
            openWebCam()
          }}>
            <Icon name="play" />
            啟動
          </Button>
        )}
        <EngineSettings />
        <video
          autoPlay
          src={objectUrl}
          style={{
            backgroundColor: '#000',
            width: '100%',
            height: 'auto'
          }}
        />
      </div>
    )
  }
}

export default compose(withControlStreaming)(Welcome);
import React, { Component } from 'react'
import { compose } from 'redux';
import PropTypes from 'prop-types'

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

    closeWebSocket: PropTypes.func.isRequired,
    openWebSocket: PropTypes.func.isRequired,
    objectUrl: PropTypes.string,
    getUserMediaError: PropTypes.string,
  }

  render() {
    return (
      <div>
        <EngineSettings />
      </div>
    )
  }
}

export default compose(withControlStreaming)(Welcome);
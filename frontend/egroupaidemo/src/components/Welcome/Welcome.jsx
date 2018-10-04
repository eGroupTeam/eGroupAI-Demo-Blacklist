import React, { Component } from 'react'
import PropTypes from 'prop-types'

import EngineSettings from 'components/EngineSettings';

export default class Welcome extends Component {
  static propTypes = {
    threshold: PropTypes.number.isRequired,
    resolution: PropTypes.string.isRequired,
    cam: PropTypes.number.isRequired,
    minimumFaceSize: PropTypes.number.isRequired,
    isHideMainWindow: PropTypes.bool.isRequired,
    threads: PropTypes.number.isRequired,
  }

  render() {
    return (
      <div>
        <EngineSettings />
      </div>
    )
  }
}

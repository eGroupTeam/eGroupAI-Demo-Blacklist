import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes';
import {
  Image
} from 'semantic-ui-react';

export default class VideoStream extends Component {
  static propTypes = {
    isUseRtsp: PropTypes.bool.isRequired,
    result: ImmutablePropTypes.list.isRequired,
    objectUrl: PropTypes.string,
  }

  render() {
    const { isUseRtsp, result, objectUrl } = this.props
    if (isUseRtsp && result.size > 0) {
      return (
        <Image
          src={`${process.env.PUBLIC_URL}/outputFrame/${
            result.last().framePath
          }`}
        />)
    }
    return (
      <video
        autoPlay
        src={objectUrl}
        style={{
          backgroundColor: '#000',
          width: '100%',
          height: 'auto'
        }}
      />
    )
  }
}

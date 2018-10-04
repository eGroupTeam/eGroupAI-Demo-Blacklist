import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Welcome extends Component {
  static propTypes = {
    prop: PropTypes
  }

  render() {
    return (
      <div>
        Welcome
      </div>
    )
  }
}

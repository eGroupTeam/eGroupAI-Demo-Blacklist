import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Form,
  Accordion,
  Segment
} from 'semantic-ui-react';

const thresholdOptions = [
  { key: 't6', text: '0.6', value: 0.6 },
  { key: 't65', text: '0.65', value: 0.65 },
  { key: 't7', text: '0.7', value: 0.7 },
  { key: 't75', text: '0.75', value: 0.75 },
  { key: 't8', text: '0.8', value: 0.8 },
  { key: 't85', text: '0.85', value: 0.85 },
  { key: 't9', text: '0.9', value: 0.9 },
  { key: 't95', text: '0.95', value: 0.95 }
];

const resolutionOptions = [
  { key: '360p', text: '360p', value: '360p' },
  { key: '480p', text: '480p', value: '480p' },
  { key: '720p', text: '720p', value: '720p' },
  { key: '1080p', text: '1080p', value: '1080p' },
  { key: '1440p', text: '1440p', value: '1440p' }
];

const camOptions = [
  { key: 'c0', text: 'cam 1', value: 0 },
  { key: 'c1', text: 'cam 2', value: 1 },
  { key: 'c2', text: 'cam 3', value: 2 },
  { key: 'c3', text: 'cam 4', value: 3 }
];

const threadsOptions = [
  { key: 't1', text: '1', value: 1 },
  { key: 't2', text: '2', value: 2 },
  { key: 't3', text: '3', value: 3 },
  { key: 't4', text: '4', value: 4 },
  { key: 't5', text: '5', value: 5 },
  { key: 't6', text: '6', value: 6 }
];

export default class EngineSettings extends Component {
  static propTypes = {
    threshold: PropTypes.number.isRequired,
    resolution: PropTypes.string.isRequired,
    cam: PropTypes.number.isRequired,
    minimumFaceSize: PropTypes.number.isRequired,
    isHideMainWindow: PropTypes.bool.isRequired,
    threads: PropTypes.number.isRequired,

    videoWidth: PropTypes.number.isRequired,
    videoHeight: PropTypes.number.isRequired,

    handleChange: PropTypes.func.isRequired,
    handleToggleSettings: PropTypes.func.isRequired,
  }

  /**
   * handle change values
   */
  handleChange = (e, { name, value, checked }) => {
    if (!value) return
    if (name === 'resolution') {
      let videoWidth = 1280;
      let videoHeight = 720;
      switch (value) {
        case '360p':
          videoHeight = 360;
          videoWidth = 640;
          break;
        case '480p':
          videoHeight = 480;
          videoWidth = 854;
          break;
        case '720p':
          videoHeight = 720;
          videoWidth = 1280;
          break;
        case '1080p':
          videoHeight = 1080;
          videoWidth = 1920;
          break;
        case '1440p':
          videoHeight = 1440;
          videoWidth = 2560;
          break;
        default:
          videoHeight = 720;
          videoWidth = 1280;
          break;
      }
      this.props.handleChange({
        [name]: value || checked,
        videoWidth,
        videoHeight
      })
    } else {
      this.props.handleChange({
        [name]: value || checked,
      })
    }
  };

  render() {
    const {
      threshold,
      resolution,
      cam,
      minimumFaceSize,
      isHideMainWindow,
      threads,
      openSettings,
    } = this.props;
    return (
      <Accordion as={Segment}>
        <Accordion.Title
          active={openSettings}
          content="設定"
          index={0}
          onClick={this.props.handleToggleSettings}
        />
        <Accordion.Content
          active={openSettings}
          content={
            <Form>
              <Form.Select
                label="Threshold"
                placeholder="Threshold"
                onChange={this.handleChange}
                value={threshold}
                name="threshold"
                options={thresholdOptions}
              />
              <Form.Select
                label="Resolution"
                placeholder="Resolution"
                onChange={this.handleChange}
                value={resolution}
                name="resolution"
                options={resolutionOptions}
              />
              <Form.Select
                label="Cam"
                placeholder="Cam"
                onChange={this.handleChange}
                value={cam}
                name="cam"
                options={camOptions}
              />
              <Form.Select
                label="Threads"
                placeholder="Threads"
                onChange={this.handleChange}
                value={threads}
                name="threads"
                options={threadsOptions}
              />
              <Form.Input
                label="Minimum Face Size"
                placeholder="Minimum Face Size"
                onChange={this.handleChange}
                value={minimumFaceSize}
                name="minimumFaceSize"
              />
              <Form.Checkbox
                label="Hide Main Window"
                onChange={this.handleChange}
                checked={isHideMainWindow}
                name="isHideMainWindow"
              />
            </Form>
          }
        />
      </Accordion>
    )
  }
}

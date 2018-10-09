import React, { Component } from 'react'
import { compose } from 'redux';
import PropTypes from 'prop-types'
import {
  Button,
  Icon,
} from 'semantic-ui-react';
import axios from 'axios'

import Content from 'components/Content';
import EngineSettings from 'components/EngineSettings';
import { withControlStreaming } from 'utils';

import * as styles from './Welcome.module.css'

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

  state = {
    disabled: true
  }

  handleChange = e => {
    const formData = new FormData();
    formData.set('file', [...e.target.files]);
    axios.post('/api/face/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(() => {
      this.setState({
        disabled: false,
      })
    });
  };

  handleStartTrain() {

  }

  render() {
    const { disabled } = this.state
    const { isStarted, closeWebSocket, openWebSocket } = this.props
    return (
      <Content>
        <label htmlFor="file" className="ui primary button" role='button'>上傳訓練檔案</label>
        <input type="file" name="imageList" id="file" style={{display:'none'}} multiple onChange={function() {
          
        }}/>
        <Button onClick={this.handleStartTrain} disabled={disabled}>開始訓練</Button>
        <Button icon labelPosition="left" onClick={() => {
          openWebSocket()
        }}>
          <Icon name="play" />
          啟動
        </Button>
        <EngineSettings />
        {
          isStarted && 
            <div className={styles.root}>
              <p className={styles.title}>李彥欣，午安</p>
              <Icon name="window close outline" size='big' className={styles.close} onClick={() => {
            closeWebSocket()
          }}/>
              <span className={styles.time}>辨識時間：2018-10-11 AM 1.30 </span>
            </div>
        }
      </Content>
    )
  }
}

export default compose(withControlStreaming)(Welcome);
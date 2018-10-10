import React, { Component } from 'react'
import { compose } from 'redux';
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes';
import {
  Button,
  Icon,
  Input
} from 'semantic-ui-react';
import axios from 'axios'

import Content from 'components/Content';
import EngineSettings from 'components/EngineSettings';
import { withControlStreaming } from 'utils';

import * as styles from './Welcome.module.css'

class Welcome extends Component {
  static propTypes = {
    uiState: ImmutablePropTypes.map.isRequired,
    modelTrainState: ImmutablePropTypes.map.isRequired,
    modelSwitchState: ImmutablePropTypes.map.isRequired,

    threshold: PropTypes.number.isRequired,
    resolution: PropTypes.string.isRequired,
    cam: PropTypes.number.isRequired,
    minimumFaceSize: PropTypes.number.isRequired,
    isHideMainWindow: PropTypes.bool.isRequired,
    threads: PropTypes.number.isRequired,

    openWebSocket: PropTypes.func.isRequired,
    closeWebSocket: PropTypes.func.isRequired,
  }

  state = {
    trainName: '',
    disabled: true
  }

  constructor(props) {
    super(props);
    this.formRef = React.createRef();
  }

  /**
   * upload person images
   */
  handleUpload = e => {
    const formData = new FormData(this.formRef.current);
    
    this.setState({
      disabled: true,
    })
    axios.post('/api/face/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(() => {
      this.setState({
        disabled: false,
      })
    });
    e.target.value = null;
  };

  /**
   * start train after uploaded images
   */
  handleStartTrain = () => {
    this.props.fetchPostModelTrain({
      trainName: this.state.trainName,
      // scenarioType a unchangeable param detail here http://egroup-eds-env.d2mnbckxqi.ap-northeast-1.elasticbeanstalk.com/dashboard/flow/aea8cdd4df534fcd88319783c44f3024/2018-08-21T03:04:51.972Z
      scenarioType: '1',
      blackStatus: 1,
      // if want to train uploaded face images
      uploadFace: true,
    });
  };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  render() {
    const { disabled, trainName } = this.state
    const { uiState, closeWebSocket, openWebSocket } = this.props
    return (
      <Content>
        <form id="uploadForm" ref={this.formRef}>
          <label htmlFor="file" className="ui primary button" role='button'>上傳訓練檔案</label>
          <input type="file" name="file" id="file" style={{display:'none'}} multiple onChange={this.handleUpload}/>
        </form>
        <Input
          placeholder="姓名"
          onChange={this.handleChange}
          value={trainName}
          name="trainName"
        />
        <Button onClick={this.handleStartTrain} disabled={disabled} style={{ marginLeft: '.25em' }}>開始訓練</Button>
        <Button icon labelPosition="left" onClick={openWebSocket}>
          <Icon name="play" />
          啟動
        </Button>
        <EngineSettings />
        {
          uiState.get('isStarted') && 
            <div className={styles.root}>
              <p className={styles.title}>李彥欣，午安</p>
              <Icon name="window close outline" size='big' className={styles.close} onClick={closeWebSocket}/>
              <span className={styles.time}>辨識時間：2018-10-11 AM 1.30 </span>
            </div>
        }
      </Content>
    )
  }
}

export default compose(withControlStreaming)(Welcome);
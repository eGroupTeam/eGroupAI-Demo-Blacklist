import React, { Component } from 'react'
import { compose } from 'redux';
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes';
import {
  Button,
  Icon,
  Input,
  Transition
} from 'semantic-ui-react';
import axios from 'axios'
import moment from 'moment';

import Content from 'components/Content';
import EngineSettings from 'components/EngineSettings';
import { withControlStreaming, getGreetingTime } from 'utils';

import * as styles from './Welcome.module.css'

class Welcome extends Component {
  static propTypes = {
    uiState: ImmutablePropTypes.map.isRequired,
    modelTrainState: ImmutablePropTypes.map.isRequired,

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
    disabled: true,
    data: []
  }

  /**
   * upload person images
   */
  handleUpload = e => {
    const formData = new FormData();
    for (let i = 0; i < e.target.files.length; i++) {
      const file = e.target.files[i];
      formData.append('file', file)
    }
    this.setState({
      disabled: true,
    })
    axios.post('/api/face/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then((response) => {
      this.setState({
        disabled: false,
        data: response.data,
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
      imagePathList: this.state.data
    });
  };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  render() {
    const { disabled, trainName } = this.state
    const { uiState, modelTrainState, closeWebSocket, openWebSocket } = this.props
    const result = uiState.get('result').last() || {}
    return (
      <Content>
        <label htmlFor="file" className="ui primary button" role='button'>上傳訓練檔案</label>
        <input type="file" name="file" id="file" style={{display:'none'}} multiple onChange={this.handleUpload}/>
        <Input
          placeholder="姓名"
          onChange={this.handleChange}
          value={trainName}
          name="trainName"
        />
        <Button onClick={this.handleStartTrain} disabled={disabled} style={{ marginLeft: '.25em' }} loading={modelTrainState.get('isLoading')}>開始訓練</Button>
        <Button icon labelPosition="left" onClick={openWebSocket}>
          <Icon name="play" />
          啟動
        </Button>
        <EngineSettings />
        <Transition visible={uiState.get('isStarted')} animation='fade' duration={500}>
          {/* we need wrap div here because Transition component will replace the css display property with block */}
          <div>
            <div className={styles.root}>
              <div className={styles.title}>
                {result.personName === '查無此人' ?
                  'Welcome TMF Earth' :
                  <React.Fragment>
                    <p>{getGreetingTime()}</p>
                    <p>{result.personName}</p>
                  </React.Fragment>}
              </div>
              <Icon name="window close outline" size='big' className={styles.close} onClick={closeWebSocket}/>
              <span className={styles.time}>Recognized Time：{moment(result.systemTime).format(
                                'MMM Do YY, h:mm:ss a'
                              )} </span>
            </div>
          </div>
        </Transition>   
      </Content>
    )
  }
}

export default compose(withControlStreaming)(Welcome);
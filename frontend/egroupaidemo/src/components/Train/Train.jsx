import React, { Component } from 'react';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { withnprogress, withControlStreaming } from 'utils';
import {
  Divider,
  Button,
  Input,
  Checkbox,
  Grid,
  Header,
  Message
} from 'semantic-ui-react';

import Content from 'components/Content';
import TrainImage from 'components/TrainImage';
import VideoStream from 'components/VideoStream';

class Train extends Component {
  static propTypes = {
    result: ImmutablePropTypes.list.isRequired,
    objectUrl: PropTypes.string,
    rtspURL: PropTypes.string.isRequired,
    uiState: ImmutablePropTypes.map.isRequired,
    modelTrainState: ImmutablePropTypes.map.isRequired,
    modelSwitchState: ImmutablePropTypes.map.isRequired,

    concatRetrivedFaces: PropTypes.func.isRequired,
    waitUserToTrain: PropTypes.func.isRequired,
    stopRetriveFaces: PropTypes.func.isRequired,
    toggleBlackStatus: PropTypes.func.isRequired,
    appendSelectedFace: PropTypes.func.isRequired,
    fetchPostModelTrain: PropTypes.func.isRequired
  };

  state = {
    trainName: '',
    seconds: 3
  };

  /**
   * concat retrived faces
   */
  componentDidUpdate = () => {
    const { uiState } = this.props;
    if (uiState.get('startRetriveFace')) {
      if (uiState.get('retrivedFaces').size < 10) {
        this.props.concatRetrivedFaces(this.props.result);
      } else {
        // stop retrive faces and next step we may need traning if user use auto train so we pass trainName
        this.props.stopRetriveFaces(this.state.trainName);
      }
    }
  };

  /**
   * start training process
   */
  handleTrain = () => {
    // wait 3 sec for better user experience
    this.props.waitUserToTrain();
    // timer for better user experience
    this.setState({
      seconds: 3
    });
    this.timer = setInterval(this.countDown, 1000);
  };

  // timer countDown
  countDown = () => {
    const seconds = this.state.seconds - 1;
    this.setState({
      seconds
    });

    if (seconds === 0) {
      clearInterval(this.timer);
    }
  };

  /**
   * handle black status value
   * blackStatus = 1, whitelist
   * blackStatus = 2, blacklist
   */
  handleBlackStatus = (e, { checked }) => {
    this.props.toggleBlackStatus(checked ? 2 : 1);
  };

  /**
   * handle if auto train
   */
  handleAutoTrain = (e, { checked }) => {
    this.props.toggleAutoTrain(checked);
  };

  /**
   * handle change values
   */
  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  /**
   * handle face selected by user
   */
  handleClickTrainImage = face => {
    this.props.appendSelectedFace(face);
  };

  handleStartTrain = () => {
    const { uiState } = this.props;
    this.props.fetchPostModelTrain({
      trainName: this.state.trainName,
      // scenarioType a unchangeable param detail here http://egroup-eds-env.d2mnbckxqi.ap-northeast-1.elasticbeanstalk.com/dashboard/flow/aea8cdd4df534fcd88319783c44f3024/2018-08-21T03:04:51.972Z
      scenarioType: '1',
      blackStatus: uiState.get('blackStatus'),
      imagePathList: uiState
        .get('selectedFaces')
        .map(value => value.frameFacePath)
        .toJS()
    });
  };

  renderText = () => {
    const { seconds } = this.state;
    const { modelTrainState, modelSwitchState, uiState } = this.props;
    let text = '';
    if (uiState.get('waitUserToTrain')) {
      text = `${seconds} 秒後開始${
        uiState.get('isAutoTrain') ? '訓練' : '截圖'
      }`;
    } else if (modelTrainState.get('isLoading')) {
      text = '訓練中..';
    } else if (modelSwitchState.get('isLoading')) {
      text = '更新模型中..';
    } else if (modelSwitchState.getIn(['data', 'status']) === 200) {
      text = '訓練完成，回辨識頁面即可顯示結果';
    }
    return <Header textAlign="center">{text}</Header>;
  };

  render() {
    const { trainName, uiState, rtspURL, result, objectUrl } = this.props;
    const isUseRtsp = rtspURL !== '';
    return (
      <Content>
        <Checkbox
          toggle
          checked={uiState.get('blackStatus') === 2 ? true : false}
          label={uiState.get('blackStatus') === 2 ? '加入黑名單' : '加入白名單'}
          onChange={this.handleBlackStatus}
        />
        <Input
          placeholder="姓名"
          onChange={this.handleChange}
          value={trainName}
          name="trainName"
          style={{ marginLeft: '10px' }}
        />
        <Checkbox
          toggle
          checked={uiState.get('isAutoTrain')}
          label={uiState.get('isAutoTrain') ? '自動訓練' : '手動訓練'}
          onChange={this.handleAutoTrain}
          style={{ marginLeft: '10px' }}
        />
        <Button onClick={this.handleTrain} style={{ marginLeft: '10px' }}>
          {uiState.get('isAutoTrain') ? '開始訓練' : '開始擷取'}
        </Button>
        {uiState.get('selectedFaces').size !== 0 && (
          <Button onClick={this.handleStartTrain}>開始訓練</Button>
        )}
        <Divider />
        <div style={{ margin: 'auto', width: '50%' }}>
          <Message info>
            <Message.Header>訓練時請將臉面向鏡頭</Message.Header>
          </Message>
          <VideoStream isUseRtsp={isUseRtsp} result={result} objectUrl={objectUrl}/>
        </div>
        {this.renderText()}
        {uiState.get('showRetrivedFaces') && (
          <React.Fragment>
            <Divider />
            <Header textAlign="center">請選擇訓練人臉</Header>
            <Grid>
              <Grid.Row columns={5}>
                {uiState.get('retrivedFaces').map((value, index) => {
                  return (
                    <Grid.Column
                      key={index}
                      style={{
                        marginBottom: '28px'
                      }}
                    >
                      <TrainImage
                        value={value}
                        onClick={this.handleClickTrainImage}
                      />
                    </Grid.Column>
                  );
                })}
              </Grid.Row>
            </Grid>
          </React.Fragment>
        )}
      </Content>
    );
  }
}

export default compose(withnprogress, withControlStreaming)(Train);

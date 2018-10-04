import React, { Component } from 'react';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import moment from 'moment';
import { List } from 'immutable';
import {
  Divider,
  Grid,
  List as UIList,
  Image,
  Message,
  Segment,
  Header,
  Button,
  Icon,
  Form,
  Accordion
} from 'semantic-ui-react';

import { withnprogress } from 'utils';
import Content from 'components/Content';

let websocket;

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

class Recognition extends Component {
  static propTypes = {
    isStarted: PropTypes.bool.isRequired,
    setResult: PropTypes.func.isRequired,
    result: ImmutablePropTypes.list.isRequired
  };

  state = {
    threshold: 0.7,
    resolution: '720p',
    videoWidth: '1280',
    videoHeight: '720',
    cam: 0,
    minimumFaceSize: 100,
    isHideMainWindow: true,
    threads: 2,
    openSettings: true
  };

  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
  }

  componentDidMount = () => {
    this.videoRef.current.srcObject = window.stream;
  };

  /**
   * update recognized result live
   */
  openWebSocket = () => {
    if ('WebSocket' in window) {
      websocket = new WebSocket('ws://10.211.55.3:8080/websocket/engine/1');
      console.log('link success');
    } else {
      alert('Not support websocket');
    }

    websocket.onerror = () => {
      console.log('websocket has error');
    };

    websocket.onopen = event => {
      const {
        threshold,
        resolution,
        cam,
        minimumFaceSize,
        isHideMainWindow,
        threads
      } = this.state;

      websocket.send(
        JSON.stringify({
          threshold,
          resolution,
          cam,
          minimumFaceSize,
          isHideMainWindow,
          threads
        })
      );
      this.props.toggleRecognize(true);
      this.openWebCam();
    };

    websocket.onmessage = event => {
      let list = List(JSON.parse(event.data));
      list = list.map(value => {
        return {
          ...value,
          frameFacePath: value.frameFacePath.replace(/^.*[\\/]/, ''),
          framePath: value.framePath.replace(/^.*[\\/]/, '')
        };
      });
      this.props.setResult(list);
    };

    websocket.onclose = () => {
      console.log('websocket closed');
    };

    // 監聽窗口關閉事件，當窗口關閉時，主動去關閉websocket連接，防止連接還沒斷開就關閉窗口，server端會拋異常。
    window.onbeforeunload = () => {
      websocket.close();
    };
  };

  closeWebSocket = () => {
    websocket.close();
    this.props.toggleRecognize(false);
    this.closeWebCam();
  };

  /**
   * capture webcam streaming
   */
  openWebCam = () => {
    const { videoHeight, videoWidth } = this.state;
    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({
          video: {
            width: { exact: videoWidth },
            height: { exact: videoHeight }
          }
        })
        .then(stream => {
          window.stream = stream;
          this.videoRef.current.srcObject = stream;
          this.setState({
            getUserMediaError: false
          });
        })
        .catch(error => {
          this.setState({
            getUserMediaError: error.name
          });
          this.closeWebSocket();
        });
    }
  };

  closeWebCam = () => {
    if (window.stream) {
      window.stream.getTracks().forEach(track => {
        track.stop();
      });
    }
  };

  /**
   * handle change values
   */
  handleChange = (e, { name, value, checked }) => {
    if (name === 'resolution') {
      let videoWidth = '1280';
      let videoHeight = '720';
      switch (value) {
        case '360p':
          videoHeight = '360';
          videoWidth = '640';
          break;
        case '480p':
          videoHeight = '480';
          videoWidth = '854';
          break;
        case '720p':
          videoHeight = '720';
          videoWidth = '1280';
          break;
        case '1080p':
          videoHeight = '1080';
          videoWidth = '1920';
          break;
        case '1440p':
          videoHeight = '1440';
          videoWidth = '2560';
          break;
        default:
          videoHeight = '720';
          videoWidth = '1280';
          break;
      }
      this.setState({
        [name]: value || checked,
        videoWidth,
        videoHeight
      });
    } else {
      this.setState({ [name]: value || checked });
    }
  };

  /**
   * handle show or hide settings
   */
  handleToggleSettings = e => {
    this.setState({ openSettings: !this.state.openSettings });
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
      getUserMediaError
    } = this.state;
    const { result, isStarted } = this.props;
    const blacklist = result.filter(value => value.blackStatus === 2);
    return (
      <Content>
        {isStarted ? (
          <Button icon labelPosition="left" onClick={this.closeWebSocket}>
            <Icon name="stop" />
            停止
          </Button>
        ) : (
          <Button icon labelPosition="left" onClick={this.openWebSocket}>
            <Icon name="play" />
            啟動
          </Button>
        )}
        <Divider />
        <Grid>
          <Grid.Row columns={2}>
            <Grid.Column width="10">
              <Segment>
                <Header>影像</Header>
                {getUserMediaError && (
                  <Message negative>
                    <Message.Header>webcam 不支援此解析度</Message.Header>
                    {getUserMediaError}
                  </Message>
                )}
                <video
                  autoPlay
                  ref={this.videoRef}
                  style={{
                    backgroundColor: '#000',
                    width: '100%',
                    height: 'auto'
                  }}
                />
              </Segment>
              {blacklist.size !== 0 && (
                <React.Fragment>
                  <Message negative attached>
                    <Message.Header> 危險人物出現 </Message.Header>
                  </Message>
                  <Segment attached>
                    <Grid>
                      <Grid.Row columns={4}>
                        {blacklist.map((value, index) => {
                          return (
                            <Grid.Column
                              key={index}
                              style={{
                                marginBottom: '28px'
                              }}
                            >
                              <Image
                                src={`${process.env.PUBLIC_URL}/outputFace/${
                                  value.frameFacePath
                                }`}
                                size="small"
                                wrapped
                              />
                            </Grid.Column>
                          );
                        })}
                      </Grid.Row>
                    </Grid>
                  </Segment>
                </React.Fragment>
              )}
            </Grid.Column>
            <Grid.Column width="6">
              <Accordion as={Segment}>
                <Accordion.Title
                  active={openSettings}
                  content="設定"
                  index={0}
                  onClick={this.handleToggleSettings}
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
              {result.size > 0 && (
                <Segment>
                  <UIList>
                    {result.map((value, index) => {
                      return (
                        <UIList.Item key={index}>
                          <Image
                            avatar
                            src={`${process.env.PUBLIC_URL}/outputFace/${
                              value.frameFacePath
                            }`}
                          />
                          <UIList.Content>
                            <UIList.Header>{value.personName}</UIList.Header>
                            <UIList.Description>
                              {value.blackStatus === 0
                                ? '偵測時間'
                                : '辨識時間'}{' '}
                              {moment(value.systemTime).format(
                                'MMM Do YY, h:mm:ss a'
                              )}
                            </UIList.Description>
                          </UIList.Content>
                        </UIList.Item>
                      );
                    })}
                  </UIList>
                </Segment>
              )}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Content>
    );
  }
}

export default compose(withnprogress)(Recognition);

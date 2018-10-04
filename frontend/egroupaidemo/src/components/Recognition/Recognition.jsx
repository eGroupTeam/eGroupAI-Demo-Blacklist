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
} from 'semantic-ui-react';

import { withnprogress } from 'utils';
import Content from 'components/Content';
import EngineSettings from 'components/EngineSettings';

let websocket;

class Recognition extends Component {
  static propTypes = {
    isStarted: PropTypes.bool.isRequired,
    setResult: PropTypes.func.isRequired,
    result: ImmutablePropTypes.list.isRequired,

    threshold: PropTypes.number.isRequired,
    resolution: PropTypes.string.isRequired,
    cam: PropTypes.number.isRequired,
    minimumFaceSize: PropTypes.number.isRequired,
    isHideMainWindow: PropTypes.bool.isRequired,
    threads: PropTypes.number.isRequired,

    videoWidth: PropTypes.number.isRequired,
    videoHeight: PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
  }

  state = {}

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
      } = this.props;

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
    const { videoHeight, videoWidth } = this.props;
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

  render() {
    const {
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
              <EngineSettings />
              
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

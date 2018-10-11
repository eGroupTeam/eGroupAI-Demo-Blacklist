import React, { Component } from 'react';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import moment from 'moment';
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

import { withnprogress, withControlStreaming } from 'utils';
import Content from 'components/Content';
import EngineSettings from 'components/EngineSettings';
import VideoStream from 'components/VideoStream';

class Recognition extends Component {
  static propTypes = {
    isStarted: PropTypes.bool.isRequired,
    result: ImmutablePropTypes.list.isRequired,

    objectUrl: PropTypes.string,
    rtspURL: PropTypes.string.isRequired,
    getUserMediaError: PropTypes.string,
    openWebSocket: PropTypes.func.isRequired,
    closeWebSocket: PropTypes.func.isRequired,
    openWebCam: PropTypes.func.isRequired,
    closeWebCam: PropTypes.func.isRequired,
  };

  render() {
    const { result, isStarted, closeWebSocket, openWebSocket, openWebCam, closeWebCam, getUserMediaError, rtspURL, objectUrl } = this.props;
    const blacklist = result.filter(value => value.blackStatus === 2);
    const isUseRtsp = rtspURL !== ''
    return (
      <Content>
        {isStarted ? (
          <Button icon labelPosition="left" onClick={() => {
            closeWebSocket()
          }}>
            <Icon name="stop" />
            停止
          </Button>
        ) : (
          <Button icon labelPosition="left" onClick={() => {
            openWebSocket({
              onEngineStarted: isUseRtsp ? undefined : openWebCam,
              onclose: isUseRtsp ? undefined : closeWebCam
            })
          }}>
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
                <VideoStream isUseRtsp={isUseRtsp} result={result} objectUrl={objectUrl}/>
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

export default compose(withnprogress, withControlStreaming)(Recognition);

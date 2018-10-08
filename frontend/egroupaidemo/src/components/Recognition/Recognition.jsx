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

    closeWebSocket: PropTypes.func.isRequired,
    openWebSocket: PropTypes.func.isRequired,
    objectUrl: PropTypes.string,
    getUserMediaError: PropTypes.string,
  };

  render() {
    const { result, isStarted, closeWebSocket, openWebSocket, getUserMediaError, objectUrl } = this.props;
    const blacklist = result.filter(value => value.blackStatus === 2);
    return (
      <Content>
        {isStarted ? (
          <Button icon labelPosition="left" onClick={closeWebSocket}>
            <Icon name="stop" />
            停止
          </Button>
        ) : (
          <Button icon labelPosition="left" onClick={openWebSocket}>
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
                  src={objectUrl}
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

export default compose(withnprogress, withControlStreaming)(Recognition);

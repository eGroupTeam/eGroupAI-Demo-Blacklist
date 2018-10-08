import _omit from 'lodash/omit';
import React, { Component } from 'react';
import { List } from 'immutable';

export default function withControlStreaming(WrappedComponent) {
  return class Wrapper extends Component {

    state = {}

    componentDidMount = () => {
      if (this.stream) {
        this.setState({
          objectUrl: window.URL.createObjectURL(this.stream)
        });
      }
    };
  
    /**
     * update recognized result live
     */
    openWebSocket = () => {
      if ('WebSocket' in window) {
        this.websocket = new WebSocket('ws://10.211.55.3:8080/websocket/engine/1');
        console.log('link success');
      } else {
        alert('Not support websocket');
      }
  
      this.websocket.onerror = () => {
        console.log('websocket has error');
      };
  
      this.websocket.onopen = event => {
        const {
          threshold,
          resolution,
          cam,
          minimumFaceSize,
          isHideMainWindow,
          threads
        } = this.props;
  
        this.websocket.send(
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
  
      this.websocket.onmessage = event => {
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
  
      this.websocket.onclose = () => {
        console.log('websocket closed');
      };
  
      // 監聽窗口關閉事件，當窗口關閉時，主動去關閉websocket連接，防止連接還沒斷開就關閉窗口，server端會拋異常。
      window.onbeforeunload = () => {
        this.websocket.close();
      };
    };
  
    closeWebSocket = () => {
      this.websocket.close();
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
            this.stream = stream;
            this.setState({
              getUserMediaError: undefined,
              objectUrl: window.URL.createObjectURL(this.stream)
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
      if (this.stream) {
        this.stream.getTracks().forEach(track => {
          track.stop();
        });
      }
    };

    render() {
      const {
        getUserMediaError,
        objectUrl
      } = this.state;
      const passThroughProps = _omit(this.props, [
        'objectUrl',
        'getUserMediaError',
        'openWebSocket',
        'closeWebSocket',
      ]); 
      return <WrappedComponent
       objectUrl={objectUrl} getUserMediaError={getUserMediaError} openWebSocket={this.openWebSocket} 
       closeWebSocket={this.closeWebSocket}
       {...passThroughProps}
       />;
    }
  };
}

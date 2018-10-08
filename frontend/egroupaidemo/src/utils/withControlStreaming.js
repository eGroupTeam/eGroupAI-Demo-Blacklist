import _omit from 'lodash/omit';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';

export default function withControlStreaming(WrappedComponent) {
  return class Wrapper extends Component {
    static propTypes = {
      setResult: PropTypes.func,
      toggleRecognize: PropTypes.func,
  
      threshold: PropTypes.number.isRequired,
      resolution: PropTypes.string.isRequired,
      cam: PropTypes.number.isRequired,
      rtspURL: PropTypes.string.isRequired,
      minimumFaceSize: PropTypes.number.isRequired,
      isHideMainWindow: PropTypes.bool.isRequired,
      threads: PropTypes.number.isRequired,
  
      videoWidth: PropTypes.number.isRequired,
      videoHeight: PropTypes.number.isRequired,
    };

    state = {}

    componentDidMount = () => {
      // persist streaming while changed page
      if (window.stream) {
        this.setState({
          objectUrl: window.URL.createObjectURL(window.stream)
        });
      }
    };
  
    /**
     * update recognized result live
     */
    openWebSocket = () => {
      // link websocket
      if ('WebSocket' in window) {
        window.websocket = new WebSocket('ws://10.211.55.3:8080/websocket/engine/1');
      } else {
        alert('Not support websocket');
      }
      // toggle open ui state
      window.websocket.onopen = event => {
        console.log('websocket opened');
        const {
          threshold,
          resolution,
          cam,
          rtspURL,
          minimumFaceSize,
          isHideMainWindow,
          threads
        } = this.props;

        let inputSource = {
          cam
        }

        // use ip cam
        if (rtspURL !== '') {
          inputSource = {
            rtspURL
          }
        }
  
        window.websocket.send(
          JSON.stringify({
            threshold,
            resolution,
            minimumFaceSize,
            isHideMainWindow,
            threads,
            ...inputSource
          })
        );
        this.props.toggleRecognize();
      };

      // toggle close ui state
      window.websocket.onclose = () => {
        console.log('websocket closed');
        this.props.toggleRecognize();
      };
      
      // set recognized result
      window.websocket.onmessage = event => {
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

      // on error
      window.websocket.onerror = (error) => {
        console.log(error);
      };
  
      // 監聽窗口關閉事件，當窗口關閉時，主動去關閉websocket連接，防止連接還沒斷開就關閉窗口，server端會拋異常。
      window.onbeforeunload = () => {
        window.websocket.close();
      };
    };
  
    closeWebSocket = () => {
      window.websocket.close();
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
            this.setState({
              getUserMediaError: undefined,
              objectUrl: window.URL.createObjectURL(window.stream)
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
  
    /**
     * kill all webcam streaming
     */
    closeWebCam = () => {
      if (window.stream) {
        window.stream.getTracks().forEach(track => {
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
        'openWebCam',
        'closeWebCam',
      ]); 
      return <WrappedComponent
        objectUrl={objectUrl}
        getUserMediaError={getUserMediaError}
        openWebSocket={this.openWebSocket} 
        closeWebSocket={this.closeWebSocket}
        openWebCam={this.openWebCam}
        closeWebCam={this.closeWebCam}
        {...passThroughProps}
      />;
    }
  };
}

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { getResult } from 'redux/modules/components/Recognition/selectors';
import {
  getUIState,
  getModelTrainState,
  getModelSwitchState
} from 'redux/modules/components/Train/selectors';

import actionCreators from 'redux/modules/actionCreators';

import Train from './Train';

const mapStateToProps = state => ({
  result: getResult(state),
  uiState: getUIState(state),
  modelTrainState: getModelTrainState(state),
  modelSwitchState: getModelSwitchState(state)
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      ...actionCreators.components.train
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Train);

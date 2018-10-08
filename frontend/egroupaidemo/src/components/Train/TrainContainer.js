import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { getResult } from 'redux/modules/Recognition/selectors';
import { getEngineSettingsState } from 'redux/modules/EngineSettings/selectors';
import {
  getUIState,
  getModelTrainState,
  getModelSwitchState
} from 'redux/modules/Train/selectors';

import actionCreators from 'redux/modules/actionCreators';

import Train from './Train';

const mapStateToProps = state => ({
  result: getResult(state),
  uiState: getUIState(state),
  modelTrainState: getModelTrainState(state),
  modelSwitchState: getModelSwitchState(state),
  ...getEngineSettingsState(state).toJS()
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      ...actionCreators.train
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Train);

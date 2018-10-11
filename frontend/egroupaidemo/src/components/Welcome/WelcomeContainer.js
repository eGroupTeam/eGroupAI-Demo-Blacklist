import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { getUIState, getModelTrainState } from 'redux/modules/Welcome/selectors';
import { getEngineSettingsState } from 'redux/modules/EngineSettings/selectors';

import actionCreators from 'redux/modules/actionCreators';

import Welcome from './Welcome';

const mapStateToProps = state => ({
  uiState: getUIState(state),
  modelTrainState: getModelTrainState(state),
  ...getEngineSettingsState(state).toJS()
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      ...actionCreators.welcome
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Welcome);

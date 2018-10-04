import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { getEngineSettingsState } from 'redux/modules/EngineSettings/selectors';

import actionCreators from 'redux/modules/actionCreators';

import EngineSettings from './EngineSettings';

const mapStateToProps = state => getEngineSettingsState(state).toJS();

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      ...actionCreators.engineSettings
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EngineSettings);

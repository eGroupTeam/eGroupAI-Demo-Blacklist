import { connect } from 'react-redux';

import { getEngineSettingsState } from 'redux/modules/EngineSettings/selectors';

import Welcome from './Welcome';

const mapStateToProps = state => ({
  ...getEngineSettingsState(state).toJS()
});

export default connect(
  mapStateToProps,
)(Welcome);

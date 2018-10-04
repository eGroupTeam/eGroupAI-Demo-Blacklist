import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { getIsStarted, getResult } from 'redux/modules/components/Recognition/selectors';

import actionCreators from 'redux/modules/actionCreators';

import Recognition from './Recognition';

const mapStateToProps = state => ({
  isStarted: getIsStarted(state),
  result: getResult(state)
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      ...actionCreators.components.recognition
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Recognition);

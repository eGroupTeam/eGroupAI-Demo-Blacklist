import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { getBlackState } from 'redux/modules/pages/Black/selectors';

import actionCreators from 'redux/modules/actionCreators';

import Black from './Black';

const mapStateToProps = state => ({
  blackState: getBlackState(state)
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      ...actionCreators.pages.black
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Black);

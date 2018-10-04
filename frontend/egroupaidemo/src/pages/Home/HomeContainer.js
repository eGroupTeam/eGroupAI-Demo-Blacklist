import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { getIsStarted, getResult } from 'redux/modules/pages/Home/selectors';

import actionCreators from 'redux/modules/actionCreators';

import Home from './Home';

const mapStateToProps = state => ({
  isStarted: getIsStarted(state),
  result: getResult(state)
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      ...actionCreators.pages.home
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

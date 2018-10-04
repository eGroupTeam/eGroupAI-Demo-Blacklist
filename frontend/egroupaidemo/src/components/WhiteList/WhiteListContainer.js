import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { getWhiteState } from 'redux/modules/components/WhiteList/selectors';

import actionCreators from 'redux/modules/actionCreators';

import WhiteList from './WhiteList';

const mapStateToProps = state => ({
  whiteState: getWhiteState(state)
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      ...actionCreators.components.whiteList
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WhiteList);

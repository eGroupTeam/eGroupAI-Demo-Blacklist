import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { getWhiteState } from 'redux/modules/pages/White/selectors';

import actionCreators from 'redux/modules/actionCreators';

import White from './White';

const mapStateToProps = state => ({
  whiteState: getWhiteState(state)
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      ...actionCreators.pages.white
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(White);

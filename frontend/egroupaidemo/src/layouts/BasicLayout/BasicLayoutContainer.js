import { connect } from 'react-redux';

import { getResult } from 'redux/modules/components/Recognition/selectors';

import BasicLayout from './BasicLayout';

const mapStateToProps = state => ({
  result: getResult(state)
});

export default connect(mapStateToProps)(BasicLayout);

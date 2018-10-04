import { connect } from 'react-redux';

import { getResult } from 'redux/modules/Recognition/selectors';

import BlackListLayout from './BlackListLayout';

const mapStateToProps = state => ({
  result: getResult(state)
});

export default connect(mapStateToProps)(BlackListLayout);

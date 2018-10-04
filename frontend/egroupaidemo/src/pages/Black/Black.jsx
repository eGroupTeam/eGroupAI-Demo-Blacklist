import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { compose } from 'redux';
import { Card, Image } from 'semantic-ui-react';
import { withnprogress } from 'utils';

import Content from 'components/Content';

class Black extends Component {
  static propTypes = {
    blackState: ImmutablePropTypes.map.isRequired,
    fetchGetBlackWhite: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.fetchGetBlackWhite({
      blackStatus: 2
    });
  }

  render() {
    const data = this.props.blackState.get('data');
    if (data.size) {
      return (
        <Content>
          <Card.Group>
            {// object map need entrySeq take a look this https://github.com/facebook/immutable-js/issues/667#issuecomment-220223640
            data.entrySeq().map(([key, value]) => (
              <Card key={key}>
                <Image
                  src={`${process.env.PUBLIC_URL}/outputFace/${
                    value.frameFacePath
                  }`}
                />
                <Card.Content>
                  <Card.Header>{value.personName}</Card.Header>
                </Card.Content>
              </Card>
            ))}
          </Card.Group>
        </Content>
      );
    }
    return <Content>未建立</Content>;
  }
}

export default compose(withnprogress)(Black);

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Image } from 'semantic-ui-react';

import './TrainImage.css';

export default class TrainImage extends Component {
  static propTypes = {
    value: PropTypes.object.isRequired,
    onClick: PropTypes.func
  };

  static defaultProps = {
    onClick: () => {}
  };

  state = {
    isSelected: false
  };

  handleClick = e => {
    this.setState({
      isSelected: !this.state.isSelected
    });
    const { value, onClick } = this.props;
    onClick(value);
  };

  render() {
    const { value } = this.props;
    return (
      <div
        className={classNames('Train__img', {
          'Train__img--selected': this.state.isSelected
        })}
        onClick={this.handleClick}
      >
        <Image
          src={`${process.env.PUBLIC_URL}/outputFace/${value.frameFacePath}`}
          bordered
          rounded
        />
      </div>
    );
  }
}

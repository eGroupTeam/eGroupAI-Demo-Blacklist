import React from 'react';
import { Menu, Sidebar } from 'semantic-ui-react';

const RightMenu = props => (
  <Sidebar
    as={Menu}
    animation="overlay"
    direction="right"
    visible={props.visible}
    vertical
    inverted
  />
);

export default RightMenu;

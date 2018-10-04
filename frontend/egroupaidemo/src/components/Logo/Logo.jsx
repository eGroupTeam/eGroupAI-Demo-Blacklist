import React from 'react';
import { Image } from 'semantic-ui-react';

const logo = require('static/images/logo.png');

const Logo = () => <Image size="mini" src={logo} centered />;

export default Logo;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import moment from 'moment';
import { NavLink, Switch, Route } from 'react-router-dom';
import styled from 'styled-components';
import { Responsive, Icon, Menu, Sidebar, Ref } from 'semantic-ui-react';

import { Home, White, Black, Train } from 'loadables';

import Logo from 'components/Logo';
import RightMenu from 'components/RightMenu';
import TopMenu from 'components/TopMenu';
import Snackbar from 'components/Snackbar';

const leftItems = [
  {
    key: 'left1',
    as: NavLink,
    name: '辨識',
    to: '/',
    icon: 'user',
    exact: true,
    link: false
  },
  {
    key: 'left2',
    as: NavLink,
    name: '白名單',
    to: '/white',
    icon: 'list',
    link: false
  },
  {
    key: 'left3',
    as: NavLink,
    name: '黑名單',
    to: '/black',
    icon: 'list alternate',
    link: false
  },
  {
    key: 'left4',
    as: NavLink,
    name: '訓練',
    to: '/train',
    icon: 'save',
    link: false
  }
];

const StyledRouter = styled.main`
  position: relative;
  top: ${props => props.top};
  min-height: ${props => `calc(100vh - ${props.top})`};
  overflow: auto;
  margin-left: ${props => props.marginLeft};
`;

const Router = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/white" component={White} />
    <Route exact path="/black" component={Black} />
    <Route exact path="/train" component={Train} />
  </Switch>
);

class BasicLayout extends Component {
  static propTypes = {
    history: PropTypes.objectOf(PropTypes.any).isRequired,
    result: ImmutablePropTypes.list.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      leftVisible: false,
      rightVisible: false
    };
    this.handleRef = this.handleRef.bind(this);
  }

  onPusherClick = () => {
    this.setState({
      leftVisible: false,
      rightVisible: false
    });
  };

  onLeftButtonClick = () => {
    this.setState({ leftVisible: true });
  };

  onRightButtonClick = () => {
    this.setState({ rightVisible: true });
  };

  handleRef(menuLeftRef) {
    this.setState({ menuLeftRef });
  }

  render() {
    const { leftVisible, rightVisible, menuLeftRef } = this.state;
    const { history, result } = this.props;
    const snackbars = [];
    const blacklist = result.filter(value => value.blackStatus === 2);
    if (blacklist.size !== 0) {
      const value = blacklist.last();
      snackbars.push(
        <Snackbar
          key="danger"
          error
          header="危險人物出現"
          content={`時間：${moment(value.systemTime).format(
            'MMM Do YY, h:mm:ss a'
          )}，姓名：${value.personName}`}
        />
      );
    }
    return (
      <div>
        <Responsive maxWidth={Responsive.onlyMobile.maxWidth}>
          <Sidebar
            as={Menu}
            icon="labeled"
            vertical
            inverted
            animation="overlay"
            items={leftItems}
            visible={leftVisible}
          />
          <RightMenu
            visible={rightVisible}
            onPusherClick={this.onPusherClick}
          />
          <Menu fixed="top" inverted>
            <Menu.Item>
              <Logo />
            </Menu.Item>
            <Menu.Menu position="right">
              <Menu.Item onClick={this.onLeftButtonClick}>
                <Icon name="list ul" />
              </Menu.Item>
              <Menu.Item onClick={this.onRightButtonClick}>
                <Icon name="sidebar" />
              </Menu.Item>
            </Menu.Menu>
          </Menu>

          <Sidebar.Pushable>
            <Sidebar.Pusher
              dimmed={leftVisible || rightVisible}
              onClick={this.onPusherClick}
            >
              <StyledRouter top="66px" marginLeft="0">
                <Router />
              </StyledRouter>
            </Sidebar.Pusher>
          </Sidebar.Pushable>
        </Responsive>

        <Responsive minWidth={Responsive.onlyTablet.minWidth}>
          <TopMenu
            leftMenuWidth={menuLeftRef && menuLeftRef.offsetWidth}
            history={history}
          />
          <Ref innerRef={this.handleRef}>
            <Menu
              icon="labeled"
              vertical
              fixed="left"
              inverted
              items={[
                {
                  key: 'logo',
                  disabled: true,
                  children: <Logo />
                },
                ...leftItems
              ]}
              style={{
                overflowY: 'auto'
              }}
            />
          </Ref>
          <StyledRouter
            top="47px"
            marginLeft={menuLeftRef && `${menuLeftRef.offsetWidth}px`}
          >
            <Router />
          </StyledRouter>
        </Responsive>
        {snackbars}
      </div>
    );
  }
}

export default BasicLayout;

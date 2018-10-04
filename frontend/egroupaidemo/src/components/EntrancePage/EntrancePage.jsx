import React, { Component } from 'react'
import { Header, Card } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom';

import Content from 'components/Content'

export default class EntrancePage extends Component {
  render() {
    return (
      <Content>
        <Header>請選擇demo</Header>
        <Card.Group>
          <Card
            as={NavLink}
            to='/welcome-demo'
            header='歡迎光臨'
          />
          <Card
            as={NavLink}
            to='/blacklist-demo'
            header='黑白名單'
          />
        </Card.Group>
      </Content>
    )
  }
}

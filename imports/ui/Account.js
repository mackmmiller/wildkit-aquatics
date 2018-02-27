import React, { Component } from 'react';
import styled from 'styled-components';

import Admin from './account/Admin';
import Coach from './account/Coach';
import Parent from './account/Parent';
import User from './account/User';

class Account extends Component {
  state = {
    current: <Admin />,
  };

  render() {
    const {
 _id, parent, coach, admin 
} = this.props.user;
    return (
      <Wrapper className="wrapper">
        <WorkSpace>{this.state.current}</WorkSpace>
        {/* <SideBar>
          <ul>
            <SideBarItem>
              {admin && admin._id}
              <button onClick={() => this.setState({ current: <Admin /> })}>
                Admin
              </button>
            </SideBarItem>
            <SideBarItem>
              {coach && coach._id}
              <button onClick={() => this.setState({ current: <Coach /> })}>
                Coach
              </button>
            </SideBarItem>
            <SideBarItem>
              {parent && parent._id}
              <button onClick={() => this.setState({ current: <Parent /> })}>
                Registration
              </button>
            </SideBarItem>
            <SideBarItem>
              {_id && _id}
              <button onClick={() => this.setState({ current: <User /> })}>
                <i className="fas fa-cogs" />
              </button>
            </SideBarItem>
          </ul>
        </SideBar> */}
      </Wrapper>
    );
  }
}

export default Account;

const Wrapper = styled.div`
  color: #181818;
  display: flex;
  flex: 1;
  flex-direction: row;
`;

const WorkSpace = styled.div`
  flex: 9;
`;

const SideBar = styled.div`
  box-sizing: border-box;
  flex: 1;
  border-left: 2px solid #d1d1d1;
  padding: 5rem 0;
  background-color: #dbdbdb;
  flex-flow: column nowrap;
  display: flex;
  > ul {
    flex: 1;
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
  }
`;

const SideBarItem = styled.li`
  margin-bottom: 1rem;
  > button {
    width: 100%;
    color: #181818;
    font-size: 2rem;
  }
`;

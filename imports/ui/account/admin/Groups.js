import React, { Component } from 'react';
import styled from 'styled-components';

import Group from './Group';

class Groups extends Component {
  state = {
    current: this.props.groups[0],
  };

  render() {
    const { groups } = this.props;
    const { current } = this.state;
    return (
      <div>
        <Header>
          <div className="top">
            <h3>Groups</h3>
          </div>
          <div className="buttons">
            <button onClick={() => this.setState({ current: groups[0] })}>
              Learn To Swim
            </button>
            <button onClick={() => this.setState({ current: groups[1] })}>
              Bronze
            </button>
            <button onClick={() => this.setState({ current: groups[2] })}>
              Silver
            </button>
            <button onClick={() => this.setState({ current: groups[3] })}>
              Gold
            </button>
            <button onClick={() => this.setState({ current: groups[4] })}>
              Platinum
            </button>
            <button onClick={() => this.setState({ current: groups[5] })}>
              High School
            </button>
          </div>
        </Header>
        <div>
          <Group key={current._id} data={current} />
        </div>
      </div>
    );
  }
}

export default Groups;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  .top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 0;
    > h3 {
      margin: 0;
    }
  }
  .buttons {
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 1rem 0;
  }
`;

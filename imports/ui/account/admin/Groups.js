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
          <div className="buttons">
            <Button className="learn to swim" onClick={() => this.setState({ current: groups[0] })} active={current === groups[0]}>
              Learn To Swim
            </Button>
            <Button className="bronze" onClick={() => this.setState({ current: groups[1] })} active={current === groups[1]}>
              Bronze
            </Button>
            <Button className="silver" onClick={() => this.setState({ current: groups[2] })} active={current === groups[2]}>
              Silver
            </Button>
            <Button className="gold" onClick={() => this.setState({ current: groups[3] })} active={current === groups[3]}>
              Gold
            </Button>
            <Button className="platinum" onClick={() => this.setState({ current: groups[4] })} active={current === groups[4]}>
              Platinum
            </Button>
            <Button className="high school" onClick={() => this.setState({ current: groups[5] })} active={current === groups[5]}>
              High School
            </Button>
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
  .buttons {
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 1rem 0;
  }
`;

const Button = styled.button`
  border: none;
  box-sizing: border-box;
  border: 2px solid ${props => props.theme[props.className]};
  border-radius: 0.5rem;
  background: ${props =>
    (props.active ? props.theme[props.className] : 'transparent')};
  color: ${props =>
    (props.active ? props.theme.white : props.theme[props.className])};
  font-size: 2.4rem;
  font-weight: bold;
  outline: none;
  padding: 1rem;
  &:hover {
    cursor: pointer;
  }
`;

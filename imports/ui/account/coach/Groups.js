import React, { Component } from 'react';
import styled from 'styled-components';

import Group from './Group';

const Wrapper = styled.div`
  width: 100%;
  padding: 1rem;
  margin-bottom: 3rem;
  box-sizing: border-box;
  border-radius: 0.3rem;
  font-size: 2rem;
`;

const Button = styled.button`
  border: none;
  background: ${props => (props.active ? props.theme.mainNavy : props.theme.white)};
  color: ${props => (props.active ? props.theme.white : props.theme.mainNavy)};
  max-width: 35rem;
  outline: none;
  border-radius: 0.5rem;
  padding: 1rem;
  font-weight: bold;
  box-sizing: border-box;
  font-size: 1.8rem;
  margin: 1rem;
  &:hover {
    cursor: pointer;
    background: ${props => props.theme.mainNavy};
    color: ${props => props.theme.white};
  }
`;

class Groups extends Component {
  state = {
    currentGroup: this.props.coach.groups[0],
  };

  render() {
    const { coach } = this.props;
    const { currentGroup } = this.state;
    return (
      <Wrapper>
        <div>
            {coach.groups.map(group => (
              <Button
                key={group._id}
                value={group._id}
                active={currentGroup === group}
                onClick={() => this.setState({ currentGroup: group })}
              >
                {group.name}
              </Button>
            ))}
          </div>
        <hr />
        <div>
          <Group group={currentGroup} />
        </div>
      </Wrapper>
    );
  }
}

export default Groups;

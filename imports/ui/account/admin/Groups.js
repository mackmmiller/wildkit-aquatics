import React, { Component } from 'react';
import styled from 'styled-components';

import Group from './Group';

const Wrapper = styled.div`
  width: 100%;
`;

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
  border-radius: 0.5rem;
  background: transparent;
  color: ${props =>
    (props.active ? props.theme[props.className] : props.theme.slateGray)};
  font-size: 2.4rem;
  font-weight: bold;
  outline: none;
  padding: 1rem;
  &:hover {
    cursor: pointer;
  }
`;


const Filter = styled.button`
  border: none;
  background: ${props =>
    (props.active ? props.theme.mainNavy : props.theme.white)};
  color: ${props => (props.active ? props.theme.white : props.theme.mainNavy)};
  max-width: 35rem;
  outline: none;
  border-radius: 0.5rem;
  padding: 1rem;
  font-weight: bold;
  box-sizing: border-box;
  font-size: 1.8rem;
  &:hover {
    cursor: pointer;
    background: ${props => props.theme.mainNavy};
    color: ${props => props.theme.white};
  }
`;

class Groups extends Component {
  state = {
    current: this.props.groups[0],
  };

  render() {
    const { groups } = this.props;
    const { current } = this.state;
    return (
      <Wrapper>
        <Header>
          <div className="buttons">
            <Filter className="learn to swim" onClick={() => this.setState({ current: groups[0] })} active={current === groups[0]}>
              Learn To Swim
            </Filter>
            <Filter className="bronze" onClick={() => this.setState({ current: groups[1] })} active={current === groups[1]}>
              Bronze
            </Filter>
            <Filter className="silver" onClick={() => this.setState({ current: groups[2] })} active={current === groups[2]}>
              Silver
            </Filter>
            <Filter className="gold" onClick={() => this.setState({ current: groups[3] })} active={current === groups[3]}>
              Gold
            </Filter>
            <Filter className="platinum" onClick={() => this.setState({ current: groups[4] })} active={current === groups[4]}>
              Platinum
            </Filter>
            <Filter className="high school" onClick={() => this.setState({ current: groups[5] })} active={current === groups[5]}>
              High School
            </Filter>
          </div>
        </Header>
        <hr />
        <div>
          <Group key={current._id} data={current} />
        </div>
      </Wrapper>
    );
  }
}

export default Groups;

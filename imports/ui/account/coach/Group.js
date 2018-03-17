import React, { Component } from 'react';
import styled from 'styled-components';

import Swimmer from './Swimmer';

const Wrapper = styled.div`
  display: flex;
`;

const Left = styled.div`
  flex: 4;
  display: flex;
  flex-direction: column;
`;

const Right = styled.div`
  flex: 6;
  background: ${props => props.theme.medGray};
  border-radius: 0.3rem;
  min-height: 40rem;
  padding: 2rem;
  box-sizing: border-box;
`;

const Button = styled.button`
  border: none;
  background: ${props =>
    (props.active ? props.theme.mainOrange : props.theme.white)};
  color: ${props =>
    (props.active ? props.theme.white : props.theme.mainOrange)};
  max-width: 45rem;
  outline: none;
  border-radius: 0.3rem;
  padding: 1rem;
  font-weight: bold;
  box-sizing: border-box;
  font-size: 1.8rem;
  &:hover {
    cursor: pointer;
    background: ${props => props.theme.mainOrange};
    color: ${props => props.theme.white};
  }
`;

class Group extends Component {
  state = {
    current: null,
  };

  takeAttendance = () => {
    const attendance = [];
    console.log('Taking attendance');
  };

  render() {
    const { group } = this.props;
    const { current } = this.state;
    if (!group) return null;
    return (
      <Wrapper>
        <Left>
          {group.swimmers &&
            group.swimmers.map(swimmer => (
              <Button
                key={swimmer._id}
                onClick={() =>
                  this.setState({ current: <Swimmer swimmer={swimmer._id} /> })
                }
              >
                {swimmer.firstName} {swimmer.lastName}
              </Button>
            ))}
          <Button onClick={this.takeAttendance}>Attendance</Button>
        </Left>
        <Right>{current}</Right>
      </Wrapper>
    );
  }
}

export default Group;

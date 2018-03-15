import React, { Component } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  border-radius: 0.5rem;
  padding: 0.5rem;
  margin: 1rem 0.5rem;
  color: #181818;
`;

const Coaches = styled.ul`
  list-style: none;
  display: flex;
  font-size: 1.4rem;
  font-weight: bold;
`;

const Swimmers = styled.ul`
  list-style: none;
  font-size: 1.6rem;
  font-weight: lighter;
`;

class Group extends Component {
  render() {
    const { data } = this.props;
    return (
      <Wrapper className={data.name.toLowerCase()}>
        <Coaches>
          {data.coaches.map(coach => (
            <li key={coach._id}>{coach.user.firstName} {coach.user.lastName}</li>
          ))}
        </Coaches>
        <Swimmers>
          {data.swimmers.map(swimmer => <li key={swimmer._id}>{swimmer.firstName} {swimmer.lastName}</li>)}
        </Swimmers>
      </Wrapper>
    );
  }
}

export default Group;

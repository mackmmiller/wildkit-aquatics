import React, { Component } from 'react';
import styled from 'styled-components';

class Group extends Component {
  render() {
    const { group } = this.props;
    return (
      <Wrapper className={group.name.toLowerCase()}>
        <GroupName>{group.name}</GroupName>
        <Coaches />
        <Swimmers />
      </Wrapper>
    );
  }
}

export default Group;

const Wrapper = styled.div`
  border-radius: 0.5rem;
  padding: 0.5rem;
  margin: 1rem 0.5rem;
  color: #f0f0f0;
  background-color: ${props => props.theme[props.className]};
  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.2);
`;

const GroupName = styled.h4`
  text-align: center;
  margin: 0;
`;

const Coaches = styled.ul``;

const Swimmers = styled.ul``;

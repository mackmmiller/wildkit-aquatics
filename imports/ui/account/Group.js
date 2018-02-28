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

const backgrounds = {
  bronze: '#6c541e',
  silver: '#b3b3b3',
  gold: '#ffd700',
  platinum: '#dadada',
  'high school': '#eb5e55',
  'learn to swim': '#0f1f37',
};

const borders = {
  bronze: '#453614',
  silver: '#939393',
  gold: '#D1B000',
  platinum: '#B3B3B3',
  'high school': '#c14d46',
  'learn to swim': '#0D1A2E',
};

const Wrapper = styled.div`
  border-radius: 0.5rem;
  padding: 0.5rem;
  margin: 1rem 0.5rem;
  color: #f0f0f0;
  background-color: ${props => backgrounds[props.className]};
  border: 2px solid ${props => borders[props.className]};
`;

const GroupName = styled.h4`
  text-align: center;
  margin: 0;
`;

const Coaches = styled.ul``;

const Swimmers = styled.ul``;

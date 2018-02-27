import React, { Component } from 'react';
import styled from 'styled-components';

class Coach extends Component {
  render() {
    const { coach } = this.props;
    return (
      <Wrapper>
        <Top>
          <h4>{`${coach.user.firstName} ${coach.user.lastName}`}</h4>
          <a href={`mailto:${coach.user.email}`}>
            <i className="far fa-envelope" />
          </a>
          <button onClick={this.toggleBody}>
            <i className="fas fa-angle-down" />
          </button>
        </Top>
      </Wrapper>
    );
  }
}

export default Coach;

const Wrapper = styled.div`
  background: #eb5e55;
  border: 2px solid #c14d46;
  border-radius: 0.5rem;
  padding: 0.5rem;
  margin: 1rem 0;
`;

const Top = styled.div`
  display: flex;
  align-content: flex-end;
  margin: 0.75rem;
  > h4 {
    margin: 0 auto 0 0;
    span {
      font-weight: lighter;
    }
  }
  > a {
    color: #f0f0f0;
    display: inline;
  }
  > button {
    border: none;
    color: #f0f0f0;
    background-color: transparent;
    outline: none;
    &:hover {
      cursor: pointer;
    }
  }
`;

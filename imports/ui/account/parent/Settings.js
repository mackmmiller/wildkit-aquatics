import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { compose, graphql } from 'react-apollo';
import gql from 'graphql-tag';

import GuardianForm from './GuardianForm';

const Flexbox = styled.div`
  display: flex;
  flex-direction: column;
`;

const Left = styled.div`
  flex: 4;
  display: flex;
  flex-direction: column;
`;

const Right = styled.div`
  flex: 6;
  > div {
    min-height: 40rem;
    background: ${props => props.theme.medGray};
    border-radius: 0.5rem;
    padding: 2rem;
    box-sizing: border-box;
  }
`;

const Button = styled.button`
  border: none;
  background: ${props =>
    (props.active ? props.theme.mainOrange : props.theme.white)};
  color: ${props =>
    (props.active ? props.theme.white : props.theme.mainOrange)};
  border: none;
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

class Settings extends Component {
  state = {
    current: null,
  }

  unmount = () => this.setState({ current: null });

  renderGuardians = g => <Button key={g._id}>{g.firstName} {g.lastName}</Button>;

  render() {
    const { current } = this.state;
    const { user, parent } = this.props;
    return (
      <Fragment>
        <Left>
          <Flexbox>
            <div>
              <h4>Guardians</h4>
              <div>
                {parent.guardians.map(this.renderGuardians)}
              </div>
              <button onClick={() => this.setState({ current: <GuardianForm unmount={this.unmount.bind(this)} parent={parent} /> })}>
                  Add Guardian
              </button>
            </div>
            <div>
              <h4>Account</h4>
              <Button>Phone Number</Button>
              <Button>Email</Button>
              <Button>Reset Password</Button>
            </div>
          </Flexbox>
        </Left>
        <Right><div>{current}</div></Right>
      </Fragment>
    );
  }
}

export default Settings;

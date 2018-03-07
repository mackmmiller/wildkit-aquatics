import React, { Component, Fragment } from 'react';
import styled from 'styled-components';

class Settings extends Component {
  render() {
    return (
      <Fragment>
        <Header>
          <h3>SETTINGS</h3>
        </Header>
        <Flexbox>
          <div>
            <h4>Guardians</h4>
          </div>
          <div>
            <h4>Account</h4>
          </div>
          <div>
            <h4>Waiver</h4>
          </div>
        </Flexbox>
      </Fragment>
    );
  }
}

export default Settings;

const Header = styled.header`
  background: ${props => props.theme.mainNavy};
  color: ${props => props.theme.white};
  width: 100%;
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
  padding: 1.5rem;
  text-align: center;
  box-sizing: border-box;
  > h3 {
    margin: 0;
  }
`;

const Flexbox = styled.div`
  display: flex;
  flex-direction: column;
`;

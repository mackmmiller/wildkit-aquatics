import React, { Component, Fragment } from 'react';
import styled from 'styled-components';

class Settings extends Component {
  render() {
    return (
      <Fragment>
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

const Flexbox = styled.div`
  display: flex;
  flex-direction: column;
`;

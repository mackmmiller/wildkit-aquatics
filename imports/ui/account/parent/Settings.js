import React, { Component, Fragment } from 'react';
import styled from 'styled-components';

import GuardianForm from './GuardianForm';

class Settings extends Component {
  state = {
    guardianForm: false,
  }

  unmount = () => {
    this.setState({ guardianForm: false });
  }

  render() {
    const { guardianForm } = this.state;
    return (
      <Fragment>
        <Flexbox>
          <div>
            <h4>Guardians</h4>
            {guardianForm
              ? <GuardianForm unmount={this.unmount.bind(this)} />
              : <button
                onClick={() => this.setState({ guardianForm: !guardianForm })}
              >
              Add Guardian
                </button>
            }
          </div>
          <div>
            <h4>Account</h4>
            email
            password
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

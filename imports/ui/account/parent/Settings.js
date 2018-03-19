import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { compose, graphql } from 'react-apollo';
import gql from 'graphql-tag';

import GuardianForm from './GuardianForm';

const Flexbox = styled.div`
  display: flex;
  flex-direction: column;
`;

class Settings extends Component {
  state = {
    guardianForm: false,
  }

  unmount = () => {
    this.setState({ guardianForm: false });
  }

  render() {
    const { guardianForm } = this.state;
    const { user, parent } = this.props;
    return (<Fragment>
      <Flexbox>
        <div>
          <h4>Guardians</h4>
          <div>
            {parent.guardians.map(g => (<h1 key={g._id}>
              {g.firstName} {g.lastName}
            </h1>))}
          </div>
          {guardianForm ? <GuardianForm unmount={this.unmount.bind(this)} parent={parent} /> : <button
            onClick={() =>
                  this.setState({ guardianForm: !guardianForm })
                }
          >
                Add Guardian
          </button>}
        </div>
        <div>
          <h4>Account</h4>
          <div>
                Email: {user.email}
          </div>
          <div>Phone: </div>
          <div>Password: </div>
        </div>
      </Flexbox>
    </Fragment>);
  }
}

export default Settings;

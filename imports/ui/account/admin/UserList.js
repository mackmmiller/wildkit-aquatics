import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';
import { Accounts } from 'meteor/accounts-base';
import gql from 'graphql-tag';
import { compose, graphql } from 'react-apollo';

import { Pill, PillBody, PillTop } from '../../styles/styles';

// const createAdmin = gql``;

class User extends Component {
  state = {
    bodyVisible: false,
  };

  toggleBody = () => {
    this.setState({ bodyVisible: !this.state.bodyVisible });
  };

  render() {
    const { data } = this.props;
    const { bodyVisible } = this.state;
    return (
      <Pill>
        <PillTop>
          <h4>
            {`${data.user.firstName} ${data.user.lastName} `}
          </h4>
          <a href={`mailto:${data.user.email}`}>
            <i className="far fa-envelope" />
          </a>
          <button onClick={this.toggleBody}>
            <i className="fas fa-angle-down" />
          </button>
        </PillTop>
        <PillBody open={bodyVisible}>
          <p>Herro it me</p>
          <div>Delete</div>
        </PillBody>
      </Pill>
    );
  }
}

export default User;

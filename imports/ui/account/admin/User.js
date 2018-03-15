import React, { Component } from 'react';
import styled from 'styled-components';
import { Accounts } from 'meteor/accounts-base';
import gql from 'graphql-tag';
import { compose, graphql } from 'react-apollo';

const Wrapper = styled.div`
  height: 100%;
  background: ${props => props.theme.white};
  border-radius: 0.5rem;
  h5 {
    margin: 0.5rem 0;
  }
  .header {
    background: ${props => props.theme.mainOrange};
    padding: 1rem;
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
    color: ${props => props.theme.mainNavy};
    h4 {
      margin: 0;
    }
  }
  .body {
    padding: 1rem;
    h5 span {
      font-weight: lighter;
    }
  }
`;

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
      <Wrapper>
        <div className="header">
          <h4>{`${data.user.firstName} ${data.user.lastName} `}</h4>
        </div>
        <div className="body">
          <p>Herro it me</p>
          <div>Delete</div>
        </div>
      </Wrapper>
    );
  }
}

export default User;

import React, { Component } from 'react';
import { compose, graphql } from 'react-apollo';
import gql from 'graphql-tag';

const createSwimmer = gql`
  mutation createSwimmer(
    $firstName: String!
    $middleName: String
    $lastName: String!
    $dateOfBirth: Date!
  ) {
    createSwimmer(
      firstName: $firstName
      middleName: $middleName
      lastName: $lastName
      dateOfBirth: $dateOfBirth
    ) {
      _id
    }
  }
`;

class NewSwimmerForm extends Component {
  createSwimmer = (e) => {
    e.preventDefault();
    this.props
      .createSwimmer({
        variables: {
          firstName: this.firstName.value,
          middleName: this.middleName.value,
          lastName: this.lastName.value,
          dateOfBirth: this.dateOfBirth.value,
        },
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <form onSubmit={this.createSwimmer}>
        <label htmlFor="">First Name</label>
        <input type="text" ref={input => (this.firstName = input)} />
        <label htmlFor="">Middle Name</label>
        <input type="text" ref={input => (this.middleName = input)} />
        <label htmlFor="">Last Name</label>
        <input type="text" ref={input => (this.lastName = input)} />
        <label htmlFor="">dateOfBirth</label>
        <input type="date" ref={input => (this.dateOfBirth = input)} />
        <input type="button" value="cancel" onClick={this.toggleForm} />
        <input type="submit" />
      </form>
    );
  }
}

export default graphql(createSwimmer, {
  name: 'createSwimmer',
  options: { refetchQueries: ['userData'] },
})(NewSwimmerForm);

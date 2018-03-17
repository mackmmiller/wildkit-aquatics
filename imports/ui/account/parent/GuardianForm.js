import React, { Component } from 'react';
import { compose, graphql } from 'react-apollo';
import gql from 'graphql-tag';

const createGuardian = gql`
  mutation createGuardian(
    $parentId: String!
    $firstName: String!
    $lastName: String!
    $phoneNumber: String!
    $email: String!
    $relationship: String!
  ) {
    createGuardian(
      parentId: $parentId
      firstName: $firstName
      lastName: $lastName
      phoneNumber: $phoneNumber
      email: $email
      relationship: $relationship
    ) {
      _id
    }
  }
`;

class GuardianForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.createGuardian({
      variables: {
        parentId: this.props.parent._id,
        firstName: this.firstName.value,
        lastName: this.lastName.value,
        phoneNumber: this.phoneNumber.value,
        email: this.email.value,
        relationship: this.relationship.value,
      },
    }).catch((err) => {
      console.log(err);
      if (!err) {
        this.props.unmount();
      }
    });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          First Name<input type="text" ref={input => this.firstName = input} />
        </label>
        <label>
          Last Name<input type="text" ref={input => this.lastName = input} />
        </label>
        <label>
          Email<input type="email" ref={input => this.email = input} />
        </label>
        <label>
          Phone Number<input type="tel" ref={input => this.phoneNumber = input} />
        </label>
        <label>
          Relationship<input type="text" ref={input => this.relationship = input} />
        </label>
        <input type="submit" value="Submit" />
        <input type="button" value="Cancel" onClick={this.props.unmount} />
      </form>
    );
  }
}

export default graphql(createGuardian, { name: 'createGuardian', options: { refetchQueries: ['userData'] } })(GuardianForm);

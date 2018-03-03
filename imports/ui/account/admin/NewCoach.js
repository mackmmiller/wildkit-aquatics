import React, { Component } from 'react';
import { Accounts } from 'meteor/accounts-base';
import gql from 'graphql-tag';
import { compose, graphql } from 'react-apollo';

import { Pill } from '../../styles/styles';

// const createAdmin = gql``;

const createCoach = gql`
  mutation createCoach($email: String) {
    createCoach(email: $email) {
      _id
    }
  }
`;

class NewCoach extends Component {
  createUser = (e) => {
    e.preventDefault();
    console.log(`email: ${this.email.value}
    password: ${this.password.value}
    firstName: ${this.firstName.value}
    lastName: ${this.lastName.value}
    userType: ${this.userType.value}`);
    if (this.password.value === this.password2.value) {
      Accounts.createUser(
        {
          email: this.email.value,
          password: this.password.value,
          firstName: this.firstName.value,
          lastName: this.lastName.value,
          userType: this.userType.value,
        },
        (err) => {
          if (!err) {
            if (this.userType.value === 'Admin') {
              this.createAdmin();
            } else {
              this.createCoach();
            }
          }
          console.log(err);
        },
      );
    } else {
      console.log("Passwords don't match");
    }
  };

  createAdmin = () => {
    console.log('Creating admin');
  };

  createCoach = () => {
    console.log('Creating Coach');
    this.props
      .createCoach({
        variables: {
          email: this.email.value,
        },
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <Pill>
        <form onSubmit={this.createUser}>
          <input
            type="text"
            ref={input => (this.firstName = input)}
            placeholder="First Name"
          />
          <input
            type="text"
            ref={input => (this.lastName = input)}
            placeholder="Last Name"
          />
          <input
            type="email"
            ref={input => (this.email = input)}
            placeholder="Email"
          />
          <input
            type="password"
            ref={input => (this.password = input)}
            placeholder="Password"
          />
          <input
            type="password"
            ref={input => (this.password2 = input)}
            placeholder="Confirm password"
          />
          <select name="User Type" ref={input => (this.userType = input)}>
            <option value="Coach">Coach</option>
            <option value="Admin">Admin</option>
          </select>
          <input type="submit" />
        </form>
      </Pill>
    );
  }
}

export default compose(
  graphql(createCoach, { name: 'createCoach', options: { refetchQueries: ['adminData'] } }),
)(NewCoach);

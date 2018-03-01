import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';
import { Accounts } from 'meteor/accounts-base';
import gql from 'graphql-tag';
import { compose, graphql } from 'react-apollo';

import { Pill, PillBody, PillTop } from '../styles/styles';

// const createAdmin = gql``;

const createCoach = gql`
  mutation createCoach($email: String) {
    createCoach(email: $email) {
      _id
    }
  }
`;

class NewUserForm extends Component {
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
            switch (this.userType.value) {
              case 'Admin':
                this.createAdmin();
                break;
              case 'Coach':
                this.createCoach();
                break;
              default:
                console.log('Creating parent');
                break;
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
            <option value="Parent">Parent</option>
            <option value="Admin">Admin</option>
          </select>
          <input type="submit" />
        </form>
      </Pill>
    );
  }
}

const ComposedForm = compose(
  graphql(createCoach, {
    name: 'createCoach',
    options: { refetchQueries: ['adminData'] },
  }),
)(NewUserForm);

export { ComposedForm };

class User extends Component {
  state = {
    bodyVisible: false,
  };

  toggleBody = () => {
    this.setState({ bodyVisible: !this.state.bodyVisible });
  };

  render() {
    const { user } = this.props;
    const { bodyVisible } = this.state;
    return (
      <Pill>
        <PillTop>
          <h4>
            {`${user.firstName} ${user.lastName} `}
            <span>{`${user.userType}`}</span>
          </h4>
          <a href={`mailto:${user.email}`}>
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

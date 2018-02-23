import React, { Component } from 'react';
import styled from 'styled-components';
import { Accounts } from 'meteor/accounts-base';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

const createParent = gql`
  mutation createParent {
    createParent {
      _id
    }
  }
`;

class Register extends Component {
  registerUser = (e) => {
    e.preventDefault();
    if (this.password.value === this.password2.value) {
      Accounts.createUser(
        {
          email: this.email.value,
          password: this.password.value,
          firstName: this.firstName.value,
          lastName: this.lastName.value,
          userType: 'Parent',
        },
        (err) => {
          if (!err) {
            this.props.client.resetStore();
            this.createParent();
          }
          console.log(err);
        },
      );
    } else {
      console.log("Passwords don't match");
    }
  };

  createParent = () => {
    try {
      this.props.createParent();
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    return (
      <React.Fragment>
        <StyledForm onSubmit={this.registerUser}>
          <h2>Register</h2>
          <div className="firstName">
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              ref={input => (this.firstName = input)}
              autoComplete="given-name"
            />
          </div>
          <div className="lastName">
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              ref={input => (this.lastName = input)}
              autoComplete="family-name"
            />
          </div>
          <div className="email">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              ref={input => (this.email = input)}
              autoComplete="email"
            />
          </div>
          <div className="password">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              ref={input => (this.password = input)}
              autoComplete="new-password"
            />
          </div>
          <div className="password2">
            <label htmlFor="password2">Confirm Password</label>
            <input
              type="password"
              name="password2"
              ref={input => (this.password2 = input)}
              autoComplete="new-password"
            />
          </div>
          <input type="submit" className="register" />
        </StyledForm>
      </React.Fragment>
    );
  }
}

export default graphql(createParent, { name: 'createParent' })(Register);

const StyledForm = styled.form`
  display: grid;
  padding: 3rem;
  font-size: 1.8rem;
  grid-template-rows: repeat(5, 1fr);
  grid-template-columns: 1fr 1fr;
  grid-template-areas: "header header" "email email" "password password" "password2 password2" "register register";
  > h2 {
    grid-area: header;
    font-size: 2rem;
  }
  > div input {
    height: 2rem;
  }
  > .email {
    grid-area: email;
    display: flex;
    flex-direction: column;
  }
  > .password {
    grid-area: password;
    display: flex;
    flex-direction: column;
  }
  > .password2 {
    grid-area: password2;
    display: flex;
    flex-direction: column;
  }
  > .register {
    grid-area: register;
  }
`;

import React, { Component } from 'react';
import styled from 'styled-components';
import { Accounts } from 'meteor/accounts-base';

class Register extends Component {
  registerUser = (e) => {
    e.preventDefault();
    if (this.password.value === this.password2.value) {
      Accounts.createUser(
        {
          email: this.email.value,
          password: this.password.value,
        },
        (err) => {
          if (!err) {
            this.props.client.resetStore();
          }
          console.log(err);
        },
      );
    } else {
      console.log("Passwords don't match");
    }
  };

  render() {
    return (
      <React.Fragment>
        <StyledForm onSubmit={this.registerUser}>
          <h2>Register</h2>
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

export default Register;

const StyledForm = styled.form`
  display: grid;
  padding: 3rem;
  font-size: 1.8rem;
  grid-template-rows: repeat(5, 1fr);
  grid-template-columns: 1fr 1fr;
  grid-template-areas: 'header header' 'email email' 'password password' 'password2 password2' 'register register';
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

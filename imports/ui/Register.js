import React, { Component } from 'react';
import styled from 'styled-components';
import { Accounts } from 'meteor/accounts-base';

class Register extends Component {
  registerUser = (e) => {
    e.preventDefault();
    console.assert(this.email, this.password, this.password2);
  };

  render() {
    return (
      <React.Fragment>
        <StyledForm>
          <h2>Register</h2>
          <div className="email">
            <label htmlFor="email">Email</label>
            <input type="text" name="email" ref={input => (this.email = input)} />
          </div>
          <div className="password">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" ref={input => (this.password = input)} />
          </div>
          <div className="password2">
            <label htmlFor="password2">Confirm Password</label>
            <input type="password" name="password2" ref={input => (this.password2 = input)} />
          </div>
          <input type="submit" value="Register" className="register" />
        </StyledForm>
      </React.Fragment>
    );
  }
}

export default Register;

const StyledForm = styled.form`
  display: grid;
  width: 80%;
  margin: auto;
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

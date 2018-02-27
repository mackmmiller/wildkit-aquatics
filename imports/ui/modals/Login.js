import React, { Component } from 'react';
import styled from 'styled-components';

class Login extends Component {
  loginUser = (e) => {
    e.preventDefault();
    Meteor.loginWithPassword(this.email.value, this.password.value, (err) => {
      console.log(err);
      if (!err) {
        this.props.client.resetStore();
      }
    });
  };

  render() {
    return (
      <React.Fragment>
        <StyledForm>
          <h2>Login</h2>
          <div className="email">
            <label htmlFor="email">Email</label>
            <input type="text" name="email" ref={input => (this.email = input)} />
          </div>
          <div className="password">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" ref={input => (this.password = input)} />
          </div>
          <input type="submit" value="Login" className="login" onClick={this.loginUser} />
          <input type="submit" value="Forgot Password?" className="forgot" />
          <input type="submit" value="New User" className="newUser" />
        </StyledForm>
      </React.Fragment>
    );
  }
}

export default Login;

const StyledForm = styled.form`
  display: grid;
  padding: 3rem;
  font-size: 1.8rem;
  grid-template-rows: repeat(5, 1fr);
  grid-template-columns: 1fr 1fr;
  grid-template-areas: 'header header' 'email email' 'password password' 'login login' 'forgot newUser';
  > h2 {
    grid-area: header;
    font-size: 2rem;
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
  > .login {
    grid-area: login;
  }
  > .forgot {
    grid-area: forgot;
  }
  > .newUser {
    grid-area: newUser;
  }
`;

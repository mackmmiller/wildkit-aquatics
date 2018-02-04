import React from "react";
import styled from "styled-components";

const Login = () => {
  return (
    <Container>
      <StyledForm>
        <h2>Login</h2>
        <div className="email">
          <label htmlFor="email">Email</label>
          <input type="text" name="email" />
        </div>
        <div className="password">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" />
        </div>
        <input type="submit" value="Login" className="login" />
        <input type="submit" value="Forgot Password?" className="forgot" />
        <input type="submit" value="New User" className="newUser" />
      </StyledForm>
    </Container>
  );
};

export default Login;

const Container = styled.div`
  background: #eb5e55;
  margin: auto;
  height: 40rem;
  width: 30rem;
  text-align: center;
`;

const StyledForm = styled.form`
  display: grid;
  width: 80%;
  margin: auto;
  font-size: 1.8rem;
  grid-template-rows: repeat(5, 1fr);
  grid-template-columns: 1fr 1fr;
  grid-template-areas: "header header" "email email" "password password" "login login" "forgot newUser";
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

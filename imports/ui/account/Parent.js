import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import styled from 'styled-components';
import { Pill } from '../styles/styles';

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

const userData = gql`
  query UserData($userId: String!, $parentId: String!) {
    User(_id: $userId) {
      _id
      firstName
      lastName
      email
    }
    Parent(_id: $parentId) {
      _id
      swimmers {
        _id
        firstName
        lastName
      }
    }
  }
`;

class Parent extends Component {
  state = {
    formVisible: false,
  }

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
    const { formVisible } = this.state;
    const { Parent, loading } = this.props;
    if (loading) return null;
    return (
      <Wrapper>
        <Container className="swimmers">
          <Header>
            <h3>My Swimmers</h3>
          </Header>
          {Parent.swimmers[0]
        ? Parent.swimmers.map(swimmer => (
          <Pill key={swimmer._id}>
            {swimmer.firstName} {swimmer.lastName}
          </Pill>
        ))
        : <p>You haven't registered any swimmers. Add some now!</p>}
          {formVisible
        ? (
          <Container>
            <form onSubmit={this.createSwimmer}>
              <label htmlFor="">First Name</label>
              <input type="text" ref={input => (this.firstName = input)} />
              <label htmlFor="">Middle Name</label>
              <input type="text" ref={input => (this.middleName = input)} />
              <label htmlFor="">Last Name</label>
              <input type="text" ref={input => (this.lastName = input)} />
              <label htmlFor="">dateOfBirth</label>
              <input type="date" ref={input => (this.dateOfBirth = input)} />
              <input type="submit" />
            </form>
          </Container>
          ) : (
            <button
              onClick={() => this.setState({ formVisible: !formVisible })}
            >
              New Swimmer
            </button>
          )}
        </Container>
        <Container className="competitions">
          <Header>
            <h3>Competitions</h3>
          </Header>
        </Container>
        <Container className="settings">
          <Header>
            <h3>Settings</h3>
          </Header>
        </Container>
        <Container className="billing">
          <Header>
            <h3>BILLING</h3>
          </Header>
          <Content>
            <h4>THANK YOU FOR SUPPORTING WILDKIT AQUATICS</h4>
            <p>Next bill due: 2018-02-14</p>
          </Content>
        </Container>
      </Wrapper>);
  }
}

export default compose(
  graphql(createSwimmer, { name: 'createSwimmer' }),
  graphql(userData, {
    props: ({ data }) => ({ ...data }),
    options: ({ user }) => ({
      variables: {
        userId: user._id,
        parentId: user.parent._id,
      },
    }),
  }),
)(Parent);

const Wrapper = styled.div`
  color: #181818;
  flex: 1;
  width: 95%;
  margin: auto;
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  grid-gap: 2rem;
  grid-template-areas:
    "swimmers swimmers competitions settings"
    "swimmers swimmers competitions billing";
  .swimmers {
    grid-area: swimmers;
  }
  .competitions {
    grid-area: competitions;
  }
  .settings {
    grid-area: settings;
  }
  .billing {
    grid-area: billing;
  }
`;

const Container = styled.div`
  max-width: 100rem;
  box-sizing: border-box;
  background-color: #485665;
  border-radius: 0.5rem;
  font-size: 2rem;
  box-shadow: 0 1px 2px 2px rgba(0, 0, 0, 0.5);
`;

const Header = styled.header`
  background: ${props => props.theme.mainNavy};
  color: ${props => props.theme.white};
  width: 100%;
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
  padding: 1.5rem;
  text-align: center;
  box-sizing: border-box;
  > h3 {
    margin: 0;
  }
`;

const Content = styled.div`
  margin: 1rem;
  color: ${props => props.theme.white};
  text-align: center;
  font-size: 1.6rem;
  font-weight: bolder;
`;

import React, { Component, Fragment } from 'react';
import { compose, graphql } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';

import { Pill } from '../../styles/styles';

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

class MySwimmers extends Component {
  state = {
    formVisible: false,
  };

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

  toggleForm = () => {
    this.setState({ formVisible: !this.state.formVisible });
  };

  render() {
    const { formVisible } = this.state;
    const { swimmers } = this.props;
    return (
      <Fragment>
        <Header>
          <h3>MY SWIMMERS</h3>
        </Header>
        <Content>
          {swimmers[0] ? (
            swimmers.map(swimmer => (
              <Container key={swimmer._id}>
                {swimmer.firstName} {swimmer.lastName}
              </Container>
            ))
          ) : (
            <p>You haven't registered any swimmers. Add some now!</p>
          )}
          {formVisible ? (
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
                <input type="button" value="cancel" onClick={this.toggleForm} />
                <input type="submit" />
              </form>
            </Container>
          ) : (
            <button onClick={this.toggleForm}>New Swimmer</button>
          )}
        </Content>
      </Fragment>
    );
  }
}

export default graphql(createSwimmer, {
  name: 'createSwimmer',
  options: { refetchQueries: ['userData'] },
})(MySwimmers);

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

const Container = styled(Pill)`
  width: 60%;
  max-width: 35rem;
  min-width: 25rem;
`;

const Button = styled.button`
  width: 60%;
  max-width: 35rem;
  min-width: 25rem;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  > div {
    margin: auto;
  }
`;

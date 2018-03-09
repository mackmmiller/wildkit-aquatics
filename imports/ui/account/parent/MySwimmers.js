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
          <Container>
            {formVisible ? (
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
          ) : (
            <button onClick={this.toggleForm}>New Swimmer</button>
          )}
          </Container>
        </Content>
      </Fragment>
    );
  }
}

export default graphql(createSwimmer, {
  name: 'createSwimmer',
  options: { refetchQueries: ['userData'] },
})(MySwimmers);

const Container = styled(Pill)`
  width: 45%;
  max-width: 60rem;
  min-width: 25rem;
  padding: 1rem;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
`;

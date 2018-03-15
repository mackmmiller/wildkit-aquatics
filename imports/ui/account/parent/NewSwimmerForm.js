import React, { Component } from 'react';
import { compose, graphql } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';

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

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
class NewSwimmerForm extends Component {
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
    const { unmount } = this.props;
    return (
      <Form onSubmit={this.createSwimmer}>
        <label>
          First Name
          <input type="text" ref={input => (this.firstName = input)} />
        </label>
        <label>
          Middle Name
          <input type="text" ref={input => (this.middleName = input)} />
        </label>
        <label>
          Last Name
          <input type="text" ref={input => (this.lastName = input)} />
        </label>
        <label>
          Gender
          <select>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </label>
        <label>
          Date of Birth
          <input type="date" ref={input => (this.dateOfBirth = input)} />
        </label>
        <label>
          Group
          <select>
            <option value="learnToSwim">Learn To Swim</option>
            <option value="bronze">Bronze</option>
            <option value="silver">Silver</option>
            <option value="gold">Gold</option>
            <option value="platinum">Platinum</option>
            <option value="highSchool">High School</option>
          </select>
        </label>
        <label>
          Grade
          <select>
            <option value="prek">PreK</option>
            <option value="k">Kindergarten</option>
            <option value="1">1st</option>
            <option value="2">2nd</option>
            <option value="3">3rd</option>
            <option value="4">4th</option>
            <option value="5">5th</option>
            <option value="6">6th</option>
            <option value="7">7th</option>
            <option value="8">8th</option>
            <option value="9">9th</option>
            <option value="10">10th</option>
            <option value="11">11th</option>
            <option value="12">12th</option>
            <option value="uv1">College - Freshman</option>
            <option value="uv2">College - Sophomore</option>
            <option value="uv3">College - Junior</option>
            <option value="uv4">College - Senior</option>
            <option value="pg">Post Graduate</option>
          </select>
        </label>
        <label>
          Student ID
          <input type="text" />
        </label>
        <label>
          Email
          <input type="email" />
        </label>
        <label>
          Cell Phone
          <input type="tel" />
        </label>
        <label>
          Medical
          <input type="text" />
        </label>
        <label>
          Medications
          <input type="text" />
        </label>
        <label>
          Doctor
          <input type="text" />
        </label>
        <label>
          Doctor's Phone
          <input type="tel" />
        </label>
        <input type="button" value="cancel" onClick={unmount} />
        <input type="submit" />
      </Form>
    );
  }
}

export default graphql(createSwimmer, {
  name: 'createSwimmer',
  options: { refetchQueries: ['userData'] },
})(NewSwimmerForm);

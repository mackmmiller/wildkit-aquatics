import React, { Component } from 'react';
import { compose, graphql } from 'react-apollo';
import gql from 'graphql-tag';

import { Pill, PillBody, PillTop } from '../../styles/styles';

const updateSwimmer = gql`
  mutation updateSwimmers(
    $swimmerId: String!
    $firstName: String
    $middleName: String
    $lastName: String
    $dateOfBirth: Date
    $group: String
  ) {
    updateSwimmer(
      swimmerId: $swimmerId
      firstName: $firstName
      middleName: $middleName
      lastName: $lastName
      dateOfBirth: $dateOfBirth
      group: $group
    ) {
      _id
      firstName
      middleName
      lastName
      dateOfBirth
      group {
        name
      }
    }
  }
`;

class Swimmer extends Component {
  state = {
    bodyVisible: false,
  };

  toggleBody = () => {
    this.setState({ bodyVisible: !this.state.bodyVisible });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.updateSwimmer({
      variables: {
        swimmerId: this.props.data._id,
        firstName: this.props.data.firstName,
        middleName: this.props.data.middleName,
        lastName: this.props.data.lastName,
        dateOfBirth: this.props.data.dateOfBirth,
        group: this.group.value,
      },
    });
  }

  render() {
    const { data } = this.props;
    const { bodyVisible } = this.state;
    return (
      <Pill>
        <PillTop>
          <h4>{`${data.firstName} ${data.lastName}`}</h4>
          <button onClick={this.toggleBody}>
            <i className="fas fa-angle-down" />
          </button>
        </PillTop>
        <PillBody open={bodyVisible}>
          <form onSubmit={this.handleSubmit}>
            <select name="Group" ref={input => (this.group = input)}>
              <option value="Learn To Swim">Learn To Swim</option>
              <option value="Bronze">Bronze</option>
              <option value="Silver">Silver</option>
              <option value="Gold">Gold</option>
              <option value="Platinum">Platinum</option>
              <option value="High School">High School</option>
            </select>
            <input type="submit" />
          </form>
        </PillBody>
      </Pill>
    );
  }
}

export default graphql(updateSwimmer, { name: 'updateSwimmer' })(Swimmer);

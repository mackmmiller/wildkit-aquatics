import React, { Component } from "react";
import styled from "styled-components";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

const newSwimmer = gql`
  mutation newSwimmer(
    $firstName: String
    $middleInitial: String
    $lastName: String
    $DOB: String
  ) {
    newSwimmer(
      firstName: $firstName
      middleInitial: $middleInitial
      lastName: $lastName
      DOB: $DOB
    ) {
      _id
    }
  }
`;

class Account extends Component {
  newSwimmer = e => {
    e.preventDefault();
    this.props
      .newSwimmer({
        variables: {
          firstName: this.firstName.value,
          middleInitial: this.middleInitial.value,
          lastName: this.lastName.value,
          DOB: this.DOB.value
        }
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <form onSubmit={this.newSwimmer}>
        <label htmlFor="">First Name</label>
        <input type="text" ref={input => (this.firstName = input)} />
        <label htmlFor="">Middle Initial</label>
        <input type="text" ref={input => (this.middleInitial = input)} />
        <label htmlFor="">Last Name</label>
        <input type="text" ref={input => (this.lastName = input)} />
        <label htmlFor="">DOB</label>
        <input type="date" ref={input => (this.DOB = input)} />
        <input type="submit" />
      </form>
    );
  }
}

export default graphql(newSwimmer, { name: "newSwimmer" })(Account);

const SideBar = styled.div``;

import React, { Component } from "react";
import { compose, graphql } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";

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

const Wrapper = styled.div`
  height: 100%;
  background: ${props => props.theme.white};
  border-radius: 0.5rem;
  h5 {
    margin: 0.5rem 0;
  }
  .header {
    background: ${props => props.theme.mainOrange};
    padding: 1rem;
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
    color: ${props => props.theme.mainNavy};
    h4 {
      margin: 0;
    }
  }
  .body {
    padding: 1rem;
    h5 span {
      font-weight: lighter;
    }
    .attendance,
    .top-times {
      h5 {
        text-align: center;
      }
    }
  }
`;

class Swimmer extends Component {
  state = {
    bodyVisible: false
  };

  toggleBody = () => {
    this.setState({ bodyVisible: !this.state.bodyVisible });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.updateSwimmer({
      variables: {
        swimmerId: this.props.data._id,
        firstName: this.props.data.firstName,
        middleName: this.props.data.middleName,
        lastName: this.props.data.lastName,
        dateOfBirth: this.props.data.dateOfBirth,
        group: this.group.value
      }
    });
  };

  render() {
    const { data } = this.props;
    const { bodyVisible } = this.state;
    return (
      <Wrapper>
        <div className="header">
          <h4>{`${data.firstName} ${data.lastName}`}</h4>
        </div>
        <div className="body">
          <div className="info">
            <h5>
              Full Name:{" "}
              <span>
                {data.firstName} {data.middleName} {data.lastName}
              </span>
            </h5>
            {/* <h5>
              Group: <span>{data.group.name}</span>
            </h5>
            <h5>
              Coaches:{' '}
              {data.group.coaches.map(({ user }) => (
                <span key={user._id}>
                  {user.firstName} {user.lastName}
                </span>
              ))}
            </h5> */}
          </div>
          <hr />
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
        </div>
      </Wrapper>
    );
  }
}

export default graphql(updateSwimmer, { name: "updateSwimmer" })(Swimmer);

import React, { Component } from "react";
import { compose, graphql } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";

const adminData = gql`
  query adminData {
    allCompetitions {
      _id
      name
      location
      results {
        _id
      }
      swimmers {
        dateOfBirth
        middleName
      }
    }
    allPractices {
      _id
      group {
        name
      }
    }
    allSwimmers {
      _id
      firstName
      middleName
      lastName
    }
    allCoaches {
      _id
      bio
      title
      user {
        email
        firstName
        lastName
      }
    }
    allUsers {
      _id
      firstName
      lastName
      email
      userType
    }
  }
`;

class Admin extends Component {
  render() {
    const { loading, allUsers } = this.props;
    if (loading) return null;
    return (
      <Wrapper>
        <div>
          <h3>Meets</h3>
          <Content />
        </div>
        <div>
          <h3>Practices</h3>
          <Content />
        </div>
        <div>
          <h3>Swimmers</h3>
          <Content />
        </div>
        <div>
          <h3>Coaches</h3>
          <Content />
        </div>
        <div>
          <h3>Users</h3>
          <Content>
            {allUsers.map(user => (
              <Item key={user._id}>
                <div className="top">
                  <h4>
                    {`${user.firstName} ${user.lastName} `}
                    <span>{`${user.userType}`}</span>
                  </h4>
                  <a href={`mailto:${user.email}`}>
                    <i className="far fa-envelope" />
                  </a>
                </div>
              </Item>
            ))}
          </Content>
        </div>
      </Wrapper>
    );
  }
}

export default graphql(adminData, { props: ({ data }) => ({ ...data }) })(
  Admin
);

const Wrapper = styled.div`
  width: 80%;
  margin: auto;
  padding: 4rem 0;
  > div {
    margin: 2rem 0;
    padding: 1rem;
    box-sizing: border-box;
    background-color: #dbdbdb;
    border: 2px solid #d1d1d1;
    border-radius: 0.5rem;
    font-size: 2rem;
  }
`;

const Content = styled.div`
  background-color: #f0f0f0;
  border: 2px solid #d1d1d1;
  border-radius: 0.5rem;
  min-height: 1rem;
  padding: 1.5rem;
`;

const Item = styled.div`
  background: #eb5e55;
  border: 2px solid #c14d46;
  border-radius: 0.5rem;
  .top {
    display: flex;
    align-content: flex-end;
    margin: 0.75rem;
    > h4 {
      margin: 0 auto 0 0;
      span {
        font-weight: lighter;
      }
    }
    > a {
      color: #f0f0f0;
      display: inline;
    }
  }
`;

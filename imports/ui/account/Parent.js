import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import styled from 'styled-components';

import Dashboard from './Dashboard';
import MySwimmers from './parent/MySwimmers';
import Settings from './parent/Settings';
import Competitions from './parent/Competitions';
import Billing from './parent/Billing';

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
        gender
        group {
          name
        }
        competitions {
          _id
        }
      }
      guardians {
        _id
        firstName
        lastName
        relationship
        phoneNumber
        email
      }
    }
  }
`;

const Parent = ({ Parent, loading, User }) => {
  if (loading) return null;
  return (
    <Wrapper>
      <Dashboard utilities={
        [
          <MySwimmers
            swimmers={Parent.swimmers}
            title="My Swimmers"
          />,
          <Competitions
            swimmers={Parent.swimmers}
            title="Competitions"
          />,
          <Billing
            swimmers={Parent.swimmers}
            title="Billing"
          />,
          <Settings
            title="Settings"
            user={User}
            parent={Parent}
          />,
        ]
        }
      />
    </Wrapper>
  );
};

export default compose(
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
  > div {
    box-sizing: border-box;
    font-size: 2rem;
    background: ${props => props.theme.white};
    border-radius: 0.5rem;
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.4);
  }
`;


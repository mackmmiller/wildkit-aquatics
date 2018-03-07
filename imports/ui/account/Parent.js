import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import styled from 'styled-components';

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
      }
    }
  }
`;

const Parent = ({ Parent, loading }) => {
  if (loading) return null;
  return (
    <Wrapper>
      <div className="swimmers">
        <MySwimmers swimmers={Parent.swimmers} />
      </div>
      <div className="competitions">
        <Competitions />
      </div>
      <div className="billing">
        <Billing />
      </div>
      <div className="settings">
        <Settings />
      </div>
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
  display: flex;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-gap: 2rem;
  grid-template-areas:
    "swimmers competitions settings"
    "swimmers competitions billing";
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
  > div {
    max-width: 100rem;
    box-sizing: border-box;
    background-color: #485665;
    border-radius: 0.5rem;
    font-size: 2rem;
    box-shadow: 0 1px 2px 2px rgba(0, 0, 0, 0.5);
  }
`;


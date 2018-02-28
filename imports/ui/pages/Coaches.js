import React from 'react';
import styled from 'styled-components';
import { compose, graphql } from 'react-apollo';
import gql from 'graphql-tag';

const coachQuery = gql`
  query allCoaches {
    allCoaches {
      _id
      title
      bio
      user {
        firstName
        lastName
      }
    }
  }
`;

const Coach = ({ coach }) => (
  <div>
    <h2>{coach.user.firstName} {coach.user.lastName}</h2>
    <h3>{coach.title}</h3>
    <p>{coach.bio}</p>
  </div>
);

const Coaches = ({ loading, allCoaches }) => {
  if (loading) return null;
  return (
    <Wrapper>
      {allCoaches.map(coach => <Coach key={coach._id} coach={coach} />)}
    </Wrapper>
  );
};

export default graphql(coachQuery, { props: ({ data }) => ({ ...data }) })(Coaches);

const Wrapper = styled.div`
  color: black;
  width: 80%;
  margin: auto;
`;

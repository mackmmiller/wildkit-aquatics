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
  <Container>
    <h3>
      {coach.user.firstName} {coach.user.lastName} <span>{coach.title}</span>
    </h3>
    <p>{coach.bio}</p>
  </Container>
);

const Coaches = ({ loading, allCoaches }) => {
  if (loading) return null;
  return (
    <Wrapper>
      <Header>
        <h2>Wildkit Aquatics Coaching Staff</h2>
      </Header>
      <Content>
        {allCoaches.map(coach => <Coach key={coach._id} coach={coach} />)}
      </Content>
    </Wrapper>
  );
};

export default graphql(coachQuery, { props: ({ data }) => ({ ...data }) })(
  Coaches,
);

const Wrapper = styled.div`
  color: ${props => props.theme.white};
  width: 80%;
  margin: auto;
  max-width: 100rem;
  box-sizing: border-box;
  background-color: #485665;
  border-radius: 0.5rem;
  font-size: 2rem;
  box-shadow: 0 4px 6px 0 hsla(0, 0%, 0%, 0.4);
`;

const Header = styled.header`
  background: ${props => props.theme.mainNavy};
  color: ${props => props.theme.white};
  width: 100%;
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
  padding: 1.5rem;
  text-align: center;
  box-sizing: border-box;
`;

const Content = styled.div`
  padding: 2rem;
`;

const Container = styled.div`
  h3 {
    display: inline-block;
    padding: 0.2rem;
    font-weight: 700;
    font-size: 1.8rem;
    border-bottom: 2px solid ${props => props.theme.mainOrange};
  }
  span {
    font-weight: 400;
  }
  p {
    font-weight: 400;
    font-size: 1.6rem;
  }
`;

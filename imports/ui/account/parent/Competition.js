import React, { Component } from 'react';
import { compose, graphql } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';

const competitionQuery = gql`
  query Competition($_id: String!) {
    Competition(_id: $_id) {
      name
      location
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

class Competition extends Component {
  render() {
    const { Competition, loading } = this.props;
    if (loading) return null;
    return (
      <Wrapper>
        <div className="header">
          <h5>{Competition.name}</h5>
        </div>
        <div className="body">{Competition.location}</div>
      </Wrapper>
    );
  }
}

export default graphql(competitionQuery, {
  props: ({ data }) => ({ ...data }),
  options: ({ competition }) => ({
    variables: {
      _id: competition,
    },
  }),
})(Competition);

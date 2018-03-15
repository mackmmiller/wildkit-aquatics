import React from 'react';
import { compose, graphql } from 'react-apollo';
import styled from 'styled-components';
import gql from 'graphql-tag';

const swimmerQuery = gql`
  query Swimmer($_id: String!) {
    Swimmer(_id: $_id) {
      firstName
      lastName
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

const Swimmer = ({ Swimmer, loading }) => {
  if (loading) return null;
  return (
    <Wrapper>
      <div className="header">
        <h4>
          {Swimmer.firstName} {Swimmer.lastName}
        </h4>
      </div>
      <div className="body">
        <div className="info">
          <h5>
            Full Name: <span>
              {Swimmer.firstName} {Swimmer.middleName} {Swimmer.lastName}
                       </span>
          </h5>
        </div>
        <hr />
        <div className="attendance">
          <h5>Attendance</h5>
          <ul>
            <li>Season Practices Attended</li>
            <li>Percent Season Practices Attended</li>
            <li>Total Practices Attended</li>
            <li>Total Percent of Practices Attended</li>
          </ul>
        </div>
        <hr />
        <div className="top-times">
          <h5>Top Times</h5>
        </div>
      </div>
    </Wrapper>
  );
};


export default graphql(swimmerQuery, {
  props: ({ data }) => ({ ...data }),
  options: ({ swimmer }) => ({
    variables: {
      _id: swimmer,
    },
  }),
})(Swimmer);

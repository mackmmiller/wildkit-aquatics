import React, { Component } from 'react';
import { compose, graphql } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';

const swimmerQuery = gql`
  query Swimmer($_id: String!) {
    Swimmer(_id: $_id) {
      _id
      firstName
      middleName
      lastName
      group {
        name
        coaches {
          user {
            _id
            firstName
            lastName
          }
        }
      }
    }
  }
`;

const Wrapper = styled.div`
  height: 100%;
  background: ${props => props.theme.white};
  border-radius: 0.3rem;
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.4);
  h5 {
    margin: 0.5rem 0;
  }
  h6 {
    margin: 0;
  }
  .header {
    background: ${props => props.theme.mainOrange};
    padding: 1rem;
    border-top-left-radius: 0.3rem;
    border-top-right-radius: 0.3rem;
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
    .attendance {
      .stats {
        display: flex;
        justify-content: space-around;
      }
      .stat {
        display: flex;
      }
    }
    .top-times {
      > div {
        display: flex;
        justify-content: center;
      }
    }
  }
`;

class Swimmer extends Component {
  render() {
    const { Swimmer, loading } = this.props;
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
              Full Name:{' '}
              <span>
                {Swimmer.firstName} {Swimmer.middleName} {Swimmer.lastName}
              </span>
            </h5>
            <h5>
              Group: <span>{Swimmer.group.name}</span>
            </h5>
            <h5>
              Coaches:{' '}
              {Swimmer.group.coaches.map(({ user }) => (
                <span key={user._id}>
                  {user.firstName} {user.lastName}
                </span>
              ))}
            </h5>
          </div>
          <hr />
          <div className="attendance">
            <h5>Attendance</h5>
            <div className="stats">
              <div className="stat">
                <h6>Season</h6>
              </div>
              <div className="stat">
                <h6>Career</h6>
              </div>
            </div>
          </div>
          <hr />
          <div className="top-times">
            <h5>Top Times</h5>
            <div>
              <button>Individual Medley</button>
              <button>Butterfly</button>
              <button>Backstroke</button>
              <button>Breaststroke</button>
              <button>Freestyle</button>
            </div>
          </div>
        </div>
        <div>
          <button>Edit</button>
        </div>
      </Wrapper>
    );
  }
}

export default graphql(swimmerQuery, {
  props: ({ data }) => ({ ...data }),
  options: ({ swimmer }) => ({
    variables: {
      _id: swimmer,
    },
  }),
})(Swimmer);

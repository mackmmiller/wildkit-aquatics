import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose, graphql } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';

const competitionQuery = gql`
  query Competition($_id: String) {
    Competition(_id: $_id) {
      _id
      name
      locationName
      address
      start
      end
      additionalInfo
    }
  }
`;

const deleteCompetition = gql`
  mutation deleteCompetition($competitionId: String) {
    deleteCompetition(competitionId: $competitionId) {
      _id
    }
  }
`;

const Wrapper = styled.div`
  height: 100%;
  background: ${props => props.theme.white};
  border-radius: 0.5rem;
  color: #181818;
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
  }
`;

class Competition extends Component {
  static propTypes = {
    data: PropTypes.shape({
      _id: PropTypes.string,
      name: PropTypes.string,
      location: PropTypes.string,
      start: PropTypes.string,
      end: PropTypes.string,
      results: PropTypes.shape({
        id: PropTypes.string,
      }),
      swimmers: PropTypes.shape({
        dateOfBirth: PropTypes.string,
        middleName: PropTypes.string,
        firstName: PropTypes.string,
        lastName: PropTypes.string,
      }),
    }),
  };

  static defaultProps = {
    data: null,
  };

  deleteCompetition = () => {
    this.props.deleteCompetition({
      variables: {
        competitionId: this.props.Competition._id,
      },
    });
  }

  render() {
    const { Competition, loading } = this.props;
    if (loading) return null;
    return (
      <Wrapper>
        <div className="header">
          <h4>{Competition.name}</h4>
        </div>
        <div className="body">
          <h5>
            Competition Name: <span>{Competition.name}</span>
          </h5>
          <h5>
            Location: <span>{Competition.locationName}</span>
          </h5>
          <hr />
          <h5>Additional Info</h5>
          {Competition.additionalInfo && JSON.parse(Competition.additionalInfo).map((data, i) => <div key={i}>{data.name} {data.value}</div>)}
          <button>Edit</button>
          <button onClick={this.deleteCompetition}>Delete</button>
        </div>
      </Wrapper>
    );
  }
}

export default compose(
  graphql(competitionQuery, {
    props: ({ data }) => ({ ...data }),
    options: ({ competition }) => ({
      variables: {
        _id: competition,
      },
    }),
  }),
  graphql(deleteCompetition, {
    name: 'deleteCompetition',
  }),
)(Competition);

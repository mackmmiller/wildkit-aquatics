import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { compose, graphql } from 'react-apollo';
import gql from 'graphql-tag';

const allCompetitions = gql`
  query allCompetitions {
    allCompetitions {
      _id
      name
      location
      start
      end
    }
  }
`;

class Competition extends Component {
  render() {
    const { competition } = this.props;
    return <div>{competition.name}</div>;
  }
}

class Competitions extends Component {
  render() {
    const { allCompetitions, loading } = this.props;
    return (
      <Fragment>
        <Header>
          <h3>COMPETITIONS</h3>
        </Header>
        <div>
          {!loading &&
            allCompetitions.map(c => (
              <Competition key={c._id} competition={c} />
            ))}
        </div>
      </Fragment>
    );
  }
}

export default compose(
  graphql(allCompetitions, { props: ({ data }) => ({ ...data }) }),
)(Competitions);

const Header = styled.header`
  background: ${props => props.theme.mainNavy};
  color: ${props => props.theme.white};
  width: 100%;
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
  padding: 1.5rem;
  text-align: center;
  box-sizing: border-box;
  > h3 {
    margin: 0;
  }
`;

const Content = styled.div`
  margin: 1rem;
  color: ${props => props.theme.white};
  text-align: center;
  font-size: 1.6rem;
  font-weight: bolder;
`;

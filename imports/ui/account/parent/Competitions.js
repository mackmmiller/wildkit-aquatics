import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { compose, graphql } from 'react-apollo';
import gql from 'graphql-tag';

import Competition from './Competition';

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

class Competitions extends Component {
  state = {
    current: null,
  }

  render() {
    const { allCompetitions, loading } = this.props;
    const { current } = this.state;
    if (loading) return null;
    return (
      <Fragment>
        <Left>
          {allCompetitions.map(c => (
            <button key={c._id} onClick={() => this.setState({ current: <Competition competition={c._id} /> })}>
              {c.name}
            </button>
            ))}
        </Left>
        <Right>
          <div>{current}</div>
        </Right>
      </Fragment>
    );
  }
}

export default compose(
  graphql(allCompetitions, { props: ({ data }) => ({ ...data }) }),
)(Competitions);

const Left = styled.div`
  flex: 4;
  display: flex;
  flex-direction: column;
`;

const Right = styled.div`
  flex: 6;
  > div {
    min-height: 40rem;
    background: ${props => props.theme.medGray};
    border-radius: 0.5rem;
    padding: 2rem;
    box-sizing: border-box;
  }
`;

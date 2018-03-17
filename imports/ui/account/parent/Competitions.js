import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { compose, graphql } from 'react-apollo';
import gql from 'graphql-tag';
import moment from 'moment';

import Competition from './Competition';

const allCompetitions = gql`
  query allCompetitions {
    allCompetitions {
      _id
      name
      locationName
      start
      end
    }
  }
`;

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

const Button = styled.button`
  border: none;
  background: ${props =>
    (props.active ? props.theme.mainOrange : props.theme.white)};
  color: ${props =>
    (props.active ? props.theme.white : props.theme.mainOrange)};
  border: none;
  max-width: 45rem;
  outline: none;
  border-radius: 0.5rem;
  padding: 1rem;
  font-weight: bold;
  box-sizing: border-box;
  font-size: 1.8rem;
  &:hover {
    cursor: pointer;
    background: ${props => props.theme.mainOrange};
    color: ${props => props.theme.white};
  }
  > span {
    display: flex;
    justify-content: space-between;
    .date,
    .location {
      font-weight: lighter;
    }
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: space-around;
`;

class Competitions extends Component {
  state = {
    current: null,
  };

  render() {
    const { allCompetitions, swimmers, loading } = this.props;
    const { current } = this.state;
    if (loading) return null;
    return (
      <Fragment>
        <Left>
          <Pagination>
            <button>Previous</button>
            {moment().year()}
            <button>Next</button>
          </Pagination>
          {allCompetitions.map(c => (
            <Button
              key={c._id}
              onClick={() =>
                this.setState({
                  current: (
                    <Competition swimmers={swimmers} competition={c._id} />
                  ),
                })
              }
            >
              <span>
                <span className="date">{moment(c.start).format('MM/DD')}</span>
                <span>{c.name}</span>
                <span className="location">{c.locationName}</span>
              </span>
            </Button>
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

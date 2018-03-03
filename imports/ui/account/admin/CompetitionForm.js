import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { compose, graphql } from 'react-apollo';
import gql from 'graphql-tag';
import moment from 'moment';

import { Pill, Input, Button } from '../../styles/styles';

const createCompetition = gql`
  mutation createCompetition(
    $name: String
    $location: String
    $start: Date
    $end: Date
  ) {
    createCompetition(
      name: $name
      location: $location
      start: $start
      end: $end
    ) {
      _id
    }
  }
`;

class CompetitionForm extends Component {
  static propTypes = {};

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.createCompetition({
      variables: {
        name: this.name.value,
        location: this.location.value,
        start: moment(this.start.value).toDate(),
        end: moment(this.end.value).toDate(),
      },
    });
  };

  render() {
    return (
      <Wrapper>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="">
            Competition Name
            <Input
              type="text"
              name="name"
              innerRef={input => (this.name = input)}
            />
          </label>
          <label htmlFor="">
            Location
            <Input
              type="text"
              name="location"
              innerRef={input => (this.location = input)}
            />
          </label>
          <label htmlFor="">
            Start Date/Time
            <Input
              type="datetime-local"
              name="start"
              innerRef={input => (this.start = input)}
            />
          </label>
          <label htmlFor="">
            End Date/Time
            <Input
              type="datetime-local"
              name="end"
              innerRef={input => (this.end = input)}
            />
          </label>
          <Button type="submit" />
        </form>
      </Wrapper>
    );
  }
}

export default graphql(createCompetition, {
  name: 'createCompetition',
  options: {
    refetchQueries: ['adminData'],
  },
})(CompetitionForm);

const Wrapper = styled(Pill)`
  color: ${props => props.theme.white};
  padding: 1rem;
  > form {
    display: flex;
    flex-direction: column;
    > label {
      display: flex;
      justify-content: space-between;
      padding: 0.5rem;
    }
  }
`;

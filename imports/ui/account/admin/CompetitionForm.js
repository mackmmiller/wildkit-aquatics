import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { compose, graphql } from 'react-apollo';
import gql from 'graphql-tag';
import moment from 'moment';

const createCompetition = gql`
  mutation createCompetition(
    $name: String
    $locationName: String
    $address: String
    $start: Date
    $end: Date
    $additionalInfo: String
  ) {
    createCompetition(
      name: $name
      locationName: $locationName
      address: $address
      start: $start
      end: $end
      additionalInfo: $additionalInfo
    ) {
      _id
    }
  }
`;

const Wrapper = styled.div`
  border-radius: 0.3rem;
  height: 100%;
  background: ${props => props.theme.white};
  color: #181818;
  h5 {
    margin: 0.5rem 0;
  }
  .header {
    min-height: 2rem;
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
    > form {
      display: flex;
      flex-direction: column;
      > label {
        display: flex;
        justify-content: space-between;
        padding: 0.5rem;
      }
    }
  }
`;

const Submit = styled.input`
  background: ${props => props.theme.mainOrange};
  outline: none;
  border-radius: 0.3rem;
  border: 0.2rem solid ${props => props.theme.mainOrange};
  box-sizing: border-box;
  width: 10rem;
  color: ${props => props.theme.white};
  padding: 1rem;
  font-size: 1.6rem;
  &:hover {
    cursor: pointer;
  }
`;

const Cancel = styled.input`
  background: ${props => props.theme.white};
  outline: none;
  border-radius: 0.3rem;
  border: 0.2rem solid ${props => props.theme.mainOrange};
  box-sizing: border-box;
  width: 10rem;
  color: ${props => props.theme.mainOrange};
  padding: 1rem;
  font-size: 1.6rem;
  &:hover {
    cursor: pointer;
  }
`;

const BtnGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-top: 5rem;
  box-sizing: border-box;
  padding: 1rem;
  > button {
    margin: 1rem;
  }
`;

const AdditionalFields = styled.div`
  margin: 2rem 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  > div {
    display: flex;
    justify-content: space-between;
  }
`;

class CompetitionForm extends Component {
  static propTypes = {};

  state = {
    name: null,
    additionalFields: [],
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.createCompetition({
      variables: {
        name: this.name.value,
        locationName: this.location.value,
        address: this.address.value,
        start: moment(this.start.value).toDate(),
        end: moment(this.end.value).toDate(),
        additionalInfo: JSON.stringify(this.state.additionalFields),
      },
    });
    this.props.unmount();
  };

  addField = () => {
    const { additionalFields } = this.state;
    additionalFields.push({ name: '', value: '' });
    this.setState({
      additionalFields,
    });
  };

  handleChange = (e, i, type) => {
    const { additionalFields } = this.state;
    additionalFields[i][type] = e.target.value;
    this.setState({ additionalFields });
  };

  render() {
    const { name, additionalFields } = this.state;
    const { unmount, teams } = this.props;
    return (
      <Wrapper>
        <div className="header">
          <h4>{name}</h4>
        </div>
        <div className="body">
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="">
              Competition Name
              <input
                type="text"
                name="name"
                onChange={() =>
                  this.setState({
                    name: this.name.value,
                  })
                }
                ref={input => (this.name = input)}
              />
            </label>
            <label>
              Team
              <select ref={input => this.team = input}>
                {teams.map(t => <option key={t._id} value={t._id}>{t.shortName}</option>)}
              </select>
            </label>
            <label htmlFor="">
              Location Name
              <input
                type="text"
                name="location"
                ref={input => (this.location = input)}
              />
            </label>
            <label htmlFor="">
              Address
              <input
                type="text"
                name="address"
                ref={input => (this.address = input)}
              />
            </label>
            <label htmlFor="">
              Start Date/Time
              <input
                type="date"
                name="start"
                ref={input => (this.start = input)}
              />
            </label>
            <label htmlFor="">
              End Date/Time
              <input type="date" name="end" ref={input => (this.end = input)} />
            </label>
            <AdditionalFields>
              {additionalFields.map((field, i) => (
                <div key={i}>
                  <input
                    type="text"
                    value={field.name}
                    placeholder="Label"
                    onChange={e => this.handleChange(e, i, 'name')}
                  />
                  <input
                    type="text"
                    value={field.value}
                    placeholder="Value"
                    onChange={e => this.handleChange(e, i, 'value')}
                  />
                </div>
              ))}
              <input type="button" value="Add Field" onClick={this.addField} />
            </AdditionalFields>
            <BtnGroup>
              <Submit type="submit" value="Save" />
              <Cancel type="button" onClick={unmount()} value="Cancel" />
            </BtnGroup>
          </form>
        </div>
      </Wrapper>
    );
  }
}

export default graphql(createCompetition, {
  name: 'createCompetition',
  options: {
    refetchQueries: ['allCompetitions'],
  },
})(CompetitionForm);

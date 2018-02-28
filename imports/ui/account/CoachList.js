import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { compose, graphql } from 'react-apollo';
import gql from 'graphql-tag';

const updateCoach = gql`
  mutation updateCoach($coachId: String!, $title: String, $bio: String) {
    updateCoach(coachId: $coachId, title: $title, bio: $bio) {
      _id
      title
      bio
    }
  }
`;

class Coach extends Component {
  static propTypes = {
    coach: PropTypes.shape({
      _id: PropTypes.string,
      title: PropTypes.string,
      bio: PropTypes.string,
      user: PropTypes.shape({
        _id: PropTypes.string,
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        email: PropTypes.string,
      }),
    }),
  }

  static defaultProps = {
    coach: null,
  }

  state = {
    bodyVisible: false,
    bio: this.props.coach.bio,
    title: this.props.coach.title,
    email: this.props.coach.user.email,
    firstName: this.props.coach.user.firstName,
    lastName: this.props.coach.user.lastName,
  };

  toggleBody = () => {
    this.setState({ bodyVisible: !this.state.bodyVisible });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.updateCoach({
      variables: {
        coachId: this.props.coach._id,
        title: this.title.value,
        bio: this.bio.value,
      },
    });
  };

  resetForm = () => {
    const { coach } = this.props;
    this.firstName.value = coach.user.firstName;
    this.lastName.value = coach.user.lastName;
    this.email.value = coach.user.email;
    this.title.value = coach.title;
    this.bio.value = coach.bio;
  };

  render() {
    const {
      bodyVisible, bio, title, email, firstName, lastName,
    } = this.state;
    const { coach } = this.props;
    return (
      <Wrapper>
        <Top>
          <h4>
            {`${coach.user.firstName} ${coach.user.lastName} `}
            <span>{coach.title}</span>
          </h4>
          <a href={`mailto:${coach.user.email}`}>
            <i className="far fa-envelope" />
          </a>
          <button onClick={this.toggleBody}>
            <i className="fas fa-angle-down" />
          </button>
        </Top>
        <Body open={bodyVisible}>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="firstName">
              First Name
              <input
                name="firstName"
                type="text"
                value={firstName}
                ref={input => (this.firstName = input)}
                onChange={() =>
                  this.setState({ firstName: this.firstName.value })
                }
              />
            </label>
            <label htmlFor="lastName">
              Last Name
              <input
                type="text"
                value={lastName}
                ref={input => (this.lastName = input)}
                onChange={() =>
                  this.setState({ lastName: this.lastName.value })
                }
              />
            </label>
            <label htmlFor="email">
              Email
              <input
                type="text"
                value={email}
                ref={input => (this.email = input)}
                onChange={() => this.setState({ email: this.email.value })}
              />
            </label>
            <label htmlFor="title">
              Title
              <input
                type="text"
                value={title}
                ref={input => (this.title = input)}
                onChange={() => this.setState({ title: this.title.value })}
              />
            </label>
            <label htmlFor="bio">
              Bio
              <textarea
                type="text"
                value={bio}
                ref={input => (this.bio = input)}
                onChange={() => this.setState({ bio: this.bio.value })}
              />
            </label>
            <fieldset>
              <legend>Groups</legend>
              <label htmlFor="Learn To Swim">
                <input type="checkbox" name="Learn To Swim" />
                Learn To Swim
              </label>
              <label htmlFor="Bronze">
                <input type="checkbox" name="Bronze" />
                Bronze
              </label>
              <label htmlFor="Silver">
                <input type="checkbox" name="Silver" />
                Silver
              </label>
              <label htmlFor="Gold">
                <input type="checkbox" name="Gold" />
                Gold
              </label>
              <label htmlFor="Platinum">
                <input type="checkbox" name="Platinum" />
                Platinum
              </label>
              <label htmlFor="High Scool">
                <input type="checkbox" name="High School" />
                High School
              </label>
            </fieldset>
            <input type="button" value="Cancel" onClick={this.resetForm} />
            <input type="submit" />
          </form>
        </Body>
      </Wrapper>
    );
  }
}

export default graphql(updateCoach, { name: 'updateCoach' })(Coach);

const Wrapper = styled.div`
  background: #eb5e55;
  border: 2px solid #c14d46;
  border-radius: 0.5rem;
  padding: 0.5rem;
  margin: 1rem 0;
  font-size: 1.6rem;
`;

const Top = styled.div`
  display: flex;
  align-content: flex-end;
  margin: 0.75rem;
  > h4 {
    margin: 0 auto 0 0;
    span {
      font-weight: lighter;
    }
  }
  > a {
    color: #f0f0f0;
    display: inline;
  }
  > button {
    border: none;
    color: #f0f0f0;
    background-color: transparent;
    outline: none;
    &:hover {
      cursor: pointer;
    }
  }
`;

const Body = styled.div`
  background: #f0f0f0;
  margin: 0 1rem;
  box-sizing: border-box;
  border-radius: 0.5em;
  border: 2px solid #c14d46;
  height: ${props => (props.open ? '300px' : '0px')};
  transition: 0.5s linear;
  overflow: auto;
  > form {
    margin: 0.5rem;
    display: flex;
    flex-direction: column;
  }
`;

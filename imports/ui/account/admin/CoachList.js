import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { compose, graphql } from 'react-apollo';
import gql from 'graphql-tag';

import { Pill, PillBody, PillTop } from '../../styles/styles';

const updateCoach = gql`
  mutation updateCoach(
    $coachId: String!
    $bio: String
    $title: String
    $groupId: [String]
  ) {
    updateCoach(
      coachId: $coachId
      bio: $bio
      title: $title
      groupId: $groupId
    ) {
      _id
      title
      bio
      groups {
        name
      }
    }
  }
`;

const deleteCoach = gql`
  mutation deleteCoach($coachId: String) {
    deleteCoach(coachId: $coachId) {
      _id
    }
  }
`;

class Coach extends Component {
  static propTypes = {
    data: PropTypes.shape({
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
  };

  static defaultProps = {
    data: null,
  };

  state = {
    bodyVisible: false,
    bio: this.props.data.bio,
    title: this.props.data.title,
    email: this.props.data.user.email,
    firstName: this.props.data.user.firstName,
    lastName: this.props.data.user.lastName,
  };

  toggleBody = () => {
    this.setState({ bodyVisible: !this.state.bodyVisible });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      learnToSwim: this.learnToSwim.checked,
      bronze: this.bronze.checked,
      silver: this.silver.checked,
      gold: this.gold.checked,
      platinum: this.platinum.checked,
      highSchool: this.highSchool.checked,

    });
    // this.props.updateCoach({
    //   variables: {
    //     coachId: this.props.data._id,
    //     title: this.title.value,
    //     bio: this.bio.value,
    //   },
    // });
  };

  resetForm = () => {
    const { data } = this.props;
    this.firstName.value = coach.user.firstName;
    this.lastName.value = coach.user.lastName;
    this.email.value = coach.user.email;
    this.title.value = coach.title;
    this.bio.value = coach.bio;
  };

  deleteCoach = () => {
    this.props.deleteCoach({
      variables: {
        coachId: this.props.data._id,
      },
    });
  }

  render() {
    const {
      bodyVisible, bio, title, email, firstName, lastName,
    } = this.state;
    const { data } = this.props;
    return (
      <Pill>
        <PillTop>
          <h4>
            {`${data.user.firstName} ${data.user.lastName} `}
            <span>{data.title}</span>
          </h4>
          <a href={`mailto:${data.user.email}`}>
            <i className="far fa-envelope" />
          </a>
          <button onClick={this.toggleBody}>
            <i className="fas fa-angle-down" />
          </button>
        </PillTop>
        <PillBody open={bodyVisible}>
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
                <input type="checkbox" name="Learn To Swim" ref={input => (this.learnToSwim = input)} />
                Learn To Swim
              </label>
              <label htmlFor="Bronze">
                <input type="checkbox" name="Bronze" ref={input => (this.bronze = input)} />
                Bronze
              </label>
              <label htmlFor="Silver">
                <input type="checkbox" name="Silver" ref={input => (this.silver = input)} />
                Silver
              </label>
              <label htmlFor="Gold">
                <input type="checkbox" name="Gold" ref={input => (this.gold = input)} />
                Gold
              </label>
              <label htmlFor="Platinum">
                <input type="checkbox" name="Platinum" ref={input => (this.platinum = input)} />
                Platinum
              </label>
              <label htmlFor="High Scool">
                <input type="checkbox" name="High School" ref={input => (this.highSchool = input)} />
                High School
              </label>
            </fieldset>
            <div>
              <input type="button" value="Cancel" onClick={this.resetForm} />
              <input type="submit" />
            </div>
          </form>
          <button onClick={this.deleteCoach}>Delete</button>
        </PillBody>
      </Pill>
    );
  }
}

export default compose(
  graphql(updateCoach, { name: 'updateCoach' }),
  graphql(deleteCoach, { name: 'deleteCoach' }),
)(Coach);

// > form {
//   margin: 0.5rem;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
// }

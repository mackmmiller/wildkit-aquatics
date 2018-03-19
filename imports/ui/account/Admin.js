import React from 'react';
import PropTypes from 'prop-types';
import { compose, graphql } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';

import Competitions from './admin/Competitions';
import Contacts from './admin/Contacts';
import Groups from './admin/Groups';
import Calendar from './admin/Calendar';
import Dashboard from './Dashboard';


export const adminData = gql`
  query adminData {
    allCompetitions {
      _id
      name
      locationName
      address
      start
      end
      additionalInfo
      results {
        _id
      }
      swimmers {
        dateOfBirth
        middleName
        firstName
        lastName
      }
    }
    allPractices {
      _id
      group {
        name
      }
      start
      end
    }
    allSwimmers {
      _id
      firstName
      middleName
      lastName
      dateOfBirth
    }
    allCoaches {
      _id
      bio
      title
      groups {
        _id
        name
      }
      user {
        email
        firstName
        lastName
      }
    }
    allGroups {
      _id
      name
      coaches {
        _id
        title
        user {
          firstName
          lastName
        }
      }
      swimmers {
        _id
        firstName
        lastName
      }
    }
    allUsers {
      _id
      firstName
      lastName
      email
      userType
    }
    allParents {
      _id
      user {
        firstName
        lastName
        email
      }
    }
  }
`;

const Admin = ({
  loading,
  allGroups,
  allCoaches,
  allCompetitions,
  allPractices,
  allSwimmers,
  allParents,
}) => {
  if (loading) return null;
  return (
    <Wrapper>
      <Dashboard
        utilities={[
          <Calendar title="Calendar" events={[...allCompetitions, ...allPractices]} />,
          <Competitions title="Competitions" competitions={allCompetitions} />,
          <Groups title="Groups" groups={allGroups} />,
          <Contacts
            title="Contacts"
            athletes={allSwimmers}
            coaches={allCoaches}
            parents={allParents}
          />,
        ]}
      />
    </Wrapper>
  );
};

Admin.propTypes = {
  loading: PropTypes.bool.isRequired,
  allUsers: PropTypes.array,
  allCoaches: PropTypes.array,
  allGroups: PropTypes.array,
  allPractices: PropTypes.array,
  allSwimmers: PropTypes.array,
  allCompetitions: PropTypes.array,
};

export default compose(
  graphql(adminData, { props: ({ data }) => ({ ...data }) }),
)(Admin);

const Wrapper = styled.div`
  color: ${props => props.theme.white};
  width: 95%;
  margin: auto;
  flex: 1;
  > div {
    box-sizing: border-box;
    font-size: 2rem;
    background: ${props => props.theme.white};
    border-radius: 0.3rem;
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.4);
  }
`;

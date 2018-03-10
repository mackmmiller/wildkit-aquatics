import React from 'react';
import styled from 'styled-components';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import Dashboard from './Dashboard';
import Groups from './coach/Groups';
import UserSettings from './coach/UserSettings';
import CoachSettings from './coach/CoachSettings';

const coachQuery = gql`
  query coach {
    user {
      _id
      email
      firstName
      lastName
      coach {
        _id
        title
        bio
        groups {
          _id
          name
          swimmers {
            _id
            dateOfBirth
            firstName
            lastName
          }
        }
      }
    }
  }
`;

const Coach = ({ user, loading }) => {
  if (loading) return null;
  return (
    <Wrapper>
      <Dashboard utilities={[
        <Groups
          coach={user.coach}
          title="Groups"
        />,
        <CoachSettings
          bio={user.coach.bio}
          title="Profile"
        />,
        <UserSettings
          email={user.email}
          title="Settings"
        />,
        ]}
      />
    </Wrapper>
  );
};

export default graphql(coachQuery, { props: ({ data }) => ({ ...data }) })(
  Coach,
);

const Wrapper = styled.div`
  background: ${props => props.theme.white};
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.4);
  border-radius: 0.5rem;
  color: #181818;
  flex: 1;
  width: 95%;
  margin: auto;
`;

// const Container = styled.div`
//   max-width: 100rem;
//   padding: 1rem;
//   margin-bottom: 3rem;
//   box-sizing: border-box;
//   background-color: ${props => props.theme.medGray};
//   border-radius: 0.5rem;
//   font-size: 2rem;
//   box-shadow: 0 1px 2px 2px rgba(0, 0, 0, 0.4);
// `;

// const BtnGroup = styled.div`
//   display: flex;
//   justify-content: space-between;
// `;

// const Button = styled.button`
//   border: none;
//   background: transparent;
//   color: ${props =>
//     (props.active ? props.theme[props.className] : props.theme.white)};
//   font-size: 2.4rem;
//   font-weight: bold;
//   outline: none;
//   padding: 1rem;
//   &:hover {
//     cursor: pointer;
//   }
// `;

// const Settings = styled.div`
//   max-width: 60rem;
//   margin-top: 3rem;
//   padding: 1rem;
//   box-sizing: border-box;
//   background-color: ${props => props.theme.medGray};
//   border-radius: 0.5rem;
//   font-size: 2rem;
//   box-shadow: 0 1px 2px 2px rgba(0, 0, 0, 0.4);
// `;

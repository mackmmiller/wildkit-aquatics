import React, { Component } from 'react';
import styled from 'styled-components';
import { compose, graphql } from 'react-apollo';
import gql from 'graphql-tag';

import Group from './coach/GroupListing';

const coachQuery = gql`
  query coach {
    user {
      _id
      firstName
      lastName
      coach {
        _id
        title
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

class Coach extends Component {
  state = {
    currentGroup: null,
  };

  componentWillReceiveProps = (nextProps) => {
    this.setState({ currentGroup: nextProps.user.coach.groups[0] });
  };

  render() {
    const { user, loading } = this.props;
    const { currentGroup } = this.state;

    if (loading) return null;
    return (
      <Wrapper>
        <Container>
          <BtnGroup>
            <div>
              {user.coach.groups.map(group => (
                <Button
                  className={group.name.toLowerCase()}
                  key={group._id}
                  value={group._id}
                  active={currentGroup === group}
                  onClick={() => this.setState({ currentGroup: group })}
                >
                  {group.name}
                </Button>
              ))}
            </div>
            <div>
              <button onClick={() => console.log('Taking attendance')}>
                Attendance
              </button>
            </div>
          </BtnGroup>
          <hr />
          <div>
            <Group group={currentGroup} />
          </div>
        </Container>
        <Settings>
          <h3><i className="fas fa-cog" /> Settings</h3>
          <hr />

        </Settings>
      </Wrapper>
    );
  }
}

export default graphql(coachQuery, { props: ({ data }) => ({ ...data }) })(
  Coach,
);

const Wrapper = styled.div`
  color: #181818;
  flex: 1;
  width: 95%;
  margin: auto;
`;

const Container = styled.div`
  max-width: 100rem;
  padding: 1rem;
  margin-bottom: 3rem;
  box-sizing: border-box;
  background-color: ${props => props.theme.medGray};
  border-radius: 0.5rem;
  font-size: 2rem;
  box-shadow: 0 1px 2px 2px rgba(0, 0, 0, 0.4);
`;

const BtnGroup = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  border: none;
  background: transparent;
  color: ${props => (props.active ? props.theme[props.className] : props.theme.white)};
  font-size: 2.4rem;
  font-weight: bold;
  outline: none;
  padding: 1rem;
  &:hover {
    cursor: pointer;
  }
`;

const Settings = styled.div`
  max-width: 60rem;
  margin-top: 3rem;
  padding: 1rem;
  box-sizing: border-box;
  background-color: ${props => props.theme.medGray};
  border-radius: 0.5rem;
  font-size: 2rem;
  box-shadow: 0 1px 2px 2px rgba(0, 0, 0, 0.4);
`;

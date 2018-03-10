import React, { Component } from 'react';
import styled from 'styled-components';

import Group from './Group';

class Groups extends Component {
  state = {
    currentGroup: null,
  };

  componentWillReceiveProps = (nextProps) => {
    this.setState({ currentGroup: nextProps.coach.groups[0] });
  };

  render() {
    const { coach } = this.props;
    const { currentGroup } = this.state;
    return (
      <Wrapper>
        <BtnGroup>
          <div>
            {coach.groups.map(group => (
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
      </Wrapper>
    );
  }
}

export default Groups;

const Wrapper = styled.div`
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
  color: ${props =>
    (props.active ? props.theme[props.className] : props.theme.white)};
  font-size: 2.4rem;
  font-weight: bold;
  outline: none;
  padding: 1rem;
  &:hover {
    cursor: pointer;
  }
`;

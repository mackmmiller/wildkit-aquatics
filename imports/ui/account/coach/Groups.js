import React, { Component } from 'react';
import styled from 'styled-components';

import Group from './Group';

const Wrapper = styled.div`
  width: 100%;
  padding: 1rem;
  margin-bottom: 3rem;
  box-sizing: border-box;
  border-radius: 0.3rem;
  font-size: 2rem;
`;

const BtnGroup = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  border: none;
  background: transparent;
  color: ${props =>
    (props.active ? props.theme[props.className] : props.theme.slateGray)};
  font-size: 2.4rem;
  font-weight: bold;
  outline: none;
  padding: 1rem;
  &:hover {
    cursor: pointer;
  }
`;

const Attendance = styled.button`
  background: ${props => props.theme.mainNavy};
  border: none;
  border-radius: 0.3rem;
  outline: none;
  padding: 1rem;
  color: ${props => props.theme.white};
  font-size: 2rem;
  letter-spacing: 2px;
  font-weight: lighter;
  box-shadow: 3px 4px 2px 0px rgba(0, 0, 0, 0.4);
  &:hover {
    cursor: pointer;
  }
`;

class Groups extends Component {
  state = {
    currentGroup: this.props.coach.groups[0],
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
            <Attendance onClick={() => console.log('Taking attendance')}>
              ATTENDANCE
            </Attendance>
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

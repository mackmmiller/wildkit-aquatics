import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

class Dashboard extends Component {
  static propTypes = {
    utilities: PropTypes.array,
    loading: PropTypes.bool,
  };

  state = {
    current: this.props.utilities[0],
  };

  render() {
    const { loading, utilities } = this.props;
    const { current } = this.state;
    if (loading) return null;
    return (
      <div>
        <BtnGroup>
          {utilities.map((u, i) => (
            <Button
              key={i}
              active={current.props.title === utilities[i].props.title}
              onClick={() => this.setState({ current: utilities[i] })}
            >
              {u.props.title}
            </Button>
          ))}
        </BtnGroup>
        <Workspace>{current}</Workspace>
      </div>
    );
  }
}

export default Dashboard;

const Button = styled.button`
  border: none;
  background: transparent;
  font-size: 2.4rem;
  font-weight: bolder;
  outline: none;
  padding: 1rem;
  color: ${props => (props.active ? props.theme.mainOrange : props.theme.white)};
  &:hover {
    cursor: pointer;
  }
`;

const BtnGroup = styled.div`
  background: ${props => props.theme.mainNavy};
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
  padding: 1rem;
`;

const Workspace = styled.div`
  padding: 2rem 3rem;
  display: flex;
`;

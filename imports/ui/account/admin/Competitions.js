import React, { Component } from 'react';
import styled from 'styled-components';
import moment from 'moment';

import Competition from './Competition';
import CompetitionForm from './CompetitionForm';

const Wrapper = styled.div`
  display: flex;
  width: 100%;
`;

const Left = styled.div`
  flex: 4;
  display: flex;
  flex-direction: column;
`;

const Right = styled.div`
  flex: 6;
  > div {
    min-height: 40rem;
    background: ${props => props.theme.medGray};
    border-radius: 0.3rem;
    padding: 2rem;
    box-sizing: border-box;
  }
`;

const Button = styled.button`
  border: none;
  background: ${props =>
    (props.active ? props.theme.mainOrange : props.theme.white)};
  color: ${props =>
    (props.active ? props.theme.white : props.theme.mainOrange)};
  max-width: 45rem;
  outline: none;
  border-radius: 0.3rem;
  padding: 1rem;
  font-weight: bold;
  box-sizing: border-box;
  font-size: 1.8rem;
  .btnContent {
    display: flex;
    justify-content: space-between;
    .light {
      font-weight: lighter;
    }
  }
  &:hover {
    cursor: pointer;
    background: ${props => props.theme.mainOrange};
    color: ${props => props.theme.white};
  }
`;

class Competitions extends Component {
  state = {
    current: null,
  };

  unmount = () => {
    this.setState({ current: null });
  }

  render() {
    const { current } = this.state;
    const { competitions } = this.props;
    return (
      <Wrapper>
        <Left>
          {competitions[0] &&
            competitions.map(competition => (
              <Button
                key={competition._id}
                active={
                  current && current.props.competition === competition._id
                }
                onClick={() =>
                  this.setState({
                    current: <Competition competition={competition._id} />,
                  })
                }
              >
                <span className="btnContent">
                  <span className="light">{moment(competition.start).format('MM/DD')}</span>
                  <span>{competition.name}</span>
                  <span className="light">{competition.locationName}</span>
                </span>
              </Button>
            ))}
          <Button
            active={current && current.props.active === 'form'}
            onClick={() =>
              this.setState({ current: <CompetitionForm active="form" unmount={() => this.unmount.bind(this)} /> })
            }
          >
            New Competition
          </Button>
        </Left>
        <Right>
          <div>{current}</div>
        </Right>
      </Wrapper>
    );
  }
}

export default Competitions;

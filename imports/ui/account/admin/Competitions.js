import React, { Component } from 'react';
import styled from 'styled-components';
import moment from 'moment';

import Competition from './Competition';
import CompetitionForm from './CompetitionForm';

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  color: #181818;
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

const Pagination = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 1rem;
  span {
    padding: 1rem;
  }
  button {
    background: ${props => props.theme.mainNavy};
    border: none;
    border-radius: 0.3rem;
    outline: none;
    padding: 1rem;
    color: ${props => props.theme.white};
    font-size: 2rem;
    letter-spacing: 2px;
    font-weight: lighter;
    &:hover {
      cursor: pointer;
    }
  }
`;

class Competitions extends Component {
  state = {
    current: null,
    year: moment(),
  };

  addYear = () => {
    const { year } = this.state;
    const nextYear = moment(year).add(1, 'y');
    this.setState({ year: nextYear });
  };

  subtractYear = () => {
    const { year } = this.state;
    const prevYear = moment(year).subtract(1, 'y');
    this.setState({ year: prevYear });
  };

  unmount = () => {
    this.setState({ current: null });
  };

  render() {
    const { current, year } = this.state;
    const { competitions } = this.props;
    return (
      <Wrapper>
        <Left>
          <Pagination>
            <button onClick={this.subtractYear}>Previous</button>
            <span>{year.year()}</span>
            <button onClick={this.addYear}>Next</button>
          </Pagination>
          {competitions[0] &&
            competitions.filter(c => moment(c.start).year() === year.year()).map(competition => (
              <Button
                key={competition._id}
                active={current && current.props.competition === competition._id}
                onClick={() =>
                  this.setState({
                    current: <Competition competition={competition._id} />,
                  })
                }
              >
                <span className="btnContent">
                  <span className="light">
                    {moment(competition.start).format('MM/DD')}
                  </span>
                  <span>{competition.name}</span>
                  <span className="light">{competition.locationName}</span>
                </span>
              </Button>
            ))}
          <Button
            active={current && current.props.active === 'form'}
            onClick={() =>
              this.setState({
                current: (
                  <CompetitionForm
                    active="form"
                    unmount={() => this.unmount.bind(this)}
                  />
                ),
              })
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

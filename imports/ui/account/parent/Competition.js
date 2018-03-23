import React, { Component } from 'react';
import { compose, graphql } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import moment from 'moment';

const competitionQuery = gql`
  query Competition($_id: String!) {
    Competition(_id: $_id) {
      _id
      name
      locationName
      address
      start
      end
      swimmers {
        _id
      }
      additionalInfo
    }
  }
`;

const registerSwimmers = gql`
  mutation registerSwimmers($competitionId: String, $swimmerIds: [String]) {
    registerSwimmers(competitionId: $competitionId, swimmerIds: $swimmerIds) {
      _id
    }
  }
`;

const Wrapper = styled.div`
  height: 100%;
  background: ${props => props.theme.white};
  border-radius: 0.5rem;
  h5 {
    margin: 0.5rem 0;
  }
  .header {
    background: ${props => props.theme.mainOrange};
    padding: 1rem;
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
    color: ${props => props.theme.mainNavy};
    h4 {
      margin: 0;
    }
  }
  .body {
    padding: 1rem;
    h5 span {
      font-weight: lighter;
    }
    .top {
      display: flex;
      justify-content: space-between;
    }
    .registration {
      > form {
        display: flex;
      }
    }
  }
`;

class Competition extends Component {
  state = {
    registeredSwimmers: [],
  }

  componentDidMount = () => {
    const { registeredSwimmers } = this.state;
    const { swimmers, competition } = this.props;
    swimmers.forEach(s => registeredSwimmers.push({ swimmerId: s._id, name: `${s.firstName} ${s.lastName}`, registered: this.isRegistered(s, competition) }));
    this.setState({ registeredSwimmers });
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps !== this.props) {
      const { swimmers, competition } = nextProps;
      const newRegistration = [];
      swimmers.forEach(s =>
        newRegistration.push({
          swimmerId: s._id,
          name: `${s.firstName} ${s.lastName}`,
          registered: this.isRegistered(s, competition),
        }),
      );
      this.setState({ registeredSwimmers: newRegistration });
    }
  }


  isRegistered = (s, c) => {
    const target = s.competitions.find(obj => obj._id === c);
    if (target) return true;
    return false;
  }

  handleChange = (e) => {
    const { registeredSwimmers } = this.state;
    const target = registeredSwimmers.findIndex(obj => obj.swimmerId === e.target.value);
    registeredSwimmers[target].registered = !registeredSwimmers[target].registered;
    this.setState({ registeredSwimmers });
  }

  handleSubmit = (e) => {
    const { registeredSwimmers } = this.state;
    e.preventDefault();
    const swimmerIds = registeredSwimmers.filter(s => s.registered === true).map(s => s.swimmerId);
    this.props.registerSwimmers({
      variables: {
        competitionId: this.props.Competition._id,
        swimmerIds,
      },
    });
  }

  render() {
    const { Competition, swimmers, loading } = this.props;
    const { registeredSwimmers } = this.state;
    if (loading) return null;
    return (
      <Wrapper>
        <div className="header">
          <h5>{Competition.name}</h5>
        </div>
        <div className="body">
          <div className="top">
            <div className="info">
              <h5>
                Dates:<br />
                <span>{`${moment(Competition.start).format('MM/DD/YYYY')} - ${moment(Competition.end).format('MM/DD/YYYY')}`}</span>
              </h5>
              <h5>
                Location: <br />
                <span>{Competition.locationName}</span>
              </h5>
              <h5>
                Address: <br />
                <span>{Competition.address}</span>
              </h5>
            </div>
            <div className="map">
              <iframe title="Map" width="350" height="198" frameBorder="0" style={{ border: 0 }} src={`https://www.google.com/maps/embed/v1/search?key=AIzaSyDLx_fyrcydNEGEytZgyuHBmP9U940pxDw&q=${Competition.address}`} allowFullScreen />
            </div>
          </div>
          <div>
            {Competition.additionalInfo && JSON.parse(Competition.additionalInfo).map(
                (data, i) => (
                  <div key={i}>
                    <h5>
                      {data.name}: <br />
                      <span>{data.value}</span>
                    </h5>
                  </div>
                ),
              )}
          </div>
          <hr />
          <div className="registration">
            <h5>Registration</h5>
            <form onSubmit={this.handleSubmit}>
              {registeredSwimmers.map(s => (
                <div key={s.swimmerId}>
                  <label>
                    {s.name}
                    <input
                      type="checkbox"
                      checked={s.registered}
                      value={s.swimmerId}
                      onChange={this.handleChange}
                    />
                  </label>
                </div>
              ))}
              <input type="submit" value="Register" />
            </form>
          </div>
        </div>
      </Wrapper>
    );
  }
}

export default compose(
  graphql(competitionQuery, { props: ({ data }) => ({ ...data }), options: ({ competition }) => ({ variables: { _id: competition } }) }),
  graphql(registerSwimmers, { name: 'registerSwimmers' }),
)(Competition);

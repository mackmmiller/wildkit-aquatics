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
      additionalInfo
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
  handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting Registration');
  };

  render() {
    const { Competition, swimmers, loading } = this.props;
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
                <span>
                  {`${moment(Competition.start).format(
                    'MM/DD/YYYY',
                  )} - ${moment(Competition.end).format('MM/DD/YYYY')}`}
                </span>
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
              <iframe
                title="Map"
                width="350"
                height="198"
                frameBorder="0"
                style={{ border: 0 }}
                src={`https://www.google.com/maps/embed/v1/search?key=AIzaSyDLx_fyrcydNEGEytZgyuHBmP9U940pxDw&q=${
                  Competition.address
                }`}
                allowFullScreen
              />
            </div>
          </div>
          <div>
            {Competition.additionalInfo &&
              JSON.parse(Competition.additionalInfo).map((data, i) => (
                <div key={i}>
                  <h5>
                    {data.name}: <span>{data.value}</span>
                  </h5>
                </div>
              ))}
          </div>
          <hr />
          <div className="registration">
            <h5>Registration</h5>
            <form onSubmit={this.handleSubmit}>
              {swimmers.map(s => (
                <div key={s._id}>
                  <input type="checkbox" />
                  <label>{`${s.firstName} ${s.lastName}`}</label>
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

export default graphql(competitionQuery, {
  props: ({ data }) => ({ ...data }),
  options: ({ competition }) => ({
    variables: {
      _id: competition,
    },
  }),
})(Competition);

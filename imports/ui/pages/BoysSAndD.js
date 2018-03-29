import React from 'react';
import styled from 'styled-components';

const Grid = styled.div`
  width: 95%;
  margin: auto;
  flex: 1;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: max-content repeat(4, 25rem);
  grid-template-areas:
    "h h h h h"
    "t n n n p"
    "t n n n c"
    "i i i m m"
    "i i i m m";
  grid-gap: 1.5rem;
  .box {
    background: ${props => props.theme.white};
    border-radius: 0.3rem;
    box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.4);
  }
  .header {
    grid-area: h;
    background: ${props => props.theme.mainOrange};
    box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.4);
    border-radius: 0.3rem;
    padding: 1rem;
  }
  .news {
    grid-area: n;
  }
  .twitter {
    grid-area: t;
  }
  .meet {
    grid-area: c;
  }
  .practice {
    grid-area: p;
  }
  .major {
    grid-area: m;
  }
  .info {
    grid-area: i;
  }
`;

const Header = styled.div`
  background: ${props => props.theme.mainNavy};
  border-top-left-radius: 0.3rem;
  border-top-right-radius: 0.3rem;
  padding: 0.75rem;
  > h1 {
    margin: 0;
    padding: 0;
    font-size: 1.8rem;
  }
`;

const BoysSAndD = () => (
  <Grid>
    <header className="header">
      <h1>ETHS Boys Swimming &amp; Diving</h1>
    </header>
    <div className="news box">
      <Header>
        <h1>News</h1>
      </Header>
    </div>
    <div className="meet box">
      <Header>
        <h1>Competitions</h1>
      </Header>
    </div>
    <div className="practice box">
      <Header>
        <h1>Workouts</h1>
      </Header>
    </div>
    <div className="twitter box">
      <Header>
        <h1>Twitter Feed</h1>
      </Header>
    </div>
    <div className="major box">
      <Header>
        <h1>Major Meets</h1>
      </Header>
    </div>
    <div className="info box">
      <Header>
        <h1>Information</h1>
      </Header>
    </div>
  </Grid>
);

export default BoysSAndD;

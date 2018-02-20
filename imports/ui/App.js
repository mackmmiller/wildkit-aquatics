import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import gql from 'graphql-tag';
import { graphql, withApollo } from 'react-apollo';
import styled from 'styled-components';

import Nav from './Nav';
import Footer from './Footer';
import Index from './Index';
import WildkitSwimming from './WildkitSwimming';
import LearnToSwim from './LearnToSwim';
import GirlsSAndD from './GirlsSAndD';
import BoysSAndD from './BoysSAndD';
import GirlsWaterPolo from './GirlsWaterPolo';
import BoysWaterPolo from './BoysWaterPolo';
import Coaches from './Coaches';
import Login from './Login';
import Account from './Account';

/* Queries */

const userQuery = gql`
  query User {
    user {
      _id
    }
  }
`;

const App = ({ loading, client, user }) => {
  if (loading) return null;
  return (
    <Router>
      <AppWrapper>
        <Nav client={client} user={user} />
        <Main>
          <Switch>
            <Route exact path="/" component={Index} />
            <Route exact path="/coaches" component={Coaches} />
            <Route exact path="/wildkitswimming" component={WildkitSwimming} />
            <Route exact path="/LearnToSwim" component={LearnToSwim} />
            <Route exact path="/ETHSGirls" component={GirlsSAndD} />
            <Route exact path="/ETHSBoys" component={BoysSAndD} />
            <Route exact path="/GirlsWaterPolo" component={GirlsWaterPolo} />
            <Route exact path="/BoysWaterPolo" component={BoysWaterPolo} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/account" component={Account} />
          </Switch>
        </Main>
        <Footer />
      </AppWrapper>
    </Router>
  );
};

export default graphql(userQuery, { props: ({ data }) => ({ ...data }) })(
  withApollo(App),
);

/* Styled Components */

const AppWrapper = styled.div`
  background: #f0f0f0;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Main = styled.div`
  width: 80%;
  padding: 4rem;
  margin: auto;
  flex: 1 0 auto;
`;

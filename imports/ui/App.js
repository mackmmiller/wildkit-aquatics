import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import gql from 'graphql-tag';
import { graphql, withApollo } from 'react-apollo';
import styled from 'styled-components';

import Nav from './Nav';
import Footer from './Footer';
import Index from './pages/Index';
import WildkitSwimming from './pages/WildkitSwimming';
import LearnToSwim from './pages/LearnToSwim';
import GirlsSAndD from './pages/GirlsSAndD';
import BoysSAndD from './pages/BoysSAndD';
import GirlsWaterPolo from './pages/GirlsWaterPolo';
import BoysWaterPolo from './pages/BoysWaterPolo';
import Calendar from './pages/Calendar';
import Coaches from './pages/Coaches';
import Account from './Account';

/* Query */

const userQuery = gql`
  query initialQuery {
    user {
      _id
      parent {
        _id
      }
      coach {
        _id
      }
      admin {
        _id
      }
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
            <Route exact path="/calendar" component={Calendar} />
            <Route
              exact
              path="/account"
              render={() =>
                (!user._id ? <Redirect to="/" /> : <Account user={user} />)
              }
            />
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
  width: 100%;
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;
`;

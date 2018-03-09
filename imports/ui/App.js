import React from 'react';
import PropTypes from 'prop-types';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import gql from 'graphql-tag';
import { graphql, withApollo } from 'react-apollo';
import styled, { ThemeProvider } from 'styled-components';

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
import Coach from './account/Coach';
import Admin from './account/Admin';
import Parent from './account/Parent';
import Support from './pages/SupportCoachJoe';
import theme from './styles/styles';

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

const AppWrapper = styled.div`
  background: ${props => props.theme.lightGray};
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Main = styled.div`
  width: 100%;
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;
  padding: 3rem 0 5rem 0;
`;

const App = ({ loading, client, user }) => {
  if (loading) return null;
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <AppWrapper>
          <Nav client={client} user={user} />
          <Main>
            <Switch>
              <Route exact path="/" component={Index} />
              <Route exact path="/about/coaches" component={Coaches} />
              <Route exact path="/programs/wildkit-swimming" component={WildkitSwimming} />
              <Route exact path="/programs/learn-to-swim" component={LearnToSwim} />
              <Route exact path="/programs/eths-girls" component={GirlsSAndD} />
              <Route exact path="/programs/eths-boys" component={BoysSAndD} />
              <Route exact path="/programs/girls-water-polo" component={GirlsWaterPolo} />
              <Route exact path="/programs/boys-water-polo" component={BoysWaterPolo} />
              <Route exact path="/calendar" component={Calendar} />
              <Route exact path="/contribute/support-coach-joe" component={Support} />
              <Route
                exact
                path="/account/admin"
                render={() =>
                  (!user._id ? <Redirect to="/" /> : <Admin user={user} />)
                }
              />
              <Route
                exact
                path="/account/coach"
                render={() => <Coach user={user} />}
              />
              <Route
                exact
                path="/account/parent"
                render={() => <Parent user={user} />}
              />
            </Switch>
          </Main>
          <Footer />
        </AppWrapper>
      </ThemeProvider>
    </Router>
  );
};

App.propTypes = {
  loading: PropTypes.bool.isRequired,
  client: PropTypes.object.isRequired,
  user: PropTypes.object,
};

App.defaultProps = {
  user: null,
};

export default graphql(userQuery, {
  props: ({ data }) => ({ ...data }),
})(withApollo(App));

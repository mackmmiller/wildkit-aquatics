import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { Elements } from 'react-stripe-elements';

import BillingForm from './BillingForm';

const Content = styled.div`
  width: 100%;
  margin: 1rem;
  text-align: center;
  font-size: 1.6rem;
  font-weight: bolder;
  display: flex;
  justify-content: space-around;
  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, max-content);
  grid-template-areas:
    ". g p"
    "s s s"
    ". dT dM";
  .group {
    grid-area: g;
  }
  .plan {
    grid-area: p;
  }
  .swimmers {
    grid-area: s;
  }
  .dueToday {
    grid-area: dT;
  }
  .dueMonthly {
    grid-area: dM;
  }
  .swimmer {
    display: flex;
    justify-content: space-around;
    align-content: center;
    > h6 {
      margin: 0;
    }
  }
`;

const fees = {
  learnToSwim: {
    monthly: 155,
    winter: 1240,
    summer: 930,
    yearly: 1550,
  },
  bronze: {
    monthly: 115,
    winter: 920,
    summer: 690,
    yearly: 1380,
  },
  silver: {
    monthly: 130,
    winter: 1040,
    summer: 780,
    yearly: 1560,
  },
  gold: {
    monthly: 145,
    winter: 1160,
    summer: 870,
    yearly: 1740,
  },
  platinum: {
    monthly: 150,
    winter: 1200,
    summer: 900,
    yearly: 1800,
  },
  highShoolGirls: {
    monthly: 155,
    winter: 775,
    summer: 930,
    yearly: 1550,
  },
  highschoolBoys: {
    monthly: 155,
    winter: 620,
    summer: 930,
    yearly: 1395,
  },
};

class Billing extends Component {
  state = {
    dueToday: 0,
    dueMonthly: 0,
    cart: [],
  }

  handleGroupChange = (e, i) => {
    const { cart } = this.state;
    cart[i] = fees[e.target.value];
    this.setState({ cart });
  }

  handlePlanChange = (e, i) => {
    const { cart } = this.state;
    cart[i] = cart[i][e.target.value];
    this.setState({ cart });
  }

  renderSwimmers = (s, i) => (
    <div key={s._id} className="swimmer">
      <h6>{s.firstName} {s.lastName}</h6>
      <select onChange={e => this.handleGroupChange(e, i)}>
        <option disabled selected value>Select an Option</option>
        <option value="learnToSwim">Learn To Swim</option>
        <option value="bronze">Bronze</option>
        <option value="silver">Silver</option>
        <option value="gold">Gold</option>
        <option value="platinum">Platinum</option>
        <option value="highSchool">High School</option>
      </select>
      <select onChange={e => this.handlePlanChange(e, i)}>
        <option disabled selected value>Select an Option</option>
        <option value="monthly">Monthly</option>
        <option value="winter">Winter</option>
        <option value="summer">Summer</option>
        <option value="yearly">Yearly</option>
      </select>
    </div>
  )

  render() {
    const { swimmers } = this.props;
    const { dueToday, dueMonthly, cart } = this.state;
    return (
      <Fragment>
        <Content>
          <Grid>
            <h5 className="group">Group</h5>
            <h5 className="plan">Payment Plan</h5>
            <div className="swimmers">
              {swimmers.map(this.renderSwimmers)}
            </div>
            <h6 className="dueToday">Due Today: ${cart.reduce((acc, cv) => acc + cv, 0)}</h6>
            <h6 className="dueMonthly">Due Monthly: ${dueMonthly}</h6>
          </Grid>
          <Elements>
            <BillingForm billToday={cart.reduce((acc, cv) => acc + cv, 0)} />
          </Elements>
        </Content>
      </Fragment>
    );
  }
}

export default Billing;

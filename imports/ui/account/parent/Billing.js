import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { Elements } from 'react-stripe-elements';

import BillingForm from './BillingForm';
import BillSwimmer from './BillSwimmer';

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
  font-size: 2rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: max-content 1fr max-content;
  grid-template-areas:
    ". g p"
    "s s s"
    "T dT dM";
  grid-gap: 1rem;
  .group {
    grid-area: g;
  }
  .plan {
    grid-area: p;
  }
  .swimmers {
    grid-area: s;
    display: flex;
    flex-direction: column;
  }
  .dueToday {
    grid-area: dT;
  }
  .dueMonthly {
    grid-area: dM;
  }
  .total {
    grid-area: T;
  }
  .swimmer {
    margin: 0.5rem;
    display: flex;
    justify-content: space-around;
    align-content: center;
    > h6 {
      margin: 0;
    }
  }
`;

const Left = styled.div`
  flex: 4;
  display: flex;
  padding: 1rem;
  flex-direction: column;
`;

const Right = styled.div`
  flex: 6;
  > div {
    min-height: 40rem;
    background: ${props => props.theme.medGray};
    border-radius: 0.5rem;
    padding: 2rem;
    box-sizing: border-box;
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
  highSchoolGirls: {
    monthly: 155,
    winter: 775,
    summer: 930,
    yearly: 1550,
  },
  highSchoolBoys: {
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
    total: 0,
    cart: [],
  }

  componentDidMount = () => {
    const { swimmers } = this.props;
    const cart = swimmers.map(s => ({
      id: s._id, group: '', plan: '', dueToday: 0, dueMonthly: 0,
    }));
    const { dueToday, dueMonthly, total } = this.calculatePrices(cart);
    this.setState({
      cart,
      dueToday,
      dueMonthly,
      total: total || 0,
    });
  }

  shouldComponentUpdate = (nextProps, { dueToday, dueMonthly }) => {
    if (isNaN(dueToday) || isNaN(dueMonthly)) return false;
    return true;
  }

  calculatePrices = (cart) => {
    const dueToday = cart.reduce((acc, cv) => acc + cv.dueToday, 0);
    const dueMonthly = cart.reduce((acc, cv) => acc + cv.dueMonthly, 0);
    const total = cart.reduce((acc, cv) => acc + cv.total, 0);
    return { dueToday, dueMonthly, total };
  }

  handleChange = (id, group, plan) => {
    const { cart } = this.state;
    const { dueToday, dueMonthly, total } = this.calculatePrices(cart);
    const target = cart.find(obj => obj.id === id);
    target.group = group;
    target.plan = plan;
    target.dueToday = fees[group][plan];
    target.dueMonthly = plan === 'monthly' ? fees[group][plan] : 0;
    target.total = plan === 'monthly' ? fees[group][plan] * 10 : fees[group][plan];
    this.setState({
      cart, dueToday, dueMonthly, total,
    });
  }

  render() {
    const { swimmers } = this.props;
    const {
      dueToday, dueMonthly, cart, total,
    } = this.state;
    return (
      <Fragment>
        <Left>
          <Grid>
            <h5 className="group">Group</h5>
            <h5 className="plan">Payment Plan</h5>
            <div className="swimmers">
              {swimmers.map(s => <BillSwimmer key={s._id} s={s} onChange={this.handleChange.bind(this)} />)}
            </div>
            <h6 className="dueToday">Due Today: ${dueToday}</h6>
            <h6 className="dueMonthly">Due Monthly: ${dueMonthly}</h6>
            <h6 className="total">Total: ${total}</h6>
          </Grid>
        </Left>
        <Right>
          <div>
            <Elements>
              <BillingForm billToday={cart.reduce((acc, cv) => acc.price + cv, 0)} />
            </Elements>
          </div>
        </Right>
      </Fragment>
    );
  }
}

export default Billing;

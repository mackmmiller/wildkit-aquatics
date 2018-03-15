import { Meteor } from 'meteor/meteor';
import stripePackage from 'stripe';
import './api';

const stripe = stripePackage('sk_test_p1hV1vbkpw0DiegiR0MXWFVX');

Meteor.methods({
  chargeToken: (token) => {
    stripe.charges.create({
      amount: 999,
      currency: 'usd',
      description: 'Example charge',
      source: token,
    },
    async (err, charge) => {
      const e = await err;
      const c = await charge;
      console.log(e);
      console.log(c);
    },
    );
  },
});

Accounts.onCreateUser((options, user) => {
  const { firstName, lastName, userType } = options;
  user.firstName = firstName;
  user.lastName = lastName;
  user.userType = userType;
  return user;
});


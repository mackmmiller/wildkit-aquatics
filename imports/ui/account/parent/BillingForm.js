import React, { Component } from "react";
import {
  injectStripe,
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  PostalCodeElement
} from "react-stripe-elements";

class BillingForm extends Component {
  handleSubmit = async e => {
    e.preventDefault();
    const token = await this.props.stripe.createToken();
    Meteor.call("chargeToken", token.token.id, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        console.log(res);
      }
    });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Card Number
          <CardNumberElement />
        </label>
        <label>
          Expiration Date
          <CardExpiryElement />
        </label>
        <label>
          CVC
          <CardCVCElement />
        </label>
        <label>
          Postal Code
          <PostalCodeElement />
        </label>
        <input type="submit" value="Pay" />
      </form>
    );
  }
}

export default injectStripe(BillingForm);

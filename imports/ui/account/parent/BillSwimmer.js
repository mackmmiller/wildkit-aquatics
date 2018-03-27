import React, { Component } from 'react';

class BillSwimmer extends Component {
  handleChange = () => this.props.onChange(this.props.s._id, this.group.value, this.plan.value);

  render() {
    const { s, onChange } = this.props;
    return (
      <div className="swimmer">
        <h6>
          {s.firstName} {s.lastName}
        </h6>
        <select onChange={this.handleChange} ref={input => this.group = input} defaultValue="select">
          <option disabled value="select">
          Select an Option
          </option>
          <option value="learnToSwim">Learn To Swim</option>
          <option value="bronze">Bronze</option>
          <option value="silver">Silver</option>
          <option value="gold">Gold</option>
          <option value="platinum">Platinum</option>
          <option value={(s.gender === 'Male') ? 'highSchoolGirls' : 'highSchoolBoys'}>High School</option>
        </select>
        <select onChange={this.handleChange} ref={input => this.plan = input} defaultValue="select">
          <option disabled value="select">
          Select an Option
          </option>
          <option value="yearly">Yearly</option>
          <option value="monthly">Monthly</option>
          <option value="winter">Winter</option>
          <option value="summer">Summer</option>
        </select>
      </div>
    );
  }
}


export default BillSwimmer;

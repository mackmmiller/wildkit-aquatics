import React, { Component } from "react";

class GuardianForm extends Component {
  handleSubmit = e => {
    e.preventDefault();
    console.log("Hi");
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          First Name<input type="text" />
        </label>
        <label>
          Last Name<input type="text" />
        </label>
        <label>
          Gender
          <select>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </label>
        <label>
          Email<input type="email" />
        </label>
        <label>
          Cell Phone<input type="tel" />
        </label>
        <input type="submit" value="Submit" />
        <input type="button" value="Cancel" onClick={this.props.unmount} />
      </form>
    );
  }
}

export default GuardianForm;

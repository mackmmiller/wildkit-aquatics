import React, { Component } from "react";

class UserSettings extends Component {
  state = {
    form: false
  };

  render() {
    const { email } = this.props;
    return (
      <div>
        <form>
          <label>
            Email
            <input
              type="email"
              name="email"
              ref={input => (this.email = input)}
              value={email}
            />
          </label>
        </form>
      </div>
    );
  }
}

export default UserSettings;

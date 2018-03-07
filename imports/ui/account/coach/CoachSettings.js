import React, { Component, Fragment } from 'react';
import styled from 'styled-components';

class CoachSettings extends Component {
  state = {
    bio: this.props.bio,
    editable: false,
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.bio.value);
  };

  toggleEditable = () => {
    this.setState({
      editable: !this.state.editable,
    });
  };

  render() {
    const { bio, editable } = this.state;
    return (
      <Wrapper>
        <h4>Biography</h4>
        {editable ? (
          <form onSubmit={this.handleSubmit}>
            <textarea
              name="bio"
              cols="30"
              rows="10"
              ref={input => (this.bio = input)}
              defaultValue={bio}
            />
            <div>
              <input
                type="button"
                value="cancel"
                onClick={this.toggleEditable}
              />
              <input type="submit" />
            </div>
          </form>
        ) : (
          <Fragment>
            <p>{bio}</p>
            <button onClick={this.toggleEditable}>Edit</button>
          </Fragment>
        )}
      </Wrapper>
    );
  }
}

export default CoachSettings;

const Wrapper = styled.div`
  h4 {
    font-weight: bold;
  }
  p {
    font-size: 1.8rem;
    font-weight: lighter;
  }
`;

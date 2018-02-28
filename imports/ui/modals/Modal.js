import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Register from './Register';
import Login from './Login';


const Modal = ({ handleClick, targetModal, client }) => (
  <Wrapper className="wrapper" onClick={handleClick}>
    <StyledModal>
      {targetModal === 'Log In' ? (
        <Login client={client} />
      ) : (
        <Register client={client} />
      )}
    </StyledModal>
  </Wrapper>
);

Modal.propTypes = {
  handleClick: PropTypes.func.isRequired,
  targetModal: PropTypes.string.isRequired,
  client: PropTypes.object.isRequired,
};

export default Modal;

const StyledModal = styled.div`
  background: #eb5e55;
  margin: auto;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  z-index: 100;
`;

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.4);
  width: 100%;
  height: 100%;
`;

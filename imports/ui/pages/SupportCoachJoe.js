import React, { Component } from 'react';
import styled from 'styled-components';
import { Elements } from 'react-stripe-elements';

import DonationForm from './components/DonationForm';

class Support extends Component {
  render() {
    return (
      <Wrapper>
        <div>
          <img src="/JoeFam.jpg" alt="Joe, Szilvia, and their son Zador." />
          <div>
            <p>
              Coach Joe's family, wife Szilvia and one year old son Zador
              received some horrible news recently Szilvia has been
              diagnosed with Stage 4 ASPS (Alveolar soft part sarcoma) which
              is inoperable. A very rare, slow growing, highly angiogenic
              (vessel-forming) tumor. Szilvia has cancerous tumors in her
              pelvic area and lungs. Non-cancerous tumors in her liver. Joe
              and Szilvia must go to MD Anderson Center in Houston Texas for
              tests and treatments every 2-3 weeks. This is the only
              treatment available at this time to prolong life. It is a
              trial involving immunotherapy, the future in fighting cancer.
              Regular cancer treatments are ineffective in fighting this
              type of cancer. This type of treatment will hopefully
              stabilize and reduce tumor size. The struggle of fighting this
              disease will be long and very expensive
            </p>
            <h3>What can YOU do to help?</h3>
            <p>
              Join the Wildkit Family by providing a donation to Joe and his
              Family 100% of donations will be given to Joe and his family
              All processing fees will be covered by WSO Please make sure to
              enter all donor information. Donor information is NOT saved.
              It is for credit processing purposes only.
            </p>
            <Elements>
              <DonationForm />
            </Elements>
          </div>
        </div>
      </Wrapper>
    );
  }
}

export default Support;

const Wrapper = styled.div`
  width: 95%;
  margin: auto;
  background: ${props => props.theme.white};
  border-radius: 0.5rem;
  color: #181818;
  > div {
    display: flex;
    font-size: 1.4rem;
    img {
      max-height: 30rem;
      margin: 1.4rem;
    }
    img, div {
      flex: 1;
      padding: 1rem;
    }
    > div {
      display: flex;
      flex-direction: column;
    }
  }
`;

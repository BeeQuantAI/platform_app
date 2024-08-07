'use client';

import { Col, Container, Row } from 'react-bootstrap';
import { useTitle } from '@/hooks/useTitle';
import WizardForm from 'module/protect/crypto/exchange/WizardForm';

const CryptoExchanges = () => {
  useTitle('Exchanges - BeeQuant');

  return (
    <Container>
      <Row>
        <Col md={12}>
          <h3 className="page-title">Connect New Exchange</h3>
        </Col>
      </Row>
      <WizardForm onSubmit={() => {}} />
    </Container>
  );
};

export default CryptoExchanges;

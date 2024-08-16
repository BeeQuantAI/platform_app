'use client';

import { Col, Container, Row } from 'react-bootstrap';
import { useTitle } from '@/hooks/useTitle';
import Form from './_components/Form';

const CryptoExchanges = () => {
  useTitle('Exchanges - BeeQuant');

  return (
    <Container>
      <Row>
        <Col md={12}>
          <h3 className="page-title">Connect New Exchange</h3>
        </Col>
      </Row>
      <Form onSubmit={() => {}} />
    </Container>
  );
};

export default CryptoExchanges;

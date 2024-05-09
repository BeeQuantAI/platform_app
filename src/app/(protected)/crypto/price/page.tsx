'use client';

import { Col, Row } from 'react-bootstrap';
import { useTitle } from '@/hooks/useTitle';
import { ContentContainer } from '@/components/Container';

const CryptoPrices = () => {
  useTitle('Prices - BeeQuant');

  return (
    <ContentContainer>
      <Row>
        <Col md={12}>
          <h3 className="page-title">Crypto Prices</h3>
        </Col>
      </Row>
    </ContentContainer>
  );
};

export default CryptoPrices;

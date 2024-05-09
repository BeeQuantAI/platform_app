'use client';

import { Col, Row } from 'react-bootstrap';
import { useTitle } from '@/hooks/useTitle';
import { ContentContainer } from '@/components/Container';

const PriceDetails = () => {
  useTitle('Exchanges - BeeQuant');

  return (
    <ContentContainer>
      <Row>
        <Col md={12}>
          <h3 className="page-title">Price Details</h3>
        </Col>
      </Row>
    </ContentContainer>
  );
};

export default PriceDetails;

'use client';

import { Col, Row } from 'react-bootstrap';
import { useTitle } from '@/hooks/useTitle';
import { ContentContainer } from '@/components/Container';
import ContentCard from './_components/ContentCard';

const ExchangeManagement = () => {
  useTitle('Exchange Management - BeeQuant');

  return (
    <ContentContainer>
      <Row>
        <Col md={12}>
          <h3 className="page-title">Crypto Exchange Management</h3>
        </Col>
      </Row>
      <Row>
        <ContentCard />
      </Row>
    </ContentContainer>
  );
};

export default ExchangeManagement;

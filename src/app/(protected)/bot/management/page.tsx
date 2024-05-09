'use client';

import { Col, Row } from 'react-bootstrap';
import { useTitle } from '@/hooks/useTitle';
import { ContentContainer } from '@/components/Container';

const Management = () => {
  useTitle('Bots Management - BeeQuant');

  return (
    <ContentContainer>
      <Row>
        <Col md={12}>
          <h3 className="page-title">Bots Management</h3>
        </Col>
      </Row>
    </ContentContainer>
  );
};

export default Management;

'use client';

import { Col, Row } from 'react-bootstrap';
import { useTitle } from '@/hooks/useTitle';
import { ContentContainer } from '@/components/Container';

const Dashboard = () => {
  useTitle('Bots Dashboard - BeeQuant');

  return (
    <ContentContainer>
      <Row>
        <Col md={12}>
          <h3 className="page-title">Bots Board</h3>
        </Col>
      </Row>
    </ContentContainer>
  );
};

export default Dashboard;

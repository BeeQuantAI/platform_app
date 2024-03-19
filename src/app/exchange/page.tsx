'use client';

import { Col, Container, Row } from 'react-bootstrap';
import { useTitle } from '@/hooks/useTitle';
import { ROUTE_KEY, getRouteByKey } from '@/routes/routeConfig';
import ContentCard from './components/ContentCard';

const ExchangeManagement = () => {
  useTitle(getRouteByKey(ROUTE_KEY.EXCHANGE_MANAGEMENT).title);

  return (
    <Container>
      <Row>
        <Col md={12}>
          <h3 className="page-title">Crypto Exchange Management</h3>
        </Col>
      </Row>
      <Row>
        <ContentCard />
      </Row>
    </Container>
  );
};

export default ExchangeManagement;

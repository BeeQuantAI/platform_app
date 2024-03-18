'use client';

import { Col, Container, Row } from 'react-bootstrap';
import { useTitle } from '@/hooks/useTitle';
import { ROUTE_KEY, getRouteByKey } from '@/routes/routeConfig';

const Dashboard = () => {
  useTitle(getRouteByKey(ROUTE_KEY.BOT_DASHBOARD).title);

  return (
    <Container>
      <Row>
        <Col md={12}>
          <h3 className="page-title">Bots Board</h3>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;

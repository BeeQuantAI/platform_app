'use client';

import { Col, Container, Row } from 'react-bootstrap';
import { useTitle } from '@/hooks/useTitle';
import { ROUTE_KEY, getRouteByKey } from '@/routes/routeConfig';
import TotalProfitEarned from './components/TotalProfitEarned';
import RecentTransactions from './components/RecentTransactions';
import TotalAssets from './components/TotalAssets';
import PendingOrders from './components/PendingOrders';

const Dashboard = () => {
  useTitle(getRouteByKey(ROUTE_KEY.DASHBOARD).title);

  return (
    <Container>
      <Row>
        <Col md={12}>
          <h3 className="page-title">BeeQuant Dashboard</h3>
        </Col>
      </Row>
      <Row>
        <TotalProfitEarned />
        <TotalAssets />
        <PendingOrders />
        <RecentTransactions />
      </Row>
    </Container>
  );
};

export default Dashboard;

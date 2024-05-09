'use client';

import { Col, Row } from 'react-bootstrap';
import { useTitle } from '@/hooks/useTitle';
import { ContentContainer } from '@/components/Container';
import TotalProfitEarned from './_components/TotalProfitEarned';
import RecentTransactions from './_components/RecentTransactions';
import TotalAssets from './_components/TotalAssets';
import PendingOrders from './_components/PendingOrders';

const Dashboard = () => {
  useTitle('Dashboard - BeeQuant');

  return (
    <ContentContainer>
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
    </ContentContainer>
  );
};

export default Dashboard;

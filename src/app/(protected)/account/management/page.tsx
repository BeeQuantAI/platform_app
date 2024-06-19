'use client';

import { Col, Container, Row } from 'react-bootstrap';
import { useTitle } from '@/hooks/useTitle';
import CardLink from './_components/CardLink';

const AccountManagement = () => {
  useTitle('Account Management - BeeQuant');

  return (
    <Container>
      <Row>
        <Col md={12}>
          <h3 className="page-title">Account Management</h3>
        </Col>
      </Row>
      <Row>
        <CardLink
          cardTitle="Reset Password"
          cardSubhead="Update your password"
          route="/account/update/password"
        />
      </Row>
    </Container>
  );
};

export default AccountManagement;

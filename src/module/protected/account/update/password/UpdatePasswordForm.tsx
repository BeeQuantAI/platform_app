'use client';

import { Container, Row, Col } from 'react-bootstrap';
import { Card, CardBody, CardTitleWrap, CardTitle, CardSubhead } from '@/shared/components/Card';
import FormLayout from './FormLayout';

export default function UpdatePasswordForm() {
  return (
    <Container>
      <Row>
        <Col>
          <Card>
            <CardBody>
              <CardTitleWrap>
                <CardTitle>Reset Password</CardTitle>
                <CardSubhead>Update your password</CardSubhead>
              </CardTitleWrap>
              <FormLayout />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

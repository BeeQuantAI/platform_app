'use client';

import { Col, Row } from 'react-bootstrap';
import { useTitle } from '@/hooks/useTitle';
import { ContentContainer } from '@/components/Container';

const BotDetails = () => {
  useTitle('Bot Details - BeeQuant');

  return (
    <ContentContainer>
      <Row>
        <Col md={12}>
          <h3 className="page-title">Bot Details</h3>
        </Col>
      </Row>
    </ContentContainer>
  );
};

export default BotDetails;

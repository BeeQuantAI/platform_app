import { Col, Container, Row } from 'react-bootstrap';
import { useTitle } from '@/hooks/useTitle';
import { ROUTE_KEY, getRouteByKey } from '@/routes/routeConfig';

const ExchangeDetails = () => {
  useTitle(getRouteByKey(ROUTE_KEY.CRYPTO_EXCHANGES).title);

  return (
    <Container>
      <Row>
        <Col md={12}>
          <h3 className="page-title">Exchange Details</h3>
        </Col>
      </Row>
    </Container>
  );
};

export default ExchangeDetails;

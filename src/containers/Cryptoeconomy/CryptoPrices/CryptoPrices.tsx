import { Col, Container, Row } from 'react-bootstrap';
import { useTitle } from '@/hooks/useTitle';
import { ROUTE_KEY, getRouteByKey } from '@/routes/routeConfig';

const CryptoPrices = () => {
  useTitle(getRouteByKey(ROUTE_KEY.CRYPTO_PRICES).title);

  return (
    <Container>
      <Row>
        <Col md={12}>
          <h3 className="page-title">Crypto Prices</h3>
        </Col>
      </Row>
    </Container>
  );
};

export default CryptoPrices;

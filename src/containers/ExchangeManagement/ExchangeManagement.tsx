import { Col, Container, Row } from 'react-bootstrap';
import ContentCard from './components/ContentCard';
import { useTitle } from '@/hooks/useTitle';
import { ROUTE_KEY, getRouteByKey } from '@/routes/routeConfig';

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

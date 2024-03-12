import { Col, Container, Row } from 'react-bootstrap';
import { useTitle } from '@/hooks/useTitle';
import { ROUTE_KEY, getRouteByKey } from '@/routes/routeConfig';

const Management = () => {
  useTitle(getRouteByKey(ROUTE_KEY.BOT_MANAGEMENT).title);

  return (
    <Container>
      <Row>
        <Col md={12}>
          <h3 className="page-title">Bots Management</h3>
        </Col>
      </Row>
    </Container>
  );
};

export default Management;

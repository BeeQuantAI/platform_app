import { Col, Container, Row } from 'react-bootstrap';
import { useTitle } from '@/hooks/useTitle';
import { ROUTE_KEY, getRouteByKey } from '@/routes/routeConfig';

const BotCreate = () => {
  useTitle(getRouteByKey(ROUTE_KEY.BOT_CREATE).title);

  return (
    <Container>
      <Row>
        <Col md={12}>
          <h3 className="page-title">Bot Create</h3>
        </Col>
      </Row>
    </Container>
  );
};

export default BotCreate;

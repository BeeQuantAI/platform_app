'use client';

import { Col, Container, Row } from 'react-bootstrap';
import { useTitle } from '@/hooks/useTitle';
import { GET_USER } from '@/graphql/user';
import { useQuery } from '@apollo/client';
import { AUTH_TOKEN } from '@/shared/constants/storage';

const CryptoExchanges = () => {
  useTitle('Exchanges - BeeQuant');
  const { data } = useQuery(GET_USER);
  if (typeof window === 'undefined') {
    const accessToken = sessionStorage.getItem(AUTH_TOKEN);
    console.log('accessToken:', accessToken);
  }

  console.log('data:', data);

  return (
    <Container>
      <Row>
        <Col md={12}>
          <h3 className="page-title">Crypto Exchanges</h3>
        </Col>
      </Row>
    </Container>
  );
};

export default CryptoExchanges;

import { Col } from 'react-bootstrap';
import { Card, CardBody, CardTitle, CardTitleWrap, CardSubhead } from '@/shared/components/Card';
import Link from 'next/link';

type CardLinkProps = {
  cardTitle: string;
  cardSubhead: string;
  route: string;
};

const CardLink = ({ cardTitle, cardSubhead, route }: CardLinkProps) => (
  <Link href={route}>
    <Col md={12}>
      <Card>
        <CardBody>
          <CardTitleWrap>
            <CardTitle>{cardTitle}</CardTitle>
            <CardSubhead>{cardSubhead}</CardSubhead>
          </CardTitleWrap>
        </CardBody>
      </Card>
    </Col>
  </Link>
);

export default CardLink;

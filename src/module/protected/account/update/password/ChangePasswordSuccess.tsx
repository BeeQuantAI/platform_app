import { Button, Container, Row, Col } from 'react-bootstrap';
import {
  StyledModal,
  StyledModalHeader,
  StyledModalTitle,
  StyledModalFooter,
} from '@/shared/components/Modal';
import Link from 'next/link';

const ChangePasswordSuccess = ({ success }: { success: string }) => (
  <Container>
    <Row>
      <Col>
        <StyledModal show={!!success} backdrop="static" keyboard={false}>
          <StyledModalHeader>
            <StyledModalTitle>You have successfully reset your password!</StyledModalTitle>
          </StyledModalHeader>
          <StyledModalFooter>
            <Link href="/login">
              <Button variant="primary">Ready to trade again</Button>
            </Link>
          </StyledModalFooter>
        </StyledModal>
      </Col>
    </Row>
  </Container>
);

export default ChangePasswordSuccess;

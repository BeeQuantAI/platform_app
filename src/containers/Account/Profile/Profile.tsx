import { Container, Row } from 'react-bootstrap';
import { useTitle } from '@/hooks/useTitle';
import { ROUTE_KEY, getRouteByKey } from '@/routes/routeConfig';
import ProfileMain from './components/ProfileMain';

const Profile = () => {
  useTitle(getRouteByKey(ROUTE_KEY.ACCOUNT_PROFILE).title);

  return (
    <Container>
      <Row>
        <ProfileMain />
      </Row>
    </Container>
  );
};
export default Profile;
